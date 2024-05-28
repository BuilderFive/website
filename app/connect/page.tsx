"use client"

import { mdiLoading, mdiCheck, mdiClose } from "@mdi/js";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { RealtimeChannel } from "@supabase/supabase-js";
import Image from "next/image";
import { ReactNode, useState, useRef, useEffect, useContext, act } from "react";
import { Button } from "~/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { MdiIcon } from "~/util";
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
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//TODO Delete group if 7 days is left
export default function Connect() {
    const [email, setEmail] = useState('');
    const [emailSubmitted, setEmailSubmitted] = useState(false);

    const [goal, setGoal] = useState('')

    const [loading, setLoading] = useState(false);
    const [loadingEnqueue, setLoadingEnqueue] = useState(false);

    const [packagedGroups, setPackagedGroups] = useState<PackagedGroup[]>([]);
    const [groups, setGroups] = useState<Group[]>([]);
    const [members, setMembers] = useState<Member[]>([]);
    
    useEffect(() => {
        async function fetchEmail() {
            const storedEmail = localStorage.getItem('email');
            if (storedEmail) {
                setEmail(storedEmail);
                setEmailSubmitted(true);
            }
        }
        fetchData()
        fetchEmail()
    })
    
    async function fetchData() {
        const fetchedGroups = await fetchAllGroups();
        const fetchedMembers = await fetchAllMembers();
        if (fetchedGroups && fetchedMembers) {
            const fetchedPackagedGroups = await fetchPackagedGroups(fetchedGroups, fetchedMembers);
        }
    }
    const fetchAllGroups = async (): Promise<Group[] | null> => {
        const { data, error } = await supabase.from('MVP_group').select('*');
        if (error) {
            console.log('Error fetching groups:', error.message);
            return null
        }
        setGroups(data)
        return data as Group[];
    }
    const fetchAllMembers = async (): Promise<Member[] | null> => {
        const { data, error } = await supabase.from('MVP_members').select('*');
        if (error) {
            console.error('Error fetching members:', error.message);
            return null;
        }
        setMembers(data)
        return data as Member[];
    }
    const handleSubmit = async () => {
        if (!EMAIL_REGEX.test(email)) return;
        setLoading(true);
        const { data, error } = await supabase
            .from("rsvp")
            .upsert([{ email: email }]);
        setLoading(false)
        if (error) {
            setEmail('')
            return alert("An error occurred. Please try again later.");
        }
        localStorage.setItem('email', email);
        setEmailSubmitted(true);
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
                .from('MVP_members')
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
            .from('MVP_group')
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

    const fetchPackagedGroups = async (groups: Group[], members: Member[]) => {
        const packagedGroups: PackagedGroup[] = [];

        groups.forEach((group) => {
            const matchedMembers = members.filter((member) => member.group_uuid === group.uuid);
            const packagedGroup: PackagedGroup = {
                group,
                members: matchedMembers,
            };
            packagedGroups.push(packagedGroup);
        });

        setPackagedGroups(packagedGroups);
    };

    async function CreateGroup(goal: string): Promise<Group | null> {
        const { data, error } = await supabase
            .from('MVP_group')
            .insert([{ goal: goal, status: 'QUEUE' }]).select('*')
            .single();
    
        if (error) {
            console.error('Error creating group:', error.message);
            return null
        }
        const newGroup: Group = data

        return newGroup
    }

    const RenderGoals = ({goals}: {goals: PackagedGroup[]}) => {
        const calculateTimeLeft = (targetDate: Date): string => {
            const currentDate = new Date();
            const difference = targetDate.getTime() - currentDate.getTime();
            const days = Math.floor(difference / (1000 * 3600 * 24));
            const hours = Math.floor((difference % (1000 * 3600 * 24)) / (1000 * 3600));
            const minutes = Math.floor((difference % (1000 * 3600)) / (1000 * 60));
            return `${days} days ${hours} hours ${minutes} minutes`;
        };

        const RenderedGoal = ({groupItem, membersItem} : {groupItem: Group, membersItem: Member[]}) => {
            const dateTime = new Date(groupItem.created_at).getTime()
            return (
                <div onClick={async()=>{
                    if (membersItem.some(member => member.email === email) || loadingEnqueue) return;
                    
                    const member = await enqueueMember(email, groupItem)
                    if (member == null || member instanceof Error) return
                    let newGroups = groups

                    if (membersItem.length >= groupItem.max_members-1) {
                        const packagedGroup = {group: groupItem, members: membersItem} as PackagedGroup
                        const activatedGroup = await activateGroup(packagedGroup)
                        if (activatedGroup == null) return
                        newGroups = groups.map((g) => {
                            if (g.uuid === groupItem.uuid) {
                                return activatedGroup;
                            }
                            return g;
                    })}

                    setGroups(newGroups);
                    setMembers([...members, member]);

                    fetchPackagedGroups(newGroups, [...members, member])
                    
                }} className="flex flex-1 flex-col gap-[12px] rounded-[12px] p-[12px] bg-secondary4 h-[180px] w-fit min-w-[240px] max-md:w-full max-mad:max-w-full items-start hover:bg-secondary2 hover:cursor-pointer">
                    {groupItem.status == "ACTIVE" && <div className="flex w-full flex-row justify-between">
                        <p className="text-2xl font-semibold text-secondary1 text-center">ACTIVE</p>
                        <p className="text-2xl font-semibold text-secondary1 text-center">{membersItem.length}/{groupItem.max_members}</p>

                    </div>}
                    {groupItem.status == "QUEUE" && <div className="flex w-full flex-row justify-between">
                        <p className="text-2xl font-semibold text-secondary1 text-center">QUEUEING</p>
                        <p className="text-2xl font-semibold text-secondary1 text-center">{membersItem.length}/{groupItem.max_members}</p>

                    </div>}
                    <p className="text-lg font-normal text-text1 text-start">{groupItem.goal}</p>
                    {groupItem.status == "ACTIVE" && <p className="text-xs font-light text-error1 text-start">Disbands in {calculateTimeLeft(new Date(dateTime + 7 * 24 * 60 * 60 * 1000))}</p>}

                </div>
            )
        }
        return <div className="flex flex-wrap gap-[24px] w-full justify-start">
            {goals.map((packagedGroup, id) => {
                return <RenderedGoal key={id} groupItem={packagedGroup.group} membersItem={packagedGroup.members} />
            })}
        </div>
    }

    return (<div className="min-h-screen relative w-full">
        <div id="connect-content" className="flex flex-col px-[48px] py-[24px] gap-[48px] items-center max-md:px-[12px] max-md:gap-[12px]">
            <div id="connect-row-1" className="w-full rounded-[12px] p-[48px] gap-[48px] bg-background1 justify-center flex flex-col w-fit items-center">
                <Image loading="lazy" width={180} height={180}
                    src="static/logos/blue-logo.svg"
                    alt="Logo"
                    className="aspect-square max-w-[180px] rounded-full"/>
                <div className="flex flex-col gap-[24px] max-w-[840px] w-full items-center">
                    <p className="text-4xl font-semibold text-text8 max-md:text-3xl text-center">Join a team to<br/>work on a goal</p>
                    <form onSubmit={e => e.preventDefault()}
                    className="items-center w-full flex justify-center max-md:flex-col space-x-[12px] max-md:space-x-[0px] h-fit max-md:space-y-[12px]">
                        
                        { !loading && emailSubmitted && <MdiIcon path={mdiCheck} size="36px"/> }
                        <Input
                            type="email"
                            value={email}
                            className="max-w-[360px] p-[12px] rounded-[8px] text-text6 text-xl invalid:border-red-400 h-fit border-[2px]"
                            placeholder="Enter your email"
                            onChange={e => setEmail(e.target.value)}/>
                        <Button className={"bg-secondary1 max-md:w-full rounded-[12px] h-fit p-[12px] max-md:p-[12px]"}
                           onClick={() => handleSubmit()}>
                            { loading && <MdiIcon path={mdiLoading} size="20px" className="animate-spin" /> }
                            { !loading && emailSubmitted && <p className="font-semibold text-md text-white">Change email</p> }
                            { !loading && !emailSubmitted && <p className="font-semibold text-md text-white">OKAY</p> }
                        </Button>
                    </form>
                </div>
            </div>
            <div id="connect-row-2" className="w-full rounded-[12px] p-[48px] gap-[48px] bg-background1 justify-center flex flex-col w-fit items-center">
                <form onSubmit={e => e.preventDefault()}
                    className="w-full flex justify-center items-center max-md:flex-col space-x-[12px] max-md:space-x-[0px] h-fit max-md:space-y-[12px]">
                    <textarea disabled={!emailSubmitted}
                        value={goal} 
                        contentEditable={false}
                        className="resize-none p-[12px] text-text6 text-xl rounded-[8px] invalid:border-red-400 h-fit border-[2px] w-full"
                        placeholder="What goals do you want to work with a group on?"
                        onChange={e => setGoal(e.target.value)}/>
                    <Button className={"bg-secondary1 max-md:w-full rounded-[12px] h-fit p-[12px] px-[24px]"}
                        disabled={!emailSubmitted}
                        onClick={async()=> {
                            const newGroup = await CreateGroup(goal)
                            if (newGroup == null) {
                                return Error('There was an error creating a group')
                            }
                            setGoal('')
                            const member = await enqueueMember(email, newGroup)
                            if (member == null || member instanceof Error) return
                            setMembers([...members, member]);
                            setGroups([...groups, newGroup]);
                            fetchPackagedGroups([...groups, newGroup], [...members, member])
                        }}>
                        <p className="font-semibold text-md text-white">ADD GOAL</p>
                    </Button>
                </form> 
            </div>
            <div id="connect-row-3" className="w-full rounded-[12px] p-[24px] gap-[24px] bg-background1 justify-center flex flex-col w-fit items-center">
                <div id="connect-title" className="gap-[12px] flex flex-col items-center pb-[24px]">
                    <p className="text-4xl text-text8 font-semibold">Weekly goals</p>
                    <p className="text-xl text-text8 font-regular">Click a goal to join</p>
                </div>
                
                <RenderGoals goals={packagedGroups}/>
            </div>
        </div> 
    </div>);
}

const RevealOnScroll = ({ children }: {children: ReactNode}) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement|null>(null);
  
    useEffect(() => {
        const onWindScroll = () => {
            const element = ref.current;
            if (element) {
                const { top } = element.getBoundingClientRect();
                const isVisible = top < window.innerHeight;
                setIsVisible(isVisible);
            }
        };
  
        window.addEventListener("scroll", onWindScroll);
        return () => {
            window.removeEventListener("scroll", onWindScroll);
        };
    }, []);
  
    const classes = `transition-opacity duration-1000
        ${isVisible ? "opacity-100" : "opacity-0"
        }`;
  
    return (
        <div ref={ref} className={classes}>
            {children}
        </div>
    );
  };