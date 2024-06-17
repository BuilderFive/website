import { AudioTrack, AudioVisualizer, ConnectionQualityIndicator, ParticipantName, ParticipantTileProps, TrackLoop, TrackMutedIndicator, TrackRefContext, useEnsureTrackRef, useParticipantTile, useTracks } from "@livekit/components-react";
import * as React from 'react';
import { isTrackReference } from '@livekit/components-core';
import { Track } from 'livekit-client';
import { useGroup } from "~/util/GroupProvider";

export interface RoomParticipantsProps extends React.HTMLAttributes<HTMLDivElement> {}

const Avatars = ({ ...props }: RoomParticipantsProps) => {
    const audioTracks = useTracks([Track.Source.Microphone], {onlySubscribed: true});
    const { packagedGroup } = useGroup();

    if (packagedGroup == null) return null;

    return <div {...props}>
      {audioTracks.map((trackReference) => {
        return (
          <TrackRefContext.Provider value={trackReference}>
            {/*<AudioVisualizer />*/}
            <AudioTrack trackRef={trackReference} />
            <div id="audio-participant" className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center h-[48px] w-[48px] aspect-square rounded-full bg-background3">
                <TrackMutedIndicator trackRef={trackReference}/>
              </div>
              <ParticipantName className="text-text1 text-xs" />
            </div>
            
          </TrackRefContext.Provider>
        )
      })}
    </div>
    
}

export default Avatars