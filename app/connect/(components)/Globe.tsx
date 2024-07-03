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
        getLocation()
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
            
            mapbox.current.addControl(new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: false
                },
                trackUserLocation: false,
                showUserHeading: true,
            }), 'bottom-right'); 

            

            // Clean up on unmount
            return () => mapbox.current.remove();
          }
        }, []);
    
    useEffect(()=> {
        // Add your custom markers and lines here
        markers.current.forEach((marker: mapboxgl.Marker)=>marker.remove());

        loadedGroups.forEach((group: Tables<'groups'>) => {

            const isActive = (group.group_uuid == packagedGroup?.group.group_uuid)
            const element = document.createElement('div');
            element.className = isActive ? 'your-active-group-marker' : 'other-active-group-marker';
            
            const marker = new mapboxgl.Marker(element)
                .setLngLat([group.location[1], group.location[0]])
                .addTo(mapbox.current);
                
            marker.getElement().addEventListener('click', () => {
                mapbox.current.flyTo({
                    center: [group.location[1], group.location[0]],
                    zoom: 10,
                    essential: true
                });
            });

            markers.current.push(marker)
        })
    },[loadedGroups])

    return(<div className="w-screen h-screen relative">
        <div ref={globe} className="h-full w-full"/>
        <div className='relative'>
            <div className="fixed z-1 left-0 top-0">
                <Sidebar/>
            </div>
            <div className="fixed z-2 bottom-0 w-full">
                {packagedGroup && <Footer />}
            </div>
            
        </div>
    </div>)
}

