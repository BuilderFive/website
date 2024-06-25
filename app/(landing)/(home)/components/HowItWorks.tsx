"use client"


import { Button } from "@nextui-org/react";
import { ReactNode, useState, useRef, useEffect } from "react";
import { FaM, FaMicrophone } from "react-icons/fa6";
import MapAnimation from '../../../../public/animations/map-animation.json'
import Lottie from 'react-lottie-player'
import { clear } from "console";



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
                            <ChooseTopicDrawer/>
                        </RevealOnScroll>
                        <div className="flex items-center justify-center w-[48px] max-md:w-[24px] aspect-square absolute right-[12px] bottom-[12px] bg-secondary3 rounded-full">
                            <p className="text-text5 text-2xl font-bold max-md:text-sm">2</p>
                        </div>
                    </div>
                   
                </div>
                <div id="howitworks-row-2" className="flex flex-row w-full flex-wrap justify-between gap-x-[24px] gap-y-[24px] max-md:space-y-[12px]">
                    <div id="howitworks-item-3" className="hover:shadow-xl w-[240px] flex relative flex-col flex-grow px-[24px] py-[24px] bg-background2 rounded-[12px] space-y-[24px] max-md:w-full items-center justify-center">
                        <p className="text-3xl font-semibold max-md:text-lg text-text1">Call with up to 5 people for 30 minutes and find new friends</p>
                        <div className="h-full flex items-center"><RevealOnScroll><AvatarsJoins/></RevealOnScroll>
                        </div>
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

const ChooseTopicDrawer = () => {
    const [open, setOpen] = useState(false)
    const [topic, setTopic] = useState('Startups')
    const topics = ['Startups', 'Tech', 'Design', 'Marketing']

    const Drawer = () => {
        return open && <div className='w-[200px] h-fit p-[12px] bg-secondary4 rounded-[12px]'>
            
            {topics.map((element, id) => <div key={id} onClick={()=>setTopic(element)} className="rounded-[12px] p-[12px] hover:cursor-pointer hover:bg-background3 bg-background2">
                <p className='text-2xl max-lg:text-xl max-sm:text-lg text-text1 font-bold'>
                    {element}
                </p>
            </div>)}
            
        </div>
    }

    return <div>
        <Button onClick={()=>setOpen(!open)} className='relative flex flex-col bg-secondary1 p-[24px] h-[200px] aspect-square max-lg:h-[150px] max-sm:h-[120px] rounded-[24px] max-lg:rounded-[12px] shadow-md flex items-center justify-center'>
            <p className='text-2xl max-lg:text-xl max-sm:text-lg text-background1 font-bold'>
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
    const [avatars, setAvatars] = useState(1)
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
        {Array.from({length: avatars}, (_, i) => <div className="w-[90px] max-lg:w-[64px] max-sm:w-[36px] aspect-square flex items-center justify-center">
            <div key={i} className={`p-[24px] max-lg:p-[12px] max-sm:p-[8px] rounded-full bg-secondary4 ${currentlySpeaking.includes(i) && "border-[4px] max-lg:border-[3px] max-sm:border-[1px] border-secondary1"}`}>
                <FaMicrophone className="w-[36px] h-[36px] max-lg:w-[30px] max-lg:h-[30px] max-sm:w-[16px] max-sm:h-[16px]" color={"var(--secondary-1)"}/>
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