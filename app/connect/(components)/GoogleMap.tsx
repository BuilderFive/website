"use client"

import React, { useEffect, useMemo } from 'react'
import { Circle, GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Button } from '~/components/ui/button';
import { FaLocationArrow, FaSpinner } from "react-icons/fa";
import {Slider} from "@nextui-org/slider";
import { useTheme } from 'next-themes';
import { useGroup } from '~/util/GroupProvider';

export default function MapComponent({children}: {children: React.ReactNode}) {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
    })
    const { radius, setRadius, setUserLocation, userLocation } = useGroup();
    const [loading, setLoading] = React.useState(false)
    const { theme } = useTheme();
    const { loadedGroups } = useGroup();

    useEffect(() => {
        getLocation()
    }, [])

    const RenderMarkers = () => {
      return <div className=''>
        {loadedGroups.map((group, index) => {
          return <Marker icon={"./animations/audio-room.gif"} key={index} position={{lat: group.location[0], lng: group.location[1]}}/>
        })}
      </div>
        
    }

    const handleChange = (value) => {
        if (isNaN(Number(value))) return;
        setRadius(value);
      };

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCoordinates, handleLocationError);

        } else {
            console.log("Geolocation is not supported by this browser.");
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

    function CenterLocation() {
        return <Button onClick={() => {
            if(!loading) {
                setLoading(true)
                getLocation()
        }}} className='aspect-square h-[54px] w-[54px] rounded-[99px] bg-secondary1'>
            {!loading ? <FaLocationArrow color={"var(--text-4)"} />
            : <FaSpinner className='animate-spin' color={"var(--text-4)"} />}
        </Button>
    }
    function Options () {
        return <div className='w-fit h-fit rounded-[99px]'>
            <CenterLocation/>
        </div>
    }

    return isLoaded ? (
        <div className='h-full w-full relative'>
          <div className='absolute z-40 bottom-0 w-full'>
            {children}
          </div>
          <div className='absolute bottom-32 right-4 z-10 flex flex-row gap-[24px] items-center'>                
              <div className='w-[480px] h-fit text-text1'>
                  <Slider showSteps={true} size={"lg"} hideValue={true}
                      step={10000} onChange={handleChange} value={radius}
                      maxValue={20000000} radius='full' aria-label='slider'
                      minValue={10000} showTooltip={true}
                      defaultValue={10000} disableThumbScale={true}
                      className="font-semibold"
                  />
              </div>
              <Options/>
          </div>
          <GoogleMap mapContainerStyle={{ height: "100%", width: "100%" }}
              options={{
                  disableDefaultUI: true,
                  styles: theme == "dark" ? nightModeMapStyles : [],
                  
              }}
              center={{ lat: userLocation.latitude, lng: userLocation.longitude }}
              zoom={10}>
              {userLocation && <Marker position={{ lat: userLocation.latitude, lng: userLocation.longitude }} />}
              <Circle options={{ fillColor: "hsl(212 100% 69%)", strokeColor: "hsl(212 100% 69%)"}} center={{ lat: userLocation.latitude, lng: userLocation.longitude }} radius={radius} /> {/* 2000 meters */}
              <RenderMarkers/>
          </GoogleMap>
        </div>
        ) : <></>
}

const nightModeMapStyles = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ];