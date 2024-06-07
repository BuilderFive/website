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
    packagedGroup: PackagedGroup | undefined;
    topic: string;
    availableTopics: string[];
    handleSetTopic: (topic: string) => void;
}

const GroupContext = createContext<GroupContextProps>({
    radius: 1000,
    setRadius: () => {},
    isLoading: true,
    userLocation: {latitude: 30.35736619550383, longitude: -97.73011964664344},
    setUserLocation: () => {},
    packagedGroup: undefined,
    topic: "startups",
    availableTopics: ["startups","productivity","academics", "careers", "science","history"],
    handleSetTopic: () => {}
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
    const [packagedGroup, setPackagedGroup] = useState<PackagedGroup>() //current group that the user is in
    const [topic, setTopic] = useState("startups")
    const [isLoading, setLoading] = useState<boolean>(true);
    const availableTopics = ["startups","productivity","academics", "careers", "science","history"]

    /**
     * When user updates, request for the supabase session and replace the current session
     */
    useEffect(() => {
    }, [user]);

    const handleSetTopic = async (topic: string) => {
        setTopic(topic)
        try {
          const response = await fetch('~/app/api/calls/join-or-create-group', { 
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
          } else {
            const errorData = await response.json();
            alert(`Failed to join or create group: ${errorData.error}`);
          }
        } catch (error) {
          console.error('Error joining or creating group:', error);
          alert('An error occurred while joining or creating the group');
        }
    };

    const contextObject = {
        radius,
        setRadius,
        isLoading,
        userLocation,
        setUserLocation,
        packagedGroup,
        topic, handleSetTopic,
        availableTopics
    };

    return (
        <GroupContext.Provider value={contextObject}>
            {props.children}
        </GroupContext.Provider>
    );
}