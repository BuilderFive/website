import {useState} from 'react'
import { cloneDeep } from 'lodash'
import { useRouter } from 'next/router'
import { useSocket } from '~/util/SocketProvider'
import { useGroup } from '~/util/GroupProvider'
import Peer from 'peerjs'

const usePlayer = (myId: string, roomId: string, peer: Peer) => {
    const {socket} = useSocket()
    const [players, setPlayers] = useState({})
    const playersCopy = cloneDeep(players)
    const { leaveGroup } = useGroup()

    const playerHighlighted = playersCopy[myId]
    delete playersCopy[myId]

    const nonHighlightedPlayers = playersCopy

    const leaveRoom = () => {
        socket?.emit('user-leave', myId, roomId)
        console.log("leaving room", roomId)
        peer?.disconnect();
        leaveGroup()
    }

    const toggleAudio = () => {
        console.log("I toggled my audio")
        setPlayers((prev) => {
            const copy = cloneDeep(prev)
            copy[myId].muted = !copy[myId].muted
            return {...copy}
        })
        socket?.emit('user-toggle-audio', myId, roomId)
        console.log(socket)
    }

    const toggleVideo = () => {
        console.log("I toggled my video")
        setPlayers((prev) => {
            const copy = cloneDeep(prev)
            copy[myId].playing = !copy[myId].playing
            return {...copy}
        })
        socket?.emit('user-toggle-video', myId, roomId)
    }

    return {players, setPlayers, playerHighlighted, nonHighlightedPlayers, toggleAudio, toggleVideo, leaveRoom}
}

export default usePlayer;