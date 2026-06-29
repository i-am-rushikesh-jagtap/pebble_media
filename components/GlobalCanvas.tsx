"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import CursorPebble from "./CursorPebble";

export default function GlobalCanvas() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999, // Render on top of everything
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <Environment preset="city" />
        <CursorPebble />
      </Canvas>
    </div>
  );
}
