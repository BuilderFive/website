"use client"

import { useEffect, useRef, useState } from "react";
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import './globals.css'; // Import the globals.css file
import { useGroup } from "~/util/GroupProvider";
import { Tables } from "~/util/supabase-types";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";

export default function Globe({children}: {children: React.ReactNode}) {
    const mapbox = useRef<mapboxgl.map>(null)
    const globe = useRef<HTMLDivElement>(null)
    const { radius, setRadius, setUserLocation, userLocation, packagedGroup, loadedGroups } = useGroup();
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

    useEffect(() => {
        if (!mapbox.current) return;
        const circle = mapbox.current.getSource('circle')
        if(!circle) return;
        const geoJSON = createGeoJSONCircle([userLocation.longitude, userLocation.latitude], radius/1000, 64)
        circle.setData(geoJSON.data)

    },[radius])
    
    useEffect(()=> {
        if (!mapbox.current) return;
        // Add your custom markers and lines here
        markers.current.forEach((marker: mapboxgl.Marker)=>marker.remove());

        loadedGroups.forEach((group: Tables<'groups'>) => {
            const isActive = (group.group_uuid == packagedGroup?.group.group_uuid)
            console.log(isActive)
            console.log(group.group_uuid, packagedGroup?.group.group_uuid)
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
    },[loadedGroups, packagedGroup])

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