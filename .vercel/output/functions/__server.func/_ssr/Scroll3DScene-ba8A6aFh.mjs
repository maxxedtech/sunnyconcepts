import { o as __toESM } from "../_runtime.mjs";
import { c as require_react, i as useThree, n as Canvas, o as MathUtils, r as useFrame, s as require_jsx_runtime, t as Float } from "../_libs/@react-three/drei+[...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/Scroll3DScene-ba8A6aFh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function InteractionInvalidator() {
	const { invalidate } = useThree();
	(0, import_react.useEffect)(() => {
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
	(0, import_react.useEffect)(() => {
		const perspectiveCamera = camera;
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
function SectionDividerMesh({ position, color, speed, type, scale = 1, rotationSpeed = .5, mobile = false }) {
	const meshRef = (0, import_react.useRef)(null);
	const currentScroll = (0, import_react.useRef)(0);
	useFrame(({ clock, pointer }) => {
		if (!meshRef.current) return;
		const t = clock.getElapsedTime() * speed;
		const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
		const targetScroll = window.scrollY / maxScroll;
		currentScroll.current = MathUtils.lerp(currentScroll.current, targetScroll, .12);
		const scroll = currentScroll.current;
		meshRef.current.rotation.x = t * rotationSpeed + scroll * Math.PI * 1.6 + pointer.y * .25;
		meshRef.current.rotation.y = t * (rotationSpeed * 1.2) + scroll * Math.PI * 2.2 + pointer.x * .25;
		meshRef.current.rotation.z = Math.sin(t * .4) * .25;
		meshRef.current.position.y = position[1] + Math.sin(t) * .18 - scroll * 2.2;
		meshRef.current.position.x = position[0] + Math.cos(t * .8) * .1 + pointer.x * .15;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Float, {
		speed: speed * 2,
		rotationIntensity: .4,
		floatIntensity: .6,
		floatingRange: [-.1, .1],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			ref: meshRef,
			position,
			scale,
			children: [
				type === "octa" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("octahedronGeometry", { args: [.7, 0] }),
				type === "torus" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
					.8,
					.08,
					mobile ? 8 : 16,
					mobile ? 20 : 40
				] }),
				type === "icosa" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("icosahedronGeometry", { args: [.65, 0] }),
				type === "ribbon" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
					1.1,
					.035,
					mobile ? 8 : 16,
					mobile ? 32 : 64,
					Math.PI * 1.3
				] }),
				type === "ribbon" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
					color,
					transparent: true,
					opacity: .6,
					roughness: .15,
					metalness: .1,
					transmission: .65,
					thickness: .4
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
					color,
					roughness: .32,
					metalness: .18,
					clearcoat: .35,
					transparent: true,
					opacity: .7
				})
			]
		})
	});
}
function SectionTransitionsCluster({ mobile }) {
	const group = (0, import_react.useRef)(null);
	useFrame(({ pointer }) => {
		if (!group.current) return;
		group.current.rotation.x = MathUtils.lerp(group.current.rotation.x, pointer.y * .08, .04);
		group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, pointer.x * .08, .04);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: group,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionDividerMesh, {
				position: [
					2.8,
					1.4,
					-1
				],
				color: "#D9D9D9",
				speed: .35,
				type: "icosa",
				scale: .95,
				mobile
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionDividerMesh, {
				position: [
					3.1,
					1.2,
					-1.2
				],
				color: "#6B6A69",
				speed: .25,
				type: "ribbon",
				scale: .85,
				mobile
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionDividerMesh, {
				position: [
					-3,
					.1,
					-1.1
				],
				color: "#D9D9D9",
				speed: .3,
				type: "torus",
				scale: .9,
				mobile
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionDividerMesh, {
				position: [
					-2.7,
					-.2,
					-.9
				],
				color: "#D9D9D9",
				speed: .4,
				type: "octa",
				scale: .75,
				mobile
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionDividerMesh, {
				position: [
					2.7,
					-1.5,
					-.8
				],
				color: "#6B6A69",
				speed: .4,
				type: "octa",
				scale: .85,
				mobile
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionDividerMesh, {
				position: [
					2.5,
					-1.8,
					-1.3
				],
				color: "#D9D9D9",
				speed: .3,
				type: "ribbon",
				scale: .95,
				mobile
			})
		]
	});
}
function Scroll3DScene() {
	const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 pointer-events-none z-10 h-screen min-h-[480px] w-full overflow-hidden",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Canvas, {
			camera: {
				position: [
					0,
					0,
					5
				],
				fov: 45
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InteractionInvalidator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", {
					intensity: 1.5,
					color: "#AFAFAE"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
					position: [
						4,
						5,
						3
					],
					intensity: 1.8,
					color: "#D9D9D9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
					position: [
						-4,
						-3,
						2
					],
					intensity: 1.6,
					color: "#6B6A69"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTransitionsCluster, { mobile: isMobile })
			]
		})
	});
}
export { Scroll3DScene, Scroll3DScene as default };
