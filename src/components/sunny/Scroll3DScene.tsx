import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef, useEffect } from "react";
import type { Group, Mesh, PerspectiveCamera } from "three";
import * as THREE from "three";

function InteractionInvalidator() {
  const { invalidate } = useThree();

  useEffect(() => {
    let frame = 0;
    const requestRender = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        invalidate();
      });
    };
    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("pointermove", requestRender, { passive: true });
    requestRender();
    return () => {
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("pointermove", requestRender);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [invalidate]);

  return null;
}

function ResponsiveCamera() {
  const { camera } = useThree();

  useEffect(() => {
    const perspectiveCamera = camera as PerspectiveCamera;
    const update = () => {
      const width = window.innerWidth;
      perspectiveCamera.position.z = width < 640 ? 6.8 : width < 1024 ? 5.8 : 5;
      perspectiveCamera.fov = width < 640 ? 56 : width < 1024 ? 50 : 45;
      perspectiveCamera.updateProjectionMatrix();
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, [camera]);

  return null;
}

interface FloatingElementProps {
  position: [number, number, number];
  color: string;
  speed: number;
  type: "octa" | "torus" | "icosa" | "ribbon";
  scale?: number;
  rotationSpeed?: number;
  mobile?: boolean;
}

function SectionDividerMesh({
  position,
  color,
  speed,
  type,
  scale = 1,
  rotationSpeed = 0.5,
  mobile = false,
}: FloatingElementProps) {
  const meshRef = useRef<Mesh>(null);
  const currentScroll = useRef(0);

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * speed;

    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const targetScroll = window.scrollY / maxScroll;
    currentScroll.current = THREE.MathUtils.lerp(currentScroll.current, targetScroll, 0.12);
    const scroll = currentScroll.current;

    // 3D rotations driven by scroll & cursor pointer
    meshRef.current.rotation.x = t * rotationSpeed + scroll * Math.PI * 1.6 + pointer.y * 0.25;
    meshRef.current.rotation.y =
      t * (rotationSpeed * 1.2) + scroll * Math.PI * 2.2 + pointer.x * 0.25;
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
        {type === "torus" && (
          <torusGeometry args={[0.8, 0.08, mobile ? 8 : 16, mobile ? 20 : 40]} />
        )}
        {type === "icosa" && <icosahedronGeometry args={[0.65, 0]} />}
        {type === "ribbon" && (
          <torusGeometry args={[1.1, 0.035, mobile ? 8 : 16, mobile ? 32 : 64, Math.PI * 1.3]} />
        )}

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

function SectionTransitionsCluster({ mobile }: { mobile: boolean }) {
  const group = useRef<Group>(null);
  useFrame(({ pointer }) => {
    if (!group.current) return;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      pointer.y * 0.08,
      0.04,
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      pointer.x * 0.08,
      0.04,
    );
  });

  return (
    <group ref={group}>
      {/* Divider 1: Hero → About transition */}
      <SectionDividerMesh
        position={[2.8, 1.4, -1]}
        color="#D9D9D9"
        speed={0.35}
        type="icosa"
        scale={0.95}
        mobile={mobile}
      />
      <SectionDividerMesh
        position={[3.1, 1.2, -1.2]}
        color="#6B6A69"
        speed={0.25}
        type="ribbon"
        scale={0.85}
        mobile={mobile}
      />

      {/* Divider 2: About → Services transition */}
      <SectionDividerMesh
        position={[-3.0, 0.1, -1.1]}
        color="#D9D9D9"
        speed={0.3}
        type="torus"
        scale={0.9}
        mobile={mobile}
      />
      <SectionDividerMesh
        position={[-2.7, -0.2, -0.9]}
        color="#D9D9D9"
        speed={0.4}
        type="octa"
        scale={0.75}
        mobile={mobile}
      />

      {/* Divider 3: Services → Portfolio transition */}
      <SectionDividerMesh
        position={[2.7, -1.5, -0.8]}
        color="#6B6A69"
        speed={0.4}
        type="octa"
        scale={0.85}
        mobile={mobile}
      />
      <SectionDividerMesh
        position={[2.5, -1.8, -1.3]}
        color="#D9D9D9"
        speed={0.3}
        type="ribbon"
        scale={0.95}
        mobile={mobile}
      />
    </group>
  );
}

export function Scroll3DScene() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-10 h-screen min-h-[480px] w-full overflow-hidden"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
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
        <InteractionInvalidator />
        <ambientLight intensity={1.5} color="#AFAFAE" />
        <directionalLight position={[4, 5, 3]} intensity={1.8} color="#D9D9D9" />
        <directionalLight position={[-4, -3, 2]} intensity={1.6} color="#6B6A69" />
        <SectionTransitionsCluster mobile={isMobile} />
      </Canvas>
    </div>
  );
}

export default Scroll3DScene;
