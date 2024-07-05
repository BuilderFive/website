'use client';

import { css } from '~/util';
import { Button, buttonVariants } from '../../../components/ui/button';
import { InstagramLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import React, { useEffect, useRef, useState } from 'react';
import { useSession } from '~/util/AuthProvider';
import { useGroup } from '~/util/GroupProvider';
import { MediaConnection } from 'peerjs';
import { useProfile } from '~/util/ProfileProvider';
import { ControlBar, AudioVisualizer, LiveKitRoom, TrackRefContext, useEnsureTrackRef, useParticipantTile, useTracks } from '@livekit/components-react';
import { AudioConference } from '~/components/audio/room-conference';
import { Track } from 'livekit-client';
import { useTheme } from 'next-themes';

export const Footer = () => {
    const { radius, packagedGroup, topic, leaveGroup, setLoading, isLoading } = useGroup();
    const { first_name, last_name } = useProfile()
    const { user } = useSession();
    const name = `${first_name} ${last_name}`;
    const [token, setToken] = useState("");
    const room = packagedGroup?.group.group_uuid;
    const [timeRemaining, setTimeRemaining] = useState({ minutes: 0, seconds: 0 });
    const { theme } = useTheme()
    
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
    
    function formatNumberWithCommas(number) {
        if (typeof number !== 'number') {
            throw new TypeError('The input must be a number');
        }
        const newRad = radius/1000
        const numberRad = newRad < 1 ? newRad.toFixed(2) : newRad.toFixed(0)
        const formattedDistance = numberRad.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return `${formattedDistance}km radius`
    }

    return <footer className={`w-full ${theme == "light" ? "bg-background1" : "bg-background3"} text-text1`}>
        <LiveKitRoom audio={true}
            token={token} className="w-full h-[80px] flex flex-row justify-between py-[12px] px-[12px] gap-[24px] items-center justify-center"
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            // Use the default LiveKit theme for nice styles.
            data-lk-theme="default">
                
            <AudioConference className='flex flex-row text-text1 w-full justify-between items-center'/>
            <div id="details" className="flex flex-col text-text1 text-sm">
                <p className='font-semibold text-text1 text-lg truncate'>{formatNumberWithCommas(radius)}</p>
            </div>
        </LiveKitRoom>
    </footer>
};
