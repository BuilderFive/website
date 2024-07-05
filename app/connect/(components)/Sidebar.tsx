'use client';

import { css } from '~/util';
import { Button, buttonVariants } from '../../../components/ui/button';
import { InstagramLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSession } from '~/util/AuthProvider';
import { useGroup } from '~/util/GroupProvider';
import { MediaConnection } from 'peerjs';
import { useProfile } from '~/util/ProfileProvider';
import { ControlBar, AudioVisualizer, LiveKitRoom, TrackRefContext, useEnsureTrackRef, useParticipantTile, useTracks } from '@livekit/components-react';
import { AudioConference } from '~/components/audio/room-conference';
import { Track } from 'livekit-client';
import Image from 'next/image';
import { FaAngleDown, FaAngleLeft, FaAngleRight, FaAngleUp, FaSpinner } from "react-icons/fa";
import { LuMegaphone } from "react-icons/lu";
import { Tables } from '~/util/supabase-types';
import { Spinner } from '@nextui-org/react';
import { useTheme } from 'next-themes';

export const Sidebar = () => {
    const { topic, setTopic, userLocation, loadedGroups, availableTopics, packagedGroup, leaveGroup, systemProcessGroupJoin, isLoading, radius, setRadius } = useGroup();
    const [open, setOpen] = useState(false);
    const filteredTopics = loadedGroups.filter(group => group.topic == topic);
    const { theme } = useTheme()
    const [radiusDropdownOpen, setRadiusDropdownOpen] = useState(false);

    const handleTopicChange = async (inputTopic: string) => {
        setOpen(false)
        if (topic == inputTopic) return;

        setTopic(inputTopic)
    };

    const Title = () => {
        const formatRadius = (radius: number): string => {
            const newRad = radius/1000
            const numberRad = newRad < 1 ? newRad.toFixed(2) : newRad.toFixed(0)
            const formattedDistance = numberRad.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return `${formattedDistance}km radius`
        };
        const RadiusDropdown = () => {
            const radiusOptions = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
            return <div className='relative w-fit'>
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

        return <div className='relative flex flex-row gap-[12px] pt-[12px] pb-[24px] justify-start items-center w-full h-fit'>
            <img src="/static/logos/blue-logo.svg" alt="BuilderFive" className="aspect-square h-[64px] rounded-full" />
            <div id="sidebar-title" className='flex flex-col h-fit w-full'>
                <p className='font-bold text-2xl text-secondary1'>BuilderFive</p>
                <div className='flex flex-col w-fit gap-[4px] items-center justify-center'>
                    
                    {/*<div className='flex flex-row gap-[4px] items-center justify-center'>
                        <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                            <circle r="6" cx="6" cy="8" fill="var(--activity-online)" />
                        </svg>
                        <p className='font-regular text-lg text-text1 truncate w-full'>32 online</p>
    </div>*/}
                    
                   <RadiusDropdown/>
                    
                </div>
            </div>
            
       </div>
    }
    const JoinButton = () => {
        const handleChange = async (inputTopic: string) => {
            if (packagedGroup) {
                //means user is currently in a call. Leave the group
                const response = await leaveGroup();
    
                //if response is successful, call joinGroup
                //not here rn because we don't know want successful response is
            }
            //check if user is already in a group, if so call leaveGroup and await for user confirmation
            systemProcessGroupJoin(inputTopic)
        };

        return <Button onClick={()=>{ 
            if (isLoading) return;
            handleChange(topic)
        }} className='h-fit w-full p-[12px] h-[70px] rounded-[12px] bg-secondary1'>
            {isLoading ? <FaSpinner size={"24px"} className='animate-spin' color={"white"} /> : <p className='text-white font-semibold text-xl'>Join a group</p>}
        </Button>
    }
    const TopicDrawer = () => {    
        return (<Button onClick={()=>setOpen(!open)} className="flex flex-row h-fit w-full p-[12px] rounded-[12px] bg-background3 justify-between items-center hover:bg-background2">
            <p className='text-text2 font-semibold text-lg'>{topic ? topic : "select topic"}</p>
            {open ? <FaAngleLeft size="20px" className='text-text2'/> : <FaAngleRight size="20px" className='text-text2'/>}
        </Button>)
    }
    //I'm building an audio based social network and meetup platform to call with local like-minded over shared interests to meetup in person at a nearby cafe
    const ActiveGroups = () => {
        return <div id='active-groups' className='flex flex-col w-full h-full'>
            <RenderGroups filteredTopics={filteredTopics} userLocation={userLocation} />
        </div>
    }
    

    return <div className='flex flex-row relative h-full'>
        <div className={`z-1 h-fit flex flex-col min-w-[280px] max-w-[360px] w-fit ${theme == "light" ? "bg-background1" : "bg-transparent"} px-[12px] pt-[24px] gap-[12px] items-center rounded-[12px] justify-start`}>
            <Title/>
            <JoinButton/>
            <TopicDrawer/>
            <ActiveGroups/>
        </div>
        {open && <div className={`ml-[8px] h-fit ${theme == "light" ? "bg-background1" : "bg-transparent"} px-[12px] pt-[24px] flex flex-col w-[240px] rounded-[12px]`}>
            <p className='font-bold text-[24px] text-text1'>Topics</p>
            <div className='flex flex-col'>
                {availableTopics.map((subj, id) => <div key={id} id="row-#" onClick={()=> handleTopicChange(subj)} className="hover:cursor-pointer hover:bg-background3 p-[8px] rounded-[12px]">
                    <p className='text-text1'>{subj}</p>
                </div>)}
            </div>
        </div>}
    </div>
};

const RenderGroups = ({ filteredTopics, userLocation }) => {
    const { leaveGroup } = useGroup()
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
  
      return () => clearInterval(intervalId);
    }, []);
  
    function getTimeRemaining(group) {
      const endAt = group.end_at;
      const endAtDate = new Date(endAt);
      const now = currentTime;
      const timeDiff = endAtDate.getTime() - now.getTime();
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
  
      return { minutes, seconds };
    }

    const getDistance = useMemo(() => {
        return (userLocation: {latitude, longitude}, groupLocation: {latitude, longitude}): string => {
            const user_latitude = userLocation.latitude
            const user_longitude = userLocation.longitude
            const group_latitude = groupLocation.latitude
            const group_longitude = groupLocation.longitude
            const toRadians = (degree) => degree * (Math.PI / 180);
            const R = 6371; // Radius of the Earth in kilometers
            const dLat = toRadians(group_latitude - user_latitude);
            const dLon = toRadians(group_longitude - user_longitude);
            const a = 
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRadians(user_latitude)) * Math.cos(toRadians(group_latitude)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c; // Distance in kilometers
            
            return distance < 10 ? distance.toFixed(2) : distance.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };
    }, []);
  
    const formatTime = (time) => {
        return Math.abs(time) < 10 ? `0${Math.abs(time)}` : Math.abs(time);
    }
  
    return filteredTopics.map((group: Tables<'groups'>) => {
      const timeLeft = getTimeRemaining(group);
      const formattedTimeText = () => {
        const sign = (timeLeft.minutes < 0 || timeLeft.seconds < 0) ? "-" : "";
        return <p className='text-text1 font-regular text-[12px]'>{sign}{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)} minutes remaining</p>
      }

      const groupLocation = { latitude: group.location[0], longitude: group.location[1]}
  
      return (
        <div key={group.group_uuid} className='flex flex-row gap-[12px] p-[12px] bg-background2 rounded-[12px] h-fit w-full'>
          <div className='bg-background3 p-[8px] rounded-full h-fit w-fit aspect-square'>
            <LuMegaphone size={24} color={"var(--text-2)"} />
          </div>
          <div className='justify-center items-center flex flex-col w-full h-fill'>
            <div className='flex flex-row justify-between w-full h-fit'>
                <p className='text-text1 font-regular text-[14px]'>{getDistance(userLocation, groupLocation)}km away</p> 
                {/** Amount of users in the group */}
            </div>
            {formattedTimeText()}
          </div>
        </div>
      );
    });
  }