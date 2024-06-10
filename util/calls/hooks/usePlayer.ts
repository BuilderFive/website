import {useState} from 'react'
import { cloneDeep } from 'lodash'
import { socket } from "../../../pages/api/socket/io"
import { useGroup } from '~/util/GroupProvider'

type Players = {
    [key: string]: {
        muted: boolean;
        playing: boolean;
    };
};

const usePlayer = (myId, peer) => {
    const { packagedGroup } = useGroup()
    const [players, setPlayers] = useState<Players>({})
    const playersCopy = cloneDeep(players)
    const { leaveGroup } = useGroup()

    const playerHighlighted = playersCopy[myId]
    delete playersCopy[myId]

    const nonHighlightedPlayers = playersCopy

    const leaveRoom = () => {
        socket?.emit('user-leave', myId, packagedGroup?.group.group_uuid)
        console.log("leaving room", packagedGroup?.group.group_uuid)
        peer?.disconnect();
        leaveGroup();
    }

    const toggleAudio = () => {
        console.log("I toggled my audio")
        setPlayers((prev) => {
            const copy = cloneDeep(prev)
            copy[myId].muted = !copy[myId].muted
            return {...copy}
        })
        socket?.emit('user-toggle-audio', myId, packagedGroup?.group.group_uuid)
    }

    const toggleVideo = () => {
        console.log("I toggled my video")
        setPlayers((prev) => {
            const copy = cloneDeep(prev)
            copy[myId].playing = !copy[myId].playing
            return {...copy}
        })
        socket?.emit('user-toggle-video', myId, packagedGroup?.group.group_uuid)
    }

    return {players, setPlayers, playerHighlighted, nonHighlightedPlayers, toggleAudio, toggleVideo, leaveRoom}
}

export default usePlayer;