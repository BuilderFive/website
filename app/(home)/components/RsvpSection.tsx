'use client';

import Link from 'next/link';

import { useState } from 'react';
import { Globe } from './globe/Globe';
import { MdiIcon, css } from '~/util';
import { mdiLoading } from '@mdi/js';
import { Input } from '~/components/ui/input';
import { Button, buttonVariants } from '~/components/ui/button';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const RsvpSection: React.FC = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (email: string) => {
        if (!EMAIL_REGEX.test(email)) return;

        setLoading(true);
        
        await new Promise(resolve => setTimeout(resolve, 2000));

        setLoading(false);
    }

    return (
        <section id="rsvp" className="max-w-[500px] w-full">
            <div className="flex flex-col justify-center space-y-4">
                <div className="flex w-full justify-center items-center">
                    <section className="w-fit h-fit flex space-x-[24px] px-[48px] py-[12px]">
                        <section className="flex flex-col items-center">
                            <p className="text-sm text-text5">
                                WEEKS
                            </p>
                            <p className="text-4xl text-white">
                                02
                            </p>
                        </section>
                        <section className="flex flex-col items-center">
                            <p className="text-sm text-text5">
                                DAYS
                            </p>
                            <p className="text-4xl text-white">
                                05
                            </p>
                        </section>
                        <section className="flex flex-col items-center">
                            <p className="text-sm text-text5">
                                HOURS
                            </p>
                            <p className="text-4xl text-white">
                                23
                            </p>
                        </section>
                    </section>
                </div>
                <div className="w-full space-y-[12px]">
                    <form onSubmit={e => e.preventDefault()} className="flex max-md:flex-col space-x-[12px] max-md:space-x-[0px] max-md:space-y-[12px]">
                        <Input required
                            type="email"
                            value={email}
                            pattern={EMAIL_REGEX.source}
                            className="w-full p-[24px] bg-white text-text6 invalid:border-red-400 rounded-[12px] h-full"
                            placeholder="Enter your email"
                            onChange={e => setEmail(e.target.value)}/>
                        <Button variant='secondary'
                            className={"bg-secondary1 rounded-[12px] h-full p-[24px] max-md:p-[12px]"}
                            disabled={loading}
                            onClick={e => handleSubmit(email)}>
                            { loading && <MdiIcon path={mdiLoading} size="20px" className="animate-spin" /> }
                            { !loading && <p className="font-semibold text-md">JOIN EARLY</p> }
                        </Button>
                    </form>
                    <section className="flex flex-col items-start text-center">
                        <p className="text-md text-text5 w-full">
                            Join as an early builder to collaborate in development and receive exclusive benefits on launch day
                        </p>
                    </section>
                </div>
            </div>
        </section>
    )
}

export const globe = () => {
    return <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last">
        <Globe />
    </div>
}