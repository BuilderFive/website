"use client"

import { 
    createContext,
    useContext,
    useEffect,
    useState
} from "react"
import { Socket } from "socket.io"

import { io as ClientIO} from "socket.io-client"

type SocketContextType = {
    socket: Socket | null
    isConnected: boolean
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false
})

export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketProvider = ({ children }: { children: React.ReactNode}) => {
    const [socket, setSocket] = useState<Socket | null>(null)
    const[isConnected, setIsConnected] = useState(false)

    useEffect(()=> {
        const socketInstance: Socket = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL!,{
            path: "/api/socket/io",
            addTrailingSlash: false
        })

        socketInstance.on("connect", () => {
            console.log('connected')
            setIsConnected(true)
        })
        socketInstance.on("disconnect", () => {
            console.log('disconnected')
            setIsConnected(false)
        })

        setSocket(socketInstance)

        return() => {
            socketInstance.disconnect()
        }
    },[])

    return (<SocketContext.Provider value={{ socket, isConnected}}>
        {children}
    </SocketContext.Provider>)
}