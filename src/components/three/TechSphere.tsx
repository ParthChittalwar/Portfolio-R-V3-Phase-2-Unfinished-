/**
 * TechSphere.tsx — React Three Fiber 3D hero scene.
 *
 * Imported ONLY via React.lazy() in HeroCanvas3D.tsx so three.js /
 * @react-three/fiber / @react-three/drei land in a separate Vite chunk
 * and are never fetched on mobile, touch devices, or when
 * prefers-reduced-motion is set.
 *
 * Scene:
 *  - Wireframe icosahedron sphere (slow rotation)
 *  - Tech label text orbiting the sphere (from src/data/skills.ts)
 *  - Ambient particle field
 *  - Mouse-reactive scene rig (subtle parallax)
 *  - Adaptive DPR via PerformanceMonitor (drops pixel ratio under load)
 */
import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";
import { skillGroups } from "@/data/skills";

/* ─── Data ──────────────────────────────────────────── */
const ALL_TECHS = skillGroups.flatMap((g) => g.items).slice(0, 24);

/** Evenly distribute n points on a sphere (Fibonacci / golden-angle method). */
function fibonacciSphere(n: number, radius: number): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push(
      new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius),
    );
  }
  return pts;
}

// Pre-compute label positions + stable opacity values (avoids random on re-render)
const LABEL_POSITIONS = fibonacciSphere(ALL_TECHS.length, 1.65);
const LABEL_OPACITIES = ALL_TECHS.map((_, i) => 0.55 + ((i * 0.37) % 0.45));

/* ─── Tech Label ─────────────────────────────────────── */
function TechLabel({
  position,
  label,
  opacity,
}: {
  position: THREE.Vector3;
  label: string;
  opacity: number;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ camera }) => {
    if (!ref.current) return;
    // Billboard — always face the camera
    ref.current.quaternion.copy(camera.quaternion);
  });

  return (
    <group ref={ref} position={position}>
      <Text fontSize={0.085} color="white" anchorX="center" anchorY="middle" fillOpacity={opacity}>
        {label}
      </Text>
    </group>
  );
}

/* ─── Wireframe Sphere ───────────────────────────────── */
function Sphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.07;
    meshRef.current.rotation.x += delta * 0.02;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color="white" wireframe opacity={0.06} transparent />
    </mesh>
  );
}

/* ─── Ambient Particle Field ─────────────────────────── */
function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const count = 140;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 9;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.012;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial color="white" size={0.016} transparent opacity={0.16} sizeAttenuation />
    </points>
  );
}

/* ─── Mouse Parallax Rig ─────────────────────────────── */
function SceneRig({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / size.width - 0.5) * 2;
      mouse.current.y = -(e.clientY / size.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [size]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x +=
      (mouse.current.y * 0.12 - groupRef.current.rotation.x) * delta * 2.5;
    groupRef.current.rotation.y +=
      (mouse.current.x * 0.18 - groupRef.current.rotation.y) * delta * 2.5;
  });

  return <group ref={groupRef}>{children}</group>;
}

/* ─── Exported Canvas ────────────────────────────────── */
export default function TechSphere() {
  const [dpr, setDpr] = useState(() => Math.min(window.devicePixelRatio, 1.5));

  return (
    <Canvas
      camera={{ position: [0, 0, 3.8], fov: 50 }}
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      aria-hidden="true"
    >
      <PerformanceMonitor
        onDecline={() => setDpr(0.8)}
        onIncline={() => setDpr(Math.min(window.devicePixelRatio, 1.5))}
        flipflops={3}
        iterations={10}
        threshold={0.9}
        factor={1}
      />

      <ambientLight intensity={0.25} />
      <pointLight position={[4, 4, 4]} intensity={0.7} color="#ffffff" />
      <pointLight position={[-4, -2, -2]} intensity={0.2} color="#a0a8ff" />

      <SceneRig>
        <Sphere />
        {ALL_TECHS.map((label, i) => (
          <TechLabel
            key={label}
            label={label}
            position={LABEL_POSITIONS[i]}
            opacity={LABEL_OPACITIES[i]}
          />
        ))}
      </SceneRig>

      <ParticleField />
    </Canvas>
  );
}
