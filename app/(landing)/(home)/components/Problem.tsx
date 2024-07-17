import { ReactNode, useEffect, useRef, useState } from 'react';
import { MdiIcon, css } from '~/util';
import { mdiAccountGroup, mdiMapLegend } from '@mdi/js';
import { FaArrowUp, FaCheck, FaCircle, FaEquals, FaLine, FaPlus, FaRegFrown, FaRegSmile, FaRegSmileBeam, FaUser } from 'react-icons/fa';
import { FaFaceMeh, FaFaceSmile, FaRegFaceMeh, FaRegFaceSmile, FaX } from 'react-icons/fa6';
import Lottie from 'react-lottie-player';
import animationData from  './../../../../public/animations/hammer.json';
import { IoMdRadioButtonOn } from 'react-icons/io';
import Superiority from './SiteSuperiority';
//create a scenario
export default function CaseStudy() {

    return <div id="builderfive-case" className="relative w-full h-full">
        <div className='w-full h-full flex flex-col gap-[24px] items-center'>
             {/*<div id="problem" className='flex flex-row flex-wrap max-md:flex-col lg:grid lg:grid-cols-2 max-lg:gap-[48px] gap-[96px]'>
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
            </div>*/}

            <div id='competitors' className='w-fit bg-transparent rounded-[24px] gap-[24px]'>
                <p className='text-text3 font-bold text-4xl max-md:text-xl flex justify-start items-center w-full pb-[24px]'>You may have tried these apps . . .</p>
                <div className='flex flex-row justify-center max-lg:flex-col gap-[24px] max-md:items-center'>
                    <div className='p-[24px] gap-[24px] flex flex-col justify-start items-center bg-background2 rounded-[12px] max-w-xl w-full'>
                        <img src="/static/meetup.svg" alt="Meetup" className="aspect-square max-w-[128px] max-md:max-w-[64px] rounded-full" />
                        <div className='flex flex-col justify-start items-start w-full'>
                            <p className='text-text3 text-xl max-md:text-lg font-bold'>MEETUP</p>

                            <div className='flex flex-row gap-[12px] items-center justify-start'>
                                <FaCheck className='text-secondary1 h-[24px] w-[24px]'/> 
                                <p className='text-secondary1 text-xl max-md:text-lg font-medium'>Meeting real people</p>
                            </div>
                            <div className='flex flex-row gap-[12px] items-center justify-start'>
                                <FaX className='text-red-500 h-[24px] w-[24px]'/> 
                                <p className='text-red-500 text-xl max-md:text-lg font-medium'>Is it worth going to a meetup?</p>
                            </div>
                            <div className='flex flex-row gap-[12px] items-center justify-start'>
                                <FaX className='text-red-500 h-[24px] w-[24px]'/> 
                                <p className='text-red-500 text-xl max-md:text-lg font-medium'>Creating a group is expensive</p>
                            </div>
                            
                        </div>
                    </div>
                    <div className='p-[24px] gap-[24px] flex flex-col justify-start items-center bg-background2 rounded-[12px] max-w-xl w-full'>
                        <img src="/static/discord.svg" alt="Discord" className="aspect-square max-w-[128px] max-md:max-w-[64px] rounded-full" />
                        <div className='flex flex-col justify-start items-start w-full'>
                            <p className='text-text3 text-xl max-md:text-lg font-bold'>DISCORD</p>

                            <div className='flex flex-row gap-[12px] items-center justify-start'>
                                <FaCheck className='text-secondary1 h-[24px] w-[24px]'/> 
                                <p className='text-secondary1 max-md:text-lg text-xl font-medium'>Easy to find groups</p>
                            </div>
                            <div className='flex flex-row gap-[12px] items-center justify-start'>
                                <FaX className='text-red-500 h-[24px] w-[24px]'/> 
                                <p className='text-red-500 max-md:text-lg text-xl font-medium'>Hard to make real friends</p>
                            </div>
                            <div className='flex flex-row gap-[12px] items-center justify-start'>
                                <FaX className='text-red-500 h-[24px] w-[24px]'/> 
                                <p className='text-red-500 max-md:text-lg text-xl font-medium'>Too many inactive chats</p>
                            </div>
                        </div>
                    </div>
                    <div className='p-[24px] gap-[24px] flex flex-col justify-start items-center bg-background2 rounded-[12px] max-w-xl w-full'>
                        <img src="/static/clubhouse.svg" alt="Clubhouse" className="aspect-square max-w-[128px] max-md:max-w-[64px] rounded-full" />
                        <div className='flex flex-col justify-start items-start w-full'>
                            <p className='text-text3 text-xl max-md:text-lg font-bold'>CLUBHOUSE</p>

                            <div className='flex flex-row gap-[12px] items-center justify-start'>
                                <FaCheck className='text-secondary1 h-[24px] w-[24px]'/> 
                                <p className='text-secondary1 text-xl max-md:text-lg font-medium'>Authenticity with audio</p>
                            </div>
                            <div className='flex flex-row gap-[12px] items-center justify-start'>
                                <FaCheck className='text-secondary1 h-[24px] w-[24px]'/> 
                                <p className='text-secondary1 text-xl max-md:text-lg font-medium'>Discussing topics I like</p>
                            </div>
                            <div className='flex flex-row gap-[12px] items-center justify-start'>
                                <FaX className='text-red-500 h-[24px] w-[24px]'/> 
                                <p className='text-red-500 text-xl max-md:text-lg font-medium'>Not making real friendships</p>
                            </div>
                        </div>                
                    </div>
                </div>
            </div>
            <Superiority/>
        </div>
        
    </div>
}