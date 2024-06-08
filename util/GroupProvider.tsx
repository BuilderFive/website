"use client"

import React, { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { supabase } from './supabaseClient';
import { User, Session, SupabaseClient, createClient, AuthChangeEvent } from '@supabase/supabase-js';
import { Tables } from './supabase-types';
import {v4 as uuidv4} from 'uuid';
import { useRouter } from 'next/router';
import { useSession } from './AuthProvider';

interface GroupContextProps {
    radius: number;
    setRadius: (radius: number) => void;
    isLoading: boolean;
    userLocation: {latitude: number, longitude: number};
    setUserLocation: (location: {latitude: number, longitude: number}) => void;
    packagedGroup: PackagedGroup | null;
    topic: string;
    availableTopics: string[];
    handleSetTopic: (topic: string) => void;
    leaveGroup: () => void;
}

const GroupContext = createContext<GroupContextProps>({
    radius: 1000,
    setRadius: () => {},
    isLoading: true,
    userLocation: {latitude: 30.35736619550383, longitude: -97.73011964664344},
    setUserLocation: () => {},
    packagedGroup: null,
    topic: "startups",
    availableTopics: ["startups","productivity","academics", "careers", "science","history"],
    handleSetTopic: () => {},
    leaveGroup: () => {},
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
    const [topic, setTopic] = useState("")
    const [isLoading, setLoading] = useState<boolean>(true);
    const availableTopics = ["startups","productivity","academics", "careers", "science","history"]

    /**
     * When user updates, request for the supabase session and replace the current session
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

    //get user's current group
    //get members of the group
    //update packaged group object after receiving handleSetTopic

    const handleSetTopic = async (topic: string) => {
        setTopic(topic)
        //check if user is already in a group, if so call leaveGroup and await for user confirmation
        systemProcessGroupJoin()
    };

    const systemProcessGroupJoin = async() => {
        try {
            const response = await fetch('../api/group/joinFromTopic/', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userUuid: user?.id,
                    topic,
                    radius,
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude,
                }),
            });
    
            if (response.ok) {
                const data = await response.json();
                alert(`Joined group with UUID: ${data.group_uuid}`);
                console.log(data);
            } else {
                const errorData = await response.json();
                alert(`Failed to join or create group: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error joining or creating group:', error);
            alert('An error occurred while joining or creating the group');
        }
    }

    const leaveGroup = async() => {
        const group_uuid = packagedGroup?.group.group_uuid;
        const user_uuid = user?.id;
        try {
            const response = await fetch('../api/group/leaveClick/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ group_uuid, user_uuid }),
            });
        
            const data = await response.json();
            if (response.ok) {
                console.log('Successfully left the group:', data);
            } else {
                console.error('Error leaving group:', data.error);
            }
        } catch (error) {
            console.error('Error leaving group:', error);
            alert('An error occurred while leaving the group');
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
        topic, handleSetTopic,
        availableTopics, leaveGroup
    };

    return (
        <GroupContext.Provider value={contextObject}>
            {props.children}
        </GroupContext.Provider>
    );
}