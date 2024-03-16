"use client"
import React, { MouseEventHandler, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/server";
import { MdEdit } from "react-icons/md";
import { UUID } from "crypto";
import { ProjectCard } from "./client/view-project-button";
import { CreateProject } from "./client/create-project-button";
import { useSession } from "@/utils/hooks/SessionContext";

export default function Projects(){
    const { projects } = useSession().profile
    const isEmpty = (projects == undefined || projects.length == 0)

    //problem is everytime a new note is made, the projects variable changes because we packaged both note and project into one variable
    //so when we only want to see updated notes, we can't because everything re-renders
    const Header = () => {
        return <div className="flex flex-col pb-3 border-b border-solid border-primary-300 text-text-100">
            <div className="self-start text-base font-extrabold whitespace-nowrap"> Projects & Ideas </div>
            <div className="self-start mt-1 text-xs">Active: {isEmpty ? 0 : projects.length}</div>
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
        {!isEmpty && <DisplayProject/>}
        <CreateProject/>
    </section>)
}