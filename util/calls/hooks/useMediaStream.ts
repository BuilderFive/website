import {useState, useEffect, useRef} from 'react'


const useMediaStream = () => {
    const [stream, setStream] = useState<MediaStream | null>(null)
    const [connection, setConnection] = useState<RTCPeerConnection | null>(null)
    const isStreamSet = useRef(false)

    useEffect(() => {
        if (isStreamSet.current) return;
        isStreamSet.current = true;
        (async function initStream() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                })
                const rtcConnection = new RTCPeerConnection()
                console.log(stream)
                console.log(rtcConnection)

                setStream(stream)
                setConnection(rtcConnection)
            } catch (e) {
                console.log("Error in media navigator", e)
            }
        })()
    }, [])

    function closeConnection() {
        if (!connection || !stream) return;
        if (connection.signalingState == "closed") return;

        stream.getTracks().forEach(track => track.stop())
        connection.ontrack = null;
        stream.onremovetrack = null;
        connection.onicecandidate = null;
        connection.oniceconnectionstatechange = null;
        connection.onsignalingstatechange = null;
        connection.close();
      }

    return {
        stream: stream,
        connection: connection,
        closeConnection: closeConnection
    }
}

export default useMediaStream