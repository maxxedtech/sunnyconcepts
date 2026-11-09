import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { T as Toaster } from "../_libs/sonner.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const appCss = "/assets/styles-U1DwqTTk.css";
const faviconUrl = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'%20role='img'%20aria-label='Sunny%20Concepts%20monogram'%3e%3cdefs%3e%3clinearGradient%20id='sc-sage-grad'%20x1='0%25'%20y1='0%25'%20x2='100%25'%20y2='100%25'%3e%3cstop%20offset='0%25'%20stop-color='%23d7eee0'%20/%3e%3cstop%20offset='100%25'%20stop-color='%23b7d7c1'%20/%3e%3c/linearGradient%3e%3c/defs%3e%3crect%20width='512'%20height='512'%20rx='112'%20fill='%23070709'/%3e%3crect%20x='12'%20y='12'%20width='488'%20height='488'%20rx='100'%20fill='none'%20stroke='rgba(255,255,255,0.12)'%20stroke-width='4'/%3e%3cg%20fill='url(%23sc-sage-grad)'%3e%3cpath%20d='M254%20112%20325%20153%20150%20255%20150%20169Z'/%3e%3cpath%20d='M337%20160%20391%20191%20391%20274%20356%20274%20356%20225%20292%20188Z'/%3e%3cpath%20d='M258%20185%20326%20225%20326%20310%20255%20352%20208%20325%20279%20283%20279%20244%20151%20318%20151%20286Z'/%3e%3cpath%20d='M150%20329%20326%20227%20326%20310%20179%20395%20150%20378Z'/%3e%3cpath%20d='M151%20382%20208%20415%20254%20388%20326%20430%20254%20472%20151%20413Z'/%3e%3cpath%20d='M356%20304%20391%20304%20391%20386%20326%20424%20291%20404%20356%20366Z'/%3e%3c/g%3e%3c/svg%3e";
const ThemeContext = reactExports.createContext(null);
function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}
function ThemeProvider({ children }) {
  const [theme, setThemeState] = reactExports.useState(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem("sunny-theme") || "dark";
  });
  const [resolvedTheme, setResolvedTheme] = reactExports.useState("dark");
  reactExports.useEffect(() => {
    const apply = () => {
      const resolved = theme === "system" ? getSystemTheme() : theme;
      document.documentElement.classList.toggle("dark", resolved === "dark");
      document.documentElement.classList.toggle("light", resolved === "light");
      document.documentElement.style.colorScheme = resolved;
      setResolvedTheme(resolved);
    };
    apply();
    const media = window.matchMedia("(prefers-color-scheme: light)");
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [theme]);
  const value = reactExports.useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme: (next) => {
        localStorage.setItem("sunny-theme", next);
        setThemeState(next);
      }
    }),
    [theme, resolvedTheme]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeContext.Provider, { value, children });
}
function useTheme() {
  const context = reactExports.useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
function Preloader() {
  const [progress, setProgress] = reactExports.useState(0);
  const [leaving, setLeaving] = reactExports.useState(false);
  const [visible, setVisible] = reactExports.useState(true);
  reactExports.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `preloader ${leaving ? "preloader--leaving" : ""}`, "aria-label": "Loading Sunny Concepts", role: "status", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "preloader__frame", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "preloader__mark", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "preloader__eyebrow", children: "Sunny Concepts" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "preloader__line", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { width: `${progress}%` } }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "preloader__meta", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Preparing the studio" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
        progress,
        "%"
      ] })
    ] })
  ] }) });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-[#070709] px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-[#F4F4F5]", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-[#F4F4F5]", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-[#A1A1AA]", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-full bg-[var(--sage)] px-6 py-2.5 text-xs tracking-[0.2em] uppercase text-[#070709] font-medium transition-all hover:brightness-110",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-[#070709] px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-[#F4F4F5]", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-[#A1A1AA]", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-full bg-[var(--sage)] px-6 py-2.5 text-xs tracking-[0.2em] uppercase text-[#070709] font-medium transition-all hover:brightness-110",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-full border border-white/15 bg-[#111115] px-6 py-2.5 text-xs tracking-[0.2em] uppercase text-[#F4F4F5] transition-all hover:border-white/30",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$2 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sunny Concepts — Leading the World Through Digital Services" },
      {
        name: "description",
        content: "Sunny Concepts is a premium digital agency for brand identity, media production, digital marketing, and printing & logistics."
      },
      { name: "author", content: "Sunny Concepts" },
      { property: "og:title", content: "Sunny Concepts — Premium Digital Agency" },
      {
        property: "og:description",
        content: "Cinematic, editorial digital experiences with global standards."
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@SunnyConcepts" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      },
      { rel: "icon", type: "image/svg+xml", href: faviconUrl },
      { rel: "shortcut icon", href: "/favicon.svg" },
      { rel: "apple-touch-icon", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", className: "dark", suppressHydrationWarning: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("head", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("script", { dangerouslySetInnerHTML: { __html: `(function(){try{var t=localStorage.getItem('sunny-theme')||'dark';var l=t==='light'||(t==='system'&&matchMedia('(prefers-color-scheme: light)').matches);document.documentElement.className=l?'light':'dark';document.documentElement.style.colorScheme=l?'light':'dark'}catch(e){}})()` } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { suppressHydrationWarning: true, className: "bg-[#070709] text-[#A1A1AA] min-h-screen antialiased", children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-right", theme: "system" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$2.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ThemeProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Preloader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {})
  ] }) });
}
const $$splitComponentImporter$1 = () => import("./admin-BXPu4n95.mjs");
const Route$1 = createFileRoute("/admin")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-DNPeCuz5.mjs");
const Route = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const AdminRoute = Route$1.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$2
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$2
});
const rootRouteChildren = {
  IndexRoute,
  AdminRoute
};
const routeTree = Route$2._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  router as r,
  useTheme as u
};
