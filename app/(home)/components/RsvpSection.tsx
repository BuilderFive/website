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
        <section id="rsvp" className="w-full">
            <div className="flex flex-col justify-center space-y-4">
                <div className="flex w-full justify-center items-center">
                    <section className="w-fit h-fit flex space-x-[24px] px-[48px] py-[12px]">
                        <section className="flex flex-col items-center">
                            <p className="text-sm text-stone-300">
                                WEEKS
                            </p>
                            <p className="text-4xl text-white">
                                02
                            </p>
                        </section>
                        <section className="flex flex-col items-center">
                            <p className="text-sm text-stone-300">
                                DAYS
                            </p>
                            <p className="text-4xl text-secondary1">
                                05
                            </p>
                        </section>
                        <section className="flex flex-col items-center">
                            <p className="text-sm text-stone-300">
                                HOURS
                            </p>
                            <p className="text-4xl text-white">
                                23
                            </p>
                        </section>
                    </section>
                </div>
                
                <div className="w-full max-w-sm space-y-3">
                    <form onSubmit={e => e.preventDefault()} className="flex space-x-2">
                        <Input
                            required
                            type="email"
                            value={email}
                            pattern={EMAIL_REGEX.source}
                            className="peer max-w-lg flex-1 h-26 bg-white text-gray-700 invalid:border-red-400"
                            placeholder="Enter your email"
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Button
                            className={css(
                                'transform transition-transform ease-in-out active:scale-90',
                                'peer-invalid:cursor-not-allowed peer-invalid:bg-secondary/60 peer-invalid:text-secondary-foreground/60 peer-invalid:dark:text-slate-400 peer-invalid:active:scale-100',
                                buttonVariants({ variant: 'secondary' }),
                            )}
                            disabled={loading}
                            onClick={e => handleSubmit(email)}
                        >
                            { loading && <MdiIcon path={mdiLoading} size="20px" className="animate-spin" /> }
                            { !loading && 'Join the waitlist' }
                        </Button>
                    </form>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Sign up to join the waitlist.{" "}
                        <Link className="underline underline-offset-2" href="#">
                            Terms & Conditions
                        </Link>
                    </p>
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