"use client";

import { ButtonIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBell, FaMicrophone, FaSearchLocation, FaTrash, FaUser } from "react-icons/fa";
import { ThemeSwitcher } from "~/components/nav/ThemeSwitcher";
import { useSession } from "~/util/AuthProvider";
import { ImExit } from "react-icons/im";
import {Slider} from "@nextui-org/slider";
import Timer, { calculateTimeRemaining } from "~/app/(landing)/(home)/components/Timer";
import { useTimer } from "~/util/TimerProvider";
import { useGroup } from "~/util/GroupProvider";
import { useProfile } from "~/util/ProfileProvider";
import { Input } from "~/components/ui/input";
import { FaC } from "react-icons/fa6";
import { IoMdClose, IoMdEye, IoMdEyeOff } from "react-icons/io";
import MobileSidebar from "./MobileSidebar";

export const Header = ({showUpdates, setShowUpdates}) => {
    const { event } = useSession();
    const { days, hours, minutes, seconds } = calculateTimeRemaining(new Date(), event);
    const { currentTime } = useTimer();

  
    const formatTime = (time) => {
        return Math.abs(time) < 10 ? `0${Math.abs(time)}` : Math.abs(time);
    }
    const timeLeft = calculateTimeRemaining(currentTime, event);

    const isTimerUp = () => {
        return timeLeft.days <= 0 && timeLeft.hours <= 0 && timeLeft.minutes <= 0 && timeLeft.seconds <= 0;
    }

    const CurrentlySearching = () => (
        <div className="p-[12px] flex flex-row gap-[8px] bg-background3 items-center rounded-[8px]">
            <FaSearchLocation color={"var(--text-2)" } size={20} />
            <p className="text-text2 font-semibold text-[14px]">30 searching</p>
        </div>
    )

    const CurrentlyCalling = () => (
        <div className="p-[12px] flex flex-row gap-[8px] bg-background3 items-center rounded-[8px]">
            <FaMicrophone color={"var(--text-2)"} size={20} />
            <p className="text-text2 font-semibold text-[14px]">131 calling</p>
        </div>
    )

    //to the public
    const ActiveEvent = () => {
        return (<div className="flex flex-col items-center">
            <div className="flex flex-row justify-center w-full items-center">
                <p className="text-secondary1 md:text-3xl text-xl font-bold">ACTIVE</p> 

            </div>
            <p className="text-error1 font-regular md:text-xl text-lg">
                {timeLeft.days > 0 && `${formatTime(timeLeft.days)} days `}
                {timeLeft.hours > 0 && `${formatTime(timeLeft.hours)} hours `}
                {timeLeft.minutes > 0 && `${formatTime(timeLeft.minutes)} minutes `}
                {timeLeft.seconds > 0 && `${formatTime(timeLeft.seconds)} seconds`}
            </p>
        </div>
        );
    };

    //this only shows if you're a developer
    const ComingEvent = () => {
        return (<div className="flex flex-col items-center">
            <div className="flex flex-row justify-center w-full items-center">
                <p className="text-secondary1 md:text-3xl text-xl font-bold">STARTING SOON</p> 

            </div>
            <p className="text-white font-regular md:text-xl text-lg">
                {timeLeft.days > 0 && `${formatTime(timeLeft.days)}d `}
                {timeLeft.hours > 0 && `${formatTime(timeLeft.hours)}hrs `}
                {timeLeft.minutes > 0 && `${formatTime(timeLeft.minutes)}m `}
                {timeLeft.seconds > 0 && `${formatTime(timeLeft.seconds)}s`}
            </p>
        </div>
        );
    }

    return (<header className="fixed top-0 right-0 z-10 w-full">
        <div className="flex flex-row w-full justify-end max-md:h-16 md:p-[24px] p-[12px] items-start text-white">
            <div className="fixed w-full flex items-center justify-center">
                {event?.isActive && isTimerUp() ? <ActiveEvent/> : <ComingEvent/>}
            </div>
            
            <div className="flex max-md:justify-between md:justify-end w-full items-center space-x-[24px] relative">
                <div className="md:hidden">
                    {!showUpdates && <MobileSidebar/>}
                </div>
                {/*<nav className="flex items-center max-md:hidden">
                    <CurrentlySearching/>
                </nav>
                <nav className="flex items-center max-md:hidden">
                    <CurrentlyCalling/>
                </nav>*/}
                <AccountDrawer showUpdates={showUpdates} setShowUpdates={setShowUpdates}/>
            </div>
        </div>
        {showUpdates && 
        
            <div onClick={()=>setShowUpdates(false)} className="absolute z-30 top-0 backdrop-blur w-screen h-screen flex items-center justify-center">
                <div onClick={(e) => e.stopPropagation()} className="absolute rounded-[12px] max-w-[540px] max-h-[720px] max-md:max-w-[360px] max-md:max-h-[480px] w-full h-full bg-background1 p-[24px] flex flex-col min-w-[128px] min-h-[128px]">
                    <div className="w-full flex flex-row justify-between items-center">
                        <p className="text-text1 font-bold text-[24px]">Builder&#39;s Updates</p>
                        <IoMdClose size={24} color={"var(--text-1)"} onClick={()=>setShowUpdates(false)} className="hover:cursor-pointer" />
                    </div>
                    <div className="flex flex-col gap-[4px]">
                        <div className="flex flex-col gap-[4px]">
                            <p className="text-text1 font-[14px] font-semibold">I have some things planned</p>
                            <p className="text-text3 font-[12px] font-regular">July 13th, 11:45pm</p>
                        </div>
                        
                        <div className="flex flex-col gap-[8px]">
                            <p className="text-text2 font-[12px] font-regular">+ Video demo on landing page</p>
                            <p className="text-text2 font-[12px] font-regular">+ Fix bugs for event tomorrow</p>
                            <p className="text-text2 font-[12px] font-regular">+ Allow group members to friend each other</p>
                            <p className="text-text2 font-[12px] font-regular">+ Allow friends to chat with one another</p>
                            <p className="text-text2 font-[12px] font-regular">+ Allow friends to schedule meetings at locations</p>
                            <p className="text-text2 font-[12px] font-regular">+ Continue to grow the Austin Meetup group!</p>
                            <p className="text-text2 font-[12px] font-regular">+ More personal networking</p>

                        </div>
                    </div>
                </div>
            </div>}
    </header>)
}

