/**
 * TechSphereScene — the interactive R3F hero background.
 *
 * This file is deliberately isolated so that `React.lazy()` can split it into
 * its own chunk. three.js + @react-three/fiber + @react-three/drei only load
 * for visitors on capable desktop browsers with motion enabled.
 *
 * The scene renders:
 *  - A wireframe icosahedron sphere that rotates slowly and reacts to mouse
 *    position via parallax.
 *  - 80 ambient particles scattered around the sphere.
 *  - Subtle point lights that give depth.
 *
 * Performance targets: 60fps desktop, 30fps mobile (via DPR adaption).
 */
import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents, PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";

/* ---------- Floating particles ---------- */
function Particles({ count = 80 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1.8 + Math.random() * 1.4;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#ffffff" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

/* ---------- Wire sphere + mouse parallax ---------- */
function Sphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.06;
    meshRef.current.rotation.x += delta * 0.02;
    // Subtle mouse parallax
    meshRef.current.position.x += (pointer.x * 0.18 - meshRef.current.position.x) * 0.08;
    meshRef.current.position.y += (pointer.y * 0.12 - meshRef.current.position.y) * 0.08;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 3]} />
      <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.07} />
    </mesh>
  );
}

/* ---------- Scene root ---------- */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[4, 4, 4]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-4, -2, -3]} intensity={0.6} color="#8888ff" />
      <Sphere />
      <Particles />
    </>
  );
}

/* ---------- Exported canvas ---------- */
export default function TechSphereScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <PerformanceMonitor
          onDecline={() => {
            // Handled by AdaptiveDpr below
          }}
        >
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          <Scene />
        </PerformanceMonitor>
      </Suspense>
    </Canvas>
  );
}
