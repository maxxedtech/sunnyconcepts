import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { C as Canvas, a as useThree, u as useFrame } from "../_libs/react-three__fiber.mjs";
import { F as Float } from "../_libs/react-three__drei.mjs";
import { M as MathUtils } from "../_libs/three.mjs";
import "../_libs/zustand.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/its-fine.mjs";
import "../_libs/scheduler.mjs";
import "../_libs/react-use-measure.mjs";
function SectionDividerMesh({
  position,
  color,
  speed,
  type,
  scale = 1,
  rotationSpeed = 0.5
}) {
  const meshRef = reactExports.useRef(null);
  const scrollRef = reactExports.useRef({ targetY: 0, currentY: 0 });
  reactExports.useEffect(() => {
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
    scrollRef.current.currentY = MathUtils.lerp(
      scrollRef.current.currentY,
      scrollRef.current.targetY,
      0.06
    );
    const scroll = scrollRef.current.currentY;
    meshRef.current.rotation.x = t * rotationSpeed + scroll * Math.PI * 1.6 + pointer.y * 0.25;
    meshRef.current.rotation.y = t * (rotationSpeed * 1.2) + scroll * Math.PI * 2.2 + pointer.x * 0.25;
    meshRef.current.rotation.z = Math.sin(t * 0.4) * 0.25;
    meshRef.current.position.y = position[1] + Math.sin(t) * 0.18 - scroll * 2.2;
    meshRef.current.position.x = position[0] + Math.cos(t * 0.8) * 0.1 + pointer.x * 0.15;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Float,
    {
      speed: speed * 2,
      rotationIntensity: 0.4,
      floatIntensity: 0.6,
      floatingRange: [-0.1, 0.1],
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref: meshRef, position, scale, children: [
        type === "octa" && /* @__PURE__ */ jsxRuntimeExports.jsx("octahedronGeometry", { args: [0.7, 0] }),
        type === "torus" && /* @__PURE__ */ jsxRuntimeExports.jsx("torusGeometry", { args: [0.8, 0.08, 16, 40] }),
        type === "icosa" && /* @__PURE__ */ jsxRuntimeExports.jsx("icosahedronGeometry", { args: [0.65, 0] }),
        type === "ribbon" && /* @__PURE__ */ jsxRuntimeExports.jsx("torusGeometry", { args: [1.1, 0.035, 16, 64, Math.PI * 1.3] }),
        type === "ribbon" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "meshPhysicalMaterial",
          {
            color,
            transparent: true,
            opacity: 0.6,
            roughness: 0.15,
            metalness: 0.1,
            transmission: 0.65,
            thickness: 0.4
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "meshPhysicalMaterial",
          {
            color,
            roughness: 0.32,
            metalness: 0.18,
            clearcoat: 0.35,
            transparent: true,
            opacity: 0.7
          }
        )
      ] })
    }
  );
}
function SectionTransitionsCluster() {
  const group = reactExports.useRef(null);
  const { invalidate } = useThree();
  reactExports.useEffect(() => {
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
    group.current.rotation.x = MathUtils.lerp(group.current.rotation.x, pointer.y * 0.08, 0.04);
    group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, pointer.x * 0.08, 0.04);
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { ref: group, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionDividerMesh,
      {
        position: [2.8, 1.4, -1],
        color: "#b7d7c1",
        speed: 0.35,
        type: "icosa",
        scale: 0.95
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionDividerMesh,
      {
        position: [3.1, 1.2, -1.2],
        color: "#d7eee0",
        speed: 0.25,
        type: "ribbon",
        scale: 0.85
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionDividerMesh,
      {
        position: [-3, 0.1, -1.1],
        color: "#F4F4F5",
        speed: 0.3,
        type: "torus",
        scale: 0.9
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionDividerMesh,
      {
        position: [-2.7, -0.2, -0.9],
        color: "#b7d7c1",
        speed: 0.4,
        type: "octa",
        scale: 0.75
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionDividerMesh,
      {
        position: [2.7, -1.5, -0.8],
        color: "#d9b7a4",
        speed: 0.4,
        type: "octa",
        scale: 0.85
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionDividerMesh,
      {
        position: [2.5, -1.8, -1.3],
        color: "#b7d7c1",
        speed: 0.3,
        type: "ribbon",
        scale: 0.95
      }
    )
  ] });
}
function Scroll3DScene() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 pointer-events-none z-[2] h-screen w-full overflow-hidden",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Canvas,
        {
          camera: { position: [0, 0, 5], fov: 45 },
          dpr: [1, 1.5],
          frameloop: "always",
          style: { width: "100%", height: "100%", position: "absolute", inset: 0 },
          gl: {
            powerPreference: "high-performance",
            antialias: true,
            alpha: true
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 1.1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("directionalLight", { position: [4, 5, 3], intensity: 1.8, color: "#b7d7c1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("directionalLight", { position: [-4, -3, 2], intensity: 1.2, color: "#F4F4F5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTransitionsCluster, {})
          ]
        }
      )
    }
  );
}
export {
  Scroll3DScene,
  Scroll3DScene as default
};
