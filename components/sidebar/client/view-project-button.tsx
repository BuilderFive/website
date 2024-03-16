"use client"
import Modal from "@/components/modal/modals";
import { MouseEventHandler, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Switch from "react-switch";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Tooltip } from 'react-tooltip'
import { CreateNote } from "./create-note-button";
import { useSession } from "@/utils/hooks/SessionContext";
import { Tables } from "@/utils/supabase/database.types";


interface ProjectCardProps {
    uuid: string;
    created_at: string;
    name: string;
    image: string;
    is_public: boolean;
    notes: { 
        created_at: string | null; 
        project_uuid: string; 
        thought: string; 
        title: string; 
        uuid: string; 
    }[];
}

export const ProjectCard = ({ uuid, created_at, name, image, is_public, notes }: ProjectCardProps) => {

    const [isHovering, setHovering] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState(false);
    const [isPublic, setPublic] = useState(is_public);
    const { getProject } = useSession().profile //get from the context API
    const [projectNotes, setNotes] = useState(notes)

    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault()
        //navigate to the project's log
        openModal()
    }
    const closeModal = () => {
        setIsOpen(false);
    };
    const openModal = () => {
        setIsOpen(true);
    };
    const handleChange = (nextChecked: boolean) => {
        setPublic(nextChecked);
    };
    const handleAddNote = (newNote: Tables<'notes'>) => {
        console.log(newNote)
        setNotes([...notes, newNote])
    }

    const NotesList = () => {
        return <div className="bg-primary-200 p-[4px] space-y-[4px] rounded-md">
            <div className="flex-wrap flex gap-[4px]">
                {projectNotes.map((note, index) => {
                    return <div key={index} className="flex flex-col grow p-2 border border-[1px] border-primary-300 rounded-md min-w-[150px] max-w-[250px]">
                        <div className="text-xs font-semibold">{note.title}</div>
                        <div className="text-xs">{note.thought}</div>
                    </div>
                })}
                <div className="min-w-[150px] max-w-[250px]">
                    <CreateNote projectUUID={uuid} handleAddNote={handleAddNote} />  
                </div>
               
            </div>
            
        </div>
        
    }

    return (
        <div>
            <Modal onClose={closeModal} isOpen={isOpen}>
                <div className="modal-content space-y-[8px]">
                    <div className="p-4 bg-primary-200 rounded-md justify-between flex flex-row">
                        <div className="flex flex-col">
                            <h1 className="text-2xl text-text-100 font-bold flex flex-row">
                                {name}
                            </h1>
                            <h6 className="text-[14px] text-text-200 font-regular">
                                Created {new Date(created_at).toDateString()}
                            </h6>
                        </div>
                        
                        <div className="flex flex-col space-y-[2px] items-center justify-center">
                            <label>
                            <Switch className="border" height={24} width={48} onChange={handleChange}
                                uncheckedHandleIcon={<div className="h-full w-full flex items-center justify-center"><FaLock color={'hsl(var(--text-2))'} className="h-[40%] w-[40%]" /></div>}
                                checkedHandleIcon={<div className="h-full w-full flex items-center justify-center"><FaLockOpen color={'hsl(var(--text-2))'} className="h-[40%] w-[40%]" /></div>}
                                checked={isPublic}/>
                            </label>
                            <div data-too id="public-info" className="font-semibold flex flex-row items-center justify-between gap-[3px]">
                                {isPublic ? 'Public' : 'Private'} 
                                <IoIosInformationCircleOutline />
                            </div>
                            <Tooltip anchorSelect="#public-info" content={isPublic ? "Project and it's updates seen by anyone" : "Viewable only to you"}/>
                        </div>
                    </div>

                    {/* Update notes & display */}
                    <div id="note-updater">
                        {/* Display notes here */}
                        <NotesList/>
                    </div>
                </div>
            </Modal>
            <div onClick={handleClick} onMouseOver={()=>setHovering(true)} onMouseLeave={()=>setHovering(false)} className={`flex gap-1 mb-[4px] py-2.5 pr-14 whitespace-nowrap box-content bg-primary-100 rounded-lg ${isHovering && 'shadow-lg'} cursor-pointer`}>
                <IoIosArrowBack className="shrink-0 my-auto w-4 aspect-square" color="hsl(var(--text-2))"/>
                <div className="flex flex-col flex-1 justify-center">
                    <div className="text-xs font-semibold">{name}</div>
                    <div className="mt-1 text-xs">Updated X times</div>
                </div>
            </div>
        </div>
    )
};
    