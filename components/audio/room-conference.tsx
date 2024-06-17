import * as React from 'react';
import { Track } from 'livekit-client';
import { WidgetState, useTracks, LayoutContextProvider, TrackLoop, ParticipantAudioTile } from '@livekit/components-react';
import { ControlBar } from './room-controls';
import Avatars from './room-participants';

/** @public */
export interface AudioConferenceProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * This component is the default setup of a classic LiveKit audio conferencing app.
 * It provides functionality like switching between participant grid view and focus view.
 *
 * @remarks
 * The component is implemented with other LiveKit components like `FocusContextProvider`,
 * `GridLayout`, `ControlBar`, `FocusLayoutContainer` and `FocusLayout`.
 *
 * @example
 * ```tsx
 * <LiveKitRoom>
 *   <AudioConference />
 * <LiveKitRoom>
 * ```
 * @public
 */
export function AudioConference({ ...props }: AudioConferenceProps) {
  const [widgetState, setWidgetState] = React.useState<WidgetState>({
    showChat: false,
    unreadMessages: 0,
  });
  const audioTracks = useTracks([Track.Source.Microphone], {onlySubscribed: true});

  return (
    <LayoutContextProvider onWidgetChange={setWidgetState}>
     {audioTracks && <div {...props}>
        <Avatars className='flex flex-row gap-[24px] jusify-start items-center'/>
        <ControlBar controls={{ leave: true, microphone: true, settings: false, camera: false, screenShare: false }} className='w-fit h-fit flex flex-row gap-[24px] text-text1'/>
      </div>}
    </LayoutContextProvider>
  );
}