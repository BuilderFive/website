import { useGroup } from "~/util/GroupProvider"
import { socket } from "../../../pages/api/socket/io"
import { useState, useEffect, useRef } from "react"
import Peer from "peerjs"

const usePeer = () => {
    const { packagedGroup } = useGroup()
    const [peer, setPeer] = useState<Peer | null>(null)
    const [myId, setMyId] = useState<string>('')
    const isPeerSet = useRef(false)

    useEffect(() => {
        if (isPeerSet.current || !packagedGroup || !socket) return;
        isPeerSet.current = true;
        let myPeer;
        (async function initPeer() {
            myPeer = new (await import('peerjs')).default()
            setPeer(myPeer)

            myPeer.on('open', (id) => {
                console.log(`your peer id is ${id}`)
                setMyId(id)
                socket?.emit('join-room', packagedGroup.group.group_uuid, id)
            })
        })()
    }, [packagedGroup, socket])

    return {
        peer,
        myId
    }
}

export default usePeer;