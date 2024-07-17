"use client"
import { FaCheck, FaPlus, FaEquals, FaExternalLinkAlt } from "react-icons/fa";
import { IoMdRadioButtonOn } from "react-icons/io";
import { CtaButton } from "./CtaButton";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Superiority() {
    const router = useRouter();
    return (
        <div className="relative w-full h-full">
            <div id="builderfive" className="w-full h-full flex justify-center relative">
                <Link href={'/demo'}
                    className="hover:cursor-pointer max-md:hidden absolute p-[4px] w-fit rounded-full bg-gradient-to-r from-[var(--secondary-4)] to-[var(--secondary-1)] bg-[length:200%_200%] animate-gradient-x">
                    <img src="/static/logos/blue-logo.svg"
                        alt="BuilderFive"
                        className="aspect-square h-[256px] max-md:h-[128px] rounded-full w-full"
                        style={{ boxShadow: '0 0 100px 5px rgba(100, 97, 255, 0.5)' }} // Glow effect
                    />
                    <div className="absolute bottom-0 w-full text-center p-[12px] bg-secondary1 rounded-[24px]">
                        <p className="text-white text-4xl max-md:text-xl font-bold">BuilderFive</p>
                    </div>
                </Link>
                <div className="w-fit h-fit md:pt-[152px] min-h-[540px] border-secondary1 border-[4px] bg-secondary5 p-[24px] rounded-[24px] mt-[128px] flex flex-col gap-[24px] items-center" style={{ boxShadow: '0 0 100px 5px rgba(100, 97, 255, 0.5)' }}>
                    
                    <div className="md:hidden flex flex-row gap-[12px] w-fit items-center justify-center">
                        <img
                            src="/static/logos/logo-image.png"
                            alt="BuilderFive"
                            className="max-w-[36px] rounded-full w-full"
                        />
                        <p className="text-secondary1 text-4xl font-bold">BuilderFive</p>
                    </div>
                    
                    <div className="flex flex-col justify-start items-start relative">
                        
                        <div className="flex flex-row gap-[12px] items-center justify-start">
                            <FaCheck className="text-secondary1 h-[24px] w-[24px]" />
                            <p className="text-secondary1 text-2xl max-md:text-lg font-medium w-full">Meet new friends IRL, not strangers</p>
                        </div>
                        <div className="flex flex-row gap-[12px] items-center justify-start">
                            <FaCheck className="text-secondary1 h-[24px] w-[24px]" />
                            <p className="text-secondary1 text-2xl max-md:text-lg font-medium w-full">Voice calls feel more real than text</p>
                        </div>
                        <div className="flex flex-row gap-[12px] items-center justify-start">
                            <FaCheck className="text-secondary1 h-[24px] w-[24px]" />
                            <p className="text-secondary1 text-2xl max-md:text-lg font-medium w-full">Move from online chats to offline meetups</p>
                        </div>
                        <div className="flex flex-row gap-[12px] items-center justify-start">
                            <FaCheck className="text-secondary1 h-[24px] w-[24px]" />
                            <p className="text-secondary1 text-2xl max-md:text-lg font-medium w-full">Create groups for IRL meetups</p>
                        </div>
                        <div className="flex flex-row gap-[12px] items-center justify-start">
                            <IoMdRadioButtonOn className="text-text3 h-[24px] w-[24px]" />
                            <p className="text-text3 text-2xl max-md:text-lg font-medium w-full">Exclusive access for 2hrs once a week</p>
                        </div>
                        <div className="flex flex-row gap-[12px] items-center justify-start">
                            <IoMdRadioButtonOn className="text-text3 h-[24px] w-[24px]" />
                            <p className="text-text3 text-2xl max-md:text-lg font-medium w-full">Talk genuinely w/ small group of five</p>
                        </div>
                        <div className="flex flex-row gap-[12px] items-center justify-start">
                            <IoMdRadioButtonOn className="text-text3 h-[24px] w-[24px]" />
                            <p className="text-text3 text-2xl max-md:text-lg font-medium w-full">Navigate a globe instead of a list to join calls</p>
                        </div>
                        <div className="flex flex-row gap-[12px] mt-[24px] items-center justify-center w-full">
                            <img
                                src="/static/meetup.svg"
                                alt="Meetup"
                                className="aspect-square max-w-[96px] max-md:max-w-[64px] rounded-full w-full"
                            />
                            <FaPlus className="text-text1 max-w-[64px]" />
                            <img
                                src="/static/clubhouse.svg"
                                alt="Clubhouse"
                                className="aspect-square max-w-[96px] max-md:max-w-[64px] rounded-full w-full"
                            />
                            <FaEquals className="text-text1 max-w-[64px]" />
                            <img
                                src="/static/logos/blue-logo.svg"
                                alt="BuilderFive"
                                className="aspect-square max-w-[96px] max-md:max-w-[64px] rounded-full w-full"
                            />
                        </div>
                    </div>

                    <div className="flex w-full items-center justify-center">
                        <Link href={'/demo'} className="hover:cursor-pointer flex flex-row gap-[12px] items-center p-[12px] px-[24px] w-fit rounded-[24px] items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600">
                            <p className="text-white text-xl max-md:text-md font-medium ">See Demo</p>
                            <FaExternalLinkAlt className="text-white h-[24px] w-[24px]" />
                        </Link>
                    </div>

                    <video className="max-w-[740px] max-h-[740px] w-full h-full rounded-[24px] bg-black" controls>
                        <source src={"/audio-room.mp4"} type="video/mp4" />
                    </video>
                    <div className='w-full'>
                        <CtaButton>SOUNDS GOOD, LET ME JOIN</CtaButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
