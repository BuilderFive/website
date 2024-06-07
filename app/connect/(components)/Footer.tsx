'use client';

import { css } from '~/util';
import { Button, buttonVariants } from '../../../components/ui/button';
import { InstagramLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { useSession } from '~/util/AuthProvider';
import Modal from '~/components/ui/modal-auth';
import { useGroup } from '~/util/GroupProvider';
import { IoVolumeMute } from "react-icons/io5";
import { MdCallEnd } from "react-icons/md";
import { FaQ, FaQuestion } from "react-icons/fa6";
import Image from 'next/image';
import Logo from '../../../public/static/logos/blue-logo.png';
import { FaSearchLocation } from 'react-icons/fa';

const TopicDrawer = () => {
    const [open, setOpen] = useState(false);
    const { user } = useSession();
    const [showModal, setShowModal] = useState(false);
    const { topic, handleSetTopic, availableTopics } = useGroup();

    const handleChange = async (inputTopic: string) => {
        setOpen(false)
        if (inputTopic != topic) {
            handleSetTopic(inputTopic)
        }
      };

    return (<div className="flex-1 flex-col relative items-center justify-center">
        <div onClick={()=> {
            if (!user) {
                setShowModal(!showModal)
            } else {
                setOpen(!open)
            }
        }} className="flex items-center space-x-[12px] hover:cursor-pointer h-full">
            {user ? <Button className='h-full p-[12px] rounded-[8px] bg-secondary1 max-w-[180px] justify-start'>
                <p className='text-white font-semibold text-lg'>{topic ? topic : "select topic"}</p>
            </Button> : <Button className='h-full p-[12px] rounded-[8px] bg-secondary1 max-w-[180px] justify-start'>
                <p className='text-white font-semibold text-lg'>SIGN IN</p>
            </Button>}

        </div>
        {open && user &&
        <div className="absolute shadow-md rounded-[12px] bottom-20 w-fit bg-background1 p-[12px] flex flex-col max-w-[180px]">
            {availableTopics.map((subj, id) => <div key={id} id="row-#" onClick={()=> handleChange(subj)} className="hover:cursor-pointer hover:bg-background3 p-[8px] rounded-[12px] flex flex-row items-center gap-[8px]">
                <p className='text-text1'>{subj}</p>
            </div>)}
        </div>
        }
        <Modal showModal={showModal} setShowModal={setShowModal} />
    </div>)
}

export const Footer = () => {
    const { radius, packagedGroup, topic } = useGroup();
    const [timeRemaining, setTimeRemaining] = useState({ minutes: 0, seconds: 0 });

    useEffect(() => {
        const initialRemaining = getTimeRemaining();
        if (initialRemaining) {
            setTimeRemaining(initialRemaining);
        }

        const updateTimer = () => {
            setTimeRemaining((prev) => {
                let { minutes, seconds } = prev;

                if (seconds > 0) {
                    seconds -= 1;
                } else if (minutes > 0) {
                    minutes -= 1;
                    seconds = 59;
                } else {
                    clearInterval(interval);
                }

                return { minutes, seconds };
            });
        };

        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [packagedGroup]);

    //create avatar icons
    const Avatars = () => {
        if (packagedGroup == null) {
            return <div className='flex flex-row gap-[24px] jusify-start items-center'>
                <img src="/static/logos/blue-logo.svg" alt="User's avatar" width={64} height={64} className="rounded-[99px]" />
                {[1, 2, 3, 4].map((id) => (<div key={id} className='rounded-[99px] h-[64px] w-[64px] flex items-center justify-center bg-background3'>
                    <FaQuestion color={"var(--text-2)" } size={36} />
                </div>))}
            </div>
        }

        const memberIcons = packagedGroup.members.map((member, id) => (
            <Image key={id} src={member.avatar} alt="avatar" width={64} height={64} className={css({ borderRadius: 99 })} />
        ));
        const questionMarkIcons = Array(packagedGroup.group.max_members - memberIcons.length).map((id) => (
            <div key={memberIcons.length + id} className='rounded-[99px] h-[64px] w-[64px] flex items-center justify-center bg-background3'>
                <FaQuestion color={"var(--text-2)" } size={36} />
            </div>
        ));

        return <div className='flex flex-row gap-[24px] jusify-start items-center'>
            {[...memberIcons, ...questionMarkIcons]}
        </div>
        
    }

    //mute/leave icon
    const MuteIcon = () => {
        return <div className='h-[64px] w-[64px] flex flex-col items-center justify-center bg-background2 rounded-[12px]'>
            <IoVolumeMute color={"var(--secondary-1)"} />
            <p className='font-regular text-[14px] text-secondary1'>Mute</p>
        </div>
    }

    const LeaveIcon = () => {
        return <div className='h-[64px] w-[64px] flex flex-col items-center justify-center bg-background2 rounded-[12px]'>
            <MdCallEnd color={"var(--error-1)"} />
            <p className='font-regular text-[14px] text-error1'>Leave</p>
        </div>
    }

    function getTimeRemaining() {
        //const timeRemaining = packagedGroup?.group.end_at;
        const endAt = new Date();
        endAt.setMinutes(endAt.getMinutes() + 1);

        if (endAt) {
            const now = new Date();
            const timeDiff = endAt.getTime() - now.getTime();
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            return { minutes, seconds };
        } else {
            return null
        }
    }

    const formatTime = (time) => {
        return time < 10 ? `0${time}` : time;
    };
    const formattedTimeText = () => {
        if (packagedGroup == null) {
            return topic ? "Searching..." : "Choose a topic"
        } else {
            return `${formatTime(timeRemaining.minutes)}:${formatTime(timeRemaining.seconds)} remaining`
        
        }
    }
    function formatNumberWithCommas(number) {
        if (typeof number !== 'number') {
            throw new TypeError('The input must be a number');
        }
        return number.toLocaleString('en-US');
    }
    return <footer className="bottom-0 w-full absolute bg-background1 text-text1">
        <div className="w-full flex flex-row justify-between py-[24px] px-[24px] items-start justify-center text-white">
            <div className='flex flex-row gap-[48px]'>
                <TopicDrawer/>
                {topic && <Avatars/>}
            </div>
            <div className='flex flex-row gap-[48px]'>
                {packagedGroup && <div id="options" className='flex flex-row gap-[24px]'>
                    <MuteIcon/>
                    <LeaveIcon/>
                </div>}
                <div id="details" className="flex flex-col text-text1 text-sm">
                    <p className='font-semibold text-lg'>{formatNumberWithCommas(radius)} meters</p>
                    <p>{formattedTimeText()}</p>
                </div>
            </div>
            
        </div>
    </footer>
};