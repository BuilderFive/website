"use client"

import React, { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { supabase } from './supabaseClient';
import { User, Session, SupabaseClient, createClient, AuthChangeEvent } from '@supabase/supabase-js';
import { Tables } from './supabase-types';
import { useSession } from './AuthProvider';
import { group } from 'console';
import { m } from 'framer-motion';

interface GroupContextProps {
    radius: number;
    setRadius: (radius: number) => void;
    isLoading: boolean;
    userLocation: {latitude: number | null, longitude: number | null};
    setUserLocation: (location: {latitude: number, longitude: number}) => void;
    packagedGroup: PackagedGroup | null;
    topic: string;
    systemProcessGroupJoin: (newTopic: string) => void;
    availableTopics: string[];
    leaveGroup: () => void;
    setTopic: (topic: string) => void;
    loadedGroups: Tables<'groups'>[];
    setLoading: (loading: boolean) => void;
}

const GroupContext = createContext<GroupContextProps>({
    radius: 1000,
    setRadius: () => {},
    isLoading: true,
    userLocation: {latitude: null, longitude: null},
    setUserLocation: () => {},
    packagedGroup: null,
    topic: "startups",
    systemProcessGroupJoin: () => {},
    availableTopics: ["startups","productivity","academics", "careers", "science","history"],
    leaveGroup: () => {},
    setTopic: () => {},
    loadedGroups: [],
    setLoading: () => {}
});

export const useGroup = () => useContext(GroupContext);

type PackagedGroup = {
    group: Tables<'groups'>,
    members: Tables<'group_members'>[]
}

/**
 * Handles joining, leaving, deleting, and creating groups. 
 * Getting user's location, radius, and topic of interest.
 * @param props 
 * @returns 
 */
export function GroupProvider(props: React.PropsWithChildren) {
    const { user } = useSession();
    const [radius, setRadius] = useState(10000)
    const [userLocation, setUserLocation] = useState<{latitude: number | null, longitude: number | null}>({latitude: null, longitude: null})
    const [packagedGroup, setPackagedGroup] = useState<PackagedGroup| null>(null) //current group that the user is in
    const [topic, setTopic] = useState("startups")
    const [isLoading, setLoading] = useState<boolean>(false);
    const availableTopics = ["startups","productivity","academics", "careers", "science","history"]
    const [loadedGroups, setLoadedGroups] = useState<Tables<'groups'>[]>([])
    
    /**
     * On initial load, fetch the user's group data.
     */
    useEffect(() => {
        const fetchGroupData = async () => {
            try {
                if (!user) return;

                // Fetch the user's group UUID(s). Replace this with your actual logic to get the user's group UUID(s).
                const { data: userGroups, error: userGroupsError } = await supabase
                    .from('group_members')
                    .select('group_uuid')
                    .eq('user_uuid', user.id);

                if (userGroupsError) throw userGroupsError;

                if (userGroups.length === 0) {
                    setPackagedGroup(null);
                    return;
                }

                const groupUUID = userGroups[0].group_uuid; // Assuming a single group for simplicity.

                // Fetch group data
                const { data: groupData, error: groupError } = await supabase
                    .from('groups')
                    .select('*')
                    .eq('group_uuid', groupUUID)
                    .single();

                if (groupError) throw groupError;

                // Fetch members data
                const { data: membersData, error: membersError } = await supabase
                    .from('group_members')
                    .select('*')
                    .eq('group_uuid', groupUUID);

                if (membersError) throw membersError;

                // Package the data
                const packagedGroup = {
                    group: groupData,
                    members: membersData,
                };
                setTopic(packagedGroup.group.topic)
                setPackagedGroup(packagedGroup);
            } catch (error) {
                console.error('Error fetching group data:', error);
            }
        };

        fetchGroupData();
    }, [user]);

    //loads group data on load
    useEffect(() => {
        const fetchAllGroups = async () => {
            try {
                // Fetch the user's group UUID(s). Replace this with your actual logic to get the user's group UUID(s).
                const { data: fetchedGroups, error: fetchedGroupErrors } = await supabase
                    .from('groups')
                    .select('*');

                if (fetchedGroupErrors) throw fetchedGroupErrors;

                setLoadedGroups(fetchedGroups)
            } catch (error) {
                console.error('Error fetching group data:', error);
            }
        };
            
        if (user) {
            fetchAllGroups();
        }
        
    }, [user])

    useEffect(()=> {
        const channel = supabase.channel('topic groups')
            .on('postgres_changes', {
                event: 'INSERT', schema: 'public', table: 'groups'
            }, (payload)=> {
                const newGroup = {payload}.payload.new as { created_at: string; end_at: string | null; group_uuid: string; location: number[]; max_members: number; topic: string; }
                console.log(newGroup)
                setLoadedGroups([...loadedGroups, newGroup])
            })
            .on('postgres_changes', {
                event: 'DELETE', schema: 'public', table: 'groups'
            }, (payload)=> {
                
                const oldGroup = {payload}.payload.old
                const newGroups = loadedGroups.filter(group => group.group_uuid !== oldGroup.group_uuid);
                setLoadedGroups(newGroups);
            }).subscribe()
        return () => {
            if (channel) supabase.removeChannel(channel)
        }
    },[loadedGroups])


    //update group members when a new member joins/leaves
    useEffect(() => {
        const channel = supabase.channel('realtime members')
            .on('postgres_changes', {
                event: 'INSERT', schema: 'public', table: 'group_members', filter: `group_uuid=eq.${packagedGroup?.group.group_uuid}`
            }, (payload)=> {
                const newMember = {payload}.payload.new
                handleInsertMember(newMember as Tables<'group_members'>);
            })
            .on('postgres_changes', {
                event: 'DELETE', schema: 'public', table: 'group_members', filter: `group_uuid=eq.${packagedGroup?.group.group_uuid}`
            }, (payload)=> {
                const removedMember = payload.old.user_uuid
                handleRemoveMember(removedMember)
            })
        .subscribe()

        return () => {
            if (channel) supabase.removeChannel(channel)
        }
    },[user, packagedGroup])

    const handleRemoveMember = (member_uuid: string) => {
        if (member_uuid === user?.id) {
            setPackagedGroup(null);
            return;
        }
        if (!packagedGroup) return;

        // Remove member from group_members table
        const updatedMembers = packagedGroup?.members.filter(member => member.user_uuid !== member_uuid) || [];
        const updatedPackagedGroup = {
            group: packagedGroup.group,
            members: updatedMembers,
        };
        setPackagedGroup(updatedPackagedGroup);
    };
    const handleInsertMember = useCallback((newMember: Tables<'group_members'>) => {
        if (!packagedGroup) return;
        
        // Check if the new member is already in the group
        const isMemberAlreadyInGroup = packagedGroup.members.some(member => member.user_uuid === newMember.user_uuid);
        if (isMemberAlreadyInGroup) return;
        
        const updatedMembers = [...packagedGroup.members, newMember];
        const updatedPackagedGroup = {
            group: packagedGroup.group,
            members: updatedMembers,
        };
        setPackagedGroup(updatedPackagedGroup);
    }, [packagedGroup]);


    //get user's current group
    //get members of the group
    //update packaged group object after receiving handleSetTopic

    const systemProcessGroupJoin = async(newTopic: string) => {
        setLoading(true)
        if (userLocation.latitude === null || userLocation.longitude === null) {
            alert('Please enable location services to join a group.');
            setLoading(false)
            return;
        }
        try {
            const response = await fetch('../api/group/joinFromTopic/', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userUuid: user?.id,
                    topic: newTopic,
                    radius,
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude,
                }),
            });
    
            if (response.ok) {
                const data = await response.json();
                setPackagedGroup(data.result);
                //update loadedGroups for fast update
                const notLoaded = loadedGroups.find(group => group.group_uuid !== data.result.group.group_uuid);
                if (notLoaded) setLoadedGroups((prev)=>[...prev, data.result.group]);
                setPackagedGroup(null)
                setLoading(false)
                return (data.result as PackagedGroup).group.group_uuid;
            } else {
                const errorData = await response.json();
                setLoading(false)
                alert(`Failed to join or create group: ${errorData.error}`);
                console.error(`Failed to join or create group: ${errorData.error}`);
            }
        } catch (error) {
            setLoading(false)
            alert(`Failed to join or create group: ${error}`);
            console.error('Error joining or creating group:', error);
        }
    }

    const leaveGroup = async() => {
        
        //update loadedGroups for fast update
        const newGroups = loadedGroups.filter(group => group.group_uuid !== packagedGroup?.group.group_uuid);
        setLoadedGroups(newGroups);

        const group_uuid = packagedGroup?.group.group_uuid;
        const user_uuid = user?.id;
        setPackagedGroup(null)
        try {
            const response = await fetch('../api/group/leaveClick/', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ group_uuid, user_uuid }),
            });
        
            const data = await response.json();
            if (response.ok) {
                console.log('deleted')
                return data
            } else {
                console.error('Error leaving group:', data.error);
            }
        } catch (error) {
            console.error('Error leaving group:', error);
        }
        
    }

    //called if group timer is up or everyone has left
    const disbandGroup = async() => {
        //should perform cleanup like checking group members table to remove everyone
        try {
            const response = await fetch('../api/group/deleteGroup/', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ group_uuid: packagedGroup?.group.group_uuid }),
            });
        
            const data = await response.json();
            if (response.ok) {
                console.log('deleted')
                console.log(data.result)
                return data
            } else {
                console.error('Error deleting group:', data.error);
            }
        } catch (error) {
            console.error('Error deleting group:', error);
        }
    }

    const contextObject = {
        radius,
        setRadius,
        isLoading,
        userLocation,
        setUserLocation,
        packagedGroup,
        topic, systemProcessGroupJoin, setTopic,
        availableTopics, leaveGroup, loadedGroups,
        setLoading
    };

    return (
        <GroupContext.Provider value={contextObject}>
            {props.children}
        </GroupContext.Provider>
    );
}