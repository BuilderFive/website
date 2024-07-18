"use client"

import { useState } from "react";
import { FaMicrophoneAlt, FaMicrophoneAltSlash, FaUser, FaUserCircle } from "react-icons/fa";

export default function GroupCallDemo() {
    const [active, setActive] = useState(0);
    const [muted, setMuted] = useState(false);

    const mics = [
        { src: "/animations/wait-mic.gif", title: "Startups", names: ["Ahmed"] },
        { src: "/animations/other-mic.gif", title: "Networking", names: ["Tony", "Kim", "Juan"] },
        { src: "/animations/other-mic.gif", title: "Cofounders?", names: ["Marco", "Josh", "Mee6","Sarah"] },
    ];
    
    const RenderMic = ({src, title, num}: {src: string, title: string, num: number}) => {
        return <div onClick={()=>setActive(num)} className='relative hover:cursor-pointer hover:text-xl text-lg'>
            <p className='text-text1 text-inherit font-semibold absolute bottom-0 w-full text-center'>{title}</p>
            <img src={active === num ? "/animations/active-mic.gif" : src}
                alt={title}
                className="max-w-[128px] rounded-full"/>
        </div>
    }

    const Globe = () => {
        return <div className="relative w-full flex justify-center">
            <img src="/static/earth.svg" alt="globe" className="w-full" />
            <div className='absolute top-[-36px] flex flex-col w-full'>
                <div id="earth-row-1" className="flex flex-row justify-center">
                    <RenderMic num={0} src={mics[0].src} title={mics[0].title} />
                </div>
                <div id="earth-row-2" className="flex flex-row px-[25%] py-[5%]">
                    <div className="flex w-[256px] flex-1"/>
                    <RenderMic num={1} src={mics[1].src} title={mics[1].title} />
                </div>
                <div id="earth-row-3" className="flex flex-row px-[10%]">
                    <RenderMic num={2} src={mics[2].src} title={mics[2].title} />
                </div>
            </div>
        </div>
    }

    return <div className='w-full relative'> 
        

        <div className="flex flex-col items-center relative w-full md:mt-[256px]">
            <div className=" md:absolute max-w-[720px] w-full bottom-0">
                <Globe/>
            </div>
        
            <div className="flex flex-row p-[24px] bg-background1 gap-[12px] rounded-[24px] w-fit relative">
                <div className="flex flex-col justify-start gap-[24px] w-full">
                    <div className="flex flex-row w-full gap-[24px] justify-between items-center">
                        <p className="text-text1 text-3xl font-semibold">{mics[active].title}</p>
                        <img src="/static/logos/blue-logo.svg" alt="logo" className="w-[36px] rounded-full" />
                    </div>
                    <div className="flex flex-row gap-[24px]">
                        {mics[active].names.map((name, index) => (
                            <div key={index} className="flex relative justify-center">
                                <FaUserCircle className="md:text-6xl text-4xl" />
                                <p className="absolute bottom-[-20px] md:text-lg text-md text-text1">{name}</p>
                            </div>
                        ))}
                        <div className="flex relative justify-center">
                            <FaUserCircle className="md:text-6xl text-4xl" color={"var(--secondary-1)"} />
                            <p className="absolute bottom-[-20px] md:text-lg text-md text-text1">You</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between pt-[12px]">
                        <div className="flex flex-row gap-[12px] bg-background2 p-[12px] rounded-full hover:cursor-pointer" onClick={()=>setMuted(!muted)}>
                            {muted ? <FaMicrophoneAlt className="text-text3 text-3xl" /> : <FaMicrophoneAltSlash className="text-text3 text-3xl" />}
                            {muted ? <p className="text-text3 text-lg">Unmute</p> : <p className="text-text3 text-lg">Mute</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
}