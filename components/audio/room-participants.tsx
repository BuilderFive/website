import { AudioTrack, AudioVisualizer, ConnectionQualityIndicator, ParticipantName, ParticipantTileProps, TrackLoop, TrackMutedIndicator, TrackRefContext, useEnsureTrackRef, useParticipantTile, useTrackVolume, useTracks } from "@livekit/components-react";
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
          <TrackRefContext.Provider key={trackReference.participant.identity} value={trackReference}>
            <AudioTrack trackRef={trackReference} />
            <div id="audio-participant" className={`relative flex flex-col items-center justify-center`}>
              <div className={`flex items-center justify-center h-[64px] w-[64px] aspect-square rounded-full bg-background3 ${trackReference.participant.audioLevel && "border-[2px] border-success1"}`}>
                <TrackMutedIndicator trackRef={trackReference}/>
              </div>
              <ParticipantName className="absolute text-text1 text-xs bottom-0 truncate" />
            </div>
            
          </TrackRefContext.Provider>
        )
      })}
    </div>
    
}

export default Avatars