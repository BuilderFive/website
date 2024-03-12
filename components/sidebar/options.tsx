
import React, { MouseEventHandler, useState } from "react";
import { createClient } from "@/utils/supabase/server";
import OptionsButton from "./client/toggle-activity-button";

export default function Options(){
    const user_uuid = 'f0dc83ac-50c7-48d4-9f01-276a4c10947f' //example
    const display_name = 'Wrys'
    const username = 'My Phung'
    const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

    //compare user id to user

    //this needs to be replaced with a useContext at protected route, 
    //so supabase API calls don't need to be async
    const supabase = createClient();
    
    //to check if this is another person's profile you're viewing (to know whether to put edit button in)
    const isViewingOther = async() => {
        const { data, error } = await supabase
        .from('account')
        .select('*')
        .eq('uuid', user_uuid).limit(1).single()
            
        if (error) {
            console.log(error)
            return error
        }
        console.log(data?.username)
        
        //return user_uuid == data?.wusername
    }

    const projects = [
        { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/598177ccaf8683fb4afec7ade358481407f58390dec016067eb6b3341f227ed9?apiKey=2f9dd5fc40c1433bb238bffdc3e08217&", title: "Campus Project", updates: 12, altText: "Project Thumbnail" },
        { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/c7bc2356001db94bbc33030ce7cfe555dbbb838b8a0dda81b537a23563131a4c?apiKey=2f9dd5fc40c1433bb238bffdc3e08217&", title: "Menumizer App", updates: 71, altText: "Menumizer App Thumbnail" },
        { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/7c058ca46b2e9d0db3725cbb9050dc3793fc6a0505e594185eafcde692cdddb8?apiKey=2f9dd5fc40c1433bb238bffdc3e08217&", title: "GoalTac", updates: 329, altText: "GoalTac Thumbnail" },
    ];
    
    const Header = () => {
        return <div className="text-base font-extrabold text-text-100">Options</div>
    }
    const DisplayProject = () => {
        
        return <div className="flex gap-1 py-1 mt-2 text-xs font-semibold rounded-lg shadow-sm items-center">
            <OptionsButton/>
            <div className="flex gap-1 self-start">
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e971a656a8cb5bc9190e79073d09f45b51ead171fc7c877f3df9046a91f6f9?apiKey=2f9dd5fc40c1433bb238bffdc3e08217&" />
                <div className="flex-auto text-text-200">Online</div>
            </div>
        </div>
    }
    return(<section className="flex flex-col px-1.5 pt-4 pb-2 mt-5 w-full bg-primary-200 rounded-lg max-w-[180px] text-text-100">
        <Header/>
        <DisplayProject/>
    </section>)
}