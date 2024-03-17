"use client"

import { useContext, useState, useEffect, createContext, useRef } from 'react';
import { AuthChangeEvent, Session, SupabaseClient, User } from '@supabase/supabase-js';
import { createClient } from '../supabase/client';
import Index from '@/app/page';
import { redirect, useRouter } from 'next/navigation';
import { Tables } from '../supabase/database.types';

export type PackagedProjectProps = Tables<'project'> & { notes: Tables<'notes'>[] };

interface ProfileContextProps {
    account: Tables<'account'>;
    saveAccount: (account: any) => void;
    projects: PackagedProjectProps[]
    saveProject: (project: any) => void;
    createProject: (name: string) => void;
    createNote: (title: string, thought: string, project_uuid: string) => void;
    getProject: (uuid: string) => PackagedProjectProps;
    updatePackagedProjects: (projectData: PackagedProjectProps) => void;
    deleteProject: (uuid: string) => void;
    //sessions
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
            notes: [{
                created_at: '',
                project_uuid: '',
                thought: '',
                title: '',
                uuid: '',
            }],
        }],
        saveProject: () => {},
        createProject: () => {},
        createNote: () => {},
        getProject: () => {
            return {
                created_at: '',
                is_public: true,
                name: '',
                image: '',
                uuid: '',
                notes: [{
                    created_at: '',
                    project_uuid: '',
                    thought: '',
                    title: '',
                    uuid: '',
                }],
            }
        },
        updatePackagedProjects: () => {},
        deleteProject: () => {},

    }
});

export const SessionProvider = ({ children }: any) => {
    const [user, setUser] = useState<any>();
    const [session, setSession] = useState<any>();
    const [isLoading, setLoading] = useState(true);
    const [account, setAccount] = useState<ProfileContextProps["account"] | any>(undefined);
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

            try {
                const { data, error } = await supabase.from('account').select('*').eq('uuid', user.id).single(); //because of RLS, should only return the user's row
                if (error) {
                    throw error;
                } else {
                    setAccount(data);
                }
            } catch (error) {
                
            }
        }
        //go to teammates table, query all project uuid with matching account
        // uuid, get all projects from project table
        const requestProjects = async () => {
            if (!user) return;

            const fetchProject_UUIDS = async () => {
                const { data, error } = await supabase
                    .from('teammates')
                    .select('project_uuid')
                    .eq('account_uuid', user.id);
                if (error) throw error;
                return data;
            }

            /**
             * 
             * @param uuids 
             * @returns all projects owned by user
             */
            const fetchProject = async (uuids: { project_uuid: any; }[]) => {
                const { data, error } = await supabase
                    .from('project')
                    .select('*')
                    .in('uuid', uuids.map((uuid: any) => uuid.project_uuid));
                if (error) throw error;
                return data;
            }

            /**
             * 
             * @param uuids 
             * @returns all notes owned by user
             */
            const fetchNotes = async (uuids: { project_uuid: any; }[]) => {
                const { data, error } = await supabase
                    .from('notes')
                    .select('*')
                    .in('project_uuid', uuids.map((uuid: any) => uuid.project_uuid));
                if (error) throw error;
                return data;
            }
            
            //create helper function to package notes as an object under project objects
            const packageNotes = (projects: any, notes: any) => {
                const packagedProjects = projects.map((project: { uuid: string; }) => {
                    const projectNotes = notes.filter((note: { project_uuid: string; }) => note.project_uuid === project.uuid);
                    return {
                        ...project,
                        notes: projectNotes,
                    };
                });
                return packagedProjects;
            };

            const uuids = await fetchProject_UUIDS();

            //fetch data for all user's projects and notes
            const projects = await fetchProject(uuids);
            const notes = await fetchNotes(uuids);
            //package them into an array of objects
            const packagedProjects = packageNotes(projects, notes);
            setProjects(packagedProjects);
        }
        requestAccount()
        requestProjects()
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

    /**
     * This function is to package the projects and notes objects into one object
     * @param projectData 
     */
    const updatePackagedProjects = async (projectData: PackagedProjectProps) => {

        const updatedProjects = projects.map((project: any) => {
            if (project.uuid === projectData.uuid) {
                
                return {
                    ...project,
                    ...projectData
                };
            }
            return project;
        });
        setProjects(updatedProjects);
    };

    //for editing projects
    const saveProject = async (projectData: PackagedProjectProps) => {
        if (!user) return redirect("/login"); // unauthenticated can not access save account
        //removes the notes objects in order to save the project
        const updatedProject = (project: PackagedProjectProps) => {
            const { notes, ...restProject } = project;
            console.log(restProject) // Remove the spread operator before restProject
            return restProject;
        }
        
        /* removes all notes from all projects
        const updatedProjects = projects.map((project: any) => {
            const { notes, ...restProject } = project;

            if (project.uuid === projectData.uuid) {
                const { notes: projectDataNotes, ...restProjectData } = projectData; // Optionally remove notes from projectData if it exists
                return {
                    ...restProject,
                    ...restProjectData
                };
            }
            return project;
        });*/
        const input = updatedProject(projectData)
        const { data, error } = await supabase.from('project').update(input).eq('uuid', input.uuid).select();
        if (error) {
            throw error;
        }
        return data
    };

    const getProject = (uuid: string) => {
        return projects.find((project: any) => project.uuid === uuid);
    };

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

                    //so to add the notes object to the new project object
                    const addedNotesObj = {
                        ...data,
                        notes: []
                    };
                    setProjects([...projects, addedNotesObj]);
                } else {
                    console.log('wah wah')
                }
            })
        newProject()
    }

    const deleteProject = async (uuid: string) => {
        if (!user) return redirect("/login"); // unauthenticated can not access delete project

        // Delete project from the database
        const { data, error } = await supabase.from('project').delete().eq('uuid', uuid).select();
        if (error) {
            throw error;
        }

        // Remove project from the projects state
        const updatedProjects = projects.filter((project: any) => project.uuid !== uuid);
        setProjects(updatedProjects);
    };

    const createNote = async (title: string, thought: string, project_uuid: string) => {
        if (!user) return redirect("/login") //unauthenticated can not access save account

        //can add more fields to insert query later
        const { data, error } = await supabase.from('notes').insert({ title, thought, project_uuid }).select().single();
        if (error) {
            throw error;
        }
        //need to add a part to save the new project data to the state
        const currentProject = getProject(project_uuid)
        const newData: PackagedProjectProps = {
            ...currentProject,
            notes: [...currentProject.notes, data]
        };

        //updatePackagedProjects(newData); //this updates projects when a new note is made
        //^ bad if we don't want to rerender child components dependent on a parent who uses projects
        return data as Tables<'notes'>;
    };

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
        profile: { account, saveAccount, projects, saveProject, deleteProject, createProject, createNote, getProject, updatePackagedProjects }
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