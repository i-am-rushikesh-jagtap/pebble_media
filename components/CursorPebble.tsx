"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

export default function CursorPebble() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const [targetPosition, setTargetPosition] = useState(new THREE.Vector2(0, 0));
  const currentPosition = useRef(new THREE.Vector2(0, 0));
  
  // Track hovered state
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates for 3D space (-1 to +1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setTargetPosition(new THREE.Vector2(x, y));
      
      // Magnetic hover detection (simplistic)
      const target = e.target as HTMLElement;
      if (target && (target.tagName.toLowerCase() === 'button' || target.tagName.toLowerCase() === 'a' || target.classList.contains('magnetic'))) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Viewport coordinates to 3D world coordinates
    const vector = new THREE.Vector3(targetPosition.x, targetPosition.y, 0.5);
    vector.unproject(state.camera);
    const dir = vector.sub(state.camera.position).normalize();
    const distance = -state.camera.position.z / dir.z;
    const pos = state.camera.position.clone().add(dir.multiplyScalar(distance));

    // Lerp towards target position for subtle lag/inertia (increased speed)
    currentPosition.current.lerp(new THREE.Vector2(pos.x, pos.y), 0.8);
    
    meshRef.current.position.x = currentPosition.current.x;
    meshRef.current.position.y = currentPosition.current.y;

    // Idle floating and rotation
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;
    meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 2) * 0.05;

    // Animate scale on hover
    const targetScale = isHovering ? 1.5 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    
    // Ripple distort material
    if (materialRef.current) {
      materialRef.current.distort = isHovering ? 0.4 : 0.2;
      materialRef.current.speed = isHovering ? 4 : 2;
    }
  });

  return (
    <Sphere ref={meshRef} args={[0.15, 32, 32]}>
      <MeshDistortMaterial
        ref={materialRef}
        color="#222222" // Dark graphite
        emissive="#FD6732"
        emissiveIntensity={0.1} // Subtle orange reflection
        roughness={0.2}
        metalness={0.8}
        distort={0.2} // Distort sphere to look like a pebble
        speed={2}
      />
    </Sphere>
  );
}
