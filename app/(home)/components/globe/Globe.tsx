'use client';

import { useTheme } from 'next-themes';
import { geoGraticule10 } from 'd3-geo';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GeoJsonGeometry } from 'three-geojson-geometry';

import geoJson from './countries.geojson.json';

interface ThreePropWithTheme {
    theme: string;
}

const Countries: React.FC<ThreePropWithTheme> = ({ theme }) => {
    let themeColor = theme === 'light'
        ? '#3b82f6'
        : '#60a5fa';
    
    return (
        <group>
            {
                geoJson.features.map((data, index) => {
                    const { geometry } = data;
                    return (
                        <lineSegments key={index} geometry={new GeoJsonGeometry(geometry, 1)}>
                            <lineBasicMaterial color={themeColor} />
                        </lineSegments>
                    );
                })
            }
        </group>
    );
};

const GlobeGraticule: React.FC<ThreePropWithTheme> = ({ theme }) => {
    let themeColor = theme === 'light'
        ? '#f1f5f9'
        : '#3c3c3c';

    return (
        <group>
            <lineSegments geometry={new GeoJsonGeometry(geoGraticule10(), 1)}>
                <lineBasicMaterial color={themeColor} />
            </lineSegments>
        </group>
    );
};

const GlobeMesh: React.FC<ThreePropWithTheme> = ({ theme }) => {
    let themeColor = theme === 'light'
        ? '#f1f5f9'
        : '#0f172a';

    return (
        <mesh>
            <sphereGeometry args={[1, 32]} />
            <meshPhongMaterial color={themeColor} transparent={true} opacity={0.8} />
        </mesh>
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
            <pointLight position={[-10, -10, -10]} intensity={0.4} />
            
            <GlobeMesh theme={theme || 'dark'} />
            <GlobeGraticule theme={theme || 'dark'} />
            <Countries theme={theme || 'dark'} />
        </Canvas>
    );
};