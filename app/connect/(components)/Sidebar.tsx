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
import { useTimer } from '~/util/TimerProvider';
import { min } from 'lodash';

export const Sidebar = () => {
    const { topic, setTopic, userLocation, loadedGroups, availableTopics, packagedGroup, leaveGroup, joinRandomGroup, isLoading, radius, setRadius } = useGroup();
    const [open, setOpen] = useState(false);
    const filteredTopics = loadedGroups.filter(group => group.topic == topic);
    const { theme } = useTheme()
    const [radiusDropdownOpen, setRadiusDropdownOpen] = useState(false);
    const { event } = useSession()

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
                <div className='flex flex-col w-fit gap-[4px] items-center justify-center z-20'>
                    
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
            joinRandomGroup(inputTopic)
        };

        return <Button onClick={()=>{ 
            if (isLoading) return;
            handleChange(topic)
        }} disabled={event?.isActive ? false : true} className='h-fit w-full p-[12px] h-[70px] rounded-[12px] bg-secondary1'>
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
        return <div id='active-groups' className='flex flex-col w-full h-full gap-[12px]'>
            <RenderGroups filteredTopics={filteredTopics} userLocation={userLocation} />
        </div>
    }
    

    return <div className='z-20 flex flex-row relative h-full'>
        <div className={`h-fit flex flex-col min-w-[280px] max-w-[360px] w-fit ${theme == "light" ? "bg-background1" : "bg-transparent"} px-[12px] pt-[24px] pb-[12px] gap-[12px] items-center rounded-[12px] justify-start`}>
            <Title/>
            <JoinButton/>
            <TopicDrawer/>
            {filteredTopics.length > 0 && <ActiveGroups/>}
        </div>
        {open && <div className={`ml-[8px] h-fit ${theme == "light" ? "bg-background1" : "bg-transparent"} px-[12px] pt-[24px] flex flex-col w-[240px] rounded-[12px]`}>
            <p className='font-bold text-[24px] text-text1'>Topics</p>
            <div className='flex flex-col gap-[4px] pb-[12px]'>
                {availableTopics.map((subj, id) => <div key={id} id="row-#" onClick={()=> handleTopicChange(subj)} className="hover:cursor-pointer hover:bg-background3 p-[8px] rounded-[12px]">
                    <p className='text-text1'>{subj}</p>
                </div>)}
            </div>
        </div>}
    </div>
};

const RenderGroups = ({ filteredTopics, userLocation }) => {
    const { leaveGroup, joinGroup } = useGroup()
    const { currentTime } = useTimer();

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

      const formattedTimeText = () => {
        const timePassed = () => {
            const createdTime = new Date(group.created_at);
            const currentTime = new Date();
            const timeDiff = currentTime.getTime() - createdTime.getTime();
            const seconds = Math.floor(timeDiff / 1000);
            const minutes = Math.floor(timeDiff / (1000 * 60));
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);

            return { days, hours, minutes, seconds };
        }
        const { days, hours, minutes, seconds } = timePassed();
        const sign = (minutes < 0 || seconds < 0) ? "-" : "";
        if (minutes > 0) {
            if (minutes == 1) {
                return <p className='text-text3 font-regular text-[12px]'>Started {sign}{minutes} minute ago</p>
            } else {
                return <p className='text-text3 font-regular text-[12px]'>Started {sign}{minutes} minutes ago</p>
            }
        } else if (seconds > 0) {
            if (seconds > 10) {
                return <p className='text-text3 font-regular text-[12px]'>Started {sign}{seconds} seconds ago</p>
            } else {
                return <p className='text-text3 font-regular text-[12px]'>Started just now</p>
            }
        }
      }

      const groupLocation = { latitude: group.location[0], longitude: group.location[1]}
  
      return (
        <div key={group.group_uuid} onClick={()=>joinGroup(group)} className='flex flex-row gap-[12px] p-[12px] bg-background2 rounded-[12px] h-fit w-full hover:shadow-md hover:cursor-pointer'>
          <div className='bg-background3 p-[8px] rounded-full h-fit w-fit aspect-square'>
            <LuMegaphone size={24} color={"var(--text-2)"} />
          </div>
          <div className='justify-center items-end flex flex-col w-full h-fill'>
            <div className='flex flex-row justify-start w-full h-fit'>
                <p className='text-text1 font-semibold text-[16px]'>{group.title}</p>
                {/** Amount of users in the group */}
            </div>
            <p className='text-text3 font-regular text-[12px]'>{getDistance(userLocation, groupLocation)}km away</p> 
            {formattedTimeText()}
          </div>
        </div>
      );
    });
  }