
import React, { use } from "react";
import { createClient } from "@/utils/supabase/server";
import { EditDescription } from "./client/edit-biography";
import { useSession } from "@/utils/hooks/SessionContext";

export default function Biography(){
    const user_uuid = 'f0dc83ac-50c7-48d4-9f01-276a4c10947f' //example
    const display_name = 'Wrys'
    const username = 'My Phung'
    const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    
    //compare user id to user
    
    //to check if this is another person's profile you're viewing (to know whether to put edit button in)
    const isViewingOther = async() => {
        "use client"
        const { user } = useSession()

        return user?.id == user_uuid
    }
    
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
            <EditDescription description={description}/>
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