'use client';

import { css } from '~/util';
import { Button, buttonVariants } from '../../../components/ui/button';
import { InstagramLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { useSession } from '~/util/AuthProvider';
import Modal from '~/components/ui/modal-auth';
import { useGroup } from '~/util/GroupProvider';

const TopicDrawer = () => {
    const [open, setOpen] = useState(false);
    const { user } = useSession();
    const [showModal, setShowModal] = useState(false);
    const { topic, handleSetTopic, availableTopics } = useGroup();

    const handleChange = async (topic: string) => {
        handleSetTopic(topic)
        setOpen(false)
      };

    return (<div className="flex-1 flex-col relative items-center justify-center">
        <div onClick={()=> {
            if (!user) {
                setShowModal(!showModal)
            } else {
                setOpen(!open)
            }
        }} className="flex items-center space-x-[12px] hover:cursor-pointer">
            {user ? <Button className='p-[12px] rounded-[8px] bg-secondary1 max-w-[180px] justify-start'>
                <p className='text-white font-semibold text-lg'>{topic ? topic : "select topic"}</p>
            </Button> : <Button className='p-[12px] rounded-[8px] bg-secondary1 max-w-[180px] justify-start'>
                <p className='text-white font-semibold text-lg'>SIGN IN</p>
            </Button>}

        </div>
        {open && user &&
        <div className="absolute shadow-md rounded-[12px] bottom-12 w-fit bg-background1 p-[12px] flex flex-col max-w-[180px]">
            {availableTopics.map((subj, id) => <div key={id} id="row-#" onClick={()=> handleChange(subj)} className="hover:cursor-pointer hover:bg-background3 p-[8px] rounded-[12px] flex flex-row items-center gap-[8px]">
                <p className='text-text1'>{subj}</p>
            </div>)}
        </div>
        }
        <Modal showModal={showModal} setShowModal={setShowModal} />
    </div>)
}

export const Footer = () => {
    const { radius, packagedGroup } = useGroup();
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

    //mute/leave icon

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
        if (timeRemaining.minutes == 0 && timeRemaining.seconds == 0) {
            return "Searching..."
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
        <div className="w-full flex flex-row justify-between pb-[24px] pt-[12px] px-[24px] items-start justify-center text-white">
            <div>
                <TopicDrawer/>
            </div>
            <div className="flex flex-col text-text1 text-sm">
                <p className='font-semibold text-lg'>{formatNumberWithCommas(radius)} meters</p>
                <p>{formattedTimeText()}</p>
            </div>
        </div>
    </footer>
};