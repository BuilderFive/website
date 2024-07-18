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

export default function Globe({showUpdates}) {
    const mapbox = useRef<mapboxgl.map>(null)
    const globe = useRef<HTMLDivElement>(null)
    const { radius, createGroup, leaveGroup, joinGroup, setUserLocation, userLocation, packagedGroup, loadedGroups, topic } = useGroup();
    const [loading, setLoading] = useState(true)
    const markers = useRef<any>([])
    const { event } = useSession()
    const reminderTimer = useRef<NodeJS.Timeout | null>(null)
    const circle = useRef<GeoJSONSource | null>(null)

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getCoordinates, handleLocationError);
        reminderTimer.current = null
      } else {
          alert("Geolocation is not supported by this browser.");
      }
    }
    
    function getCoordinates(position) {
        setUserLocation({latitude: position.coords.latitude, longitude: position.coords.longitude})
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

    function updateCircle() {
        const newCircle = createGeoJSONCircle([userLocation.longitude, userLocation.latitude], radius/1000, 64)
        if (circle.current == undefined || circle.current == null) {
            mapbox.current.addSource('circle', newCircle);
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
            return;
        } else {
            circle.current.setData({
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": newCircle.data.features[0].geometry.coordinates
                    },
                    "properties": {} // Add the 'properties' property here
                }]
            })
        }
    }

    useEffect(() => {
        if (userLocation.longitude == null || userLocation.latitude == null) {
            getLocation();
        }
    }, [userLocation.latitude, userLocation.longitude]);

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
                const newCircle = createGeoJSONCircle([userLocation.longitude, userLocation.latitude], radius/1000, 64);
                mapbox.current.addSource('circle', newCircle);
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
                circle.current = mapbox.current.getSource('circle') as GeoJSONSource;
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

    /**
     * Loading the user's circle and changing it's radius
     */
    useEffect(() => {
        if (!mapbox.current || loading) return;
        if (!userLocation.longitude || !userLocation.latitude) return;
        updateCircle();
    },[radius, loading, mapbox.current, userLocation])

    // Function to add markers to the map
    const addMarkers = useCallback((groups: Tables<'groups'>[], packagedGroup: PackagedGroup | null, userLocation: { longitude: number | null, latitude: number | null}) => {
        // Remove existing markers
        markers.current.forEach((marker) => marker.remove());
        markers.current = [];

        // Add new markers
        groups.forEach((group: Tables<'groups'>) => {
            const marker = handleMarkerCreate(group, packagedGroup);
            markers.current.push(marker);
        });

        if (packagedGroup == null) {
            //renders the custom marker component
            const markerContainer = document.createElement('div');
            const root = createRoot(markerContainer);
            root.render(<EmptyBubble createGroup={createGroup} leaveGroup={leaveGroup} topic={topic} packagedGroup={packagedGroup} />);
            
            const marker = new mapboxgl.Marker(markerContainer) 
                .setLngLat([userLocation.longitude, userLocation.latitude])
                .addTo(mapbox.current);

            markers.current.push(marker)
        }
    }, []);

    const handleMarkerCreate = (group: Tables<'groups'>, packagedGroup: PackagedGroup | null) => {
        const isActive = (group.group_uuid == packagedGroup?.group.group_uuid)
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
            
            if (packagedGroup != null) {
                leaveGroup().then((response) => {
                    console.log(response)
                    joinGroup(group)
                })
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
        if (mapbox.current) {
          addMarkers(loadedGroups, packagedGroup, userLocation);
        }
    }, [loadedGroups, addMarkers, packagedGroup, userLocation, loading, event]);

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