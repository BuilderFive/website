"use client"


import { Button } from "@nextui-org/react";
import { ReactNode, useState, useRef, useEffect } from "react";
import { FaMicrophone } from "react-icons/fa6";
import MapAnimation from '../../../../public/animations/map-animation.json'
import Lottie from 'react-lottie-player'



/**
 * 1. Have an idea
 * 2. Download the app
 * 3. Follow guided questions, jot your journey
 * 4. Get points 
 * 5. Spend to join builder groups
 * 6. Solve questions with peers
 * 7. Use points to host global events
 * @returns 
 */
export default function HowItWorks() {
    return <div className="max-w-container w-full flex items-center justify-center">
        <div id="howitworks-background" className="w-[1400px] text-text1 text-center px-[48px] py-[48px] max-md:p-[24px] max-md:w-full rounded-[12px]">
            <p className="text-7xl font-bold mb-[24px] max-md:text-5xl text-secondary1">HOW IT WORKS</p>

            <div id="howitworks-content" className="flex flex-col space-y-[24px] items-center px-[48px]">
                
                <div id="howitworks-row-1" className="flex flex-row w-full flex-wrap gap-x-[24px] gap-y-[24px] justify-between max-md:space-y-[12px]">
                    <div id="howitworks-item-1" className="hover:shadow-xl w-[240px] flex relative flex-col flex-grow px-[24px] py-[24px] bg-background1 rounded-[12px] space-y-[24px] max-md:w-full items-center justify-center">
                        <p className="text-3xl font-semibold max-md:text-lg text-text1">Every week you have 6 hours to call with local people</p>
                        <RevealOnScroll_Timer/>
                        <div className="flex items-center justify-center w-[48px] max-md:w-[24px] aspect-square absolute right-[12px] bottom-[12px] bg-secondary3 rounded-full">
                            <p className="text-text5 text-2xl font-bold max-md:text-sm">1</p>
                        </div>
                    </div>
                    <div id="howitworks-item-2" className="hover:shadow-xl w-[240px] flex relative flex-col flex-grow px-[24px] py-[24px] bg-background2 rounded-[12px] space-y-[24px] max-md:w-full items-center justify-center">
                        <p className="text-3xl font-semibold max-md:text-lg text-text1">Select a topic space to call with like-minded people</p>
                        <RevealOnScroll>                
                        <img loading="lazy"
                            src="static/globe.svg"
                            alt="Group of people collaborating"
                            className="aspect-square w-[240px] max-md:w-[120px]"/>
                            </RevealOnScroll>
                        <div className="flex items-center justify-center w-[48px] max-md:w-[24px] aspect-square absolute right-[12px] bottom-[12px] bg-secondary3 rounded-full">
                            <p className="text-text5 text-2xl font-bold max-md:text-sm">2</p>
                        </div>
                    </div>
                   
                </div>
                <div id="howitworks-row-2" className="flex flex-row w-full flex-wrap justify-between gap-x-[24px] gap-y-[24px] max-md:space-y-[12px]">
                    <div id="howitworks-item-3" className="hover:shadow-xl w-[240px] flex relative flex-col flex-grow px-[24px] py-[24px] bg-background2 rounded-[12px] space-y-[24px] max-md:w-full items-center justify-center">
                        <p className="text-3xl font-semibold max-md:text-lg text-text1">Call with up to 5 people for 30 minutes and find new friends</p>
                        <RevealOnScroll><img loading="lazy"
                            src="static/group.svg"
                            alt="Group of people collaborating"
                            className="aspect-square w-[240px] max-md:w-[120px]"/></RevealOnScroll>
                        <div className="flex items-center justify-center w-[48px] max-md:w-[24px] aspect-square absolute right-[12px] bottom-[12px] bg-secondary3 rounded-full">
                            <p className="text-text5 text-2xl font-bold max-md:text-sm">3</p>
                        </div>
                    </div>
                    <div id="howitworks-item-4" className="hover:shadow-xl w-[240px] flex relative flex-col flex-grow px-[24px] py-[24px] bg-background2 rounded-[12px] space-y-[24px] max-md:w-full items-center justify-center">
                        <p className="text-3xl font-semibold max-md:text-lg text-text1">RSVP to meetup at a nearby cafe for coupons</p>
                        <RevealOnScroll><img loading="lazy"
                            src="static/cafe.svg"
                            alt="Group of people collaborating"
                            className="aspect-square w-[240px] max-md:w-[120px]"/></RevealOnScroll>
                        <div className="flex items-center justify-center w-[48px] max-md:w-[24px] aspect-square absolute right-[12px] bottom-[12px] bg-secondary3 rounded-full">
                            <p className="text-text5 text-2xl font-bold max-md:text-sm">4</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
}

