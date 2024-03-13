
import React, { MouseEventHandler, useState } from "react";
import { createClient } from "@/utils/supabase/server";
import { MdEdit } from "react-icons/md";
import { UUID } from "crypto";
import { ProjectCard } from "./client/view-project-button";
import { CreateProject } from "./client/create-project-button";

export default function Projects(){
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
        return <div className="flex flex-col pb-3 border-b border-solid border-primary-300 text-text-100">
            <div className="self-start text-base font-extrabold whitespace-nowrap"> Projects & Ideas </div>
            <div className="self-start mt-1 text-xs">Active: {projects.length}</div>
        </div>
    }
    const DisplayProject = () => {
        return <div className="mt-2 font-light text-xs">
            {projects.map((project, index) => (
                <ProjectCard key={index} {...project} />
            ))}
        </div>
    }
    return(<section className="flex flex-col px-1.5 pt-4 pb-2 mt-5 w-full bg-primary-200 rounded-lg max-w-[180px] text-text-200">
        <Header/>
        <DisplayProject/>
        <CreateProject/>
    </section>)
}