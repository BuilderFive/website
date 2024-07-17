"use client"

import { ChangeEvent, ChangeEventHandler, KeyboardEvent, useEffect, useRef, useState } from "react";
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import '../../../../connect/(components)/globals.css'; // Import the globals.css file
import { createRoot } from 'react-dom/client';

const loc = {
    lng: -97.7301196466434,
    lat: 30.3573661955038
}
const groupCallTitles = [
    "Startup Brainstorming Session",
    "Innovation Exchange",
    "Founders' Coffee Chat",
    "Entrepreneur Networking Hour",
    "Pitch Practice Meet-up",
    "Idea Validation Group",
    "Growth Hacking Discussion",
    "Co-Founder Speed Dating",
    "Business Strategy Jam",
    "MVP Feedback Roundtable",
    "Funding and Investment Tips",
    "Product Development Workshop",
    "Market Research Meetup",
    "Digital Marketing Strategies",
    "Lean Startup Circle",
    "Social Media Mastermind",
    "Tech Trends Talk",
    "Branding and Design Clinic",
    "UX/UI Design Think Tank",
    "SaaS Success Stories",
    "Freelancers' Forum",
    "Remote Work Strategies",
    "Side Hustle Support Group",
    "Scaling Up Secrets",
    "Women in Tech Networking",
    "Young Founders' Forum",
    "Creative Entrepreneurs Collective",
    "AI and Machine Learning Insights",
    "Blockchain and Crypto Chat",
    "Sustainable Business Ideas",
    "E-commerce Entrepreneurs Meet-up",
    "App Development Discussion",
    "Legal Advice for Startups",
    "Sales and Customer Acquisition",
    "Financial Planning for Entrepreneurs",
    "Bootstrapping Your Business",
    "From Idea to Launch",
    "Health and Wellness for Entrepreneurs",
    "Navigating Startup Challenges",
    "Networking and Collaboration Hub"
];

export default function DemoGlobe() {
    const mapbox = useRef<mapboxgl.map>(null)
    const globe = useRef<HTMLDivElement>(null)
    const [loading, setLoading] = useState(true)
    const markers = useRef<any>([])
    const [created, setCreated] = useState(false)
    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_BOX_TOKEN;

        if (globe.current) {
            mapbox.current = new mapboxgl.Map({
              container: globe.current,
              style: "mapbox://styles/wrys/cly3upq5700fr01qr6d12d26s",
              center: [loc.lng, loc.lat],
              zoom: 5,
              maxZoom: 10,
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
            
            mapbox.current.on('load', () => {

                //gotta figure out how to scale this si
                mapbox.current.addSource('circle', createGeoJSONCircle([loc.lng, loc.lat], 50, 64));
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
        const interval = setInterval(async() => {

            if (!mapbox.current) return;

            const element = document.createElement('div');
            element.className = 'wait-audio-group-marker';

            const lon = getRandomLongitude();
            const lat = getRandomLatitude();

            const marker = new mapboxgl.Marker(element)
                .setLngLat([lon, lat])
                .addTo(mapbox.current);
            const popup = new mapboxgl.Popup({
                    closeButton: false,
                    closeOnClick: true,
                    offset: {
                        'bottom' : [0, -40]
                    }
                });
            const title = groupCallTitles[Math.floor(Math.random() * groupCallTitles.length)];
            marker.getElement().addEventListener('mouseenter', async() => {
                const infoBubble = document.createElement('div');
                const root = createRoot(infoBubble);
                root.render(<div className={`relative w-fit h-fit flex flex-col text-start justify-start items-start`}>
                    <p className="text-slate-500 font-regular text-[12px]">startups</p>
                    <p className="text-slate-800 font-semibold text-[24px]">
                        {title}
                    </p>
                    </div>)
                popup
                    .setLngLat([lon, lat])
                    .setDOMContent(infoBubble)
                    .addTo(mapbox.current);
            

            });
    
            marker.getElement().addEventListener('mouseleave', async() => {
                popup.remove();
            });
            
            markers.current.push(marker);
        }, Math.floor(Math.random() * (8000 - 3000 + 1)) + 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {

            if (!mapbox.current) return;
            const randomIndex = Math.floor(Math.random() * markers.current.length);
            const marker = markers.current[randomIndex];
            const element = marker.getElement();
            if (element.classList.contains('wait-audio-group-marker')) {
                element.classList.remove('wait-audio-group-marker');
                element.classList.add('other-audio-group-marker');
            } else if (element.classList.contains('other-audio-group-marker')){
                marker.remove()
            }
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    

    
    /**
     * Generate a random longitude value within a certain range
     */
    function getRandomLongitude(): number {
        const min = -180;
        const max = 180;
        return Math.random() * (max - min) + min;
    }

    /**
     * Generate a random latitude value within a certain range
     */
    function getRandomLatitude(): number {
        const min = -90;
        const max = 90;
        return Math.random() * (max - min) + min;
    }

    useEffect(()=> {
        if (!mapbox.current) return;

        markers.current.forEach((marker: mapboxgl.Marker)=>marker.remove());

        if (!created) {
            //renders the custom marker component
            const markerContainer = document.createElement('div');
            const root = createRoot(markerContainer);
            root.render(<EmptyBubble created={created} setCreated={setCreated} />);   
            
            
            const marker = new mapboxgl.Marker(markerContainer) 
                .setLngLat([loc.lng, loc.lat])
                .addTo(mapbox.current);

            markers.current.push(marker)
        } else {
            const element = document.createElement('div');
            element.className = 'your-audio-group-marker';
            
            const marker = new mapboxgl.Marker(element)
                .setLngLat([loc.lng, loc.lat])
                .addTo(mapbox.current);

                marker.getElement().addEventListener('click', async() => {
                    setCreated(false)
                });
            markers.current.push(marker)
        }
    },[created])

    return(<div className="w-screen h-screen relative">
        <div ref={globe} className="h-full w-full"/>
    </div>)
}

//create an empty prompt div which the user can fill out to create a group
function EmptyBubble({created, setCreated}) {
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
        setCreated(true)
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
                        placeholder={`What about startups do you want to talk about?`}
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