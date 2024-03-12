"use client"
import { IoIosArrowBack } from "react-icons/io";

export default function OptionsButton() {
    const handleClick = () => {
        //allow user to edit description and displayname
        console.log('Clicked on Options')
    }
    return<IoIosArrowBack onClick={handleClick} className="self-center cursor-pointer" color="hsl(var(--text-2))"/>
}