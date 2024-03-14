"use client"
import { MouseEventHandler, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

interface ProjectCardProps {
    uuid: string;
    created_at: string;
    name: string;
    image: string;
    is_public: boolean;
}

export const ProjectCard = ({ uuid, created_at, name, image, is_public }: ProjectCardProps) => {

    const [isHovering, setHovering] = useState<boolean>(false)

    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault()
        //navigate to the project's log
    }
    
    return (<div onClick={handleClick} onMouseOver={()=>setHovering(true)} onMouseLeave={()=>setHovering(false)} className={`flex gap-1 mb-[4px] py-2.5 pr-14 whitespace-nowrap box-content bg-primary-100 rounded-lg ${isHovering && 'shadow-lg'} cursor-pointer`}>
        <IoIosArrowBack className="shrink-0 my-auto w-4 aspect-square" color="hsl(var(--text-2))"/>
        <div className="flex flex-col flex-1 justify-center">
        <div className="text-xs font-semibold">{name}</div>
        <div className="mt-1 text-xs">Updated X times</div>
        </div>
    </div>)
};
    