import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import type { Group, Mesh, PerspectiveCamera } from "three";
import * as THREE from "three";

function ThrottledRender({ active }: { active: boolean }) {
  const { invalidate } = useThree();

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    let last = 0;
    const tick = (now: number) => {
      if (now - last >= 1000 / 30) {
        last = now;
        invalidate();
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, invalidate]);

  return null;
}

function ResponsiveCamera() {
  const { camera } = useThree();

  useEffect(() => {
    const perspectiveCamera = camera as PerspectiveCamera;
    const update = () => {
      const width = window.innerWidth;
      perspectiveCamera.position.z = width < 640 ? 6.2 : width < 1024 ? 5.6 : 5;
      perspectiveCamera.fov = width < 640 ? 50 : width < 1024 ? 46 : 42;
      perspectiveCamera.updateProjectionMatrix();
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, [camera]);

  return null;
}

function Ribbon({
  offset,
  color,
  scale,
  mobile,
}: {
  offset: number;
  color: string;
  scale: number;
  mobile: boolean;
}) {
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
      <torusGeometry args={[1.55, 0.045, mobile ? 8 : 16, mobile ? 48 : 96, Math.PI * 1.45]} />
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

function Scene({ mobile }: { mobile: boolean }) {
  const group = useRef<Group>(null);
  useFrame(({ pointer }) => {
    if (!group.current) return;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      pointer.y * 0.12,
      0.04,
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      pointer.x * 0.16,
      0.04,
    );
  });
  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <Ribbon offset={0} color="#D9D9D9" scale={1.1} mobile={mobile} />
        <Ribbon offset={2} color="#6B6A69" scale={0.9} mobile={mobile} />
        <Ribbon offset={4} color="#AFAFAE" scale={0.76} mobile={mobile} />
        <mesh position={[0, 0, -0.5]}>
          <icosahedronGeometry args={[0.7, mobile ? 1 : 2]} />
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 },
    );

    observer.observe(el);
    const media = window.matchMedia("(max-width: 767px)");
    const updateMobile = () => setIsMobile(media.matches);
    updateMobile();
    media.addEventListener("change", updateMobile);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", updateMobile);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="hero-canvas relative z-10 h-[300px] w-full sm:h-[450px] lg:h-[600px]"
      aria-hidden="true"
    >
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 42 }}
          dpr={[1, 1.25]}
          frameloop="demand"
          style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
          gl={{
            powerPreference: "high-performance",
            antialias: !isMobile,
            alpha: true,
          }}
        >
          <ResponsiveCamera />
          <ThrottledRender active={isVisible} />
          <ambientLight intensity={1.6} color="#AFAFAE" />
          <directionalLight position={[2, 3, 4]} intensity={3.5} color="#D9D9D9" />
          <pointLight position={[2, 3, 4]} intensity={8} color="#6B6A69" />
          <pointLight position={[-3, -2, 2]} intensity={3} color="#6B6A69" />
          <Scene mobile={isMobile} />
        </Canvas>
      )}
    </div>
  );
}

export default HeroCanvas;
