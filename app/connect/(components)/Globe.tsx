"use client"

import { useEffect, useRef, useState } from "react";
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import './globals.css'; // Import the globals.css file
import { useGroup } from "~/util/GroupProvider";
import { Tables } from "~/util/supabase-types";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";


export default function Globe({children}: {children: React.ReactNode}) {
    const mapbox = useRef<mapboxgl.map | null>(null)
    const globe = useRef<HTMLDivElement>(null)
    const { radius, setRadius, setUserLocation, userLocation, packagedGroup, loadedGroups } = useGroup();
    const [loading, setLoading] = useState(true)
    const markers = useRef<any>([])

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
              style: "mapbox://styles/wrys/cly3upq5700fr01qr6d12d26s",
              center: [-74.0060152, 40.7127281],
              zoom: 5,
              maxZoom: 15,
              attributionControl: false,
            });

            mapbox.current.on('style.load', () => {
                mapbox.current.setFog({
                  color: 'rgb(97, 171, 255)', // Lower atmosphere
                  'high-color': 'rgb(0, 15, 150)', // Upper atmosphere
                  'horizon-blend': 0.01, // Atmosphere thickness (default 0.2 at low zooms)
                  'space-color': 'rgb(11, 11, 25)', // Background color
                  'star-intensity': 0.5 // Background star brightness (default 0.35 at low zoooms )
                });
              });


            
            /*
            mapbox.current.addControl(new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: false
                },
                trackUserLocation: false,
                showUserHeading: true,
            }));*/

            // Clean up on unmount
            return () => mapbox.current.remove();
          }
        }, []);
    
    useEffect(()=> {
        // Add your custom markers and lines here
        markers.current.forEach((marker: mapboxgl.Marker)=>marker.remove());
        loadedGroups.forEach((group: Tables<'groups'>) => {
            const marker = new mapboxgl.Marker({
                color: "#59A4E0",
                draggable: false
            }).setLngLat([group.location[1], group.location[0]])
                .addTo(mapbox.current);
            markers.current.push(marker)
        })
    },[loadedGroups])

    return(<div className="w-screen h-screen relative">
        <div ref={globe} className="h-full w-full"/>
        <div className='absolute z-40 bottom-0 w-full'>
            {children}
        </div>
    </div>)
}

