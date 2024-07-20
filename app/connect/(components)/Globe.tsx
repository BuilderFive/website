"use client"

import { ChangeEvent, ChangeEventHandler, KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import './globals.css'; // Import the globals.css file
import { PackagedGroup, useGroup } from "~/util/GroupProvider";
import { Tables } from "~/util/supabase-types";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";
import { Input } from "~/components/ui/input";
import ReactDOM from "react-dom";
import { Root, createRoot } from 'react-dom/client';
import { FaMicrophone } from "react-icons/fa";
import { permission } from "process";
import EmptyBubble from "~/components/globe/EmptyBubble";
import { unmountComponentAtNode } from "@react-three/fiber";
import { Button } from "~/components/ui/button";
import { user } from "@nextui-org/theme";
import { GeoJSONSource, Source } from "mapbox-gl";
import { m } from "framer-motion";
import { useSession } from "~/util/AuthProvider";
import { useGlobe } from "~/util/GlobeProvider";

export default function Globe({showUpdates}) {
    const { createGeoJSONCircle, mapbox, setLoading, loading, isWithinRadius } = useGlobe();
    const globe = useRef<HTMLDivElement>(null)
    const { radius, createGroup, leaveGroup, joinGroup, setUserLocation, userLocation, packagedGroup, loadedGroups, topic } = useGroup();
    const markers = useRef<any>([])
    const { event } = useSession()

    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_BOX_TOKEN;

        if (globe.current && mapbox != null) {
            mapbox.current = new mapboxgl.Map({
              container: globe.current,
              style: "mapbox://styles/wrys/cly3upq5700fr01qr6d12d26s",
              center: [userLocation.longitude, userLocation.latitude],
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

                setLoading(false)
            });

            const geolocate = new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: false
                },
                trackUserLocation: false,
                showUserHeading: true,
            }); 

            mapbox.current.addControl(geolocate, 'bottom-right');

            geolocate.on('geolocate', function(e) {
                var lon = e.coords.longitude;
                var lat = e.coords.latitude
                setUserLocation({latitude: lat, longitude: lon})
            });
            mapbox.current.on('load', () => {
                geolocate.trigger();                
            })

            return () => mapbox.current.remove();
        }
    },[])

    // Function to add markers to the map
    const addMarkers = (groups: Tables<'groups'>[], pGroup: PackagedGroup | null, location: { longitude: number, latitude: number}, inputTopic: string, rad:number) => {
        if (!mapbox) return null;

        // Remove existing markers
        markers.current.forEach((marker) => marker.remove());
        markers.current = [];

        // Add new markers
        groups.forEach((group: Tables<'groups'>) => {
            const marker = handleMarkerCreate(group, pGroup, location, rad);
            markers.current.push(marker);
        });

        if (pGroup == null) {
            //renders the custom marker component
            const markerContainer = document.createElement('div');
            const root = createRoot(markerContainer);
            root.render(<EmptyBubble createGroup={createGroup} leaveGroup={leaveGroup} topic={inputTopic} packagedGroup={pGroup} userLocation={location} />);
            
            const marker = new mapboxgl.Marker(markerContainer) 
                .setLngLat([location.longitude, location.latitude])
                .addTo(mapbox.current);
            markers.current.push(marker)
        }
    };

    const handleMarkerCreate = (group: Tables<'groups'>, pGroup: PackagedGroup | null, location: { latitude: number, longitude: number }, rad: number) => {
        if (!mapbox) return null;

        const isActive = (group.group_uuid == pGroup?.group.group_uuid)
        const element = document.createElement('div')
        if (group.isQueued) {
            element.className = 'wait-audio-group-marker';
        } else {
            element.className = isActive ? 'your-audio-group-marker' : 'other-audio-group-marker';
        }
        
        const marker = new mapboxgl.Marker(element)
            .setLngLat([group.location[1], group.location[0]])
            .addTo(mapbox.current);

        marker.getElement().addEventListener('click', async() => {
            if (!isWithinRadius({ latitude: group.location[0], longitude: group.location[1]})) return
            if (pGroup != null) {
                leaveGroup()
            } else {
                /*mapbox.current.flyTo({
                    center: [group.location[1], group.location[0]],
                    zoom: 10,
                    essential: true
                });*/
                joinGroup(group)
            }
            
        });
        const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: true,
            offset: {
                'bottom' : [0, -40]
            }
        });

        marker.getElement().addEventListener('mouseenter', async() => {
            const infoBubble = document.createElement('div');
            const root = createRoot(infoBubble);
            root.render(<div className={`relative w-fit h-fit flex flex-col text-start justify-start items-start`}>
                <p className="text-slate-500 font-regular text-[12px]">{group.topic}</p>
                <p className="text-slate-800 font-semibold text-[24px]">
                    {group.title}
                </p>
                {isActive ? <p className="text-error1 self-end text-[12px] font-bold">Press to Cancel</p>
                    : <p className="text-secondary1 self-end text-[12px] font-bold">Press to Join</p>}
            </div>)
            popup
                .setLngLat([group.location[1], group.location[0]])
                .setDOMContent(infoBubble)
                .addTo(mapbox.current);
        

        });

        marker.getElement().addEventListener('mouseleave', async() => {
            popup.remove();
        });
        return marker
    }

    useEffect(() => {
        const latitude = userLocation.latitude;
        const longitude = userLocation.longitude;

        if (mapbox && (latitude != null && longitude != null)) {
            addMarkers(loadedGroups, packagedGroup, {latitude, longitude}, topic, radius);
        }
    }, [loadedGroups, addMarkers, packagedGroup, userLocation, loading, event, topic, radius]);

    return(<div className="w-screen h-screen relative">
        <div ref={globe} className="h-full w-full"/>
        <div className='relative z-20'>
            <div className="fixed z-20 left-2 top-2">
                {!showUpdates && <Sidebar/>}
            </div>
            <div className="fixed z-20 bottom-0 w-full">
                {packagedGroup && !loading && <Footer />}
            </div>
            
        </div>
    </div>)
}