"use client"


import { Button } from "@nextui-org/react";
import { ReactNode, useState, useRef, useEffect } from "react";
import { FaM, FaMicrophone } from "react-icons/fa6";
import MapAnimation from '../../../../public/animations/map-animation.json'
import Lottie from 'react-lottie-player'
import { clear } from "console";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useSession } from "~/util/AuthProvider";
import "./../../../connect/(components)/globals.css"



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
    const { event } = useSession()

    const getEventStartDate = () => {
        if (event != null) {
            return event.start_at ? `${event.start_at.toLocaleString('en-US', { month: 'long', day: 'numeric' })}, at ${event.start_at.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}` : '';
        } else {
            return "January, 1 at 12am"
        }
    }
    return <div className="w-full flex items-center justify-center">
        <div id="howitworks-background" className="w-full text-text1 text-center max-md:w-full px-[48px] max-md:px-[12px] py-[24px] rounded-[12px]">
            <div className="flex flex-col space-y-[8px] mb-[24px] items-center">
                <p className="text-7xl font-bold max-md:text-5xl text-secondary1">HOW IT WORKS</p>
                <div className="max-w-[70%]">
                    <Link href="/demo" className="flex flex-row space-x-[12px] items-center truncate text-3xl font-semibold max-md:text-xl text-white underline">And see the demo<br/><FaExternalLinkAlt size='18px' color='white'/></Link>  
                </div>
            </div>
            
            <div id="howitworks-content" className="flex flex-col space-y-[24px] items-center">
                
                <div id="howitworks-row-1" className="h-full flex flex-row w-full flex-wrap gap-x-[24px] gap-y-[24px] justify-between max-md:space-y-[12px]">
                    <div id="howitworks-item-1" className="hover:shadow-xl w-[240px] flex relative flex-col flex-grow px-[24px] py-[24px] bg-transparent rounded-[12px] space-y-[24px] max-md:w-full items-center justify-center">
                        <p className="text-2xl font-semibold text-white max-md:text-xl w-[60%] w-full max-lg:w-[100%]">Go to <Link href="/connect" className="underline text-secondary1">BuilderFive</Link> during an event</p>
                        <div className="flex-1"/>
                        <RevealOnScroll_Timer/>
                        <div className="flex items-center justify-center w-[48px] max-md:w-[24px] aspect-square absolute right-[12px] bottom-[12px] bg-secondary3 rounded-full">
                            <p className="text-text5 text-2xl font-bold max-md:text-sm">1</p>
                        </div>
                    </div>
                    <div id="howitworks-item-2" className="hover:shadow-xl w-[240px] flex relative flex-col flex-grow px-[24px] py-[24px] bg-transparent rounded-[12px] space-y-[24px] max-md:w-full items-center justify-center">
                        <p className="text-2xl font-semibold text-white max-md:text-xl w-[60%] w-full max-lg:w-[100%]">Join or create a voice call <br/>Anyone near you will join</p>
                        <div className="h-full flex items-center"><RevealOnScroll><AvatarsJoins/></RevealOnScroll>
                        </div>
                        <div className="flex items-center justify-center w-[48px] max-md:w-[24px] aspect-square absolute right-[12px] bottom-[12px] bg-secondary3 rounded-full">
                            <p className="text-text5 text-2xl font-bold max-md:text-sm">2</p>
                        </div>
                    </div>
                   
                </div>
                <div id="howitworks-row-2" className="flex flex-row w-full flex-wrap justify-between gap-x-[24px] gap-y-[24px] max-md:space-y-[12px]">
                    <div id="howitworks-item-3" className="hover:shadow-xl w-[240px] flex relative flex-col flex-grow px-[24px] py-[24px] bg-transparent rounded-[12px] space-y-[24px] max-md:w-full items-center justify-center">
                        <p className="text-2xl font-semibold text-white max-md:text-xl w-[60%] w-full max-lg:w-[100%]">Add friends, chat, and<br/>find time to meet up</p>
                        {/* Could create a friend-add dropdown */}
                        <div className="flex flex-row gap-[24px]">
                            <div className="your-audio-group-marker"/>
                            <div className="wait-audio-group-marker"/>
                            <div className="other-audio-group-marker"/>
                        </div>
                        <div className="flex items-center justify-center w-[48px] max-md:w-[24px] aspect-square absolute right-[12px] bottom-[12px] bg-secondary3 rounded-full">
                            <p className="text-text5 text-2xl font-bold max-md:text-sm">3</p>
                        </div>
                    </div>
                    <div id="howitworks-item-4" className="hover:shadow-xl w-[240px] flex relative flex-col flex-grow px-[24px] py-[24px] bg-transparent rounded-[12px] space-y-[24px] max-md:w-full items-center justify-center">
                        <p className="text-2xl font-semibold text-white max-md:text-xl w-[60%] w-full max-lg:w-[100%]">Repeat step 1 to <br/>meet more people!</p>
                        {/* Could create a date/time/place scheduler for a crop of a google map location */}

                        
                        <div className="flex items-center justify-center w-[48px] max-md:w-[24px] aspect-square absolute right-[12px] bottom-[12px] bg-secondary3 rounded-full">
                            <p className="text-text5 text-2xl font-bold max-md:text-sm">4</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
}

