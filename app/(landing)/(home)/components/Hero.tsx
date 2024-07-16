"use client"

import { useEffect, useRef, useState } from "react";
import { RsvpSection } from "./RsvpSection";
import Timer from "./Timer";
import { Globe } from "./globe/Globe";
import { FaMicrophone } from "react-icons/fa6";
import {Tooltip} from "@nextui-org/tooltip";
import { useSession } from "~/util/AuthProvider";
import { useRouter } from "next/navigation";
import { CtaButton } from "./CtaButton";
export default function Hero({loaded, setLoaded}) {
    const { event, supabase } = useSession();
    const router = useRouter()
    const [rsvpCount, setRsvpCount] = useState(0);

    
    const fetchRSVP = async () => {
        const { data, error } = await supabase.from("rsvp").select('*', {count: 'exact'});
        if (error) console.error(error);
        return data
    }

    useEffect(() => {
        fetchRSVP().then(data => {
            setLoaded(true);
            if (data) {
                setRsvpCount(data.length);
            }
        });
    }, [rsvpCount]);

    return <div className="min-h-screen">
    <div id="Hero" className="px-[48px] max-md:px-[12px] w-full h-full flex flex-row max-md:flex-col flex-wrap flex-grow py-[48px] justify-center max-md:items-center space-y-[48px]">
        <section id="Column 1" className="max-w-[800px] md:min-w-[500px] flex flex-col max-md:items-center justify-between items-start w-fit max-md:w-full flex-1 space-y-[24px]">
            <div id="title" className="h-full space-y-[4px] max-md:text-center flex flex-col justify-center max-md:items-center">
                <h1 className="text-8xl max-md:text-6xl text-secondary1 font-bold">Localized drop-in audio chats</h1>
                {/*<h2 className="text-4xl max-md:text-xl text-secondary4 font-regular max-md:w-full">Find local like-minded friends to meetup in voice calls discussing shared topics of interst.</h2>*/}
            </div>
            <div id="join" className="flex flex-col space-y-[12px] w-full max-md:w-[90%] gap-[12px]">
                <section className="flex flex-col self-start max-md:self-center">
                    <p className="text-3xl max-md:text-xl text-white w-full font-semibold">
                        <a className='text-secondary1 font-bold'>{rsvpCount}</a> people are coming to the next event
                    </p>
                </section>
                <CtaButton>
                    CLICK TO GET AN ACCOUNT
                </CtaButton>
            </div>
            
        </section>
        <section id="Column 2" className="flex flex-col max-md:items-center items-center md:justify-center w-fit flex-1 space-y-[48px] md:pl-[48px]">
            <div className="relative max-w-[750px] w-full">
                <div onClick={()=>router.push('/connect')} className="max-md:hidden max-w-[750px] w-full aspect-square">
                    <Globe />
                </div>
                
                <div className="md:absolute md:bottom-[10%] md:right-0 flex flex-col gap-[8px] w-fit">
                    <div className="flex flex-row gap-x-[8px] items-center w-full justify-end">
                        {event?.isActive ? <>
                            <FaMicrophone size="30px" color='var(--secondary-1)' />
                            <p className="text-4xl max-md:text-2xl text-secondary1 font-bold">Currently active!</p></> :
                        <>
                            <FaMicrophone size="30px" color='white' />
                            <p className="text-2xl text-white font-semibold">The next event is in...</p>
                        </>}

                    </div>
                    <Timer loaded={loaded} /> 
                </div>
            </div>
        </section>
        
    </div>
    <div id="filler" className="flex-1"/>
    </div>
}