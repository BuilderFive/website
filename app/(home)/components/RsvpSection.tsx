'use client';

import Link from 'next/link';

import { useEffect, useState } from 'react';
import { Globe } from './globe/Globe';
import { MdiIcon, css } from '~/util';
import { mdiCheck, mdiLoading } from '@mdi/js';
import { Input } from '~/components/ui/input';
import { Button, buttonVariants } from '~/components/ui/button';
import { supabase } from '~/util/supabaseClient';
import { count } from 'console';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const RsvpSection: React.FC = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [addedEmail, setAddedEmail] = useState(false);
    const [rsvpCount, setRsvpCount] = useState(0);

    const calculateTimeRemaining = () => {
        const currentDate = new Date();
        const futureDate = new Date();
        futureDate.setFullYear(2024, 5, 14);
        futureDate.setHours(12, 30, 30, 10);

        const timeDifference = futureDate.getTime() - currentDate.getTime();
        const weeks = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));
        const days = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        return { weeks, days, hours };
    };

    const fetchRSVP = async () => {
        const { data, error } = await supabase.from("rsvp").select('*', {count: 'exact'});
        if (error) console.error(error);
        return data
    }

    useEffect(() => {
        fetchRSVP().then(data => {
            if (data) {
                setRsvpCount(data.length);
            }
        });
    }, [rsvpCount]);

    const handleSubmit = async (email: string) => {
        if (!EMAIL_REGEX.test(email)) return;

        setLoading(true);

        const { data, error } = await supabase
            .from("rsvp")
            .upsert([{ email }]);
        if (error) console.error(error);
        
        await new Promise(resolve => setTimeout(resolve, 2000));

        setAddedEmail(true);
        setLoading(false);
    }

    return (
        <section id="rsvp" className="max-w-[500px] w-full">
            <div className="flex flex-col justify-center space-y-4">
                <div className="flex flex-col w-full justify-center items-center">
                    <section className="w-fit h-fit flex space-x-[24px] px-[48px] py-[12px]">
                        
                        <section className="flex flex-col items-center">
                            <p className="text-sm text-text5">
                                WEEKS
                            </p>
                            <p className='text-4xl text-white'>{calculateTimeRemaining().weeks}</p>
                        </section>
                        <section className="flex flex-col items-center">
                            <p className="text-sm text-text5">
                                DAYS
                            </p>
                            <p className="text-4xl text-white">
                                {calculateTimeRemaining().days}
                            </p>
                        </section>
                        <section className="flex flex-col items-center">
                            <p className="text-sm text-text5">
                                HOURS
                            </p>
                            <p className="text-4xl text-white">
                                {calculateTimeRemaining().hours}
                            </p>
                        </section>
                    </section>
                    <section className="flex flex-col self-start max-md:self-center">
                        <p className="text-xl text-text5 w-full font-semibold">
                            Join <a className='text-secondary1'>{rsvpCount}</a> early builders on launch day
                        </p>
                    </section>
                </div>
                <div className="w-full space-y-[12px]">
                    <form onSubmit={e => e.preventDefault()} className="flex items-center max-md:flex-col space-x-[12px] max-md:space-x-[0px] h-fit max-md:space-y-[12px]">
                        <Input required
                            type="email"
                            value={email}
                            pattern={EMAIL_REGEX.source}
                            className="w-full p-[24px] bg-white text-text6 text-xl invalid:border-red-400 rounded-[12px] h-fit"
                            placeholder="Enter your email"
                            onChange={e => setEmail(e.target.value)}/>
                        <Button variant='secondary'
                            className={"bg-secondary1 max-md:w-full rounded-[12px] h-fit p-[24px] max-md:p-[12px]"}
                            disabled={loading}
                            onClick={e => handleSubmit(email)}>
                            { loading && <MdiIcon path={mdiLoading} size="20px" className="animate-spin" /> }
                            { !loading && addedEmail && <MdiIcon path={mdiCheck} size="20px" />}
                            { !loading && addedEmail && <p className="font-semibold text-md">EMAIL ADDED</p>}

                            { !loading && !addedEmail && <p className="font-semibold text-md">JOIN EARLY WAITLIST</p> }
                        </Button>
                    </form>
                    <section className="flex flex-col items-start text-start max-md:text-center">
                        <p className="text-md text-text5 w-[80%] max-md:w-full">
                            Join as an early builder to collaborate in development and be the first to try our app
                        </p>
                    </section>
                </div>
            </div>
        </section>
    )
}