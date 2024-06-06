"use client"

import React, { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { supabase } from './supabaseClient';
import { User, Session, SupabaseClient, createClient, AuthChangeEvent } from '@supabase/supabase-js';
import { Tables } from './supabase-types';
import {v4 as uuidv4} from 'uuid';
import { useRouter } from 'next/router';

interface SessionContextProps {
    user: User | null;
    session: Session | null;
    supabase: SupabaseClient
    isLoading: boolean;
    isInvited: boolean;
    signout: () => void;
}

const SessionContext = createContext<SessionContextProps>({
    user: null,
    session: null,
    supabase: supabase,
    isLoading: false,
    isInvited: false,
    signout: () => {}
});

export const useSession = () => useContext(SessionContext);


export function useSupabaseClient() {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error( 'useSupabaseClient must be used within a SessionContext provider.');
    }
    return context.supabase;
}

/**
 * For all things that the auth needs to validate a user to use the app
 * Ensures a session is found before getting variables needed
 * @param props 
 * @returns 
 */
export function SessionProvider(props: React.PropsWithChildren) {
    const [session, setSession] = useState<any>(null);
    const [user, setUser] = useState<any>(null);
    const supabase = useContext(SessionContext).supabase;

    const [isInvited, setIsInvited] = useState<boolean>(false);

    const [isLoading, setLoading] = useState<boolean>(true);

    //this will not reset until the app reloads
    const loadStack = {
        sessionLoaded: useRef(false),
        inviteLoaded: useRef(false),
    };
    const checkLoadedState = () => {
        const allLoaded = Object.values(loadStack).every(ref => ref.current);
        setLoading(!allLoaded);
    };

    /**
     * To prevent updating duplicate sessions
     * @param callback 
     * @returns 
     */
    function onAuthStateChange(callback: (event : AuthChangeEvent, session: Session) => void) {
        let currentSession: Session | null;
        return supabase.auth.onAuthStateChange((event: any, session: any) => {
            if (session?.user?.id == currentSession?.user?.id) return;
            currentSession = session;
            callback(event, session);
        });
    }

    /**
     * When supabase updates, request for the supabase session and replace the current session
     */
    useEffect(() => {
        const requestSession = async () => {
            const { data: { session }, error } = await supabase.auth.getSession()
            loadStack.sessionLoaded.current = true;
            checkLoadedState();
            if (error) throw error;

            if(session) {
                setSession(session);
                setUser(session?.user);
            }
        };
        const { data: listener } = onAuthStateChange(async(event : any, newSession: any) => {
            console.log(event)
            if (newSession?.user?.id !== session?.user?.id) {
                setSession(newSession);
                setUser(newSession?.user);     
            }
        });
        requestSession();

        return () => {
            listener?.subscription.unsubscribe();
        };
    }, [supabase]);

    useEffect(() => {
        // issue where when user signs in it will 
        const fetchData = async () => {
            try {
                await fetchInvited()
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (user) {
            fetchData();
        }

        
        setTimeout(() => {
            loadStack.inviteLoaded.current = true;
            checkLoadedState();
        }, 1000);
    }, [user]);

    const signout = async () => {

        supabase.auth.signOut()
        setSession(null);
        setUser(null);
    }

    const fetchInvited = async () => {

        const { data, error } = await supabase.from('invite_code').select('*').eq('recipient_id', user.id).single()
        
        if (error) {
            throw error;
        }

        if (!data.recipient_id) {
            return false
        }

        setIsInvited(true)
        return true
    }
    

    const contextObject = {
        user,
        session,
        supabase,
        isLoading,
        isInvited,
        signout
    };

    return (
        <SessionContext.Provider value={contextObject}>
            {props.children}
        </SessionContext.Provider>
    );
}