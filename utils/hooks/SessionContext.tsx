"use client"

import { useContext, useState, useEffect, createContext } from 'react';
import { AuthChangeEvent, Session, SupabaseClient, User } from '@supabase/supabase-js';
import { createClient } from '../supabase/client';
import Index from '@/app/page';
import { redirect, useRouter } from 'next/navigation';
import { Tables } from '../supabase/database.types';

interface ProfileContextProps {
    account: Tables<'account'>;
    saveAccount: (account: any) => void;
    //project
    //sessions
    //notes
    //location
    //teammates
}
interface SessionContextProps {
    user: User | null;
    session: Session | null;
    supabase: SupabaseClient
    isLoading: boolean;
    login: (email: any, password: any) => void;
    signup: (email: any, password: any) => void;
    logout: () => void;
    profile: ProfileContextProps;
}


const SessionContext = createContext<SessionContextProps>({
    user: null,
    session: null,
    supabase: createClient(),
    isLoading: true,
    login: () => {}, 
    signup: () => {}, 
    logout: () => {},
    profile: {  account: {
        bio: '',
        created_at: '',
        display_name: '',
        last_joined: '',
        username: '',
        uuid: '',
    }, saveAccount: () => {} } // Fix: Update the account property to null
});

export const SessionProvider = ({ children }: any) => {
    const [user, setUser] = useState<any>();
    const [session, setSession] = useState<any>();
    const [isLoading, setLoading] = useState(true);
    const [account, setAccount] = useState<ProfileContextProps["account"] | any>();

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
            //re rendering too much is due to getting profile
            if(session) {
                setSession(session);
                setUser(session?.user);
                setLoading(false);
            }
        };
        const { data: listener } = onAuthStateChange(async(event : any, newSession: any) => {
            console.log(event)
            if (newSession) {
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
    }, [supabase]);

    //for profile changing
    useEffect(() => {
        const requestAccount = async () => {
            if (!user) return;

            const { data, error } = await supabase.from('account').select('*').eq('uuid', user.id).single(); //because of RLS, should only return the user's row
            if (error) throw error;
            setAccount(data);
        }
        requestAccount()
    }, [user]);

    /**
     * For any consumer profile to make a change to the profiles in the database
     * @param profile 
     */
    const saveAccount = async (accountData: ProfileContextProps['account']) => {
        if (!user) return redirect("/login") //unauthenticated can not access save account

        const newData = { ...account, ...accountData }
        const { error } = await supabase.from('account').update(newData).eq('uuid', newData.uuid);
        if (error) {
            throw error;
        }
        setAccount(newData);
    }

    const login = async (email: any, password: any) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          return redirect("/login?message=Could not authenticate user");
        }
        if (data.user?.id) {
            setUser(data.user);
            setSession(data.session);
        }

        return redirect("/");
    };
    
    const signup = async (email: any, password: any) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
            emailRedirectTo: `/auth/callback`,
            },
        });
        if (error) {
            return redirect("/login?message=Could not authenticate user");
        }
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
        isLoading,
        login, signup, logout,
        profile: { account, saveAccount}
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