const RevealOnScroll = ({ children }: {children: ReactNode}) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement|null>(null);
  
    useEffect(() => {
        const onWindScroll = () => {
            const element = ref.current;
            if (element) {
                const { top } = element.getBoundingClientRect();
                const isVisible = top < window.innerHeight;
                setIsVisible(isVisible);
            }
        };
  
        window.addEventListener("scroll", onWindScroll);
        return () => {
            window.removeEventListener("scroll", onWindScroll);
        };
    }, []);
  
    const classes = `transition-opacity duration-1000 flex-grow
        ${isVisible ? "opacity-100" : "opacity-0"
        }`;
  
    return (
        <div ref={ref} className={classes}>
            {children}
        </div>
    );
  };

 const RevealOnScroll_Timer = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement|null>(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const endDate = useRef(new Date());
    const [timeLeft, setTimeLeft] = useState({ seconds: 5 });

    const reset = () => {
        setCurrentTime(new Date());
        endDate.current = new Date();
        endDate.current.setSeconds(endDate.current.getSeconds() + 5);
        setTimeLeft({ seconds: 5 });
    }
    useEffect(() => {
        const timer = setInterval(() => {
            const newTime = new Date()
            setCurrentTime(newTime);
            setTimeLeft({ seconds: timeLeft.seconds-1 });
            if (timeLeft.seconds === 0) {
                setTimeout(() => {
                    reset()
                },3000)
            }
        }, 1000);

        
        return () => {
            clearInterval(timer);
        };
    }, [currentTime]);

    const formatTime = (time) => {
        return Math.abs(time) < 10 ? `0${Math.abs(time)}` : Math.abs(time);
    }

    useEffect(() => {
        const onWindScroll = () => {
            const element = ref.current;
            if (element) {
                const { top } = element.getBoundingClientRect();
                const isVisible = top < window.innerHeight;
                if (!isVisible && timeLeft.seconds != 5) { //shouldn't be visible here
                    
                    reset()
                }
                setIsVisible(isVisible);
            }
        };
  
        window.addEventListener("scroll", onWindScroll);
        return () => {
            window.removeEventListener("scroll", onWindScroll);
        };
    }, []);
  
    const classes = `transition-opacity duration-1000 flex-grow
        ${isVisible ? "opacity-100" : "opacity-0"
        }`;
  
    return (
        <div ref={ref} className={classes}>
            {timeLeft.seconds > 0 ? <section className='relative bg-secondary1 p-[24px] h-[200px] aspect-square max-lg:h-[150px] max-sm:h-[120px] rounded-[24px] max-lg:rounded-[12px] shadow-md flex items-center justify-center'>
                <p className='text-8xl max-lg:text-7xl max-sm:text-5xl text-background1 font-black'>
                    {formatTime(timeLeft.seconds)}
                </p>
                <p className="text-2xl max-lg:text-lg max-sm:text-sm text-background3 absolute bottom-1">
                    SECONDS
                </p>
            </section>
            : <Button onClick={()=>reset()} className='relative flex flex-col bg-secondary1 p-[24px] h-[200px] aspect-square max-lg:h-[150px] max-sm:h-[120px] rounded-[24px] max-lg:rounded-[12px] shadow-md flex items-center justify-center'>
                <FaMicrophone size="64px" color='var(--background-1)' />
                <p className='text-4xl max-lg:text-3xl max-sm:text-2xl text-background1 font-black'>
                    JOIN
                </p>
            </Button>}
        </div>
    );
  };