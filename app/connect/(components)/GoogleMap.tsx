"use client"

import React, { useEffect, useMemo } from 'react'
import { Circle, GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Button } from '~/components/ui/button';
import { FaLocationArrow, FaSpinner } from "react-icons/fa";
import {Slider} from "@nextui-org/slider";

export default function MapComponent() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
    })

    const [latitude, setLatitude] = React.useState(30.35736619550383)
    const [longitude, setLongitude] = React.useState( -97.73011964664344)
    const [center, setCenter] = React.useState({ lat: latitude, lng: longitude })
    const [loading, setLoading] = React.useState(false)
    const [rad, setRad] = React.useState(1000)

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
                }}
                center={center}
                zoom={10}>
                {center && <Marker position={{ lat: latitude, lng: longitude }} />}
                <Circle options={{ fillColor: "hsl(212 100% 69%)", strokeColor: "hsl(212 100% 69%)"}} center={center} radius={rad} /> {/* 2000 meters */}
                <SideBar/>
                <div className='absolute bottom-24 left-4 w-full h-fit'>
                    <Slider 
                        label="Meters" showSteps={true} size={"lg"} color='foreground'
                        step={5000} onChange={handleChange} value={rad}
                        maxValue={100000} radius='full'
                        minValue={5000} showTooltip={true}
                        defaultValue={5000} disableThumbScale={true}
                        className="max-w-2xl font-semibold text-text1"
                    />
                </div>
            </GoogleMap>
        </div>
        ) : <></>
}
