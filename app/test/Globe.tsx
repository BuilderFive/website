"use client"
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import geoJson from '../(landing)/(home)/components/globe/countries.geojson.json';
import { GeoJsonGeometry } from 'three-geojson-geometry';
import Twighlight from '../../public/static/Twighlight.svg';
import dynamic from 'next/dynamic';
import scaleCanvas from 'canvas-dpi-scaler';
import { useRouter } from 'next/navigation';

export default function Globe() {
  const globeContainerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!globeContainerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Black background to see the globe better

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.z = 300;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    globeContainerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 5);
    const pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.position.set(5, 5, 5);
    scene.add(ambientLight, pointLight);

    // Globe
    const globeTextureUrl = 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg';
    const myGlobe = new ThreeGlobe()
      .globeImageUrl(globeTextureUrl)
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png');
    scene.add(myGlobe);

    // Countries
    const theme = 'light'; // or dynamically set based on user preference
    const countries = createCountries(geoJson, theme);
    scene.add(countries);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 125;
    controls.maxDistance = 500;    
    controls.maxPolarAngle = Math.PI / 2;

    function animate() {
      requestAnimationFrame(animate);
      const distance = controls.getDistance();

      controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
      myGlobe.rotation.y += 0.001; // Optional: auto-rotate globe
      renderer.render(scene, camera);
    }
    animate();

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (globeContainerRef.current) {
        globeContainerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={globeContainerRef} style={{ height: '100vh', width: '100vw' }}>
  </div>;
}

const vertexShader = `
    varying vec3 vNormal;
    void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    varying vec3 vNormal;
    void main() {
        float intensity = pow(0.5 - dot(vNormal, vec3(0, 0, 1)), 2.0);
        gl_FragColor = vec4(0.2, 0.5, 1.0, 1.0) * intensity;
    }
`;

const createCountries = (geoJson, theme) => {

    let themeColor = theme === 'light' ? '#E6F5FF' : '#60a5fa';
    const group = new THREE.Group();

    geoJson.features.forEach((data, index) => {
        const { geometry } = data;
        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                color: { value: new THREE.Color(themeColor) }
            }
        });
        const geoGeometry = new GeoJsonGeometry(geometry, 2);
        const lineSegments = new THREE.LineSegments(geoGeometry, material);
        group.add(lineSegments);
    });

    return group;
};
