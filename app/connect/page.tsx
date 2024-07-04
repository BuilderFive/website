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
import Globe from "./(components)/Globe";

export default function Page() {
  const { packagedGroup, setUserLocation } = useGroup();
  const { user, event } = useSession();
  const [showModal, setShowModal] = useState(false);
  const { days, hours, minutes, seconds } = calculateTimeRemaining(new Date(), event);
  const router = useRouter()
  const [ loading, setLoading ] = useState(false)
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

  
    const [locationPermission, setLocationPermission] = useState<PermissionState>("denied")
   
    useEffect(()=> {
        const fetchLocationPermission = async () => {
            const permission = await navigator.permissions.query({ name: "geolocation" })
            setLocationPermission(permission.state)
        }
        fetchLocationPermission()
    },[])

    function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(getCoordinates, handleLocationError);
  
      } else {
          alert("Geolocation is not supported by this browser.");
      }
  }
  
  function getCoordinates(position) {
      setUserLocation({latitude: position.coords.latitude, longitude: position.coords.longitude})
      setLoading(false)
  }
  
  function handleLocationError(error) {
      switch (error.code) {
          case error.PERMISSION_DENIED:
              console.log("User denied the request for Geolocation.");
              break;
          case error.POSITION_UNAVAILABLE:
              console.log("Location information is unavailable.");
              break;
          case error.TIMEOUT:
              console.log("The request to get user location timed out.");
              break;
          case error.UNKNOWN_ERROR:
              console.log("An unknown error occurred.");
              break;
          default:
              console.log("An unknown error occurred.");
              break;
      }
  }

  useEffect(() => {
    if ( locationPermission == null || locationPermission != "granted" ) {
      getLocation()
    }
  },[])
  
  useEffect(()=> {
    if (!user) {
      setShowModal(true)
    } else {
      setShowModal(false)
    }
  },[user])

  return !user ? <div className="min-h-screen min-w-screen">
    <Modal showModal={showModal} setShowModal={setShowModal}/>
  </div> : (locationPermission == "granted" ? <div className="flex flex-row w-screen h-screen relative">
      {isLoaded && <><Header />
      <Globe>
        <Sidebar/>
        {packagedGroup && <Footer />}
      </Globe></>}
    </div> : <div className="flex items-center justify-center min-h-screen min-w-screen">
      <p className="text-background1 text-[36px] font-semibold text-center">Please enable location services<br/> and refresh your page</p>
    </div>)
  ;
};