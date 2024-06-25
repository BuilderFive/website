"use client"

import { useRef, useState } from "react";
import { RsvpSection } from "./RsvpSection";
import Timer from "./Timer";
import { Globe } from "./globe/Globe";
import { FaMicrophone } from "react-icons/fa6";
import {Tooltip} from "@nextui-org/tooltip";
export default function Hero() {

    const [loaded, setLoaded] = useState(false);

    return <div className="min-h-screen">
    <div id="Hero" className="px-[48px] max-md:px-[12px] w-full h-full flex flex-row max-md:flex-col flex-wrap flex-grow py-[48px] justify-between max-md:items-center space-y-[48px]">
        <section id="Column 1" className="flex flex-col max-md:items-center justify-between items-start w-fit max-md:w-full flex-1 space-y-[24px]">
            <div id="title" className="h-full max-w-[600px] space-y-[4px] max-md:text-center flex flex-col justify-center max-md:items-center">
                <h1 className="text-8xl max-md:text-5xl text-secondary1 font-bold"><a className="max-md:truncate">Find friends</a> <a className="max-md:truncate">in an hour</a></h1>
                <h2 className="text-4xl max-md:text-xl text-secondary4 font-regular max-md:w-full">Join thousands meeting local like-minded strangers in voice calls every week, and meetup at a local cafe</h2>
            </div>
            <div id="timer" className="flex flex-col space-y-[12px]">
                <div className="flex flex-row gap-x-[8px] items-center w-fit">
                    <FaMicrophone size="30px" color='var(--secondary-1)' />
                    <p className="text-4xl max-md:text-2xl text-secondary1 font-bold">Next Event</p>
                </div>
                <Timer loaded={loaded} /> 
            </div>
            
        </section>
        <section id="Column 2" className="flex flex-col max-md:items-center justify-start items-center w-fit flex-1 space-y-[48px] max-md:pl-[0px] pl-[48px]">
            <div className="relative max-w-[750px] w-full">
                <div className="max-md:hidden max-w-[750px] w-full aspect-square">
                    <Globe />
                </div>
                
                <div className="md:absolute md:bottom-[10%] md:right-[0%] w-full">
                    <RsvpSection setLoaded={setLoaded} />
                </div>
            </div>
        </section>
        
    </div>
    <div id="filler" className="flex-1"/>
    </div>
}