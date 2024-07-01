"use client"

import { useEffect, useRef, useState } from "react";
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import './globals.css'; // Import the globals.css file
import { useGroup } from "~/util/GroupProvider";
import { Tables } from "~/util/supabase-types";
import { Footer } from "../connect/(components)/Footer";
import { Sidebar } from "../connect/(components)/Sidebar";


export default function Globe({children}: {children: React.ReactNode}) {
    const mapbox = useRef<mapboxgl.map | null>(null)
    const globe = useRef<HTMLDivElement>(null)
    const { radius, setRadius, setUserLocation, userLocation, packagedGroup, loadedGroups } = useGroup();
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        getLocation()
    },[])
    
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

    useEffect(()=> {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_BOX_TOKEN;

        if (globe.current) {
            mapbox.current = new mapboxgl.Map({
              container: globe.current,
              style: "mapbox://styles/mapbox/streets-v12",
              center: [-74.0060152, 40.7127281],
              zoom: 5,
              maxZoom: 15,
              attributionControl: false,
            });

            mapbox.current.addControl(new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: false
                },
                trackUserLocation: false,
                showUserHeading: true,
            }));

            // Clean up on unmount
            return () => mapbox.current.remove();
          }
        }, []);
    
    useEffect(()=> {
        // Add your custom markers and lines here
        loadedGroups.forEach((group: Tables<'groups'>) => {
            const marker = new mapboxgl.Marker({
                color: "#FFF000",
                draggable: false
            }).setLngLat([group.location[1], group.location[0]])
                .addTo(mapbox.current);
            console.log(marker)
        })
    },[loadedGroups])

    return(<div className="w-screen h-screen relative">
        <div ref={globe} className="h-full w-full"/>
        <div className='absolute z-40 bottom-0 w-full'>
            {children}
        </div>
    </div>)
}

