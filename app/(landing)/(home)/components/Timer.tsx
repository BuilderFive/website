"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaArrowUpFromBracket, FaSpinner } from "react-icons/fa6";
import { Event, useSession } from "~/util/AuthProvider";
import { useTimer } from "~/util/TimerProvider";
import { Tables } from "~/util/supabase-types";

export const calculateTimeRemaining = (now: Date, event: Event | null) => {
    const currentDate = now;
    const futureDate = (event ? (event.isActive ? event!!.end_at : event!!.start_at) : now);

    const timeDifference = futureDate.getTime() - currentDate.getTime();
    const weeks = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));
    const days = (weeks * 7) + Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds};
};

export default function Timer({loaded}) {
    const { currentTime } = useTimer();
    const [loading, setLoading] = useState(false);
    const { event } = useSession();
    const router = useRouter();
  
    const formatTime = (time) => {
        return Math.abs(time) < 10 ? `0${Math.abs(time)}` : Math.abs(time);
    }

    const timeLeft = !loaded ? {days: 0, hours:0, minutes:0, seconds:0} : calculateTimeRemaining(currentTime, event);
    const sign = (timeLeft.days < 0 || timeLeft.hours < 0 || timeLeft.minutes < 0 || timeLeft.seconds < 0) ? "-" : "";
    const SoonComponent = () => (
        <section onClick={() => {
            const element = document.getElementById("google-calendar");
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }} className="w-fit h-fit flex gap-[24px] flex items-center justify-center max-md:grid max-md:grid-cols-2 hover:cursor-pointer" >
        <section className='w-[125px] relative bg-secondary1 p-[24px] aspect-square rounded-[12px] shadow-md flex items-center justify-center'>
            <p className='text-6xl text-white font-black'>
                {sign}{formatTime(timeLeft.days)}
            </p>
            <p className="font-semibold text-2xl text-white absolute bottom-1">
                DAYS
            </p>
        </section>
        <section className='w-[125px] relative bg-secondary1 p-[24px] aspect-square rounded-[12px] shadow-md flex items-center justify-center'>
            <p className='text-6xl text-white font-black'>
                {sign}{formatTime(timeLeft.hours)}
            </p>
            <p className="font-semibold text-2xl text-white absolute bottom-1">
                HOURS
            </p>
        </section>
        <section className='w-[125px] relative bg-secondary1 p-[24px] aspect-square rounded-[12px] shadow-md flex items-center justify-center'>
            <p className='text-6xl text-white font-black'>
                {sign}{formatTime(timeLeft.minutes)}
            </p>
            <p className="font-semibold text-2xl text-white absolute bottom-1">
                MINUTES
            </p>
        </section>
        <section className='w-[125px] relative bg-secondary1 p-[24px] aspect-square rounded-[12px] shadow-md flex items-center justify-center'>
            <p className='text-6xl text-white font-black'>
                {sign}{formatTime(timeLeft.seconds)}
            </p>
            <p className="font-semibold text-2xl text-white absolute bottom-1">
                SECONDS
            </p>
        </section>
        </section>
    )

    const ActiveComponent = () => {
      
        const formatTime = (time) => {
            return Math.abs(time) < 10 ? `0${Math.abs(time)}` : Math.abs(time);
        }
    
        const timeLeft = !loaded ? {days: 0, hours:0, minutes:0, seconds:0} : calculateTimeRemaining(currentTime, event);
        const sign = (timeLeft.days < 0 || timeLeft.hours < 0 || timeLeft.minutes < 0 || timeLeft.seconds < 0) ? "-" : "";
    
        return <div className="flex flex-col gap-[12px] items-start justify-start w-fit h-fit">
            <div onClick={()=>{
                if (loading) return;
                setLoading(true)
                router.push('/connect')
            }} className="flex items-center max-h-[100px] max-w-[300px] w-[300px] justify-center bg-secondary1 rounded-[12px] p-[24px] hover:bg-secondary2 hover:cursor-pointer">
                {!loading ? 
                <div className="flex flex-row gap-[12px] items-center justify-center">
                    <p className='text-4xl max-lg:text-3xl max-sm:text-2xl text-background1 font-bold text-center'>
                        VIEW
                    </p>
                    <FaExternalLinkAlt size='30px' color='var(--background-1)'/>
                </div> : <FaSpinner className='animate-spin' color={"var(--text-4)"} />}
            </div>
            <div>
                <p className="text-white text-2xl font-medium"><a className="text-secondary1 font-semibold">Time Left</a> {sign}{formatTime(timeLeft.days)}:{formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}</p>
            </div>
        </div>
    }

    return event?.isActive ? <ActiveComponent/> : <SoonComponent/>
}