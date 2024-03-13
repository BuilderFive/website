"use client"

import { useContext, useState, useEffect, createContext } from 'react';
import { AuthChangeEvent, Session, SupabaseClient, User } from '@supabase/supabase-js';
import { createClient } from '../supabase/client';

interface SessionContextProps {
    user: User | null;
    session: Session | null;
    supabase: SupabaseClient | null;
}

const SessionContext = createContext<SessionContextProps>({
  user: null,
  session: null,
  supabase: null,
});

export const SessionProvider = ({ children, supabase }: any) => {
    const [user, setUser] = useState<any>();
    const [session, setSession] = useState<any>();
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        const requestSession = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) throw error;
            //re rendering too much is due to getting profile
            if(session) {
                setSession(session);
                setUser(session?.user);
                setLoading(false);
                console.log(session)
            }
        };
        const { data: listener } = onAuthStateChange(async(event : any, newSession: any) => {
            console.log(event)
            if (newSession) {
                //useMemo to compare old and new Data to avoid unecessary loading
                setSession(newSession);
                setUser(newSession?.user);            
                setLoading(false);
                console.log(session)
            }
        });
        requestSession();
        return () => {
            listener?.subscription.unsubscribe();
        };
    }, [supabase]);

    const contextObject = {
        user,
        session,
        supabase,
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