"use client";

import { ButtonIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";
import { FaMicrophone, FaSearchLocation } from "react-icons/fa";
import { ThemeSwitcher } from "~/components/nav/ThemeSwitcher";
import { useSession } from "~/util/AuthProvider";
import { ImExit } from "react-icons/im";
import {Slider} from "@nextui-org/slider";

export const Header: React.FC = () => {
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

    return (<header className="absolute top-0 right-0 z-10 w-fit">
        <div className="flex flex-row w-full justify-end max-md:h-16 py-[24px] px-[24px] items-start text-white">
            
            
            
            <div className="flex md:justify-end w-fit items-center space-x-[24px]">
                {/*<nav className="flex items-center max-md:hidden">
                    <CurrentlySearching/>
                </nav>
                <nav className="flex items-center max-md:hidden">
                    <CurrentlyCalling/>
                </nav>*/}
                <AccountDrawer/>
            </div>
        </div>
    </header>)
}

const AccountDrawer = () => {
    const [open, setOpen] = useState(false);
    const { signout, user, } = useSession();
    const [showModal, setShowModal] = useState(false);
    const {theme, setTheme} = useTheme();

    return (<div className="flex-1 flex-col relative items-center justify-center">
        <div onClick={()=> {
            if (!user) {
                setShowModal(!showModal)
            } else {
                setOpen(!open)
            }
        }} className="flex items-center space-x-[12px] hover:cursor-pointer">
            {user ? <img src="/static/logos/blue-logo.svg" alt="Your account" className="aspect-square h-[64px] rounded-full" />
             : <img src="/static/logos/black-logo-transparent.svg" alt="Your account" className="aspect-square h-[64px] rounded-full bg-text8" />}

        </div>
        {open && user &&
        <div className="absolute mt-[12px] shadow-md rounded-[12px] right-0 w-fit bg-background1 p-[12px] flex flex-col min-w-[128px]">
            <div id="row-1" className="hover:cursor-pointer hover:bg-background3 p-[8px] rounded-[12px] flex flex-row items-center gap-[8px]" onClick={()=>{
                setTheme(theme == 'light' ? 'dark' : 'light')
            }}>
                {theme == 'light' ? <SunIcon color={"var(--text-1)"} />
                : <MoonIcon color={"var(--text-1)"} />}
                <p className="text-text1">{theme == 'light' ? 'Light' : "Dark"}</p>
            </div>
            <div id="row-2" className="hover:cursor-pointer hover:bg-background3 p-[8px] rounded-[12px] flex flex-row items-center gap-[8px]" onClick={signout}>
                <ImExit color={"var(--text-1)"} />
                <p className="text-text1 truncate">Sign out</p>
            </div>
            
        </div>
        }
    </div>)
}