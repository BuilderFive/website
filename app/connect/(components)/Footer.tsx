'use client';

import { css } from '~/util';
import { Button, buttonVariants } from '../../../components/ui/button';
import { InstagramLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useSession } from '~/util/AuthProvider';
import Modal from '~/components/ui/modal-auth';

const TopicDrawer = () => {
    const [open, setOpen] = useState(false);
    const { user } = useSession();
    const [showModal, setShowModal] = useState(false);
    const [topic, setTopic] = useState("")

    const topics = ["startups","productivity","academics", "careers", "science","history"]

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
            {topics.map((topic, id) => <div key={id} id="row-#" onClick={()=> {
                setTopic(topic)
                setOpen(false)
            }} className="hover:cursor-pointer hover:bg-background3 p-[8px] rounded-[12px] flex flex-row items-center gap-[8px]">
                <p className='text-text1'>{topic}</p>
            </div>)}
        </div>
        }
        <Modal showModal={showModal} setShowModal={setShowModal} />
    </div>)
}

export const Footer = ({rad} : {rad: number}) => {
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
                <p>{formatNumberWithCommas(rad)} meters</p>
                <p>Searching...</p>
            </div>
        </div>
    </footer>
};