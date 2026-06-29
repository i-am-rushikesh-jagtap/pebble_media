"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Text } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

function Planet({ position, label }: { position: [number, number, number], label: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.005;
    meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.002;
    
    // Scale up on hover
    const targetScale = hovered ? 1.2 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <group position={position}>
      <Sphere
        ref={meshRef}
        args={[0.5, 32, 32]}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        onClick={() => console.log(`Open case study for ${label}`)}
      >
        <MeshDistortMaterial
          color={hovered ? "#FD6732" : "#222"}
          emissive={hovered ? "#FD6732" : "#000"}
          emissiveIntensity={hovered ? 0.5 : 0}
          roughness={0.4}
          metalness={0.8}
          distort={0.1}
          speed={2}
        />
      </Sphere>
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.2}
        color={hovered ? "#fff" : "rgba(255,255,255,0.5)"}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

export default function Scene05Portfolio() {
  const clients = [
    { label: "SuperYou", pos: [-3, 1, 0] as [number, number, number] },
    { label: "GoZero", pos: [0, 2, -1] as [number, number, number] },
    { label: "Boldfit", pos: [3, 0.5, 0] as [number, number, number] },
    { label: "Scapia", pos: [-2, -1.5, 1] as [number, number, number] },
    { label: "Rapido", pos: [1.5, -2, 0] as [number, number, number] },
  ];

  return (
    <section className="pinned-section" style={{ backgroundColor: "#020202", display: "flex", flexDirection: "column" }}>
      <div className="container" style={{ padding: "4rem 5vw", zIndex: 10 }}>
        <h2 className="text-h2" style={{ textAlign: "center" }}>PORTFOLIO CONSTELLATION</h2>
        <p className="text-body" style={{ textAlign: "center", marginTop: "1rem" }}>Interact with a pebble to explore.</p>
      </div>
      <div style={{ flex: 1, width: "100%", position: "relative" }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} style={{ pointerEvents: "auto" }}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          {clients.map((c, i) => (
            <Planet key={i} position={c.pos} label={c.label} />
          ))}
        </Canvas>
      </div>
    </section>
  );
}
