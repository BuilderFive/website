import { FaCheck, FaPlus, FaEquals } from "react-icons/fa";
import { IoMdRadioButtonOn } from "react-icons/io";

export default function Superiority() {
    return <div className="relative w-full h-full">

    
    <div id="builderfive" className='w-full h-full flex justify-center relative'>
    <div className='absolute p-[4px] w-fit rounded-full bg-gradient-to-r from-[var(--secondary-4)] to-[var(--secondary-1)] bg-[length:200%_200%] animate-gradient-x'>
        <img src="/static/logos/blue-logo.svg" alt="BuilderFive" className="aspect-square h-[256px] rounded-full w-full" />
        <div className='absolute bottom-0 w-full text-center p-[12px] bg-secondary1 rounded-[24px]'>
            <p className='text-text1 text-4xl font-bold'>BuilderFive</p>
        </div>
    </div>
    <div className='w-full h-fit pt-[152px] min-h-[540px] border-secondary1 border-[4px] bg-background1 p-[24px] rounded-[24px] mt-[128px] flex flex-row max-lg:flex-col flex-wrap flex-1 gap-[24px] justify-between items-center'>
        <div className='flex flex-col justify-start items-start'>
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
            <div className='flex flex-row max-md:flex-col gap-[12px] mt-[24px] items-center justify-center max-md:w-full'>
                <img src="/static/meetup.svg" alt="Meetup" className="aspect-square h-[128px] rounded-full" />
                <FaPlus className='text-text1 h-[64px] w-[64px]'/> 
                <img src="/static/clubhouse.svg" alt="Clubhouse" className="aspect-square h-[128px] rounded-full" />
                <FaEquals className='text-text1 h-[64px] w-[64px]'/> 
                <img src="/static/logos/blue-logo.svg" alt="BuilderFive" className="aspect-square h-[128px] rounded-full" />

            </div>
        </div>
        <video className='max-w-[740px] max-h-[740px] w-full h-full rounded-[24px] bg-black' controls >
            <source src={'/audio-room.mp4'} type="video/mp4"/>
        </video>
    </div>
</div></div>
}