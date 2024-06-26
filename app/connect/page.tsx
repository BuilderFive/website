"use client"

import { useEffect, useState } from "react";
import { Footer } from "./(components)/Footer";
import MapComponent from "./(components)/GoogleMap";
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

export default function Page() {
  const { packagedGroup } = useGroup();
  const { user } = useSession();
  const { event } = useSession()
  const [showModal, setShowModal] = useState(false);
  const { days, hours, minutes, seconds } = calculateTimeRemaining(new Date(), event);
  const router = useRouter()
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
})
  /*
  useEffect(() => {
    if (!(days < 0 && hours < 0 && minutes < 0 && seconds < 0)) {
      router.push('/')
      setTimeout(() => {
        alert(`The audio call event has not started yet. Please come back in ${weeks} weeks, ${days} days, and ${hours} hours`)
      }, 1000)
    }
  }, []);*/
  
  useEffect(()=> {
    if (!user) {
      setShowModal(true)
    } else {
      setShowModal(false)
    }
  },[user])

  return !user ? <div className="min-h-screen min-w-screen">
    <Modal showModal={showModal} setShowModal={setShowModal}/>
  </div> : <div className="flex flex-row w-screen h-screen">
      {isLoaded && <><Header />
      <Sidebar/>
      <MapComponent>
        {packagedGroup && <Footer />}
      </MapComponent></>}
    </div>
  ;
};