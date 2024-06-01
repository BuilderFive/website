import React, { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { supabase } from './supabaseClient';
import { User, Session, SupabaseClient, createClient, AuthChangeEvent } from '@supabase/supabase-js';
import { Tables } from './supabase-types';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import { useRouter } from 'next/router';

interface SessionContextProps {
    user: User | null;
    session: Session | null;
    supabase: SupabaseClient
    isLoading: boolean;
    isInvited: boolean;
    projects: Tables<'project'>[];
    createProject: (name: string, description: string) => void;
    signout: () => void;
}

const SessionContext = createContext<SessionContextProps>({
    user: null,
    session: null,
    supabase: supabase,
    isLoading: false,
    isInvited: false,
    projects: [],
    createProject: () => {},
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

    const [projects, setProjects] = useState<Tables<'project'>[]>([]);
    const [isInvited, setIsInvited] = useState<boolean>(false);

    const [isLoading, setLoading] = useState<boolean>(true);

    const router = useRouter()

    //this will not reset until the app reloads
    const loadStack = {
        sessionLoaded: useRef(false),
        inviteLoaded: useRef(false),
        projectsLoaded: useRef(false),
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
                await fetchProjects()
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (user) {
            fetchData();
        }

        
        setTimeout(() => {
            loadStack.inviteLoaded.current = true;
            loadStack.projectsLoaded.current = true;
            checkLoadedState();
        }, 1000);
    }, [user]);

    const signout = async () => {

        supabase.auth.signOut()
        setSession(null);
        setUser(null);
    }


    /* Fetch Project */
    const fetchProjects = async () => {

        const { data, error } = await supabase.from('project').select('*').eq('owner_uuid', user.id)
        
        
        if (error) {
            throw error;
        }

        if (!data || data.length == 0) {
            return false
        }
        
        setProjects(data);
        return true
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

    const createProject = async (name: string, description: string) => {
        type BareProject = {
            name: string,
            description: string,
            owner_uuid: string
        }
        const project: BareProject = {
            name: name,
            description: description,
            owner_uuid: user.id
        };

        const addProject = async(newProject: BareProject) => {
            const { data, error } = await supabase.from('project').insert(newProject).select().single();
            
            if (error) {
                throw error;
            }

            setProjects([...projects, data]);
        }

        await addProject(project);
    }
    

    const contextObject = {
        user,
        session,
        supabase,
        isLoading,
        isInvited,
        projects,
        createProject,
        signout
    };

    return (
        <SessionContext.Provider value={contextObject}>
            {props.children}
        </SessionContext.Provider>
    );
}