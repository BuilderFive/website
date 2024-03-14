/**
 * This file contains all of the sidebars (components on the right of the screen)
 */
"use client"
import { UUID } from "crypto";
import { ReactNode, createContext, useEffect, useState } from "react";
import Biography from "./biography";
import Projects from "./projects";
import Options from "./options";
import { useSession } from "@/utils/hooks/SessionContext";


export const SideBarProfile = () => {

    //account is loading
    const { account } = useSession().profile;

    //in the future create a global promise that will be resolved when all of it's data is loaded
    
    /*const promise = new Promise((resolve, reject) => {
        if(account) resolve(account);
        else reject("Account not loaded");
    })*/
    //getGlobalPromise().then((account) => {

    return account ? <SideBarProfileTemplate>
        <Biography/>
        <Projects/>
    </SideBarProfileTemplate> : null
       //should be a skeleton sidebar instead
}
//<Projects/>
          //<Options/>

export const profile_other = () => {

}

export const logger = (viewingWork?: UUID, currentWork?: UUID) => {

}

export const logger_other = (viewingWork?: UUID) => {

}

interface RootProps {
    children?: ReactNode
    // any props that come into the component for future
}

//create a context api for the sidebar
export const SideBarRoot = ({children, ...props}: RootProps) => {

    return (
        <div className="z-10 flex flex-col items-center pb-20 bg-primary-300 w-fit h-full min-h-screen" {...props}>
            {children}
        </div>
      );
}

export const SideBarProfileTemplate = ({children, ...props}: RootProps) => {
    return (
        <SideBarRoot>
            <header className="self-stretch w-full bg-neutral-300 h-[150px]"/>

            {/**This needs to be replaced with an actual avatar icon, not an image */}
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c81bfa4d44eebdf16d353193e4476403a48eedc520f2194ae32665b6b7948fa?apiKey=2f9dd5fc40c1433bb238bffdc3e08217&" alt="User Avatar" className="absolute z-10 mt-[48px] aspect-square w-[150px]" />
            
            <div className="p-[12px] items-center flex flex-col space-y-[18px] mt-[54px]" {...props}>
                {children}
            </div>
        </SideBarRoot>
      );
}