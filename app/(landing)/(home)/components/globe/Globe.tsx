'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { geoGraticule10 } from 'd3-geo';
import { Canvas, useLoader, useFrame, } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GeoJsonGeometry } from 'three-geojson-geometry';
import { Group, TextureLoader, AnimationLoader, CanvasTexture, BufferGeometry, Material, Mesh, NormalBufferAttributes, Object3DEventMap } from 'three';
import { Quaternion, Vector3 } from 'three';
import geoJson from './countries.geojson.json';
import { parseGIF, decompressFrames } from 'gifuct-js';
import { Plane } from '@react-three/drei';

interface ThreePropWithTheme {
    theme: string;
}

const Countries: React.FC<ThreePropWithTheme> = ({ theme }) => {
    let themeColor = theme === 'light' ? '#E6F5FF' : '#60a5fa';
    
    return (
        <group>
            {geoJson.features.map((data, index) => {
                const { geometry } = data;
                return (
                    <lineSegments key={index} geometry={new GeoJsonGeometry(geometry, 1)}>
                        <lineBasicMaterial color={themeColor} />
                    </lineSegments>
                );
            })}
        </group>
    );
};

const generateRandomPointsWithinCountries = (numPoints: number) => {
    const points: { x: number; y: number; z: number; }[] = [];
    for (let i = 0; i < numPoints; i++) {
        const randomCountryIndex = Math.floor(Math.random() * geoJson.features.length);
        const randomCountryGeometry = geoJson.features[randomCountryIndex].geometry;
        const coordinates = randomCountryGeometry.coordinates[0]; // Access the first polygon

        // Flatten the coordinates if necessary
        const flattenedCoordinates = coordinates.flat();

        // Extract the latitude and longitude values
        const latitudes = flattenedCoordinates.map(coord => coord[0]);
        const longitudes = flattenedCoordinates.map(coord => coord[1]);

        // Find the min and max latitudes and longitudes
        const minLat = Math.min(...latitudes);
        const maxLat = Math.max(...latitudes);
        const minLon = Math.min(...longitudes);
        const maxLon = Math.max(...longitudes);
        
        const randomLat = Math.random() * (maxLat - minLat) + minLat;
        const randomLon = Math.random() * (maxLon - minLon) + minLon;
        points.push(latLonToCartesian(randomLat, randomLon));
    }
    return points;
};

const GlobeGraticule: React.FC<ThreePropWithTheme> = ({ theme }) => {
    let themeColor = theme === 'light' ? '#59A4E0' : '#3c3c3c';

    return (
        <group>
            <lineSegments geometry={new GeoJsonGeometry(geoGraticule10(), 1)}>
                <lineBasicMaterial color={themeColor} />
            </lineSegments>
        </group>
    );
};

const GlobeMesh: React.FC<ThreePropWithTheme> = ({ theme }) => {
    let themeColor = theme === 'light' ? '#59A4E0' : '#0f172a';

    return (
        <mesh>
            <sphereGeometry args={[1, 32]} />
            <meshPhongMaterial color={themeColor} transparent={true} opacity={0.8} />
        </mesh>
    );
};

// Function to convert lat/lon to Cartesian coordinates
const latLonToCartesian = (lat: number, lon: number, radius: number = 1) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return {
        x: -(radius * Math.sin(phi) * Math.cos(theta)),
        y: radius * Math.cos(phi),
        z: radius * Math.sin(phi) * Math.sin(theta)
    };
};
  
const ImageMarker = ({ position, imageUrl }: { position: { x: number; y: number; z: number; }, imageUrl: string }) => {
    const texture = useLoader(TextureLoader, imageUrl);
    const dir = new Vector3(position.x, position.y, position.z).normalize();
    const axis = new Vector3(0, 1, 0).cross(dir).normalize();
    const angle = Math.acos(new Vector3(0, 1, 0).dot(dir));
    const quaternion = new Quaternion().setFromAxisAngle(axis, angle);

    return (
        <mesh position={[position.x, position.y, position.z]} quaternion={quaternion}>
            <planeGeometry args={[0.1, 0.1]} />
            <meshBasicMaterial map={texture} side={2} />
        </mesh>
    );
};

const RotatingGlobe: React.FC<ThreePropWithTheme> = ({ theme }) => {
    const globeRef = useRef<Group>(null);

    useFrame(() => {
        if (globeRef.current) {
            globeRef.current.rotation.y += 0.001; // Adjust the rotation speed here
        }
    });

    return (
        <group ref={globeRef}>
            <GlobeMesh theme={theme || 'dark'} />
            {/*<GlobeGraticule theme={theme || 'dark'} />*/}
            <Countries theme={theme || 'dark'} />
            <AnimationMarker position={latLonToCartesian(31.7749, -187.4194)} gifUrl="/animations/active-mic.gif" />

        </group>
    );
};

export const Globe = () => {
    const { theme } = useTheme();
    
    return (
        <Canvas
            camera={{
                fov: 57,
                position: [0, 0, 2.1]
            }}
            style={{
                cursor: 'move'
            }}
        >
            <OrbitControls enableRotate={true} enableZoom={false} enablePan={false} />
            <ambientLight intensity={1.3} />
            <RotatingGlobe theme={theme || 'dark'} />
        </Canvas>
    );
};
const loadGifTexture = async (url) => {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const gif = parseGIF(buffer);
    const frames = decompressFrames(gif, true);
  
    return frames.map(frame => {
      const { width, height } = frame.dims;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const imageData = ctx.createImageData(width, height);
        for (let i = 0; i < frame.patch.length; i++) {
          imageData.data[i] = frame.patch[i];
        }
        ctx.putImageData(imageData, 0, 0);
      }
      return new CanvasTexture(canvas);
    });
  };
  
  const AnimationMarker = ({ position, gifUrl }) => {
    const [gifTextures, setGifTextures] = useState<any>([]);
    const [currentFrame, setCurrentFrame] = useState(0);
    const meshRef = useRef<any>(null);
  
    useEffect(() => {
      let isMounted = true;
      loadGifTexture(gifUrl).then((textures) => {
        if (isMounted) {
          setGifTextures(textures);
        }
      });
      return () => {
        isMounted = false;
      };
    }, [gifUrl]);
  
    useFrame(() => {
      if (gifTextures.length > 0) {
        setCurrentFrame((prev) => (prev + 1) % gifTextures.length);
      }
  
      if (meshRef.current) {
        const dir = new Vector3(position.x, position.y, position.z).normalize();
        const up = new Vector3(0, 0, 1); // Use Z axis as up vector
        const quaternion = new Quaternion().setFromUnitVectors(up, dir);
      
        // Adjust the position to lie exactly on the globe's surface
        const adjustedPosition = dir.multiplyScalar(1.01); // Assuming the globe radius is 1
      
        meshRef.current.position.set(adjustedPosition.x, adjustedPosition.y, adjustedPosition.z);
        meshRef.current.quaternion.copy(quaternion);
      }
    });
  
    if (gifTextures.length === 0) return null;
  
    return (
      <mesh ref={meshRef}>
        <planeGeometry args={[0.075, 0.075]} />
        <meshBasicMaterial map={gifTextures[currentFrame]} side={2} transparent />
      </mesh>
    );
  };