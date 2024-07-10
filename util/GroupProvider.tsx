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
    createGroup: () => void;
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
    createGroup: () => {},
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
    const [loadedGroups, setLoadedGroups] = useState<Tables<'groups'>[]>([]);

    //could get packagedgroup from local storage, 
    //but would need to figure out how to take precedence 
    //over grabbing from supabase, then clearing it up
    
    
    //fires every time user changes
    //should fire on initial load to fetch up to date info on user's group
    useEffect(() => {
        if (!user) return;
        const fetchGroupData = async () => {
            try {
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

    //fires every time user or topic changes
    useEffect(() => {
        if (!user) return;
        const fetchTopicGroups = async () => {
            try {
                // Fetch the user's group UUID(s). Replace this with your actual logic to get the user's group UUID(s).
                const { data: fetchedGroups, error: fetchedGroupErrors } = await supabase
                    .from('groups')
                    .select('*')
                    .eq('topic', topic);
                
                if (fetchedGroupErrors) throw fetchedGroupErrors;

                setLoadedGroups(fetchedGroups)
            } catch (error) {
                console.error('Error fetching group data:', error);
            }
        };
        fetchTopicGroups();
    }, [user, topic]);

    //updates to get realtime updates from select topic space
    useEffect(()=> {
        if (!user) return
        const channel = supabase.channel('topic groups')
            .on('postgres_changes', {
                event: 'INSERT', schema: 'public', table: 'groups', filter: `topic=eq.${topic}`
            }, (payload)=> {
                const newGroup = {payload}.payload.new as Tables<'groups'>;
                setLoadedGroups([...loadedGroups, newGroup])
            })
            .on('postgres_changes', {
                event: 'DELETE', schema: 'public', table: 'groups', filter: `topic=eq.${topic}`
            }, (payload)=> {
                const oldGroup = {payload}.payload.old as Tables<'groups'>;
                const newGroups = loadedGroups.filter(group => group.group_uuid !== oldGroup.group_uuid);
                setLoadedGroups(newGroups);
            }).subscribe()
        return () => {
            if (channel) supabase.removeChannel(channel)
        }
    },[user, topic])


    //update group members when a new member joins/leaves
    useEffect(() => {
        const channel = supabase.channel('realtime members')
            .on('postgres_changes', {
                event: 'INSERT', schema: 'public', table: 'group_members', filter: `group_uuid=eq.${packagedGroup?.group.group_uuid}`
            }, (payload)=> {
                const newMember = {payload}.payload.new as Tables<'group_members'>
                handleInsertMember(newMember);
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
    },[user])

    /*
    * Handles removing a member from personal cache "packagedGroup"
    */
    const handleRemoveMember = (member_uuid: string) => {
        if (!packagedGroup) return; //can't remove a group if there's no group to remove from

        // If the user is the one leaving the group, remove the group from the cache
        if (member_uuid === user?.id) {
            setPackagedGroup(null);
            return;
        }

        // Remove member from group_members table
        const updatedMembers = packagedGroup?.members.filter(member => member.user_uuid !== member_uuid);

        if (updatedMembers.length < 1) return; //if there are no members left, remove the group

        const updatedPackagedGroup = {
            group: packagedGroup.group,
            members: updatedMembers,
        };
        setPackagedGroup(updatedPackagedGroup);
    };
    const handleInsertMember = (newMember: Tables<'group_members'>) => {
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
    };


    //get user's current group
    //get members of the group
    //update packaged group object after receiving handleSetTopic

    const joinGroup = async(newTopic: string) => {        
        if (userLocation.latitude === null || userLocation.longitude === null) {
            alert('Please enable location services to join a group.');
            return;
        }
        setLoading(true)
        const userLatitude = userLocation.latitude;
        const userLongitude = userLocation.longitude;

        // Check for an existing eligible group in loadedGroups
        const eligibleGroup = loadedGroups
            .filter(group => group.topic === newTopic)
            .find(group => {             
                const distance = Math.sqrt(
                    Math.pow(group.location[0] - userLatitude, 2) +
                    Math.pow(group.location[1] - userLongitude, 2)
                );
                return distance <= radius;
        });

        const insertMember = async(foundGroup: Tables<'groups'>) => {
            // Insert the user as a new group member
            const { data: newMemberData, error: newMemberError } = await supabase
                .from('group_members')
                .insert([
                    {
                        group_uuid: foundGroup.group_uuid,
                        user_uuid: user?.id,
                        location: [userLocation.latitude, userLocation.longitude],
                    },
                ]);
            if (newMemberError) {
                setLoading(false);
                console.error('Error inserting new member:', newMemberError);
                return;
            }
            
            const membersData = await fetchMembers(foundGroup.group_uuid)

            const newPackagedGroup = {
                group: foundGroup,
                members: membersData,
            };

            setPackagedGroup(newPackagedGroup);
            setLoading(false);
            return foundGroup.group_uuid;
        }

        if (eligibleGroup) {
            insertMember(eligibleGroup);
        } else {
            createGroup();
        }
    }

    const createGroup = async() => {
        if (userLocation.latitude === null || userLocation.longitude === null) {
            alert('Please enable location services to join a group.');
            return;
        }
        setLoading(true)
        const { data: newGroup, error: newGroupError } = await supabase
            .from('groups')
            .insert([
                {
                    location: [userLocation.latitude, userLocation.longitude],
                    topic: topic
                },
            ]).select().single();
        
        if (newGroupError) {
            setLoading(false);
            console.error('Error inserting new group:', newGroupError);
            return;
        }

        const group: Tables<'groups'> = newGroup
        const group_uuid = group.group_uuid

        //insert user into new group
        const { data: newMember, error: newMemberError } = await supabase
            .from('group_members')
            .insert([
                {
                    group_uuid: group_uuid,
                    user_uuid: user?.id,
                    location: [userLocation.latitude, userLocation.longitude],
                },
            ]).select().single();
        
        if (newMemberError) {
            setLoading(false);
            console.error('Error inserting new member:', newMemberError);
            return;
        }


        const membersData = await fetchMembers(group_uuid)

        const newPackagedGroup = {
            group: group,
            members: membersData,
        };

        setPackagedGroup(newPackagedGroup);
        setLoading(false)
        return group_uuid;

        /*
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
        }*/
    }

    const fetchMembers = async(group_uuid: string) => {
        const { data: members, error: error } = await supabase
            .from('group_members')
            .select('*')
            .eq('group_uuid', group_uuid);

        if (error) {
            setLoading(false);
            console.error('Error fetching members data:', error);
            return [];
        }
        return members as Tables<'group_members'>[]

    }

    const leaveGroup = async() => {
        if (!packagedGroup) return null
        setLoading(true)

        const group_uuid = packagedGroup.group.group_uuid;
        const user_uuid = user?.id;

        //delete user from group_members table
        //check if group is empty, if so delete group

        try {
            const { data, error } = await supabase.rpc('leave_group', {
                group_id: group_uuid,
                user_id: user_uuid,
            });
            if (!error) {
                setLoading(false)
                setPackagedGroup(null)
                return data
            } else {
                setLoading(false)
                console.error('Error leaving group:', error);
            }
        } catch (error) {
            setLoading(false)
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
        topic, systemProcessGroupJoin: joinGroup, setTopic,
        availableTopics, leaveGroup, loadedGroups,
        setLoading, createGroup
    };

    return (
        <GroupContext.Provider value={contextObject}>
            {props.children}
        </GroupContext.Provider>
    );
}