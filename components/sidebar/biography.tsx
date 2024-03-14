"use client"


import React, { Dispatch, SetStateAction, use, useState } from "react";
import { createClient } from "@/utils/supabase/server";
import { EditDescription } from "./client/edit-biography";
import { useSession } from "@/utils/hooks/SessionContext";

export default function Biography() {
    const { uuid, display_name, username, bio } = useSession().profile.account
    
    const Header = () => {
        return <div className="flex flex-col pb-3 border-b border-solid border-primary-300">
            <div className="flex self-start font-extrabold text-text-100">
                <div className="flex-auto self-start text-xl">{display_name}</div>               
            </div>
            <div className="mt-1 text-xs font-regular text-text-100">{username}</div>
        </div>
    }
    const Description = () => {
        return <div className="mt-2 font-light text-xs text-text-100">
            <EditDescription bio={bio}/>
        </div>
    }

    const Details = () => {
        return <div className="justify-end pt-2.5 pb-px mt-2.5 text-xs font-semibold border-t border-solid border-primary-300 text-text-200">
            <span className="text-xs font-medium">Member Since </span> <br />
            <span className="text-xxs font-light">March 10, 2024</span>
        </div>
    }
    return(<section className="flex flex-col px-2 py-2 w-full text-text-100 bg-primary-200 rounded-lg max-w-[180px]">
        <Header/>
        <Description/>
        <Details/>
    </section>)
}