import {useState, useEffect, useRef} from 'react'


const useMediaStream = () => {
    const [stream, setStream] = useState<MediaStream | null>(null)
    const isStreamSet = useRef(false)

    useEffect(() => {
        if (isStreamSet.current) return;
        isStreamSet.current = true;
        (async function initStream() {
            try {
                const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                })
                console.log("setting your stream")
                setStream(stream)
            } catch (e) {
                console.log("Error in media navigator", e)
            }
        })()
    }, [])

    return {
        stream: stream
    }
}

export default useMediaStream