const ChooseTopicDrawer = () => {
    const [open, setOpen] = useState(false)
    const [topic, setTopic] = useState('Startups')
    const topics = ['Startups', 'Anime', 'Networking', 'Other']

    const Drawer = () => {
        return open && <div className='w-[200px] flex flex-col h-fit p-[12px] gap-[12px] bg-secondary4 rounded-[12px]'>
            
            {topics.map((element, id) => <div key={id} onClick={()=>{
                setTopic(element)
                setOpen(false)
            }} className="rounded-[12px] p-[12px] hover:cursor-pointer hover:bg-background3 bg-background2">
                <p className='text-2xl max-lg:text-xl max-sm:text-lg text-text1 font-bold'>
                    {element}
                </p>
            </div>)}
            
        </div>
    }

    return <div>
        <Button onClick={()=>setOpen(!open)} className='relative flex flex-col bg-secondary1 p-[24px] h-[200px] aspect-square max-lg:h-[150px] max-sm:h-[120px] rounded-[24px] max-lg:rounded-[12px] shadow-md flex items-center justify-center'>
            <p className='text-3xl max-lg:text-2xl max-sm:text-lg text-background1 font-bold'>
                {topic}
            </p>
        </Button>
       
        <div className="z-10 absolute top-[90%]">
            <Drawer/>
        </div>
        
    </div>
}

const AvatarsJoins = () => {    
    const getRandomNumber = (): number => {
        return Math.floor(Math.random() * (6 - 3 + 1)) + 3;
    };
    const [currentTime, setCurrentTime] = useState(new Date());
    const endDate = useRef(new Date());
    const [timeLeft, setTimeLeft] = useState({ seconds: 5 });
    const [avatars, setAvatars] = useState(5)
    const [currentlySpeaking, setCurrentlySpeaking] = useState<number[]>([])

    const reset = () => {

        //have a new avatar join or leave
        if (avatars === 5) {
            setAvatars(avatars - 1);
        } else if (avatars === 1) {
            setAvatars(avatars + 1);
        } else {
            const random = Math.random();
            if (random < 0.5) {
                setAvatars(avatars - 1);
            } else {
                setAvatars(avatars + 1);
            }
        }


        //resets counter and make new delay time
        setCurrentTime(new Date());
        const newTimeLeft = getRandomNumber()
        endDate.current = new Date();
        endDate.current.setSeconds(endDate.current.getSeconds() + newTimeLeft);
        setTimeLeft({ seconds: newTimeLeft });
    }


    
    useEffect(() => {
        const timer = setInterval(() => {
            const newTime = new Date()
            setCurrentTime(newTime);
            setTimeLeft({ seconds: timeLeft.seconds-1 });
            if (timeLeft.seconds === 0) {
                reset()
            }
        }, 2000);
        const currentSpeakers = setInterval(() => {
            setCurrentlySpeaking(() => {
                let newCurrentlySpeaking: number[] = [];
                for (let i = 0; i < avatars; i++) {
                    if (Math.random() < 0.35) {
                        newCurrentlySpeaking.push(i);
                    }
                }
                return newCurrentlySpeaking;
            });
        }, 1000);
        
        return () => {
            clearInterval(currentSpeakers);
            clearInterval(timer);
        };
    }, [currentTime]);

    return <div className="flex flex-row gap-x-[12px] max-lg:gap-x-[8px] max-sm:gap-x-[2px] flex-wrap items-center justify-center">
        {Array.from({length: avatars}, (_, i) => <div key={i} className="w-[90px] max-lg:w-[64px] aspect-square flex items-center justify-center">
            <div className={`p-[24px] max-lg:p-[12px]  rounded-full bg-secondary4 ${currentlySpeaking.includes(i) && "border-[4px] max-lg:border-[3px] max-sm:border-[1px] border-secondary1"}`}>
                <FaMicrophone className="w-[36px] h-[36px] max-lg:w-[30px] max-lg:h-[30px]" color={"var(--secondary-1)"}/>
            </div>
        </div>
        )}
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