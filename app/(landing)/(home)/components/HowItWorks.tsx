"use client"


import { ReactNode, useState, useRef, useEffect } from "react";




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
            <p className="text-7xl font-bold max-md:text-5xl mb-[24px] text-text3 max-md:text-3xl text-white">HOW IT<br/> WORKS</p>

            <div id="howitworks-content" className="flex flex-col space-y-[24px] items-center">
                <div className="flex flex-row items-center gap-[24px] flex-wrap">
                    <h2 className="text-3xl max-md:text-xl text-white font-semibold text-start w-fit p-[12px] rounded-[12px]">
                        Meet people in <a className="text-secondary1">group calls</a><br/> over a shared <a className="text-secondary1">interest</a>
                    </h2>
                    <h2 className="text-3xl max-md:text-xl text-white font-semibold text-start w-fit p-[12px] rounded-[12px]">
                        and make <a className="text-secondary1">plans</a>  to meetup<br/>at a local <a className="text-secondary1">coffee shop</a> 
                    </h2>
                </div>
                
                <div id="howitworks-row-1" className="flex flex-row w-full flex-wrap gap-x-[24px] gap-y-[24px] justify-between max-md:space-y-[12px]">
                    <RevealOnScroll><div id="howitworks-item-1" className="hover:shadow-xl flex relative flex-col flex-grow px-[24px] py-[24px] bg-background2 border-background3 rounded-[12px] space-y-[24px] max-md:space-y-[0px] max-md:w-full items-center justify-center max-md:flex-row max-md:space-x-[24px]">
                        <p className="text-3xl w-[240px] font-semibold max-md:text-2xl">you want to<br/>make friends</p>
                        <img loading="lazy"
                            src="static/business-idea.svg"
                            alt="Group of people collaborating"
                            className="aspect-square w-[240px] max-md:w-[120px]"/>
                        <div className="flex items-center justify-center w-[48px] max-md:w-[24px] aspect-square absolute right-[12px] bottom-[12px] bg-secondary3 rounded-full">
                            <p className="text-text5 text-2xl font-bold max-md:text-sm">1</p>
                        </div>
                    </div></RevealOnScroll>
                    <RevealOnScroll><div id="howitworks-item-2" className="hover:shadow-xl flex relative flex-col flex-grow px-[24px] py-[24px] bg-background2 border-background3 rounded-[12px] space-y-[24px] max-md:space-y-[0px] max-md:w-full items-center justify-center max-md:flex-row max-md:space-x-[24px]">
                        <p className="text-3xl w-[240px] font-semibold max-md:text-2xl">you join<br/>BuilderFive</p>
                        <img loading="lazy"
                            src="static/download-app.svg"
                            alt="Group of people collaborating"
                            className="aspect-square w-[240px] max-md:w-[120px]"/>
                        <div className="flex items-center justify-center w-[48px] max-md:w-[24px] aspect-square absolute right-[12px] bottom-[12px] bg-secondary3 rounded-full">
                            <p className="text-text5 text-2xl font-bold max-md:text-sm">2</p>
                        </div>
                    </div></RevealOnScroll>
                    <RevealOnScroll><div id="howitworks-item-3" className="hover:shadow-xl flex relative flex-col flex-grow px-[24px] py-[24px] bg-background2 border-background3 rounded-[12px] space-y-[24px] max-md:space-y-[0px] max-md:w-full items-center justify-center max-md:flex-row max-md:space-x-[24px]">
                        <p className="text-3xl w-[240px] font-semibold max-md:text-2xl">you select a<br/>topic of interest</p>
                        <img loading="lazy"
                            src="static/mountain-journey.svg"
                            alt="Group of people collaborating"
                            className="aspect-square w-[240px] max-md:w-[120px]"/>
                        <div className="flex items-center justify-center w-[48px] max-md:w-[24px] aspect-square absolute right-[12px] bottom-[12px] bg-secondary3 rounded-full">
                            <p className="text-text5 text-2xl font-bold max-md:text-sm">3</p>
                        </div>
                    </div></RevealOnScroll>
                </div>
                <div id="howitworks-row-2" className="flex flex-row w-full flex-wrap justify-between gap-x-[24px] gap-y-[24px] max-md:space-y-[12px]">
                    <RevealOnScroll><div id="howitworks-item-4" className="hover:shadow-xl flex relative flex-col flex-grow px-[24px] py-[24px] bg-background2 border-background3 rounded-[12px] space-y-[24px] max-md:space-y-[0px] max-md:w-full items-center justify-center max-md:flex-row max-md:space-x-[24px]">
                        <p className="text-3xl w-[240px] font-semibold max-md:text-2xl">you call with<br/>a local group</p>
                        <img loading="lazy"
                            src="static/answer-questions.svg"
                            alt="Group of people collaborating"
                            className="aspect-square w-[240px] max-md:w-[120px]"/>
                        <div className="flex items-center justify-center w-[48px] max-md:w-[24px] aspect-square absolute right-[12px] bottom-[12px] bg-secondary3 rounded-full">
                            <p className="text-text5 text-2xl font-bold max-md:text-sm">4</p>
                        </div>
                    </div></RevealOnScroll>
                    <RevealOnScroll><div id="howitworks-item-5" className="hover:shadow-xl flex relative flex-col flex-grow px-[24px] py-[24px] bg-background2 border-background3 rounded-[12px] space-y-[24px] max-md:space-y-[0px] max-md:w-full items-center justify-center max-md:flex-row max-md:space-x-[24px]">
                        <p className="text-3xl w-[240px] font-semibold max-md:text-2xl">talk for up <br/>to 30 minutes</p>
                        <img loading="lazy"
                            src="static/get-tokens.svg"
                            alt="Group of people collaborating"
                            className="aspect-square w-[240px] max-md:w-[120px]"/>
                        <div className="flex items-center justify-center w-[48px] max-md:w-[24px] aspect-square absolute right-[12px] bottom-[12px] bg-secondary3 rounded-full">
                            <p className="text-text5 text-2xl font-bold max-md:text-sm">5</p>
                        </div>
                    </div></RevealOnScroll>
                    <RevealOnScroll><div id="howitworks-item-6" className="hover:shadow-xl flex relative flex-col flex-grow px-[24px] py-[24px] bg-background2 border-background3 rounded-[12px] space-y-[24px] max-md:space-y-[0px] max-md:w-full items-center justify-center max-md:flex-row max-md:space-x-[24px]">
                        <p className="text-3xl w-[240px] font-semibold max-md:text-2xl">select location<br/>to meet group</p>
                        <img loading="lazy"
                            src="static/join-group.svg"
                            alt="Group of people collaborating"
                            className="aspect-square w-[240px] max-md:w-[120px]"/>
                        <div className="flex items-center justify-center w-[48px] max-md:w-[24px] aspect-square absolute right-[12px] bottom-[12px] bg-secondary3 rounded-full">
                            <p className="text-text5 text-2xl font-bold max-md:text-sm">6</p>
                        </div>
                    </div></RevealOnScroll>
                    
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