import { o as __toESM } from "../_runtime.mjs";
import { c as require_react, n as Canvas, o as MathUtils, r as useFrame, s as require_jsx_runtime, t as Float } from "../_libs/@react-three/drei+[...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/HeroCanvas-C0hzzA-6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Ribbon({ offset, color, scale }) {
	const mesh = (0, import_react.useRef)(null);
	useFrame(({ clock, pointer }) => {
		if (!mesh.current) return;
		const t = clock.getElapsedTime() * .3 + offset;
		mesh.current.rotation.x = Math.sin(t) * .25 + pointer.y * .12;
		mesh.current.rotation.y = Math.cos(t * .8) * .3 + pointer.x * .16;
		mesh.current.position.y = Math.sin(t * 1.2) * .18;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		ref: mesh,
		scale,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
			1.55,
			.045,
			16,
			96,
			Math.PI * 1.45
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
			color,
			transparent: true,
			opacity: .7,
			roughness: .16,
			metalness: .18,
			transmission: .7,
			thickness: .5
		})]
	});
}
function Scene() {
	const group = (0, import_react.useRef)(null);
	useFrame(({ pointer }) => {
		if (!group.current) return;
		group.current.rotation.x = MathUtils.lerp(group.current.rotation.x, pointer.y * .12, .04);
		group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, pointer.x * .16, .04);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref: group,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Float, {
			speed: 1.5,
			rotationIntensity: .2,
			floatIntensity: .4,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ribbon, {
					offset: 0,
					color: "#D9D9D9",
					scale: 1.1
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ribbon, {
					offset: 2,
					color: "#6B6A69",
					scale: .9
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ribbon, {
					offset: 4,
					color: "#AFAFAE",
					scale: .76
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						0,
						-.5
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("icosahedronGeometry", { args: [.7, 2] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
						color: "#D9D9D9",
						transparent: true,
						opacity: .12,
						wireframe: true,
						roughness: .2
					})]
				})
			]
		})
	});
}
function HeroCanvas() {
	const containerRef = (0, import_react.useRef)(null);
	const [isVisible, setIsVisible] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const el = containerRef.current;
		if (!el || typeof IntersectionObserver === "undefined") return;
		const observer = new IntersectionObserver(([entry]) => {
			setIsVisible(entry.isIntersecting);
		}, { threshold: .05 });
		observer.observe(el);
		return () => observer.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: containerRef,
		className: "hero-canvas relative z-10 min-h-[480px] h-full w-full",
		"aria-hidden": "true",
		children: isVisible && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Canvas, {
			camera: {
				position: [
					0,
					0,
					5
				],
				fov: 42
			},
			dpr: [1, 1.5],
			frameloop: "always",
			style: {
				width: "100%",
				height: "100%",
				minHeight: 450,
				position: "absolute",
				inset: 0
			},
			gl: {
				powerPreference: "high-performance",
				antialias: true,
				alpha: true
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", {
					intensity: 1.6,
					color: "#AFAFAE"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
					position: [
						2,
						3,
						4
					],
					intensity: 3.5,
					color: "#D9D9D9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
					position: [
						2,
						3,
						4
					],
					intensity: 8,
					color: "#6B6A69"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
					position: [
						-3,
						-2,
						2
					],
					intensity: 3,
					color: "#6B6A69"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scene, {})
			]
		})
	});
}
export { HeroCanvas, HeroCanvas as default };
