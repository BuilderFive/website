'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { MdiIcon, css } from '~/util';
import { mdiAccountGroup, mdiMapLegend } from '@mdi/js';

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
  
    const classes = `transition-opacity duration-1000 w-full z-20
        ${isVisible ? "opacity-100" : "opacity-0"
        }`;
  
    return (
        <div ref={ref} className={classes}>
            {children}
        </div>
    );
  };

export default function FeatureFooter() {
    return <div id="footer feature" className="relative flex flex-col w-full h-fit items-center ">
        <RevealOnScroll><div id="last features" className="z-20 container w-full flex flex-wrap justify-between pb-[640px] max-md:pb-[256px] max-md:space-y-[128px] max-md:items-center">
            <div className='flex flex-grow justify-center'>
                <section className="flex flex-col space-y-[24px] w-[300px] max-md:text-center">
                    <div className="flex flex-row space-x-[8px] w-full">
                        <MdiIcon path={mdiMapLegend} size="33px" className='text-white' />
                        <p className="text-2xl text-text5">Startup Journey Map</p>
                    </div>
                    <div>
                        <p className="text-4xl font-bold text-white">Track the Wins and Losses, Genuinely</p>
                    </div>
                    <div>
                        <p className="text-2xl text-text5">Easily track progress from your colorful journey map made of questions and your answers</p>
                    </div>
                </section>
            </div>
            <div className='flex flex-grow justify-center'>
                <section className="flex flex-col space-y-[24px] w-[300px] max-md:text-center">
                    <div className="flex flex-row space-x-[8px] w-full max-md:justify-center">
                        <MdiIcon path={mdiMapLegend} size="33px" className='text-white' />
                        <p className="text-2xl text-text5">Builder Mastermind</p>
                    </div>
                    <div>
                        <p className="text-4xl font-bold text-white">Embrace the Startup Culture</p>
                    </div>
                    <div>
                        <p className="text-2xl text-text5">Builder Masterminds disband after a week, encouraging active collaboration. Don’t worry, add them as a friend to keep in touch!</p>
                    </div>
                </section>
            </div>
        </div></RevealOnScroll>
        <img loading="lazy"
            src="static/bottom-background.svg"
            alt="Group of people collaborating"
            className="w-full absolute w-screen bottom-0 max-w-container"
            />
    </div>
}