"use client"
import Modal from "@/components/modals/project-modal";
import { MouseEventHandler, useEffect, useState } from "react";
import { IoIosArrowBack, IoMdClose } from "react-icons/io";
import Switch from "react-switch";
import { FaLock, FaLockOpen, FaTrash } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Tooltip } from 'react-tooltip'
import { CreateNote } from "./create-note-button";
import { PackagedProjectProps, useSession } from "@/utils/hooks/SessionContext";
import { Tables } from "@/utils/supabase/database.types";
import { FaSave } from "react-icons/fa";


interface ProjectCardProps {
    uuid: string;
    created_at: string;
    name: string;
    image: string | null;
    is_public: boolean;
    notes: { 
        created_at: string; 
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
    const { updatePackagedProjects, getProject, deleteProject } = useSession().profile //get from the context API
    const [cachedNotes, setCachedNotes] = useState<Tables<'notes'>[]>([])
    const [hasChanged, setHasChanged] = useState(false)
    const [currentLocation, setCurrentLocation] = useState("");

    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault()
        //navigate to the project's log
        openModal()
    }
    const closeModal = () => {
        setIsOpen(false);

        //packages the project and updates the notes
        let currentProject = getProject(uuid)
        currentProject.is_public = isPublic
        const packagedProject: PackagedProjectProps = {
            ...currentProject,
            notes: [...currentProject.notes, ...cachedNotes]
        };
        updatePackagedProjects(packagedProject)
    };
    const openModal = () => {
        setIsOpen(true);
    };
    const handleChange = (nextChecked: boolean) => {
        setPublic(nextChecked);
        setHasChanged(true)
    };
    const handleAddNote = (newNote: Tables<'notes'>) => {
        console.log(newNote)

        //need to make bulk update to updatePackagedProject() when we close
        setCachedNotes([newNote, ...cachedNotes])

        setHasChanged(true)
    }
    /**
     * Allows users to pick where they are working out of a drop down list, and then all notes made will be from that location
     * @returns 
     */
    const CurrentLocationsDropdown = () => {

        //fetch the list of all locations, show them by name
        

        const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            setCurrentLocation(event.target.value);
        };

