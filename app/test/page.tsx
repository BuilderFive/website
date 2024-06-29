"use client"
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

/*const Globe = dynamic(() => import('./Globe'), {
  ssr: false // This will only import and render the component on the client-side
});*/
declare global {
    namespace JSX {
      interface IntrinsicElements {
        'gmp-map-3d': CustomMapElement;
      }
    }
  
    interface CustomMapElement extends HTMLElement {
      center: string;
      tilt: string;
    }
  }
  const loadGoogleMapsScript = (callback: () => void) => {
    if (window.google) {
        callback();
        return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&v=alpha&libraries=maps3d`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = () => {
        callback();
    };
};
export default function Page() {
    const mapContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        loadGoogleMapsScript(() => {
            if (mapContainerRef.current) {
                const map3d = document.createElement('gmp-map-3d') as CustomMapElement;
                mapContainerRef.current.appendChild(map3d);
            }
        });
    }, []);

    return (
        <div ref={mapContainerRef} style={{ height: '100vh', width: '100vw' }}></div>
    );
}