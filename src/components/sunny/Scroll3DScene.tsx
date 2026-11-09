import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef, useEffect } from "react";
import type { Group, Mesh } from "three";
import * as THREE from "three";

interface FloatingElementProps {
  position: [number, number, number];
  color: string;
  speed: number;
  type: "octa" | "torus" | "icosa" | "ribbon";
  scale?: number;
  rotationSpeed?: number;
}

function SectionDividerMesh({
  position,
  color,
  speed,
  type,
  scale = 1,
  rotationSpeed = 0.5,
}: FloatingElementProps) {
  const meshRef = useRef<Mesh>(null);
  const scrollRef = useRef({ targetY: 0, currentY: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollRef.current.targetY = window.scrollY / maxScroll;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * speed;

    // Smooth lerping of scroll target
    scrollRef.current.currentY = THREE.MathUtils.lerp(
      scrollRef.current.currentY,
      scrollRef.current.targetY,
      0.06
    );
    const scroll = scrollRef.current.currentY;

    // 3D rotations driven by scroll & cursor pointer
    meshRef.current.rotation.x = t * rotationSpeed + scroll * Math.PI * 1.6 + pointer.y * 0.25;
    meshRef.current.rotation.y = t * (rotationSpeed * 1.2) + scroll * Math.PI * 2.2 + pointer.x * 0.25;
    meshRef.current.rotation.z = Math.sin(t * 0.4) * 0.25;

    // Vertical parallax displacement
    meshRef.current.position.y = position[1] + Math.sin(t) * 0.18 - scroll * 2.2;
    meshRef.current.position.x = position[0] + Math.cos(t * 0.8) * 0.1 + pointer.x * 0.15;
  });

  return (
    <Float
      speed={speed * 2}
      rotationIntensity={0.4}
      floatIntensity={0.6}
      floatingRange={[-0.1, 0.1]}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        {type === "octa" && <octahedronGeometry args={[0.7, 0]} />}
        {type === "torus" && <torusGeometry args={[0.8, 0.08, 16, 40]} />}
        {type === "icosa" && <icosahedronGeometry args={[0.65, 0]} />}
        {type === "ribbon" && <torusGeometry args={[1.1, 0.035, 16, 64, Math.PI * 1.3]} />}

        {type === "ribbon" ? (
          <meshPhysicalMaterial
            color={color}
            transparent
            opacity={0.6}
            roughness={0.15}
            metalness={0.1}
            transmission={0.65}
            thickness={0.4}
          />
        ) : (
          <meshPhysicalMaterial
            color={color}
            roughness={0.32}
            metalness={0.18}
            clearcoat={0.35}
            transparent
            opacity={0.7}
          />
        )}
      </mesh>
    </Float>
  );
}

function SectionTransitionsCluster() {
  const group = useRef<Group>(null);
  const { invalidate } = useThree();

  useEffect(() => {
    const onScrollOrMove = () => invalidate();
    window.addEventListener("scroll", onScrollOrMove, { passive: true });
    window.addEventListener("pointermove", onScrollOrMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScrollOrMove);
      window.removeEventListener("pointermove", onScrollOrMove);
    };
  }, [invalidate]);

  useFrame(({ pointer }) => {
    if (!group.current) return;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.y * 0.08, 0.04);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.08, 0.04);
  });

  return (
    <group ref={group}>
      {/* Divider 1: Hero → About transition */}
      <SectionDividerMesh
        position={[2.8, 1.4, -1]}
        color="#b7d7c1"
        speed={0.35}
        type="icosa"
        scale={0.95}
      />
      <SectionDividerMesh
        position={[3.1, 1.2, -1.2]}
        color="#d7eee0"
        speed={0.25}
        type="ribbon"
        scale={0.85}
      />

      {/* Divider 2: About → Services transition */}
      <SectionDividerMesh
        position={[-3.0, 0.1, -1.1]}
        color="#F4F4F5"
        speed={0.3}
        type="torus"
        scale={0.9}
      />
      <SectionDividerMesh
        position={[-2.7, -0.2, -0.9]}
        color="#b7d7c1"
        speed={0.4}
        type="octa"
        scale={0.75}
      />

      {/* Divider 3: Services → Portfolio transition */}
      <SectionDividerMesh
        position={[2.7, -1.5, -0.8]}
        color="#d9b7a4"
        speed={0.4}
        type="octa"
        scale={0.85}
      />
      <SectionDividerMesh
        position={[2.5, -1.8, -1.3]}
        color="#b7d7c1"
        speed={0.3}
        type="ribbon"
        scale={0.95}
      />
    </group>
  );
}

export function Scroll3DScene() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[2] h-screen w-full overflow-hidden"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        frameloop="always"
        style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
        gl={{
          powerPreference: "high-performance",
          antialias: true,
          alpha: true,
        }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[4, 5, 3]} intensity={1.8} color="#b7d7c1" />
        <directionalLight position={[-4, -3, 2]} intensity={1.2} color="#F4F4F5" />
        <SectionTransitionsCluster />
      </Canvas>
    </div>
  );
}

export default Scroll3DScene;
