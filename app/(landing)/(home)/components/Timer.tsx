"use client"
import { useEffect, useState } from "react";

export const calculateTimeRemaining = (now: Date) => {
    const currentDate = now;
    const futureDate = new Date();
    futureDate.setFullYear(2024, 6, 2);
    futureDate.setHours(12, 30, 30, 10);

    const timeDifference = futureDate.getTime() - currentDate.getTime();
    const weeks = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));
    const days = (weeks * 7) + Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds};
};

export default function Timer({loaded}) {
    const [currentTime, setCurrentTime] = useState(new Date());
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
  
      return () => clearInterval(intervalId);
    }, []);
  
    const formatTime = (time) => {
        return Math.abs(time) < 10 ? `0${Math.abs(time)}` : Math.abs(time);
    }

    const timeLeft = !loaded ? {days: 0, hours:0, minutes:0, seconds:0} : calculateTimeRemaining(currentTime);
    const sign = (timeLeft.days < 0 || timeLeft.hours < 0 || timeLeft.minutes < 0 || timeLeft.seconds < 0) ? "-" : "";

    return <section className="w-fit h-fit flex gap-[24px] flex items-center max-md:grid max-md:grid-cols-2">
    <section className='relative bg-secondary1 p-[24px] h-[200px] aspect-square max-lg:h-[150px] max-sm:h-[120px] rounded-[24px] max-lg:rounded-[12px] shadow-md flex items-center justify-center'>
        <p className='text-8xl max-lg:text-7xl max-sm:text-5xl text-background1 font-black'>
            {sign}{formatTime(timeLeft.days)}
        </p>
        <p className="text-2xl max-lg:text-lg max-sm:text-sm text-background3 absolute bottom-1">
            DAYS
        </p>
    </section>
    <section className='relative bg-secondary1 p-[24px] h-[200px] aspect-square max-lg:h-[150px] max-sm:h-[120px] rounded-[24px] max-lg:rounded-[12px] shadow-md flex items-center justify-center'>
        <p className='text-8xl max-lg:text-7xl max-sm:text-5xl text-background1 font-black'>
            {sign}{formatTime(timeLeft.hours)}
        </p>
        <p className="text-2xl max-lg:text-lg max-sm:text-sm text-background3 absolute bottom-1">
            HOURS
        </p>
    </section>
    <section className='relative bg-secondary1 p-[24px] h-[200px] aspect-square max-lg:h-[150px] max-sm:h-[120px] rounded-[24px] max-lg:rounded-[12px] shadow-md flex items-center justify-center'>
        <p className='text-8xl max-lg:text-7xl max-sm:text-5xl text-background1 font-black'>
            {sign}{formatTime(timeLeft.minutes)}
        </p>
        <p className="text-2xl max-lg:text-lg max-sm:text-sm text-background3 absolute bottom-1">
            MINUTES
        </p>
    </section>
    <section className='relative bg-secondary1 p-[24px] h-[200px] aspect-square max-lg:h-[150px] max-sm:h-[120px] rounded-[24px] max-lg:rounded-[12px] shadow-md flex items-center justify-center'>
        <p className='text-8xl max-lg:text-7xl max-sm:text-5xl text-background1 font-black'>
            {sign}{formatTime(timeLeft.seconds)}
        </p>
        <p className="text-2xl max-lg:text-lg max-sm:text-sm text-background3 absolute bottom-1">
            SECONDS
        </p>
    </section>
</section>

}