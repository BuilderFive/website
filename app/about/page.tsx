"use client"

import { ReactNode, useState, useRef, useEffect } from "react";

/** THIS WOULD BE PERFECT FOR DEMO OF OUR JOURNEY MAP!!! */
export default function About() {
    return (<div className="w-full relative">
        <div id="about-content" className="flex flex-col gap-[128px] px-[48px] py-[24px] items-center bg-cover bg-landscape-2">
            <div id="about-row-1" className="rounded-[12px] p-[48px] bg-background1 flex flex-col w-fit">
                <img loading="lazy"
                    src="static/logos/blue-logo-transparent.svg"
                    alt="Logo"
                    className="aspect-square max-w-[512px]"/>
                <div className="flex flex-col gap-[24px]">
                    <p className="text-5xl font-semibold text-text8 max-md:text-3xl">BuilderFive <a className="text-text1">Journey</a></p>
                    <p className="text-2xl font-regular text-text3 max-w-[512px] w-full max-md:text-xl">
                        BuilderFive existed as <a className="text-text7">20 different ideas</a> with different names, 
                        all connected with the same vision of <a className="text-text7">fostering community</a> in some shape or form.
                        It was on March of 2024 when I (My Phung) focused in on a community I cared most about, 
                        and saw little representation of around my college campus: <a className="text-text8">ambitious entrepreneurs.</a>
                    </p>
                </div>
                
            </div>
            <div id="about-row-2" className="rounded-[12px] p-[48px] bg-background1 justify-center flex flex-row flex-wrap gap-[24px] w-fit border-[2px]">
                <div className="w-fit h-fit">
                    <img loading="lazy"
                    src="/event-1.jpeg"
                    alt="Logo"
                    className="max-h-[240px] rounded-[12px]"/>
                </div>
                <div className="w-fit h-fit">
                    <img loading="lazy"
                    src="/event-2.jpeg"
                    alt="Logo"
                    className="max-h-[240px] rounded-[12px]"/>
                </div>
                <div className="w-fit h-fit">
                    <img loading="lazy"
                    src="/event-3.jpeg"
                    alt="Logo"
                    className="max-h-[240px] rounded-[12px]"/>
                </div>
                <div className="w-fit h-fit">
                    <img loading="lazy"
                    src="/event-4.jpeg"
                    alt="Logo"
                    className="max-h-[240px] rounded-[12px]"/>
                </div>
                <div className="w-fit h-fit">
                    <img loading="lazy"
                    src="/event-5.jpeg"
                    alt="Logo"
                    className="max-h-[240px] rounded-[12px]"/>
                </div>
                <div className="w-fit h-fit">
                    <img loading="lazy"
                    src="/event-6.jpeg"
                    alt="Logo"
                    className="max-h-[240px] rounded-[12px]"/>
                </div>
                <div className="w-fit h-fit">
                    <img loading="lazy"
                    src="/meeting-1.jpeg"
                    alt="Logo"
                    className="max-h-[240px] rounded-[12px]"/>
                </div>
                <div className="w-fit h-fit">
                    <img loading="lazy"
                    src="/meeting-2.jpeg"
                    alt="Logo"
                    className="max-h-[240px] rounded-[12px]"/>
                </div>
                <div className="w-fit h-fit">
                    <img loading="lazy"
                    src="/meeting-3.jpeg"
                    alt="Logo"
                    className="max-h-[240px] rounded-[12px]"/>
                </div>
                <div className="w-fit h-fit">
                    <img loading="lazy"
                    src="/oragami.jpeg"
                    alt="Logo"
                    className="max-h-[240px] rounded-[12px]"/>
                </div>
                <div className="w-fit h-fit">
                    <img loading="lazy"
                    src="/working-1.jpeg"
                    alt="Logo"
                    className="max-h-[240px] rounded-[12px]"/>
                </div>
                <div className="w-fit h-fit">
                    <img loading="lazy"
                    src="/working-2.jpeg"
                    alt="Logo"
                    className="max-h-[240px] rounded-[12px]"/>
                </div>
                <div className="w-fit h-fit">
                    <img loading="lazy"
                    src="/working-3.jpeg"
                    alt="Logo"
                    className="max-h-[240px] rounded-[12px]"/>
                </div>
                <div className="w-fit h-fit">
                    <img loading="lazy"
                    src="/working-4.jpeg"
                    alt="Logo"
                    className="max-h-[240px] rounded-[12px]"/>
                </div>
            </div>
            
            <RevealOnScroll><div id="about-row-2" className="rounded-[12px] p-[24px] bg-background1">
                <p className="text-6xl font-semibold text-text1">My name is My Phung</p>
            </div></RevealOnScroll>
            <RevealOnScroll><div id="about-row-3" className="rounded-[12px] p-[24px] bg-background1">
                <p className="text-2xl font-regular text-text3">This is a work in progress by the way. I figured I would release anyways haha</p>
            </div></RevealOnScroll>
        </div>
        
    </div>);
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
  
    const classes = `transition-opacity duration-1000
        ${isVisible ? "opacity-100" : "opacity-0"
        }`;
  
    return (
        <div ref={ref} className={classes}>
            {children}
        </div>
    );
  };
/**
 * Create timeline on the side
 * 
 *  My name's My Phung. I'm 21 years old and I love entrepreneurship. 
 *  Show picture of me working
 * 
 *  I've worked on a lot of projects in the past.
 *  Show video of lego building, robotics, minecraft, etc. 
 * 
 *  But I wanted to start building things that genuinely help people.
 *  
 *  At 20 years old I started building a social networking app to help people keep each other accountable.
 *  Show video of task edit oct. 6
 * 
 *  I made no money, and I had no users, and I quit 12 months later.
 *  But I learned how to code, talk to users, and figured out how to answer a ton of  important questions
 *  Show video of me nov 13. pivot
 * 
 *  A few projects later, we're now in March 2024.
 *  I wanted to connect with other entrepreneurs on my college campus.
 *  I wanted to be a part of a community, and there weren't any.
 *  ... so I set up a networking event for next week for builders and personally DM'd 100 people in 1 week.
 *  Show pictures of the events
 *  
 *  In the next 2 months I tried a dozen different ways to help young entrepreneurs feel authentic and connected.
 *  Now I'm building BuilderFive, 
 *  a platform that facilitates private mini hackathons for startup issues your group members share, and helps you journal your startup experiences
 * 
 */