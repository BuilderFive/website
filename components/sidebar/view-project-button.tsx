"use client"
import { MouseEventHandler, useState } from "react";

interface ProjectCardProps {
    imgSrc: string;
    altText: string;
    title: string;
    updates: number;
}

export const ProjectCard = ({ imgSrc, altText, title, updates }: ProjectCardProps) => {

    const [isHovering, setHovering] = useState<boolean>(false)

    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault()
        //navigate to the project's log
    }
    
    return (<div onClick={handleClick} onMouseOver={()=>setHovering(true)} onMouseLeave={()=>setHovering(false)} className={`flex gap-1 mb-[4px] py-2.5 pr-14 whitespace-nowrap box-content bg-primary-100 rounded-lg ${isHovering && 'shadow-lg'} cursor-pointer`}>
        <img loading="lazy" src={imgSrc} alt={altText} className="shrink-0 my-auto w-4 aspect-square" />
        <div className="flex flex-col flex-1 justify-center">
        <div className="text-xs font-semibold">{title}</div>
        <div className="mt-1 text-xs">Updated {updates} times</div>
        </div>
    </div>)
};
    