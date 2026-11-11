import { o as __toESM } from "../_runtime.mjs";
import { r as __exportAll } from "./server-CR4noN-L.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { _ as createRootRouteWithContext, d as HeadContent, g as createFileRoute, h as lazyRouteComponent, m as Outlet, p as createRouter, u as Scripts, v as Link, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
// node_modules/.nitro/vite/services/ssr/assets/router-SVyFxB3D.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-wuL5tC5Q.css";
var favicon_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'%20role='img'%20aria-label='Sunny%20Concepts%20monogram'%3e%3cdefs%3e%3clinearGradient%20id='sc-sage-grad'%20x1='0%25'%20y1='0%25'%20x2='100%25'%20y2='100%25'%3e%3cstop%20offset='0%25'%20stop-color='%23D9D9D9'%20/%3e%3cstop%20offset='100%25'%20stop-color='%236B6A69'%20/%3e%3c/linearGradient%3e%3c/defs%3e%3crect%20width='512'%20height='512'%20rx='112'%20fill='%230F0F0F'/%3e%3crect%20x='12'%20y='12'%20width='488'%20height='488'%20rx='100'%20fill='none'%20stroke='rgba(255,255,255,0.12)'%20stroke-width='4'/%3e%3cg%20fill='url(%23sc-sage-grad)'%3e%3cpath%20d='M254%20112%20325%20153%20150%20255%20150%20169Z'/%3e%3cpath%20d='M337%20160%20391%20191%20391%20274%20356%20274%20356%20225%20292%20188Z'/%3e%3cpath%20d='M258%20185%20326%20225%20326%20310%20255%20352%20208%20325%20279%20283%20279%20244%20151%20318%20151%20286Z'/%3e%3cpath%20d='M150%20329%20326%20227%20326%20310%20179%20395%20150%20378Z'/%3e%3cpath%20d='M151%20382%20208%20415%20254%20388%20326%20430%20254%20472%20151%20413Z'/%3e%3cpath%20d='M356%20304%20391%20304%20391%20386%20326%20424%20291%20404%20356%20366Z'/%3e%3c/g%3e%3c/svg%3e";
function Preloader() {
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [leaving, setLeaving] = (0, import_react.useState)(false);
	const [visible, setVisible] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const started = performance.now();
		let frame = 0;
		const tick = (now) => {
			const elapsed = now - started;
			const next = Math.min(100, Math.round(elapsed / 1750 * 100));
			setProgress(next);
			if (next < 100) frame = requestAnimationFrame(tick);
			else {
				setLeaving(true);
				window.setTimeout(() => setVisible(false), 650);
			}
		};
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, []);
	if (!visible) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `preloader ${leaving ? "preloader--leaving" : ""}`,
		"aria-label": "Loading Sunny Concepts",
		role: "status",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "preloader__frame",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "preloader__title",
					children: "SUNNY CONCEPTS"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "preloader__tagline",
					children: "Leading the world through digital services."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "preloader__line",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: `${progress}%` } })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "preloader__meta",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Preparing the studio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: String(progress).padStart(2, "0") })]
				})
			]
		})
	});
}
var STORAGE_KEY = "sunny-concepts-theme";
var ThemeContext = (0, import_react.createContext)(null);
function applyTheme(theme) {
	document.documentElement.classList.toggle("dark", theme === "dark");
	document.documentElement.classList.toggle("light", theme === "light");
	document.documentElement.style.colorScheme = theme;
}
function ThemeProvider({ children }) {
	const [theme, setThemeState] = (0, import_react.useState)("dark");
	(0, import_react.useEffect)(() => {
		const nextTheme = window.localStorage.getItem(STORAGE_KEY) === "light" ? "light" : "dark";
		setThemeState(nextTheme);
		applyTheme(nextTheme);
	}, []);
	const setTheme = (nextTheme) => {
		setThemeState(nextTheme);
		window.localStorage.setItem(STORAGE_KEY, nextTheme);
		applyTheme(nextTheme);
	};
	const value = (0, import_react.useMemo)(() => ({
		theme,
		setTheme,
		toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark")
	}), [theme]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, {
		value,
		children
	});
}
function useTheme() {
	const context = (0, import_react.useContext)(ThemeContext);
	if (!context) throw new Error("useTheme must be used within ThemeProvider");
	return context;
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-[#0F0F0F] px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-[#D9D9D9]",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-[#D9D9D9]",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-[#AFAFAE]",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-full bg-[#D9D9D9] px-6 py-2.5 text-xs tracking-[0.2em] uppercase text-[#0F0F0F] font-medium transition-all hover:brightness-110",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-[#0F0F0F] px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-[#D9D9D9]",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-[#AFAFAE]",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-full bg-[#D9D9D9] px-6 py-2.5 text-xs tracking-[0.2em] uppercase text-[#0F0F0F] font-medium transition-all hover:brightness-110",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-full border border-[#6B6A69]/25 bg-[#3F3F3D] px-6 py-2.5 text-xs tracking-[0.2em] uppercase text-[#D9D9D9] transition-all hover:border-[#6B6A69]",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$2 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1.0, viewport-fit=cover"
			},
			{ title: "Sunny Concepts — Leading the World Through Digital Services" },
			{
				name: "description",
				content: "Sunny Concepts is a premium digital agency for brand identity, media production, digital marketing, and printing & logistics."
			},
			{
				name: "author",
				content: "Sunny Concepts"
			},
			{
				property: "og:title",
				content: "Sunny Concepts — Premium Digital Agency"
			},
			{
				property: "og:description",
				content: "Cinematic, editorial digital experiences with global standards."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@SunnyConcepts"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				type: "image/svg+xml",
				href: favicon_default
			},
			{
				rel: "shortcut icon",
				href: "/favicon.svg"
			},
			{
				rel: "apple-touch-icon",
				href: "/favicon.svg"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: `try { var t = localStorage.getItem('sunny-concepts-theme'); document.documentElement.classList.add(t === 'light' ? 'light' : 'dark'); } catch (_) { document.documentElement.classList.add('dark'); }` } }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-[var(--background)] text-[var(--text-body)] min-h-screen antialiased",
			children: [
				children,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					position: "top-right",
					theme: "system"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
function RootComponent() {
	const { queryClient } = Route$2.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ThemeProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Preloader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})] })
	});
}
var $$splitComponentImporter$1 = () => import("./routes-DI2IEPLF.mjs");
var Route$1 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./admin-Df1B46Mi.mjs");
var Route = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$1.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$2
	}),
	AdminRoute: Route.update({
		id: "/admin",
		path: "/admin",
		getParentRoute: () => Route$2
	})
};
var routeTree = Route$2._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
export { useTheme as n, router_exports as t };
