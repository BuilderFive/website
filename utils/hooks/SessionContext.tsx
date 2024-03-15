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
    projects: Tables<'project'>[];
    saveProject: (project: any) => void;
    createProject: (name: string) => void;
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
    profile: {  
        account: {
            bio: '',
            created_at: '',
            display_name: '',
            last_joined: '',
            username: '',
            uuid: '',
        }, 
        saveAccount: () => {},
        projects: [{
            created_at: '',
            is_public: true,
            name: '',
            image: '',
            uuid: '',
        }],
        saveProject: () => {},
        createProject: () => {},
        //saveProject: () => {},
    } // Fix: Update the account property to null
});

export const SessionProvider = ({ children }: any) => {
    const [user, setUser] = useState<any>();
    const [session, setSession] = useState<any>();
    const [isLoading, setLoading] = useState(true);
    const [account, setAccount] = useState<ProfileContextProps["account"] | any>();
    const [projects, setProjects] = useState<ProfileContextProps["projects"] | any>();

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
        //go to teammates table, query all project uuid with matching account
        // uuid, get all projects from project table
        const requestProject = async () => {
            if (!user) return;

            const fetchProject_UUIDS = async () => {
                const { data, error } = await supabase
                    .from('teammates')
                    .select('project_uuid')
                    .eq('account_uuid', user.id);
                if (error) throw error;
                return data;
            }
            const fetchProject = async () => {
                const uuids = await fetchProject_UUIDS();
                const { data, error } = await supabase
                    .from('project')
                    .select('*')
                    .in('uuid', uuids.map((uuid: any) => uuid.project_uuid));
                if (error) throw error;
                setProjects(data);
            }
            fetchProject()
            //setAccount(data);
        }
        requestAccount()
        requestProject()
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


    //for editing projects
    const saveProject = async (projectData: ProfileContextProps['projects']) => {
        if (!user) return redirect("/login") //unauthenticated can not access save account

        //this needs some work
        //project is not a single object, it is an array of objects
        const newData = { ...projects, ...projectData }
        const { error } = await supabase.from('project').update(newData);
        if (error) {
            throw error;
        }
        setProjects(newData);
    }

    const createProject = async (name: string) => {
        if (!user) return redirect("/login") //unauthenticated can not access save account

        const insertProject = async(name: string) => {
            //can add more fields to insert query later
            const { data, error } = await supabase.from('project').insert({ name }).select().single();
            if (error) {
                throw error;
            }
            return data;
        }
        const insertTeammates = async(project_uuid: string) => {
            //can add more fields to insert query later
            const { data, error } = await supabase.from('teammates').insert({ project_uuid, account_uuid: user.id });
            if (error) {
                throw error;
            }
            return data
        }
        const newProject = () => insertProject(name)
            .then((data) => {
                if (data) {
                    insertTeammates(data.uuid)
                    setProjects([...projects, data]);
                } else {
                    console.log('wah wah')
                }
            })
        newProject()
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
        profile: { account, saveAccount, projects, saveProject, createProject}
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