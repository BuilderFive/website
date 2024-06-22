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
    userLocation: {latitude: number, longitude: number};
    setUserLocation: (location: {latitude: number, longitude: number}) => void;
    packagedGroup: PackagedGroup | null;
    topic: string;
    systemProcessGroupJoin: (newTopic: string) => void;
    availableTopics: string[];
    leaveGroup: () => void;
    setTopic: (topic: string) => void;
    loadedGroups: Tables<'groups'>[];
}

const GroupContext = createContext<GroupContextProps>({
    radius: 1000,
    setRadius: () => {},
    isLoading: true,
    userLocation: {latitude: 30.35736619550383, longitude: -97.73011964664344},
    setUserLocation: () => {},
    packagedGroup: null,
    topic: "startups",
    systemProcessGroupJoin: () => {},
    availableTopics: ["startups","productivity","academics", "careers", "science","history"],
    leaveGroup: () => {},
    setTopic: () => {},
    loadedGroups: []
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
    const [radius, setRadius] = useState(1000)
    const [userLocation, setUserLocation] = useState({latitude: 30.35736619550383, longitude: -97.73011964664344})
    const [packagedGroup, setPackagedGroup] = useState<PackagedGroup| null>(null) //current group that the user is in
    const [topic, setTopic] = useState("startups")
    const [isLoading, setLoading] = useState<boolean>(true);
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
                const { data: groups, error: groupErrors } = await supabase
                    .from('groups')
                    .select('*');

                if (groupErrors) throw groupErrors;

                console.log(groups)
                setLoadedGroups(groups)
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
                setLoadedGroups([...loadedGroups, newGroup])
            })
            .on('postgres_changes', {
                event: 'DELETE', schema: 'public', table: 'groups'
            }, (payload)=> {
                console.log(payload)
                console.log(loadedGroups)
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
                return (data.result as PackagedGroup).group.group_uuid;
            } else {
                const errorData = await response.json();
                console.error(`Failed to join or create group: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error joining or creating group:', error);
        }
    }

    const leaveGroup = async() => {
        const group_uuid = packagedGroup?.group.group_uuid;
        const user_uuid = user?.id;
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
                setPackagedGroup(null)
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
    const disbandGroup = (merge: boolean = false) => {
        //should perform cleanup like checking group members table to remove everyone
    }

    //on the event that the group disbands by timer end
    const mergetoNewGroup = () => {

    }

    const contextObject = {
        radius,
        setRadius,
        isLoading,
        userLocation,
        setUserLocation,
        packagedGroup,
        topic, systemProcessGroupJoin, setTopic,
        availableTopics, leaveGroup, loadedGroups
    };

    return (
        <GroupContext.Provider value={contextObject}>
            {props.children}
        </GroupContext.Provider>
    );
}