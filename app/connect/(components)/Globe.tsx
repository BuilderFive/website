"use client"

import { ChangeEvent, ChangeEventHandler, KeyboardEvent, useEffect, useRef, useState } from "react";
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import './globals.css'; // Import the globals.css file
import { useGroup } from "~/util/GroupProvider";
import { Tables } from "~/util/supabase-types";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";
import { Input } from "~/components/ui/input";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import { FaMicrophone } from "react-icons/fa";

export default function Globe({children}: {children: React.ReactNode}) {
    const mapbox = useRef<mapboxgl.map>(null)
    const globe = useRef<HTMLDivElement>(null)
    const { radius, createGroup, leaveGroup, setUserLocation, userLocation, packagedGroup, loadedGroups, topic } = useGroup();
    const [loading, setLoading] = useState(true)
    const markers = useRef<any>([])

    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_BOX_TOKEN;

        if (globe.current) {
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
                //gotta figure out how to scale this si
                mapbox.current.addSource('circle', createGeoJSONCircle([userLocation.longitude, userLocation.latitude], radius/1000, 64));
                mapbox.current.addLayer({
                    id: 'circle-fill',
                    type: 'fill',
                    source: 'circle',
                    layout: {},
                    paint: {
                        'fill-color': 'rgb(97, 171, 255)',
                        'fill-opacity': 0.5
                    }
                });
            })

            // Clean up on unmount
            return () => mapbox.current.remove();
        }
    },[])

    /**
     * Loading the user's circle and changing it's radius
     */
    useEffect(() => {
        if (!mapbox.current) return;
        const circle = mapbox.current.getSource('circle')
        if(!circle) return;
        const geoJSON = createGeoJSONCircle([userLocation.longitude, userLocation.latitude], radius/1000, 64)
        circle.setData(geoJSON.data)

    },[radius])
    
    /**
     * Loading the group markers
     */
    useEffect(()=> {
        if (!mapbox.current) return;

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

        if (packagedGroup == null && userLocation.latitude != null) {

            //renders the custom marker component
            const markerContainer = document.createElement('div');
            const root = createRoot(markerContainer);
            root.render(<EmptyBubble topic={topic} 
                createGroup={createGroup}
                leaveGroup={leaveGroup}
                packagedGroup={packagedGroup} />);   
            
            
            const marker = new mapboxgl.Marker(markerContainer) 
                .setLngLat([userLocation.longitude, userLocation.latitude])
                .addTo(mapbox.current);

            markers.current.push(marker)
        }
    },[loadedGroups, packagedGroup, userLocation])

    return(<div className="w-screen h-screen relative">
        <div ref={globe} className="h-full w-full"/>
        <div className='relative z-20'>
            <div className="fixed z-20 left-2 top-2">
                <Sidebar/>
            </div>
            <div className="fixed z-20 bottom-0 w-full">
                {packagedGroup && <Footer />}
            </div>
            
        </div>
    </div>)
}

//create an empty prompt div which the user can fill out to create a group
function EmptyBubble({topic, packagedGroup, createGroup, leaveGroup}) {
    //this bubble is shown whenever the user's packaged group is null
    const [prompt, setPrompt] = useState("")
    const [characterCount, setCharacterCount] = useState(0)

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value) 
        setCharacterCount(e.target.value.length)
    }

    const handleSubmit = async(e: KeyboardEvent<HTMLTextAreaElement>) => {
        setPrompt("")
        setCharacterCount(0)
        if (packagedGroup) {
            //means user is currently in a call. Leave the group
            const response = await leaveGroup();
        }
        //check if user is already in a group, if so call leaveGroup and await for user confirmation
        createGroup()
    }

    return <div className="flex flex-col w-[240px] h-[280px]">
        <div className="w-full h-[50%]">
            <div className="flex flex-col items-center w-full h-fit rounded-[12px] bg-background1 p-[12px]">
                <form onSubmit={e => e.preventDefault()} className="w-full relative">
                    <textarea 
                        value={prompt} onClick={e => e.currentTarget.focus()}
                        minLength={5} maxLength={60} rows={2}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                handleSubmit(e);
                            }
                        }}                        className="bg-background3 w-full rounded-[12px] p-[12px] resize-none"
                        placeholder={`What about ${topic} would you like to discuss?`}
                        onChange={handleChange}/>
                    <div className="absolute bottom-2 right-2">
                        <p className="text-text3 font-light">{characterCount}/60</p>
                    </div>
                </form>
                <p>Press enter to create</p>
            </div>
        </div>
    </div>
}

var createGeoJSONCircle = function(center, radiusInKm, points) {
    if(!points) points = 64;

    var coords = {
        latitude: center[1],
        longitude: center[0]
    };

    var km = radiusInKm;

    var distanceX = km/(111.320*Math.cos(coords.latitude*Math.PI/180));
    var distanceY = km/110.574;

    var theta, x, y;
    const ret: number[][] = [];

    for(var i=0; i<points; i++) {
        theta = (i/points)*(2*Math.PI);
        x = distanceX*Math.cos(theta);
        y = distanceY*Math.sin(theta);

        ret.push([coords.longitude+x, coords.latitude+y]);
    }
    ret.push(ret[0]);

    return {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [ret]
                }
            }]
        }
    };
};