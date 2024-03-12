"use client"
import { MdEdit } from "react-icons/md";

export default function EditButton() {
    const handleClick = () => {
        //allow user to edit description and displayname
        console.log('Clicked on Edit Mode')
    }
    return <MdEdit className="cursor-pointer" color="hsl(var(--text-1))" onClick={handleClick}/>
}