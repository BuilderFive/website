"use client"

import { useEffect, useState } from "react";
import { Footer } from "./(components)/Footer";
import { useGroup } from "~/util/GroupProvider";
import { Sidebar } from "./(components)/Sidebar";
import { useConnectionState, useRoomContext } from "@livekit/components-react";
import { ConnectionState } from 'livekit-client';
import Modal from '~/components/ui/modal-auth';
import { useSession } from "~/util/AuthProvider";

import {calculateTimeRemaining} from "./../(landing)/(home)/components/Timer";
import { useRouter } from "next/navigation";
import { Header } from "./(components)/Header";
import { useJsApiLoader } from "@react-google-maps/api";
import Globe from "./(components)/Globe";
import { FaSpinner } from "react-icons/fa";
import "./(components)/globals.css"

export default function Page() {
  const { packagedGroup, setUserLocation } = useGroup();
  const { user, event } = useSession();
  const [showModal, setShowModal] = useState(false);
  const { days, hours, minutes, seconds } = calculateTimeRemaining(new Date(), event);
  const router = useRouter()
  const [ loading, setLoading ] = useState(true)
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
  })

  // Rest of the code
  
  useEffect(()=> {
    if (!user) {
      setShowModal(true)
    } else {
      setShowModal(false)
    }
  },[user])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div className="h-screen w-screen flex flex-col gap-[8px] items-center justify-center">
      <p className="text-white font-bold text-6xl">Loading</p>
      <div className="flex flex-row gap-[24px]">
        <div className="your-audio-group-marker"/>
        <div className="wait-audio-group-marker"/>
        <div className="other-audio-group-marker"/>
      </div>
    </div>;
  } else {
    return !user ? <div className="min-h-screen min-w-screen">
      <Modal showModal={showModal} setShowModal={setShowModal}/>
    </div> : <div className="flex flex-row w-screen h-screen relative">
        {isLoaded && <>
          <Header />
          <Globe>
            <Sidebar/>
            {!packagedGroup?.group.isQueued && <Footer />}
          </Globe>
        </>}
      </div>
  }
};