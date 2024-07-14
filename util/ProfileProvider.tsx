"use client"

import React, { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { User, Session, SupabaseClient, createClient, AuthChangeEvent } from '@supabase/supabase-js';
import { Tables } from './supabase-types';
import {v4 as uuidv4} from 'uuid';
import { useRouter } from 'next/router';
import { useSession } from './AuthProvider';
import { set, update } from 'lodash';

interface ProfileContextProps {
    uuid: string;
    bio: string;
    created_at: string;
    last_joined: string;
    setFirstName: (name: string) => void;
    setLastName: (name: string) => void;
    changeFirstName: (name: string) => void;
    changeLastName: (name: string) => void;
    first_name: string;
    last_name: string;
    tokens: number;
    avatar: string;
}

const ProfileContext = createContext<ProfileContextProps>({
    uuid: '',
    bio: '',
    created_at: '',
    last_joined: '',
    setFirstName: () => {},
    setLastName: () => {},
    changeFirstName: () => {},
    changeLastName: () => {},
    first_name: '',
    last_name: '',
    tokens: 0,
    avatar: ''
});

export const useProfile = () => useContext(ProfileContext);

/**
 * For all things that the auth needs to validate a user to use the app
 * Ensures a session is found before getting variables needed
 * @param props 
 * @returns 
 */
export function ProfileProvider(props: React.PropsWithChildren) {
    const { user, supabase } = useSession();
    const [uuid, setUUID] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [created_at, setCreatedAt] = useState<string>('');
    const [last_joined, setLastJoined] = useState<string>('');
    const [first_name, setFirstName] = useState<string>('');
    const [last_name, setLastName] = useState<string>('');
    const [tokens, setTokens] = useState<number>(0);
    const [avatar, setAvatar] = useState<string>('');
    
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            const { data: profile, error: profileError } = await supabase
                .from('account')
                .select('*')
                .eq('uuid', user?.id);

            if (profileError) {
                console.error(profileError);
                return;
            }
            if (profile && profile.length > 0) {
                const { uuid, bio, created_at, last_joined, first_name, last_name, tokens, avatar } = profile[0] as Tables<'account'>;
                setUUID(uuid);
                setBio(bio);
                setCreatedAt(created_at);
                setLastJoined(last_joined);
                setFirstName(first_name);
                setLastName(last_name);
                setTokens(tokens);
                setAvatar(avatar);
            } else {
                console.error('No profile found');
            }
        };
        if (user) fetchData();
    }, [user]);

    const changeFirstName = (text: string) => {
        setFirstName(text)
        const updateDatabase = async () => {
            const { data: data, error: error } = await supabase.from('account').update({ first_name: text }).eq('uuid', user?.id);
            if (error) {
                console.error(error);
            }
        }
        updateDatabase();
    }
    const changeLastName = (text: string) => {
        setLastName(text) 
        const updateDatabase = async () => {
            const { data: data, error: error } = await supabase.from('account').update({ last_name: text }).eq('uuid', user?.id);
            if (error) {
                console.error(error);
            }
        }
        updateDatabase();
    }

    const contextObject = {
        uuid,
        bio,
        created_at,
        last_joined,
        setFirstName, setLastName,
        changeFirstName, changeLastName,
        first_name,
        last_name,
        tokens,
        avatar
    };

    return (
        <ProfileContext.Provider value={contextObject}>
            {props.children}
        </ProfileContext.Provider>
    );
}