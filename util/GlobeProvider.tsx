"use client"

import React, { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useGroup } from './GroupProvider';
import { GeoJSONSource, Source } from "mapbox-gl";
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'

interface GlobeContextProps {
    createGeoJSONCircle: (center: number[], radiusInKm: number, points: number) => any;
    mapbox: React.MutableRefObject<mapboxgl.map> | null;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isWithinRadius: (groupLocation: { latitude: number, longitude: number }) => boolean;
}

const GlobeContext = createContext<GlobeContextProps>({
    createGeoJSONCircle: () => null,
    mapbox: null,
    loading: true,
    setLoading: () => null,
    isWithinRadius: () => false
});

export const useGlobe = () => useContext(GlobeContext);

/**
 * To provide the context for the globe
 * @param props 
 * @returns 
 */
export function GlobeProvider(props: React.PropsWithChildren) {
    const { setUserLocation, userLocation, radius } = useGroup();
    const reminderTimer = useRef<NodeJS.Timeout | null>(null)
    const mapbox = useRef<mapboxgl.map>(null)
    const [loading, setLoading] = useState(true)

    //UPDATE USER LOCATION
    function getLocation() {
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
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCoordinates, handleLocationError);
            reminderTimer.current = null
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
    useEffect(() => {
        if (userLocation.longitude == null || userLocation.latitude == null) {
            getLocation();
        }
    }, [userLocation.latitude, userLocation.longitude]);
    
    //UPDATE CIRCLE RADIUS
    const updateCircle = useCallback(() => {
        const newCircle = createGeoJSONCircle([userLocation.longitude, userLocation.latitude], radius / 1000, 64);
        const circleSource = mapbox.current.getSource('circle');
    
        if (!circleSource) {
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
        } else {
          circleSource.setData({
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Polygon',
                  coordinates: newCircle.data.features[0].geometry.coordinates
                },
                properties: {}
              }
            ]
          });
        }
      }, [userLocation, radius]);
    useEffect(() => {
        if (!mapbox.current || loading == true) return;
        if (!userLocation.longitude || !userLocation.latitude) return;
        updateCircle();
    },[radius, updateCircle, userLocation, loading])

    //CREATE CIRCLE
    const createGeoJSONCircle = (center, radiusInKm, points) => {
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

    function isWithinRadius(groupLocation: { latitude: number, longitude: number }): boolean {
        if (!userLocation.latitude || !userLocation.longitude) return false;
        function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
            const R = 6371; // Radius of the earth in km
            const dLat = deg2rad(lat2 - lat1);
            const dLon = deg2rad(lon2 - lon1);
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c; // Distance in km
            return distance;
        }
    
        function deg2rad(deg: number): number {
            return deg * (Math.PI / 180);
        }
        const distance = getDistance(userLocation.latitude, userLocation.longitude, groupLocation.latitude, groupLocation.longitude);
        return distance <= radius;
    }





    const contextObject = {
         createGeoJSONCircle, mapbox, loading, setLoading, isWithinRadius
    };
    return (
        <GlobeContext.Provider value={contextObject}>
            {props.children}
        </GlobeContext.Provider>
    );
}