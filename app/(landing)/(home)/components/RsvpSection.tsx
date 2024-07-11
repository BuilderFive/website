'use client';

import Link from 'next/link';

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Globe } from './globe/Globe';
import { MdiIcon, css } from '~/util';
import { mdiCheck, mdiLoading } from '@mdi/js';
import { Input } from '~/components/ui/input';
import { Button, buttonVariants } from '~/components/ui/button';
import { supabase } from '~/util/supabaseClient';
import { count } from 'console';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const RsvpSection = ({setLoaded}) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [addedEmail, setAddedEmail] = useState(false);
    const [rsvpCount, setRsvpCount] = useState(0);
    
    
    const fetchRSVP = async () => {
        const { data, error } = await supabase.from("rsvp").select('*', {count: 'exact'});
        if (error) console.error(error);
        return data
    }

    useEffect(() => {
        fetchRSVP().then(data => {
            setLoaded(true);
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
        <section id="rsvp" className="w-full flex items-center justify-center"> 
            <div className="w-full space-y-[12px] max-md:w-[90%]">
                <section className="flex flex-col self-start max-md:self-center">
                    <p className="text-4xl text-white w-full font-semibold">
                        Out of <a className='text-secondary1 underline'>{rsvpCount}</a> 
                        people you will find <a className='text-secondary1 underline'>at least one</a> 
                        who shares your interests at our voice call event 
                        <a className='text-secondary1 underline'>this weekend</a>
                    </p>
                </section>
                <form name='email-input' onSubmit={e => e.preventDefault()} className="flex items-center max-md:flex-col space-x-[12px] max-md:space-x-[0px] h-fit max-md:space-y-[12px]">
                    <Input required
                        type="email"
                        value={email}
                        pattern={EMAIL_REGEX.source}
                        className="w-full p-[24px] bg-white text-text6 text-xl invalid:border-red-400 rounded-[12px] h-fit"
                        placeholder="Enter your email to try now!"
                        onChange={e => setEmail(e.target.value)}/>
                    <Button variant='default'
                        className={"bg-secondary1 max-md:w-full rounded-[12px] h-fit p-[24px] max-md:p-[12px]"}
                        disabled={loading}
                        onClick={e => handleSubmit(email)}>
                        { loading && <MdiIcon path={mdiLoading} size="20px" className="animate-spin" /> }
                        { !loading && addedEmail && <MdiIcon path={mdiCheck} size="20px" />}
                        { !loading && addedEmail && <p className="font-semibold text-lg">EMAIL ADDED</p>}

                        { !loading && !addedEmail && <p className="font-semibold text-lg text-white">BE REMINDED</p> }
                    </Button>
                </form>
            </div>
        </section>
    )
}