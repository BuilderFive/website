"use client";

import '@livekit/components-styles';
import {
  LiveKitRoom,
  VideoConference,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  ControlBar,
  useTracks,
  AudioConference,
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import { useEffect, useState } from 'react';
import { useProfile } from '~/util/ProfileProvider';
import { useRouter } from 'next/router';

export default function Room() {
    const { room } = useRouter().query;
    const { first_name, last_name } = useProfile()
    //const room = packagedGroup?.group.group_uuid;
    const name = `${first_name} ${last_name}`;
    const [token, setToken] = useState("");
    console.log('room')
    
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

    if (token === "") {
        //set up a loading page
        return <div>Getting token...</div>;
    }

    return (
        <LiveKitRoom
            audio={true}
            token={token}
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            // Use the default LiveKit theme for nice styles.
            data-lk-theme="default"
            style={{ height: '100dvh' }}>
            {/* Your custom component with basic video conferencing functionality. */}
            
            <AudioConference/>
            {/* Controls for the user to start/stop audio, video, and screen
            share tracks and to leave the room. */}
            <ControlBar />
        </LiveKitRoom>
    );
    }

    function MyVideoConference() {
    // `useTracks` returns all camera and screen share tracks. If a user
    // joins without a published camera track, a placeholder track is returned.
    const tracks = useTracks(
        [
        { source: Track.Source.Camera, withPlaceholder: true },
        { source: Track.Source.ScreenShare, withPlaceholder: false },
        ],
        { onlySubscribed: false },
    );
    return (
        <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
        {/* The GridLayout accepts zero or one child. The child is used
        as a template to render all passed in tracks. */}
        <ParticipantTile />
        </GridLayout>
    );
}