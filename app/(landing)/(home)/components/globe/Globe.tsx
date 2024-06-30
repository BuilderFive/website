'use client';

import { useTheme } from 'next-themes';
import { geoGraticule10 } from 'd3-geo';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Point } from '@react-three/drei';
import { GeoJsonGeometry } from 'three-geojson-geometry';

import geoJson from './countries.geojson.json';
import { ArrowHelper, Color, Quaternion, Vector3 } from 'three';

interface ThreePropWithTheme {
    theme: string;
}

const Countries: React.FC<ThreePropWithTheme> = ({ theme }) => {
    let themeColor = theme === 'light'
        ? '#E6F5FF'
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
        console.log(minLat, maxLat, minLon, maxLon)
        
        const randomLat = Math.random() * (maxLat - minLat) + minLat;
        const randomLon = Math.random() * (maxLon - minLon) + minLon;
        points.push(latLonToCartesian(randomLat, randomLon));
    }
    return points;
};

const GlobeGraticule: React.FC<ThreePropWithTheme> = ({ theme }) => {
    let themeColor = theme === 'light'
        ? '#59A4E0'
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
        ? '#59A4E0'
        : '#0f172a';

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

export const Globe = () => {
    const { theme } = useTheme();
    const randomPoints = generateRandomPointsWithinCountries(1000);

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
            <GlobeMesh theme={theme || 'dark'} />
            {/*<GlobeGraticule theme={theme || 'dark'} />*/}
            <Countries theme={theme || 'dark'} />
            {
                randomPoints.map((point, index) => {
                    const dir = new Vector3(point.x, point.y, point.z).normalize();
                    const axis = new Vector3(0, 1, 0).cross(dir).normalize();
                    const angle = Math.acos(new Vector3(0, 1, 0).dot(dir));
                    const quaternion = new Quaternion().setFromAxisAngle(axis, angle);

                    return (
                        <mesh key={index} position={[point.x, point.y, point.z]} quaternion={quaternion}>
                            <cylinderGeometry args={[0.001, 0.001, 0.1, 32]} />
                            <meshBasicMaterial color={"#61abff"} />
                        </mesh>
                    );
                })
            }
        </Canvas>
    );
};