"use client"

import { useContext, useState, useEffect, createContext } from 'react';
import { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import { createClient } from '../supabase/client';

const SessionContext = createContext({
  user: null,
  session: null,
  supabase: {},
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
            }
        };
        const { data: listener } = onAuthStateChange(async(event : any, newSession: any) => {
            if (session) {
                //useMemo to compare old and new Data to avoid unecessary loading
                setSession(newSession);
                setUser(newSession?.user);            
                setLoading(false);
            }
        });

        requestSession();

        return () => {
            listener?.subscription.unsubscribe();
        };
    }, []);

    const contextObject = {
        user,
        session,
        supabase,
    };
    return (<SessionContext.Provider value={contextObject}>
        {!loading ? children : null}
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