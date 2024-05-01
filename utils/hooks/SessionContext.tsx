"use client"

import { useContext, useState, useEffect, createContext, useRef } from 'react';
import { AuthChangeEvent, Session, SupabaseClient, User } from '@supabase/supabase-js';
import { createClient } from '../supabase/client';
import Index from '@/app/page';
import { redirect, useRouter } from 'next/navigation';
import { Tables } from '../supabase/database.types';

interface SessionContextProps {
    user: User | null;
    session: Session | null;
    supabase: SupabaseClient
    loading: boolean;
    login: (email: any, password: any) => void;
    signup: (email: any, password: any) => void;
    logout: () => void;
}


const SessionContext = createContext<SessionContextProps>({
    user: null,
    session: null,
    supabase: createClient(),
    loading: false,
    login: () => {}, 
    signup: () => {}, 
    logout: () => {}
});
//TO DO LATER: Create a promise state that handles the loading of the user, account, and projects. When finished should be used
export const SessionProvider = ({ children }: any) => {
    const [user, setUser] = useState<any>();
    const [session, setSession] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const supabase = useContext(SessionContext).supabase;
    const router = useRouter()

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

    //for authentication
    useEffect(() => {
        const requestSession = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) throw error;
            if(session) {
                setSession(session);
                setUser(session?.user);
            }
        };
        const { data: listener } = onAuthStateChange(async(event : any, newSession: any) => {
            if (newSession) {
                setSession(newSession);
                setUser(newSession?.user);            
            }
        });

        requestSession();
        return () => {
            listener?.subscription.unsubscribe();
        };
    }, [supabase]);

    const login = async (email: any, password: any) => {
        setLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
            setLoading(false)
          return redirect("/login?message=Could not authenticate user");
        }
        if (data.user?.id) {
            setUser(data.user);
            setSession(data.session);
        }
        setLoading(false);
        return redirect("/");
    };
    
    const signup = async (email: any, password: any) => {
        setLoading(true);
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
            emailRedirectTo: `/auth/callback`,
            },
        });
        if (error) {
            setLoading(false);
            return redirect("/login?message=Could not authenticate user");
        }
        setLoading(false);
        return redirect("/login?message=Check email to continue sign in process");
    };

    const logout = () => {
        supabase.auth.signOut()
        setSession(null);
        setUser(null);
        router.push("/login");
    }

    const contextObject = {
        user,
        session,
        supabase,
        loading,
        login, signup, logout
    };
    return (<SessionContext.Provider value={contextObject}>
        {children}
    </SessionContext.Provider>);
};

export const useSession = () => useContext(SessionContext);


export function useSupabaseClient() {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error( 'useSupabaseClient must be used within a SessionContext provider.');
    }
    return context.supabase;
}