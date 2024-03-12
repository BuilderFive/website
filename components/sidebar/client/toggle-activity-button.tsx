"use client"
import { IoIosArrowBack } from "react-icons/io";

export default function OptionsButton() {
    const handleClick = () => {
        //allow user to edit description and displayname
        console.log('Clicked on Options')
    }
    return <IoIosArrowBack onClick={handleClick} className="cursor-pointer shrink-0 my-auto w-4 aspect-square" color="hsl(var(--text-2))"/>
}