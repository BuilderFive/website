"use client"
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '~/util/supabaseClient';

export type Group = {
    uuid: string
    created_at: string
    goal: string
    max_members: number
    status: string
}

export type Member = {
    email: string
    created_at: string
    group_uuid: string
}

export type PackagedGroup = {
    group: Group
    members: Member[]
}

interface GroupContextState {
    packagedGroups: PackagedGroup[];
    groups: Group[];
    members: Member[];
    loadingEnqueue: boolean;
    fetchData: () => void;
    enqueueMember: (email: string, group: Group) => Promise<Member | Error | null>;
    activateGroup: (group: PackagedGroup) => Promise<Group | null>;
    CreateGroup: (goal: string) => Promise<Group | null>;
    fetchPackagedGroups: (groups: Group[], members: Member[]) => void;
    determineAction: (packagedGroup: PackagedGroup, email: string) => void;
    cacheNewMember: (member: Member) => void;
    cacheGroup: (group: Group) => void;
    cachePackagedGroup: (packagedGroup: PackagedGroup) => void;
}

// Create the context
export const GroupContext = createContext<GroupContextState | undefined>(undefined);

export const useGroupContext = () => {
    const context = React.useContext(GroupContext);
    if (context === undefined) {
        throw new Error('useGroupContext must be used within a GroupContextProvider');
    }
    return context;
}

export const GroupContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [packagedGroups, setPackagedGroups] = useState<PackagedGroup[]>([]);
    const [groups, setGroups] = useState<Group[]>([]);
    const [members, setMembers] = useState<Member[]>([]);
    const [loadingEnqueue, setLoadingEnqueue] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        try {
            const [groups, members] = await Promise.all([fetchAllGroups(), fetchAllMembers()]);
            if (groups && members) {
                const packagedGroups = fetchPackagedGroups(groups, members);
                setPackagedGroups(packagedGroups);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    const fetchAllGroups = async (): Promise<Group[] | null> => {
        try {
            const { data, error } = await supabase.from('groups').select('*');
            if (error) {
                throw new Error(`Error fetching groups: ${error.message}`);
            }
            setGroups(data);
            return data as Group[];
        } catch (error) {
            console.error(error);
            return null;
        }
    };
    
    const fetchAllMembers = async (): Promise<Member[] | null> => {
        try {
            const { data, error } = await supabase.from('group_members').select('*');
            if (error) {
                throw new Error(`Error fetching members: ${error.message}`);
            }
            setMembers(data);
            return data as Member[];
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const fetchPackagedGroups = (groups: Group[], members: Member[]) => {
        const packagedGroups: PackagedGroup[] = [];

        groups.forEach((group) => {
            const matchedMembers = members.filter((member) => member.group_uuid === group.uuid);
            const packagedGroup: PackagedGroup = {
                group,
                members: matchedMembers,
            };
            packagedGroups.push(packagedGroup);
        });

        return packagedGroups
    };

    const cacheMember = (member: Member) => {
        setMembers([...members, member]);
    };
    const cacheGroup = (group: Group) => {
        setGroups([...groups, group]);
    };

    const cachePackagedGroup = (packagedGroup: PackagedGroup) => {
        setPackagedGroups([...packagedGroups, packagedGroup]);
    };
    
    const determineAction = async(packagedGroup: PackagedGroup, email) => {
        if (packagedGroup.members.some(member => member.email === email) || loadingEnqueue) return;
                    
        const member = await enqueueMember(email, packagedGroup.group)
        if (member == null || member instanceof Error) return
        let newGroups = groups

        if (packagedGroup.members.length >= packagedGroup.group.max_members-1) {
            const activatedGroup = await activateGroup(packagedGroup)
            if (activatedGroup == null) return
            newGroups = groups.map((g) => {
                if (g.uuid === packagedGroup.group.uuid) {
                    return activatedGroup;
                }
                return g;
        })}

        setGroups(newGroups);
        setMembers([...members, member]);
        fetchPackagedGroups(newGroups, [...members, member])
    }
    const enqueueMember = async(email: string, group: Group): Promise<Member | Error | null> => {
        if (email == '' || group == null) {
            return Error('Email or group is invalid')
        }
        if (group.status != "QUEUE") {
            return Error('Email not queueable')
        }
        setLoadingEnqueue(true)

        const addGroupMember = async(): Promise<Member | null> => {
            const {data, error} = await supabase
                .from('group_members')
                .insert([{ email: email, group_uuid: group.uuid}]).select()
                .single();
            if (error) {
                console.error('Error adding group member', error);
                setLoadingEnqueue(false)
                return null
            }
            return data as Member
        }
        const newMember = await addGroupMember() //this is you
        setLoadingEnqueue(false)
        return newMember
    }
    const activateGroup = async(group: PackagedGroup): Promise<Group|null> => {        
        const { data, error } = await supabase
            .from('groups')
            .update([{ status: 'ACTIVE' }]).eq('uuid', group.group.uuid)
            .select()
            .single();
    
        if (error) {
            console.error('Error updating group:', error.message);
            return null
        }

        fetch('../api/email/', {
            method: 'POST',
            body: JSON.stringify({
                members: group.members, 
                goal: group.group.goal})
        })

        //should send a notification to all members

        return data as Group
    }

    async function CreateGroup(goal: string): Promise<Group | null> {
        const { data, error } = await supabase
            .from('groups')
            .insert([{ goal: goal, status: 'QUEUE' }]).select('*')
            .single();
    
        if (error) {
            console.error('Error creating group:', error.message);
            return null
        }
        const newGroup: Group = data

        return newGroup
    }

    // Add any necessary functions to update the state here

    // Provide the state and any necessary functions to the children components

    const contextValue = {
        packagedGroups,
        groups,
        members,
        loadingEnqueue,
        fetchData,
        enqueueMember,
        activateGroup,
        CreateGroup,
        fetchPackagedGroups,
        determineAction, cacheGroup, cacheNewMember: cacheMember, cachePackagedGroup
    };
    return (
        <GroupContext.Provider value={contextValue}>
            {children}
        </GroupContext.Provider>
    );
};