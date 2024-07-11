"use client"
import Link from "next/link";
import DemoGlobe from "../(landing)/(home)/components/globe/DemoGlobe";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function Page() {
    return <div className="h-screen w-screen relative">
        <Link href="/" className="absolute z-10 top-12 left-12 flex flex-row gap-[12px] justify-center items-center border-white hover:border-b-[2px] p-[12px]">
            <FaArrowLeftLong color="white"/> 
            <p className="text-white font-bold">GO BACK</p>
        </Link>
        <DemoGlobe/>
    </div>
}