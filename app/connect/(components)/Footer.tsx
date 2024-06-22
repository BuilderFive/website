'use client';

import { css } from '~/util';
import { Button, buttonVariants } from '../../../components/ui/button';
import { InstagramLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import React, { useEffect, useRef, useState } from 'react';
import { useSession } from '~/util/AuthProvider';
import Modal from '~/components/ui/modal-auth';
import { useGroup } from '~/util/GroupProvider';
import { MediaConnection } from 'peerjs';
import { useProfile } from '~/util/ProfileProvider';
import { ControlBar, AudioVisualizer, LiveKitRoom, TrackRefContext, useEnsureTrackRef, useParticipantTile, useTracks } from '@livekit/components-react';
import { AudioConference } from '~/components/audio/room-conference';
import { Track } from 'livekit-client';

export const Footer = () => {
    const { radius, packagedGroup, topic, leaveGroup } = useGroup();
    const { first_name, last_name } = useProfile()
    const { user } = useSession();
    const name = `${first_name} ${last_name}`;
    const [token, setToken] = useState("");
    const room = packagedGroup?.group.group_uuid;
    const [timeRemaining, setTimeRemaining] = useState({ minutes: 0, seconds: 0 });
    
    useEffect(() => {
        if (!first_name || !last_name) return;

        (async () => {
        try {
            const resp = await fetch(
            `/api/get-participant-token?room=${room}&username=${name}`
            );
            const data = await resp.json();
            setToken(data.token);
        } catch (e) {
            console.error(e);
        }
        })();
    }, [first_name, last_name, room]);

    useEffect(() => {
        const initialRemaining = getTimeRemaining();
        if (initialRemaining) {
            setTimeRemaining(initialRemaining);
        }

        const updateTimer = () => {
            setTimeRemaining((prev) => {
                let { minutes, seconds } = prev;
                //if packagedGroup becomes null then clear interval
                if (packagedGroup == null) {
                    clearInterval(interval);
                    return { minutes: 0, seconds: 0 };
                }

                if (seconds > 0) {
                    seconds -= 1;
                } else if (minutes > 0) {
                    minutes -= 1;
                    seconds = 59;
                } else {
                    //function to leave group when interval drops to 0
                    leaveGroup();
                    clearInterval(interval);
                }

                return { minutes, seconds };
            });
        };

        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [packagedGroup, user]);

    function getTimeRemaining() {
        if (packagedGroup == null) return null;
        const endAt = packagedGroup.group.end_at;

        if (endAt) {
            const endAtDate = new Date(endAt);
            const now = new Date();
            const timeDiff = endAtDate.getTime() - now.getTime();
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
        } else if (timeRemaining.minutes <= 0 && timeRemaining.seconds <= 0) {
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

    return <footer className="w-full bg-background1 text-text1">
        <LiveKitRoom audio={true}
            token={token} className="w-full h-[80px] flex flex-row justify-between py-[12px] px-[12px] gap-[24px] items-center justify-center"
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            // Use the default LiveKit theme for nice styles.
            data-lk-theme="default">
                
            <AudioConference className='flex flex-row text-text1 w-full justify-between items-center'/>
            <div id="details" className="flex flex-col text-text1 text-sm">
                <p className='font-semibold text-lg truncate'>{formatNumberWithCommas(radius)} meters</p>
                <p>{formattedTimeText()}</p>
            </div>
        </LiveKitRoom>
    </footer>
};
