import { useMaybeLayoutContext, useLocalParticipantPermissions, usePersistentUserChoices, TrackToggle, MediaDeviceMenu, ChatToggle, ChatIcon, LeaveIcon } from '@livekit/components-react';
import { GearIcon } from '@radix-ui/react-icons';
import { Track } from 'livekit-client';
import * as React from 'react';
import { mergeProps } from '~/util/hooks/mergeprops';
import { StartMediaButton } from './StartMediaButton';
import { SettingsMenuToggle } from './room-settings';
import { DisconnectButton } from './disconnect-button';
import { useGroup } from '~/util/GroupProvider';
import { useTheme } from 'next-themes';
/** @public */
export type ControlBarControls = {
  microphone?: boolean;
  camera?: boolean;
  chat?: boolean;
  screenShare?: boolean;
  leave?: boolean;
  settings?: boolean;
};

/** @public */
export interface ControlBarProps extends React.HTMLAttributes<HTMLDivElement> {
  variation?: 'minimal' | 'verbose' | 'textOnly';
  controls?: ControlBarControls;
  /**
   * If `true`, the user's device choices will be persisted.
   * This will enables the user to have the same device choices when they rejoin the room.
   * @defaultValue true
   * @alpha
   */
  saveUserChoices?: boolean;
}

/**
 * The `ControlBar` prefab gives the user the basic user interface to control their
 * media devices (camera, microphone and screen share), open the `Chat` and leave the room.
 *
 * @remarks
 * This component is build with other LiveKit components like `TrackToggle`,
 * `DeviceSelectorButton`, `DisconnectButton` and `StartAudio`.
 *
 * @example
 * ```tsx
 * <LiveKitRoom>
 *   <ControlBar />
 * </LiveKitRoom>
 * ```
 * @public
 */
export function ControlBar({
  variation,
  controls,
  saveUserChoices = true,
  ...props
}: ControlBarProps) {
  const { leaveGroup } = useGroup();
  const defaultVariation = 'verbose';
  variation ??= defaultVariation;

  const visibleControls = { leave: true, microphone: true, ...controls };
  const { theme } = useTheme()
  const localPermissions = useLocalParticipantPermissions();

  if (!localPermissions) {
    visibleControls.camera = false;
    visibleControls.microphone = false;
  } else {
    visibleControls.camera ??= localPermissions.canPublish;
    visibleControls.microphone ??= localPermissions.canPublish;
  }

  const showIcon = React.useMemo(
    () => variation === 'minimal' || variation === 'verbose',
    [variation],
  );
  const showText = React.useMemo(
    () => variation === 'textOnly' || variation === 'verbose',
    [variation],
  );

  const htmlProps = mergeProps({ className: 'lk-control-bar' }, props);

  const {
    saveAudioInputEnabled,
    saveVideoInputEnabled,
    saveAudioInputDeviceId,
    saveVideoInputDeviceId,
    userChoices
  } = usePersistentUserChoices({ preventSave: !saveUserChoices });

  const microphoneOnChange = React.useCallback(
    (enabled: boolean, isUserInitiated: boolean) =>
      isUserInitiated ? saveAudioInputEnabled(enabled) : null,
    [saveAudioInputEnabled],
  );

  const cameraOnChange = React.useCallback(
    (enabled: boolean, isUserInitiated: boolean) =>
      isUserInitiated ? saveVideoInputEnabled(enabled) : null,
    [saveVideoInputEnabled],
  );

  return (
    <div {...htmlProps}>
      {visibleControls.microphone && (
        <div className={`aspect-square h-[64px] w-[64px] rounded-full text-secondary1 flex items-center justify-center ${theme == "light" ? "bg-background1" : "bg-transparent"} hover:bg-background2 hover:cursor-pointer`}>
          <TrackToggle className='flex flex-col items-center justify-center'
            source={Track.Source.Microphone}
            showIcon={showIcon}
            onChange={microphoneOnChange}>
            {showText && <p className='text-md'>{userChoices.audioEnabled ? "Mute" : "Unmute"}</p>}
          </TrackToggle>
        </div>
      )}
      {visibleControls.camera && (
        <div className={`aspect-square h-[64px] w-[64px] rounded-full text-secondary1 flex items-center justify-center ${theme == "light" ? "bg-background1" : "bg-transparent"} hover:bg-background2 hover:cursor-pointer`}>
          <TrackToggle source={Track.Source.Camera} showIcon={showIcon} onChange={cameraOnChange}>
            {showText && 'Camera'}
          </TrackToggle>
          <div className="lk-button-group-menu">
            <MediaDeviceMenu
              kind="videoinput"
              onActiveDeviceChange={(_kind, deviceId) => saveVideoInputDeviceId(deviceId ?? '')}
            />
          </div>
        </div>
      )}
      {visibleControls.leave && (
        <div className={`aspect-square h-[64px] w-[64px] rounded-full text-error1 flex items-center justify-center ${theme == "light" ? "bg-background1" : "bg-transparent"} hover:bg-background2 hover:cursor-pointer`}>
          <DisconnectButton onClick={() => leaveGroup()}
            className='flex flex-col items-center justify-center'>
            {showIcon && <LeaveIcon />}
            {showText && <p className='text-md'>Leave</p>}
          </DisconnectButton>
        </div>
      )}
      <StartMediaButton />
    </div>
  );
}