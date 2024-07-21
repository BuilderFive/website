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
import HeroCollage from "./HeroCollage";
export default function Hero({loaded, setLoaded}) {
    const { event, supabase } = useSession();
    const router = useRouter()
    const [rsvpCount, setRsvpCount] = useState(0);

    
    const fetchRSVP = async () => {
        const { data: dataAccount, error: errorAccount } = await supabase.from("account").select('*', {count: 'exact'});
        if (errorAccount) console.error(errorAccount);

        return dataAccount?.length ?? 0;
    }

    useEffect(() => {
        fetchRSVP().then(data => {
            setLoaded(true);
            if (data) {
                setRsvpCount(data);
            }
        });
    }, [rsvpCount]);

    return <div className="w-full">
    <div id="Hero" className="w-full h-full flex flex-row max-md:flex-col flex-wrap flex-grow py-[48px] justify-center max-md:items-center space-y-[48px]">
        <section id="Column 1" className="max-w-[800px] md:min-w-[500px] flex flex-col max-md:items-center justify-between items-start w-fit max-md:w-full flex-1 space-y-[24px]">
            <div id="title" className="h-full space-y-[4px] max-md:text-center flex flex-col justify-center max-md:items-center">
                <h1 className="text-7xl max-md:text-5xl text-text1 font-bold">Helping GenZ introverts in <a className="text-secondary1">Austin</a> meet in person</h1>
                <h2 className="text-4xl max-md:text-xl text-text1 font-regular max-md:w-full">Drop into group calls with local strangers and leave with plans to meetup at a local coffee shop</h2>
            </div>
            <div id="join" className="flex flex-col space-y-[12px] w-full max-md:w-[90%] gap-[12px]">
                <section className="flex flex-col self-start max-md:self-center">
                    <p className="text-5xl max-md:text-xl text-secondary1 w-full font-bold">
                        {rsvpCount} BUILDERS
                    </p>
                </section>
                <CtaButton>
                    CLICK TO GET AN ACCOUNT
                </CtaButton>
            </div>
            
        </section>
        <section id="Column 2" className="flex flex-col max-md:items-center items-center md:justify-center w-fit flex-1 space-y-[48px] md:pl-[48px]">
            <div className="relative max-w-[750px] w-full">
                <div className="max-md:hidden max-w-[750px] w-full aspect-square">
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