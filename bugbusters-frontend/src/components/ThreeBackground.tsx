"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  variant?: 'particles' | 'waves' | 'gradient';
}

export default function ThreeBackground({ variant = 'particles' }: ThreeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    if (variant === 'particles') {
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 5000;
      const posArray = new Float32Array(particlesCount * 3);

      for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.15,
        color: new THREE.Color(0x10b981),
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });

      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      particlesRef.current = particlesMesh;
      scene.add(particlesMesh);
    } else if (variant === 'waves') {
      const geometry = new THREE.PlaneGeometry(50, 50, 64, 64);
      const material = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.3,
        wireframe: true,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = -Math.PI / 2;
      meshRef.current = mesh;
      scene.add(mesh);

      const light = new THREE.PointLight(0xffffff, 1, 100);
      light.position.set(0, 10, 10);
      scene.add(light);

      const ambientLight = new THREE.AmbientLight(0x404040);
      scene.add(ambientLight);
    } else {
      const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
      const material = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.3,
        wireframe: true,
      });

      const mesh = new THREE.Mesh(geometry, material);
      meshRef.current = mesh;
      scene.add(mesh);

      const light = new THREE.PointLight(0xffffff, 1, 100);
      light.position.set(10, 10, 10);
      scene.add(light);

      const ambientLight = new THREE.AmbientLight(0x404040);
      scene.add(ambientLight);
    }

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.001;
        particlesRef.current.rotation.x = mouseY * 0.1;
        particlesRef.current.rotation.y = mouseX * 0.1;
      }

      if (meshRef.current) {
        meshRef.current.rotation.x += 0.001;
        meshRef.current.rotation.y += 0.002;
        
        if (variant === 'waves' && meshRef.current.geometry instanceof THREE.PlaneGeometry) {
          const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
          const time = Date.now() * 0.001;
          
          for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];
            positions[i + 2] = Math.sin(x * 0.5 + time) * Math.cos(y * 0.5 + time) * 2;
          }
          
          meshRef.current.geometry.attributes.position.needsUpdate = true;
        }
      }

      if (cameraRef.current) {
        cameraRef.current.position.x += (mouseX * 2 - cameraRef.current.position.x) * 0.05;
        cameraRef.current.position.y += (-mouseY * 2 - cameraRef.current.position.y) * 0.05;
        cameraRef.current.lookAt(scene.position);
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      
      if (rendererRef.current && container) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      
      if (particlesRef.current) {
        particlesRef.current.geometry.dispose();
        (particlesRef.current.material as THREE.Material).dispose();
      }
      
      if (meshRef.current) {
        meshRef.current.geometry.dispose();
        (meshRef.current.material as THREE.Material).dispose();
      }
    };
  }, [variant]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

