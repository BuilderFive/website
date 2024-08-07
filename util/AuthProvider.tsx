"use client"

import React, { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { supabase } from './supabaseClient';
import { User, Session, SupabaseClient, createClient, AuthChangeEvent } from '@supabase/supabase-js';
import { Tables } from './supabase-types';
import {v4 as uuidv4} from 'uuid';
import { useRouter } from 'next/router';

export interface Event {
    start_at: Date;
    end_at: Date;
    isActive: boolean;
}
interface SessionContextProps {
    user: User | null;
    session: Session | null;
    supabase: SupabaseClient
    isLoading: boolean;
    isInvited: boolean;
    signout: () => void;
    event: Event | null;
    handleSignInWithGoogleOTP: (response: any) => void;
    handleSignInWithGoogle: () => void; 
}

const SessionContext = createContext<SessionContextProps>({
    user: null,
    session: null,
    supabase: supabase,
    isLoading: false,
    isInvited: false,
    signout: () => {},
    event: null,
    handleSignInWithGoogleOTP: () => {},
    handleSignInWithGoogle: () => {}
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
    const [event, setEvent] = useState<Event | null>(null);
    const [isInvited, setIsInvited] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(true);
    
    //get/set the user's avatar
    //use avatar in footer loading and header account

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
    function onAuthStateChange(callback: (event: AuthChangeEvent, session: Session) => void) {
        let currentSession: Session | null = null;
        const { data: authListener } = supabase.auth.onAuthStateChange((event: any, session: any) => {
            if (session?.user?.id === currentSession?.user?.id) return;
            currentSession = session;
            callback(event, session);
        });

        return authListener;
    }

    /**
     * Updates the last_joined field in the account table to the current date and time.
     */
    const updateLastJoined = async (uuid: string) => {
        try {
            const { data, error } = await supabase
                .from('account')
                .update({ last_joined: new Date() })
                .eq('uuid', uuid);
            if (error) {
                throw error;
            }
        } catch (error) {
            console.error('Error updating last joined:', error);
        }
    };

    useEffect(() => {
        if (user) {
            updateLastJoined(user.id);
        }
    },[user]);

    useEffect(() => {
        const getCurrentOrNextEvent = (events: Tables<'events'>[]) => {
            const now = new Date();
            
            let currentEvent: Event | null  = null;
            let nextEvent: Event | null  = null;
        
            events.forEach(event => {
                const startAt = new Date(event.start_at);
                const endAt = new Date(event.end_at);
        
                if (startAt <= now && endAt >= now) {
                    currentEvent = {
                        start_at: startAt,
                        end_at: endAt,
                        isActive: true
                    };
                } else if (startAt > now && (!nextEvent || startAt < new Date(nextEvent.start_at))) {
                    nextEvent = {
                        start_at: startAt,
                        end_at: endAt,
                        isActive: false
                    };
                }
            });
        
            return currentEvent || nextEvent;
        };
        const fetchEvents = async () => {
            try {
                const { data, error } = await supabase.from('events').select('*');
                if (error) {
                    throw error;
                }

                if (data.length == 0) return

                const chosenEvent = getCurrentOrNextEvent(data);
                setEvent(chosenEvent);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    /**
     * When supabase updates, request for the supabase session and replace the current session
     */
    useEffect(() => {
        const requestSession = async () => {
            try{
                const { data: { session }, error } = await supabase.auth.getSession()
                loadStack.sessionLoaded.current = true;
                checkLoadedState();
                if (error) throw error;

                if(session) {
                    setSession(session);
                    setUser(session?.user);
                }
            } catch(error) {
                console.error('Error getting session:', error);
            }
        };
        const handleAuthChange = async (event, newSession) => {
            try {
                loadStack.sessionLoaded.current = true;
                checkLoadedState();
    
                if (newSession?.user?.id !== session?.user?.id) {
                    setSession(newSession);
                    setUser(newSession.user);
                }
            } catch (error) {
                console.error('Error in auth state change:', error);
            }
        };
        const { subscription: listener } = onAuthStateChange(handleAuthChange);
        
        requestSession();

        return () => {
            listener?.unsubscribe();
        };
    }, [supabase]);

    useEffect(() => {
        const fetchData = async () => {
            const isInvited = await fetchInvited()
            loadStack.inviteLoaded.current = true
            checkLoadedState();
            setIsInvited(isInvited)
        };
        if (user) fetchData();
    }, [user]);

    const signout = async () => {

        supabase.auth.signOut()
        setSession(null);
        setUser(null);
    }

    const fetchInvited = async () => {
        const { data, error } = await supabase.from('invite_code').select('*').eq('recipient_id', user.id)
        if (error) {
            throw error;
        }
        if (!data || data.length == 0) {
            return false
        }
        return true
    }
    
    async function handleSignInWithGoogleOTP(response: any) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: response.credential,
        })
    }
    const handleSignInWithGoogle = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                }, redirectTo: process.env.NODE_ENV === 'development' ? "http://localhost:3000/connect" : "builderfive.com/connect" 
            },
          })
        if (error) {
            console.error('Error signing in with Google:', error);
        }
    }

    const contextObject = {
        user,
        session,
        supabase,
        isLoading,
        isInvited, handleSignInWithGoogleOTP,
        handleSignInWithGoogle,
        signout, event
    };

    return (
        <SessionContext.Provider value={contextObject}>
            {props.children}
        </SessionContext.Provider>
    );
}