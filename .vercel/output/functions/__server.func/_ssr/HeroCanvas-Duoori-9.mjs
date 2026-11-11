import { o as __toESM } from "../_runtime.mjs";
import { c as require_react, i as useThree, n as Canvas, o as MathUtils, r as useFrame, s as require_jsx_runtime, t as Float } from "../_libs/@react-three/drei+[...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/HeroCanvas-Duoori-9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ThrottledRender({ active }) {
	const { invalidate } = useThree();
	(0, import_react.useEffect)(() => {
		if (!active) return;
		let frame = 0;
		let last = 0;
		const tick = (now) => {
			if (now - last >= 1e3 / 30) {
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
	(0, import_react.useEffect)(() => {
		const perspectiveCamera = camera;
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
function Ribbon({ offset, color, scale, mobile }) {
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
			mobile ? 8 : 16,
			mobile ? 48 : 96,
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
function Scene({ mobile }) {
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
					scale: 1.1,
					mobile
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ribbon, {
					offset: 2,
					color: "#6B6A69",
					scale: .9,
					mobile
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ribbon, {
					offset: 4,
					color: "#AFAFAE",
					scale: .76,
					mobile
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						0,
						-.5
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("icosahedronGeometry", { args: [.7, mobile ? 1 : 2] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
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
	const [isMobile, setIsMobile] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = containerRef.current;
		if (!el || typeof IntersectionObserver === "undefined") return;
		const observer = new IntersectionObserver(([entry]) => {
			setIsVisible(entry.isIntersecting);
		}, { threshold: .05 });
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: containerRef,
		className: "hero-canvas relative z-10 h-[300px] w-full sm:h-[450px] lg:h-[600px]",
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
			dpr: [1, 1.25],
			frameloop: "demand",
			style: {
				width: "100%",
				height: "100%",
				position: "absolute",
				inset: 0
			},
			gl: {
				powerPreference: "high-performance",
				antialias: !isMobile,
				alpha: true
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveCamera, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThrottledRender, { active: isVisible }),
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scene, { mobile: isMobile })
			]
		})
	});
}
export { HeroCanvas, HeroCanvas as default };
