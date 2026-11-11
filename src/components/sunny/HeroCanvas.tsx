import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import type { Group, Mesh } from "three";
import * as THREE from "three";

function Ribbon({ offset, color, scale }: { offset: number; color: string; scale: number }) {
  const mesh = useRef<Mesh>(null);
  useFrame(({ clock, pointer }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime() * 0.3 + offset;
    mesh.current.rotation.x = Math.sin(t) * 0.25 + pointer.y * 0.12;
    mesh.current.rotation.y = Math.cos(t * 0.8) * 0.3 + pointer.x * 0.16;
    mesh.current.position.y = Math.sin(t * 1.2) * 0.18;
  });
  return (
    <mesh ref={mesh} scale={scale}>
      <torusGeometry args={[1.55, 0.045, 16, 96, Math.PI * 1.45]} />
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={0.7}
        roughness={0.16}
        metalness={0.18}
        transmission={0.7}
        thickness={0.5}
      />
    </mesh>
  );
}

function Scene() {
  const group = useRef<Group>(null);
  useFrame(({ pointer }) => {
    if (!group.current) return;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      pointer.y * 0.12,
      0.04
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      pointer.x * 0.16,
      0.04
    );
  });
  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <Ribbon offset={0} color="#D9D9D9" scale={1.1} />
        <Ribbon offset={2} color="#6B6A69" scale={0.9} />
        <Ribbon offset={4} color="#AFAFAE" scale={0.76} />
        <mesh position={[0, 0, -0.5]}>
          <icosahedronGeometry args={[0.7, 2]} />
          <meshPhysicalMaterial
            color="#D9D9D9"
            transparent
            opacity={0.12}
            wireframe
            roughness={0.2}
          />
        </mesh>
      </Float>
    </group>
  );
}

export function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="hero-canvas relative z-10 min-h-[480px] h-full w-full" aria-hidden="true">
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 42 }}
          dpr={[1, 1.5]}
          frameloop="always"
          style={{ width: "100%", height: "100%", minHeight: 450, position: "absolute", inset: 0 }}
          gl={{
            powerPreference: "high-performance",
            antialias: true,
            alpha: true,
          }}
        >
          <ambientLight intensity={1.6} color="#AFAFAE" />
          <directionalLight position={[2, 3, 4]} intensity={3.5} color="#D9D9D9" />
          <pointLight position={[2, 3, 4]} intensity={8} color="#6B6A69" />
          <pointLight position={[-3, -2, 2]} intensity={3} color="#6B6A69" />
          <Scene />
        </Canvas>
      )}
    </div>
  );
}

export default HeroCanvas;
