"use client"

import { useContext, useState, useEffect, createContext, useRef } from 'react';
import { AuthChangeEvent, Session, SupabaseClient, User } from '@supabase/supabase-js';
import { createClient } from '../supabase/client';
import Index from '@/app/page';
import { redirect, useRouter } from 'next/navigation';
import { Tables } from '../supabase/database.types';
import { toast } from "react-toastify";

interface SessionContextProps {
    user: User | null;
    session: Session | null;
    supabase: SupabaseClient
    loading: boolean;
    login: (email: any, password: any) => void;
    signup: (email: any, password: any) => void;
    logout: () => void;
    readRSVP: () => Promise<number>;
    insertRSVP: (email: string) => Promise<string>;
    rsvpCount: number;
}


const SessionContext = createContext<SessionContextProps>({
    user: null,
    session: null,
    supabase: createClient(),
    loading: false,
    login: () => {}, 
    signup: () => {}, 
    logout: () => {},
    readRSVP: () => Promise.resolve(0),
    insertRSVP: () => Promise.resolve(""),
    rsvpCount: 0
});
//TO DO LATER: Create a promise state that handles the loading of the user, account, and projects. When finished should be used
export const SessionProvider = ({ children }: any) => {
    const [user, setUser] = useState<any>();
    const [session, setSession] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [rsvpCount, setRSVPCount] = useState<number>(0);

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

    //rsvp realtime
    useEffect(() => {
        const handleInserts = (payload: any) => {
            setRSVPCount(payload.length);
            console.log(payload)
            console.log(payload.length)
        }
        const rsvp = supabase.channel('rsvp-1')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'rsvp' }, handleInserts)
            .subscribe()

        readRSVP().then((count) => setRSVPCount(count))

        return () => {
            supabase.removeChannel(rsvp);
        }
    }, [supabase, rsvpCount, setRSVPCount])

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

    const insertRSVP = async (email: string) => {
        const { data, error } = await supabase.from("rsvp").insert([{ email }]);
        if (error) {
            return error.message
        } else {
            return "Registered successfully!"
        }
    };
    
    const readRSVP = async () => {
        const { error, count } = await supabase
            .from("rsvp")
            .select("*", { count: "exact" });

        if (error || count == null) {
            return 0;
        } 

        return count
    };

    const contextObject = {
        user,
        session,
        supabase,
        loading,
        login, signup, logout,
        readRSVP, insertRSVP, rsvpCount
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