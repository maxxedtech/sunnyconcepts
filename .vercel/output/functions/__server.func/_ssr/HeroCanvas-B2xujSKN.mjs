import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { C as Canvas, u as useFrame } from "../_libs/react-three__fiber.mjs";
import { F as Float } from "../_libs/react-three__drei.mjs";
import { M as MathUtils } from "../_libs/three.mjs";
import "../_libs/zustand.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/its-fine.mjs";
import "../_libs/scheduler.mjs";
import "../_libs/react-use-measure.mjs";
function Ribbon({ offset, color, scale }) {
  const mesh = reactExports.useRef(null);
  useFrame(({ clock, pointer }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime() * 0.3 + offset;
    mesh.current.rotation.x = Math.sin(t) * 0.25 + pointer.y * 0.12;
    mesh.current.rotation.y = Math.cos(t * 0.8) * 0.3 + pointer.x * 0.16;
    mesh.current.position.y = Math.sin(t * 1.2) * 0.18;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref: mesh, scale, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("torusGeometry", { args: [1.55, 0.045, 16, 96, Math.PI * 1.45] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "meshPhysicalMaterial",
      {
        color,
        transparent: true,
        opacity: 0.7,
        roughness: 0.16,
        metalness: 0.18,
        transmission: 0.7,
        thickness: 0.5
      }
    )
  ] });
}
function Scene() {
  const group = reactExports.useRef(null);
  useFrame(({ pointer }) => {
    if (!group.current) return;
    group.current.rotation.x = MathUtils.lerp(
      group.current.rotation.x,
      pointer.y * 0.12,
      0.04
    );
    group.current.rotation.y = MathUtils.lerp(
      group.current.rotation.y,
      pointer.x * 0.16,
      0.04
    );
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("group", { ref: group, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Float, { speed: 1.5, rotationIntensity: 0.2, floatIntensity: 0.4, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Ribbon, { offset: 0, color: "#b7d7c1", scale: 1.1 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Ribbon, { offset: 2, color: "#d9b7a4", scale: 0.9 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Ribbon, { offset: 4, color: "#b8b7d9", scale: 0.76 }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { position: [0, 0, -0.5], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("icosahedronGeometry", { args: [0.7, 2] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meshPhysicalMaterial",
        {
          color: "#ededed",
          transparent: true,
          opacity: 0.12,
          wireframe: true,
          roughness: 0.2
        }
      )
    ] })
  ] }) });
}
function HeroCanvas() {
  const containerRef = reactExports.useRef(null);
  const [isVisible, setIsVisible] = reactExports.useState(true);
  reactExports.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: containerRef, className: "hero-canvas relative min-h-[450px] w-full", "aria-hidden": "true", children: isVisible && /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Canvas,
    {
      camera: { position: [0, 0, 5], fov: 42 },
      dpr: [1, 1.5],
      frameloop: "always",
      style: { width: "100%", height: "100%", minHeight: 450, position: "absolute", inset: 0 },
      gl: {
        powerPreference: "high-performance",
        antialias: true,
        alpha: true
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 1.2 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [2, 3, 4], intensity: 8, color: "#d7eee0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [-3, -2, 2], intensity: 5, color: "#d9b7a4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Scene, {})
      ]
    }
  ) });
}
export {
  HeroCanvas,
  HeroCanvas as default
};
