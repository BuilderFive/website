'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { MdiIcon, css } from '~/util';
import { mdiAccountGroup, mdiMapLegend } from '@mdi/js';
import { FaArrowUp, FaCheck, FaCircle, FaEquals, FaLine, FaPlus, FaRegFrown, FaRegSmile, FaRegSmileBeam, FaUser } from 'react-icons/fa';
import { FaFaceMeh, FaFaceSmile, FaRegFaceMeh, FaRegFaceSmile, FaX } from 'react-icons/fa6';
import Lottie from 'react-lottie-player';
import animationData from  './../../../../public/animations/hammer.json';
import { IoMdRadioButtonOn } from 'react-icons/io';
//create a scenario
export default function CaseStudy() {

    return <div id="builderfive-case" className="relative px-[48px] max-md:px-[0px] w-full h-full">
        <div className='bg-background1 rounded-[24px] px-[24px] max-md:px-[12px] py-[48px] w-full h-full flex flex-col gap-[128px]'>
             <div id="problem" className='flex flex-row flex-wrap max-md:flex-col lg:grid lg:grid-cols-2 max-lg:gap-[48px] gap-[96px]'>
                <div id="problem-row-1" className='flex justify-start items-start flex-col gap-[24px] w-full'>
                    <div id="problem-title" className='text-text1 w-fit'>
                        <p className='text-text3 text-5xl font-semibold max-lg:text-3xl'>1. THIS IS MARCO</p>
                    </div>

                    <div className='bg-background3 rounded-[24px] p-[24px] flex w-fit flex-row max-lg:flex-col gap-[24px] justify-center items-start max-md:items-center'>
                        <div className='w-[96px] h-[96px] aspect-square'>
                            <FaRegSmileBeam className='text-text3 w-full h-full'/>
                        </div>
                        <div className='flex flex-col items-start justify-start max-w-[480px] w-full my-auto'>
                            <p className='text-text3 font-medium text-2xl'>• 21 yrs old, new graduate</p>
                            <p className='text-text3 font-medium text-2xl'>• Loves coding and chess</p>
                            <p className='text-text3 font-medium text-2xl'>• Building a startup</p>
                            <p className='text-text3 font-medium text-2xl'>• Moving to a new city soon</p>
                        </div>
                    </div>
                </div>

                <div id="problem-row-2" className='flex justify-end items-end flex-col gap-[24px] w-full'>
                    <div id="problem-title" className='text-text1 w-fit'>
                        <p className='text-orange-400 text-5xl font-semibold max-lg:text-3xl'>2. HE JUST MOVED</p>
                    </div>

                    <div className='bg-background3 rounded-[24px] p-[24px] flex w-fit flex-row max-lg:flex-col gap-[24px] justify-center items-start max-md:items-center'>
                        <div className='w-[96px] h-[96px] aspect-square'>
                            <FaRegFaceSmile className='text-text3 w-full h-full'/>
                        </div>
                        <div className='flex flex-col items-start justify-start max-w-[480px] w-full my-auto'>
                            <p className='text-orange-400 font-medium text-2xl'>• Finding the city scary</p>
                            <p className='text-orange-400 font-medium text-2xl'>• Trying to find friends</p>
                            <p className='text-orange-400 font-medium text-2xl'>• Working all the time</p>
                        </div>
                    </div>
                </div>

                <div id="problem-row-3" className='flex justify-start items-start flex-col gap-[24px] w-full'>
                    <div id="problem-title" className='text-text1 w-fit'>
                        <p className='text-red-500 text-5xl font-semibold max-lg:text-3xl'>3. HE WANTS FRIENDS</p>
                    </div>

                    <div className='bg-background3 rounded-[24px] p-[24px] flex w-fit flex-row max-lg:flex-col gap-[24px] justify-center items-start max-md:items-center'>
                        
                        <div className='w-[96px] h-[96px] aspect-square'>
                            <FaRegFaceMeh className='text-text3 w-full h-full'/>
                        </div>
                        <div className='flex flex-col items-start justify-start max-w-[480px] w-fit my-auto'>
                            <p className='text-red-500 font-medium text-2xl'>• Still can&#39;t make friends IRL</p>
                            <p className='text-red-500 font-medium text-2xl'>• Meeting too many weirdos at meetup events</p>
                            <p className='text-red-500 font-medium text-2xl'>• Not enough time to go out</p>
                        </div>
                    </div>
                </div>

                <div id="problem-row-4" className='flex justify-end items-end flex-col gap-[24px] w-full'>
                    <div id="problem-title" className='text-text1 w-fit'>
                        <p className='text-text3 text-5xl font-semibold max-lg:text-3xl'>4. HIS THOUGHTS</p>
                    </div>

                    <div className='bg-background3 rounded-[24px] p-[24px] flex w-fit flex-row max-lg:flex-col gap-[24px] justify-center items-start max-md:items-center'>
                        
                        <div className='w-[96px] h-[96px] aspect-square'>
                            <FaRegFrown className='text-text3 w-full h-full'/>
                        </div>
                        <div className='flex flex-col items-start justify-start max-w-[480px] w-fit my-auto'>
                            <p className='text-text3 font-medium text-2xl italic'>&quot;I want to actually meet someone who&#39;s my age and is building a startup too, and who I don&#39;t have to spend HOURS trying to find&quot; <br/>- Marco</p>
                        </div>
                    </div>
                </div>
            </div>

            <div id='competitors' className='bg-background3 p-[24px] rounded-[24px] gap-[24px]'>
                <p className='text-text3 font-bold text-5xl flex justify-start items-center w-full pb-[24px]'>Marco&#39;s ratings of these apps</p>
                <div className='flex flex-row justify-between max-lg:flex-col gap-[24px]'>
                    <div className='p-[24px] gap-[24px] flex flex-col justify-center items-center bg-background2 rounded-[12px] w-full'>
                        <img src="/static/meetup.svg" alt="Meetup" className="aspect-square h-[128px] rounded-full" />
                        <div className='flex flex-col justify-start items-start w-full'>
                            <p className='text-text3 text-xl font-bold'>MEETUP</p>

                            <div className='flex flex-row gap-[12px] items-center justify-start'>
                                <FaCheck className='text-secondary1 h-[24px] w-[24px]'/> 
                                <p className='text-secondary1 text-xl font-medium'>Meeting real people</p>
                            </div>
                            <div className='flex flex-row gap-[12px] items-center justify-start'>
                                <FaX className='text-red-500 h-[24px] w-[24px]'/> 
                                <p className='text-red-500 text-xl font-medium'>Is it worth going to a meetup?</p>
                            </div>
                            <div className='flex flex-row gap-[12px] items-center justify-start'>
                                <FaX className='text-red-500 h-[24px] w-[24px]'/> 
                                <p className='text-red-500 text-xl font-medium'>Creating a group is expensive</p>
                            </div>
                            
                        </div>
                    </div>
                    <div className='p-[24px] gap-[24px] flex flex-col justify-center items-center bg-background2 rounded-[12px] w-full'>
                        <img src="/static/discord.svg" alt="Discord" className="aspect-square h-[128px] rounded-full" />
                        <div className='flex flex-col justify-start items-start w-full'>
                            <p className='text-text3 text-xl font-bold'>DISCORD</p>

                            <div className='flex flex-row gap-[12px] items-center justify-start'>
                                <FaCheck className='text-secondary1 h-[24px] w-[24px]'/> 
                                <p className='text-secondary1 text-xl font-medium'>Easy to find groups</p>
                            </div>
                            <div className='flex flex-row gap-[12px] items-center justify-start'>
                                <FaX className='text-red-500 h-[24px] w-[24px]'/> 
                                <p className='text-red-500 text-xl font-medium'>Hard to make real friends</p>
                            </div>
                            <div className='flex flex-row gap-[12px] items-center justify-start'>
                                <FaX className='text-red-500 h-[24px] w-[24px]'/> 
                                <p className='text-red-500 text-xl font-medium'>Too many inactive chats</p>
                            </div>
                        </div>
                    </div>
                    <div className='p-[24px] gap-[24px] flex flex-col justify-center items-center bg-background2 rounded-[12px] w-full'>
                        <img src="/static/clubhouse.svg" alt="Clubhouse" className="aspect-square h-[128px] rounded-full" />
                        <div className='flex flex-col justify-start items-start w-full'>
                            <p className='text-text3 text-xl font-bold'>CLUBHOUSE</p>

                            <div className='flex flex-row gap-[12px] items-center justify-start'>
                                <FaCheck className='text-secondary1 h-[24px] w-[24px]'/> 
                                <p className='text-secondary1 text-xl font-medium'>Authenticity with audio</p>
                            </div>
                            <div className='flex flex-row gap-[12px] items-center justify-start'>
                                <FaCheck className='text-secondary1 h-[24px] w-[24px]'/> 
                                <p className='text-secondary1 text-xl font-medium'>Discussing topics I like</p>
                            </div>
                            <div className='flex flex-row gap-[12px] items-center justify-start'>
                                <FaX className='text-red-500 h-[24px] w-[24px]'/> 
                                <p className='text-red-500 text-xl font-medium'>Not making real friendships</p>
                            </div>
                        </div>                
                    </div>
                </div>
               
            </div>
            
            <div id="builderfive" className='w-full h-full flex justify-center relative'>
                <div className='absolute p-[4px] w-fit rounded-full bg-gradient-to-r from-[var(--secondary-4)] to-[var(--secondary-1)] bg-[length:200%_200%] animate-gradient-x'>
                    <img src="/static/logos/blue-logo.svg" alt="BuilderFive" className="aspect-square h-[256px] rounded-full w-full" />
                    <div className='absolute bottom-0 w-full text-center p-[12px] bg-secondary1 rounded-[24px]'>
                        <p className='text-text1 text-4xl font-bold'>BuilderFive</p>
                    </div>
                </div>
                <div className='w-full pt-[152px] min-h-[540px] border-secondary1 border-[4px] bg-background3 p-[24px] rounded-[24px] mt-[128px] flex flex-row max-lg:flex-col gap-[24px]'>
                    <div className='flex flex-col justify-start items-start w-full'>
                        <div className='flex flex-row gap-[12px] items-center justify-start'>
                            <FaCheck className='text-secondary1 h-[24px] w-[24px]'/> 
                            <p className='text-secondary1 text-2xl font-medium w-full'>Meet new friends IRL, not strangers</p>
                        </div>
                        <div className='flex flex-row gap-[12px] items-center justify-start'>
                            <FaCheck className='text-secondary1 h-[24px] w-[24px]'/> 
                            <p className='text-secondary1 text-2xl font-medium w-full'>Voice calls feel more real than text</p>
                        </div>
                        <div className='flex flex-row gap-[12px] items-center justify-start'>
                            <FaCheck className='text-secondary1 h-[24px] w-[24px]'/> 
                            <p className='text-secondary1 text-2xl font-medium w-full'>Move from online chats to offline meetups</p>
                        </div>
                        <div className='flex flex-row gap-[12px] items-center justify-start'>
                            <FaCheck className='text-secondary1 h-[24px] w-[24px]'/> 
                            <p className='text-secondary1 text-2xl font-medium w-full'>Create groups for IRL meetups</p>
                        </div>
                        <div className='flex flex-row gap-[12px] items-center justify-start'>
                            <IoMdRadioButtonOn className='text-text3 h-[24px] w-[24px]'/> 
                            <p className='text-text3 text-2xl font-medium w-full'>Exclusive access for 2hrs once a week</p>
                        </div>
                        <div className='flex flex-row gap-[12px] items-center justify-start'>
                            <IoMdRadioButtonOn className='text-text3 h-[24px] w-[24px]'/> 
                            <p className='text-text3 text-2xl font-medium w-full'>Talk genuinely w/ small group of five</p>
                        </div>
                        <div className='flex flex-row gap-[12px] items-center justify-start'>
                            <IoMdRadioButtonOn className='text-text3 h-[24px] w-[24px]'/> 
                            <p className='text-text3 text-2xl font-medium w-full'>Navigate a globe instead of a list to join calls</p>
                        </div>
                        <div className='flex flex-row gap-[12px] mt-[24px] items-center justify-center'>
                            <img src="/static/meetup.svg" alt="Meetup" className="aspect-square h-[128px] rounded-full" />
                            <FaPlus className='text-text1 h-[64px] w-[64px]'/> 
                            <img src="/static/clubhouse.svg" alt="Clubhouse" className="aspect-square h-[128px] rounded-full" />
                            <FaEquals className='text-text1 h-[64px] w-[64px]'/> 
                            <img src="/static/logos/blue-logo.svg" alt="BuilderFive" className="aspect-square h-[128px] rounded-full" />

                        </div>
                    </div>
                    <video className='max-w-[740px] max-h-[740px] w-full h-full min-w-[420px] min-h-[420px] rounded-[24px] bg-black' controls >
                        <source src={'/audio-room.mp4'} type="video/mp4"/>
                    </video>
                </div>
            </div>

        </div>
        
    </div>
}