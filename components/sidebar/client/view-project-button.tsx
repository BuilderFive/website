"use client"
import Modal from "@/components/modal/modals";
import { MouseEventHandler, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Switch from "react-switch";
import { FaLock, FaLockOpen } from "react-icons/fa";

interface ProjectCardProps {
    uuid: string;
    created_at: string;
    name: string;
    image: string;
    is_public: boolean;
}

export const ProjectCard = ({ uuid, created_at, name, image, is_public }: ProjectCardProps) => {

    const [isHovering, setHovering] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState(false);
    const [isPublic, setPublic] = useState(is_public);

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

    const BasicHooksExample = () => {
        const handleChange = (nextChecked: boolean) => {
          setPublic(nextChecked);
        };
      
        return (<Switch onChange={handleChange}
            uncheckedHandleIcon={<div className="h-full w-full flex items-center justify-center"><FaLock color={'hsl(var(--text-2))'} className="h-[40%] w-[40%]" /></div>}
            checkedHandleIcon={<div className="h-full w-full flex items-center justify-center"><FaLockOpen color={'hsl(var(--text-2))'} className="h-[40%] w-[40%]" /></div>}
            checked={isPublic}/>);
      };

    return (
        <div>
            <Modal onClose={closeModal} isOpen={isOpen}>
                <div className="modal-content">
                    <div className="p-4 bg-primary-200 rounded-md justify-between items-center flex flex-row">
                        <h1 className="text-4xl text-text-100 font-bold">
                            {name} -
                        </h1>
                        <div className="flex flex-col space-y-[4px] items-center justify-center">
                            <BasicHooksExample/>
                            <h2 className="text-[10px] font-bold">{isPublic ? 'Public' : 'Private'}</h2>
                        </div>
                        
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
    