"use client"

import { useState } from "react"
import { FaAngleDown, FaAngleLeft, FaAngleRight, FaAngleUp } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useGroup } from "~/util/GroupProvider";
import { Button } from "~/components/ui/button";
import { FaX } from "react-icons/fa6";

export default function MobileSidebar() {
    const [isOpen, setOpen] = useState(false)
    const [radiusDropdownOpen, setRadiusDropdownOpen] = useState(false);
    const [topicDropdownOpen, setTopicDropdownOpen] = useState(false);
    const { radius, setRadius, topic, setTopic, availableTopics } = useGroup()

    const Title = () => {
        const formatRadius = (radius: number): string => {
            const newRad = radius/1000
            const numberRad = newRad < 1 ? newRad.toFixed(2) : newRad.toFixed(0)
            const formattedDistance = numberRad.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return `${formattedDistance}km radius`
        };
        const RadiusDropdown = () => {
            const radiusOptions = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
            
            return <div className='relative w-full'>
                <div onClick={()=>setRadiusDropdownOpen(!radiusDropdownOpen)} className='flex flex-row items-center justify-center p-[12px] rounded-[12px] bg-background3 gap-x-[12px] hover:bg-background2 hover:cursor-pointer'>
                    <p className='font-regular text-md text-text1 truncate w-full'>{formatRadius(radius)}</p>
                    {!radiusDropdownOpen ? <FaAngleDown size="16px" className='text-text1'/> : <FaAngleUp size="16px" className='text-text1'/>}
                </div>
                {radiusDropdownOpen && <div className={`absolute mt-[12px] w-full h-fit bg-background1 p-[12px] flex flex-col rounded-[12px]`}>
                    <div className='flex flex-col'>
                        {radiusOptions.map((rad, id) => <div key={id} onClick={()=> {
                            setRadius(rad*1000)
                            setRadiusDropdownOpen(false)
                        }} className="hover:cursor-pointer hover:bg-background3 p-[8px] rounded-[12px]">
                            <p className='text-text1'>{rad}km</p>
                        </div>)}
                    </div>
                </div>}
            </div>
        }

        return <div className='relative flex flex-row gap-[12px] py-[12px] justify-start items-center w-full h-fit'>
            <img src="/static/logos/blue-logo.svg" alt="BuilderFive" className="aspect-square h-[64px] rounded-full" />
            <div id="sidebar-title" className='flex flex-col h-fit w-full'>
                <div className="flex flex-row justify-between">
                    <p className='font-bold text-2xl text-secondary1'>BuilderFive</p>
                    <FaX color="var(--text-1)" className='aspect-square h-[20px] hover:cursor-pointer text-text1' onClick={()=>setOpen(false)}/>
                </div>
                <div className='flex flex-col w-full gap-[4px] items-center justify-center z-20'>
                   <RadiusDropdown/>
                </div>
            </div>
            
       </div>
    }
    const handleTopicChange = async (inputTopic: string) => {
        setOpen(false)
        if (topic == inputTopic) return;

        setTopic(inputTopic)
    };
    const TopicDrawer = () => {    
        return (<Button onClick={()=>setTopicDropdownOpen(!topicDropdownOpen)} className="flex flex-row h-fit w-full p-[12px] rounded-[12px] bg-background3 justify-between items-center hover:bg-background2">
            <p className='font-regular text-md text-text1 truncate w-fit'>{topic ? topic : "select topic"}</p>
            {!topicDropdownOpen ? <FaAngleDown size="16px" className='text-text1'/> : <FaAngleUp size="16px" className='text-text1'/>}
        </Button>)
    }
    const Drawer = () => {
        return <div className="absolute mt-[12px] w-full h-fit bg-background1 p-[12px] rounded-[12px]">
            <div className="flex flex-col">
                <Title />
                <TopicDrawer />
            </div>
            {topicDropdownOpen && <div className={`ml-[8px] h-fit `}>
                <div className='flex flex-col gap-[4px] pb-[12px]'>
                    {availableTopics.map((subj, id) => <div key={id} id="row-#" onClick={()=> handleTopicChange(subj)} className="hover:cursor-pointer hover:bg-background3 p-[8px] rounded-[12px]">
                        <p className='text-text1'>{subj}</p>
                    </div>)}
                </div>
            </div>}
        </div>
    }


    const Hamburger = () => {
        return <div onClick={()=>setOpen(!isOpen)} className="relative hover:cursor-pointer">
            <GiHamburgerMenu className="aspect-square md:h-[48px] h-[36px] md:w-[48px] w-[36px] h-full"/>
        </div>
    }
    return <div className="w-full">
        <Hamburger />
        {isOpen && <Drawer />}
    </div>
}