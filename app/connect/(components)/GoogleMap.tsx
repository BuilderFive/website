"use client"

import React, { useEffect, useMemo } from 'react'
import { Circle, GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Button } from '~/components/ui/button';
import { FaLocationArrow, FaSpinner } from "react-icons/fa";
import {Slider} from "@nextui-org/slider";
import { useTheme } from 'next-themes';

export default function MapComponent({rad, setRad}) {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
    })

    const [latitude, setLatitude] = React.useState(30.35736619550383)
    const [longitude, setLongitude] = React.useState( -97.73011964664344)
    const [center, setCenter] = React.useState({ lat: latitude, lng: longitude })
    const [loading, setLoading] = React.useState(false)
    const { theme } = useTheme();

    useEffect(() => {
        getLocation()
    }, [])
    const handleChange = (value) => {
        if (isNaN(Number(value))) return;
        setRad(value);
      };

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCoordinates, handleLocationError);

        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    function getCoordinates(position) {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
        setCenter({ lat: position.coords.latitude, lng: position.coords.longitude })
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
    function SideBar () {
        return <div className='absolute right-4 bottom-24 w-fit h-fit rounded-[99px]'>
            <CenterLocation/>
        </div>
    }

    return isLoaded ? (
        <div className='h-screen w-screen'>
            <GoogleMap mapContainerStyle={{ height: "100%", width: "100%" }}
                options={{
                    disableDefaultUI: true,
                    styles: theme == "dark" ? nightModeMapStyles : [],
                }}
                center={center}
                zoom={10}>
                {center && <Marker position={{ lat: latitude, lng: longitude }} />}
                <Circle options={{ fillColor: "hsl(212 100% 69%)", strokeColor: "hsl(212 100% 69%)"}} center={center} radius={rad} /> {/* 2000 meters */}
                <SideBar/>
                <div className='absolute bottom-24 right-24 w-[480px] h-fit text-text1'>
                    <Slider showSteps={true} size={"lg"} hideValue={true}
                        step={5000} onChange={handleChange} value={rad}
                        maxValue={100000} radius='full' aria-label='slider'
                        minValue={5000} showTooltip={true}
                        defaultValue={5000} disableThumbScale={true}
                        className="font-semibold"
                    />
                </div>
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