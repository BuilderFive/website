"use client"

import React, { useEffect, useMemo, useRef } from 'react'
import { Circle, GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Button } from '~/components/ui/button';
import { FaLocationArrow, FaSpinner } from "react-icons/fa";
import {Slider} from "@nextui-org/slider";
import { useTheme } from 'next-themes';
import { useGroup } from '~/util/GroupProvider';

export default function MapComponent({children}: {children: React.ReactNode}) {
    const { radius, setRadius, setUserLocation, userLocation } = useGroup();
    const [loading, setLoading] = React.useState(true)
    const { theme } = useTheme();
    const { loadedGroups, packagedGroup } = useGroup();
    const refCircle = useRef<Circle | null>(null)

    useEffect(() => {
        getLocation()
    }, [])

    const calculateCenter = (members: { location: { lat: number; lng: number } }[]) => {
      if (members.length === 0) {
          return null;
      }
  
      let x = 0;
      let y = 0;
      let z = 0;
  
      for (const member of members) {
          const latitude = (member.location.lat * Math.PI) / 180;
          const longitude = (member.location.lng * Math.PI) / 180;
  
          x += Math.cos(latitude) * Math.cos(longitude);
          y += Math.cos(latitude) * Math.sin(longitude);
          z += Math.sin(latitude);
      }
  
      const total = members.length;
  
      x /= total;
      y /= total;
      z /= total;
  
      const centralLongitude = Math.atan2(y, x);
      const centralSquareRoot = Math.sqrt(x * x + y * y);
      const centralLatitude = Math.atan2(z, centralSquareRoot);
  
      return {
          lat: (centralLatitude * 180) / Math.PI,
          lng: (centralLongitude * 180) / Math.PI,
      };
    };
  
  

    const RenderMarkers = () => {
      
      const members = packagedGroup?.members.map((member) => ({ location: { lat: member.location[0], lng: member.location[1] } })) || [];
      const center = calculateCenter(members);

      return <div className=''>
        {loadedGroups.map((group, index) => {
          const isActive = (group.group_uuid == packagedGroup?.group.group_uuid) && (center != null)
          return isActive ? <Marker icon={"./animations/active-mic.gif"} key={index} position={{lat: center.lat, lng: center.lng}} /> : <Marker icon={"./animations/group-mic.gif"} key={index} position={{lat: group.location[0], lng: group.location[1]}}/>
        })}
      </div>
    }

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
        return <div className='w-fit h-fit rounded-full bg-background1'>
            <CenterLocation/>
        </div>
    }
    const handleCircleRadius = () => {
      if (refCircle.current == null) return;
      
      const newRadius = refCircle.current.state.circle?.getRadius();
      if (newRadius == null) return;
      setRadius(newRadius)
    };

    return (
        <div className='h-full w-full relative'>
          <div className='absolute z-40 bottom-0 w-full'>
            {children}
          </div>
          <div className='absolute bottom-32 right-4 z-10 flex flex-row gap-[24px] items-center'>                
              <Options/>
          </div>
          <GoogleMap mapContainerStyle={{ height: "100%", width: "100%" }}
              
              options={{
                  disableDefaultUI: true,
                  styles: theme == "dark" ? nightModeMapStyles : [],
                  restriction: {
                    latLngBounds: {
                        north: 85,
                        south: -85,
                        east: 180,
                        west: -180
                    },
                    strictBounds: true,
                }
              }}
              

              center={userLocation.latitude && userLocation.longitude ? 
                { lat: userLocation.latitude, lng: userLocation.longitude } :
                { lat: 30.35736619550383, lng: -97.73011964664344 }}
              zoom={10}>
              {!loading && (userLocation.latitude && userLocation.longitude) && <>
              <Marker position={{ lat: userLocation.latitude, lng: userLocation.longitude }} />
              <Circle ref={(ref) => {refCircle.current = ref}}
                onRadiusChanged={handleCircleRadius} 
                editable={true} 
                options={{ fillColor: "hsl(212 100% 69%)", strokeColor: "hsl(212 100% 69%)"}} 
                center={{ lat: userLocation.latitude, lng: userLocation.longitude }} 
                radius={radius} /></>}
              <RenderMarkers/>
          </GoogleMap>
        </div>
        )
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