        return (
            <div className="flex flex-col space-y-2">
                <label htmlFor="current-location" className="text-sm font-medium text-text-200">
                    Current Location
                </label>
                <select
                    id="current-location"
                    className="border border-primary-300 rounded-md p-2"
                    value={currentLocation}
                    onChange={handleLocationChange}
                >
                    <option value="">Select a location</option>
                    <option value="New York">New York</option>
                    <option value="London">London</option>
                    <option value="Tokyo">Tokyo</option>
                    <option value="Sydney">Sydney</option>
                </select>
            </div>
        );
    };

    const Options = () => {
        const SaveButton = () => {
            return <div onClick={closeModal} className="cursor-pointer gap-4 p-[8px] rounded-md w-fit h-fit">
                <FaSave id="save" color='hsl(var(--success-1))' className="w-6 h-6 focus:outline-none" />
                <Tooltip anchorSelect="#save" content="Save recent changes"/>
            </div>
        }
        const TrashButton = () => {
            const [clicked, setClicked] = useState(false)
            return (
                <div onClick={()=>setClicked(!clicked)} className="cursor-pointer gap-4 p-[8px] rounded-md w-fit h-fit flex flex-row gap-[12px]">
                    <FaTrash id="trash" color="hsl(var(--error-1))" className="w-6 h-6 focus:outline-none" />
                    {clicked && <button onClick={()=>deleteProject(uuid)} className="text-md border text-error-100 p-[2px] px-[4px] border-error-100 rounded-md">Confirm</button>}
                    {clicked && <button onClick={()=>setClicked(false)} className="text-md text-text-100 p-[2px] px-[4px] bg-success-100 rounded-md">Cancel</button>}
                    <Tooltip anchorSelect="#trash" content="Delete project" />
                </div>
            );
        };

        <TrashButton />

        return <div className="justify-between flex flex-row bg-primary-200 rounded-md p-[4px]">
            <TrashButton/>
            {hasChanged && <SaveButton/>}
        </div>
    }

    const NotesList = () => {
        const timeFromNow = (date: string) => {
            const currentDate = new Date()
            const noteDate = new Date(date)
            const diff = currentDate.getTime() - noteDate.getTime()
            const days = Math.floor(diff / (1000 * 60 * 60 * 24))
            const hours = Math.floor(diff / (1000 * 60 * 60))
            const minutes = Math.floor(diff / (1000 * 60))
            const seconds = Math.floor(diff / 1000)
            if (days > 0) return `${days} days ago`
            if (hours > 0) return `${hours} hours ago`
            if (minutes > 0) return `${minutes} minutes ago`
            if (seconds > 0) return `${seconds} seconds ago`
            return `Just now`
        }
        
        const mostRecentNotes = [...notes, ...cachedNotes].sort((b, a) => {
            const timeA = new Date(a.created_at).getTime();
            const timeB = new Date(b.created_at).getTime();
            return timeA - timeB;
        })
        const DeleteNote = (uuid: string) => {
            //delete note
            //update notes
        }
        return <div className="bg-primary-200 p-[4px] space-y-[4px] rounded-md">
            <div className="flex-wrap flex gap-[4px] max-h-[360px] overflow-y-auto">
                <CreateNote projectUUID={uuid} handleAddNote={handleAddNote} />  
                
                {mostRecentNotes.map((note, index) => {
                    return <div key={index} id={`note-${index}`} className={`flex flex-col flex-grow p-2 border border-[1px] border-primary-300 rounded-md min-w-[64px] min-h-[64px] max-w-full max-h-[320px] overflow-y-auto w-fit`}>
                        <div className="text-xs font-semibold overflow-auto">{note.title}</div>
                        <div className="text-xs overflow-y-auto">{note.thought}</div>                        
                        <Tooltip anchorSelect={`#note-${index}`} content={`${timeFromNow(note.created_at)}`}/>
                    </div>
                })}
            </div>
            
        </div>
        
    }

    return (
        <div>
            <Modal onClose={closeModal} isOpen={isOpen}>
                <div className="modal-content space-y-[8px]">
                    <div className="p-4 bg-primary-200 rounded-md justify-between flex flex-row">
                        <div className="flex flex-col">
                            <div className="flex text-2xl text-text-100 font-bold overflow-auto">
                                <div className="overflow-hidden text-ellipsis">{name}</div>
                            </div>
                            <h6 className="text-[14px] text-text-200 font-regular flex flex-row">
                                <div className="text-text-200">[{notes.length}]&nbsp;</div>
                                Created {new Date(created_at).toDateString()}
                            </h6>
                        </div>
                        
                        <div className="flex flex-col space-y-[2px] items-center justify-center">
                            
                            <label>
                            <Switch height={24} width={48} onChange={handleChange}
                                uncheckedHandleIcon={<div className="h-full w-full flex items-center justify-center"><FaLock color={'hsl(var(--text-2))'} className="h-[40%] w-[40%]" /></div>}
                                checkedHandleIcon={<div className="h-full w-full flex items-center justify-center"><FaLockOpen color={'hsl(var(--text-2))'} className="h-[40%] w-[40%]" /></div>}
                                checked={isPublic}/>
                            </label>
                            <div id="public-info" className="font-semibold flex flex-row items-center justify-between gap-[3px]">
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
                    <Options/>
                </div>
               
            </Modal>


            <div onClick={handleClick} onMouseOver={()=>setHovering(true)} onMouseLeave={()=>setHovering(false)} className={`flex mt-[4px] py-2.5 whitespace-nowrap box-content bg-primary-100 rounded-lg ${isHovering && 'shadow-lg'} cursor-pointer `}>
                <IoIosArrowBack className="shrink-0 my-auto w-4 aspect-square" color="hsl(var(--text-2))"/>
                <div className="flex flex-col justify-center w-full overflow-auto mr-[10px]">
                    <div className="text-xs font-semibold overflow-hidden text-ellipsis">{name}</div>
                    <div className="mt-1 text-xs">Updated {notes.length} times</div>
                </div>
            </div>
        </div>
    )
};
    