const AccountDrawer = ({ showUpdates, setShowUpdates}) => {
    const { first_name, last_name, changeFirstName, changeLastName } = useProfile()

    const [open, setOpen] = useState(false);
    const { signout, user, } = useSession();
    const [showModal, setShowModal] = useState(false);

    const {theme, setTheme} = useTheme();
    const { packagedGroup } = useGroup();

    const ProfileRow = () => {
        return <div className="flex flex-col gap-[12px] max-w-[320px] min-w-[180px] items-center">
            <div className="p-[12px] rounded-full border-[2px] border-text3 bg-background3">
                <FaUser color={"var(--text-3)"} size={"64px"} />
            </div>
            <div className="flex flex-row gap-[4px] justify-start w-full">
               <p className="text-text3 font-semibold text-[14px]">{first_name} </p>
                <p className="text-text3 font-semibold text-[14px]">{last_name}</p> 
            </div>
            
        </div>
    }

    return (<div className="flex flex-row md:gap-[24px] gap-[12px] relative items-center justify-end">
        <div id="updates" onClick={()=>setShowUpdates(!showUpdates)} className="relative hover:cursor-pointer">
            <FaBell className="aspect-square md:h-[32px] md:w-[32px] h-[24px] w-[24px] h-full rounded-full"/>
        </div>

        <div onClick={()=> {
            if (!user) {
                setShowModal(!showModal)
            } else {
                setOpen(!open)
            }
        }} className="relative flex items-center space-x-[12px] hover:cursor-pointer">
            {user ? <img src="/static/logos/blue-logo.svg" alt="Your account" className="aspect-square md:h-[64px] h-[48px] rounded-full" />
             : <img src="/static/logos/black-logo-transparent.svg" alt="Your account" className="aspect-square md:h-[64px] h-[48px] rounded-full bg-text8" />}
            {open && user &&
        <div className="absolute top-[84px] shadow-md rounded-[12px] right-0 w-fit bg-background1 p-[12px] flex flex-col min-w-[128px]">
            <ProfileRow/>
            <div id="row-2" className="hover:cursor-pointer hover:bg-background3 p-[8px] rounded-[12px] flex flex-row items-center gap-[8px]" onClick={()=>{
                setTheme(theme == 'light' ? 'dark' : 'light')
            }}>
                {theme == 'light' ? <SunIcon color={"var(--text-1)"} />
                : <MoonIcon color={"var(--text-1)"} />}
                <p className="text-text1">{theme == 'light' ? 'Light' : "Dark"}</p>
            </div>
            {/*<div id="row-2" className="hover:cursor-pointer hover:bg-background3 p-[8px] rounded-[12px] flex flex-row items-center gap-[8px]" 
                onClick={()=>sendPostReq()}>
                <FaTrash color={"var(--text-1)"} />
                <p className="text-text1 truncate">Delete Server Group</p>
        </div>*/}
            <div id="row-3" className="hover:cursor-pointer hover:bg-background3 p-[8px] rounded-[12px] flex flex-row items-center gap-[8px]" onClick={signout}>
                <ImExit color={"var(--text-1)"} />
                <p className="text-text1 truncate">Sign out</p>
            </div>
            
        </div>
        }
        </div>
        
    </div>)
}