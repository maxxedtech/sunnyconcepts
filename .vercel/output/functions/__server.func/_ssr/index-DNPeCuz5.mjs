import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { T as ThemeToggle, a as useSiteSettings, o as optimizeCloudinaryUrl, u as usePortfolioCategories, s as supabase } from "./cloudinary-Cm-WRUo0.mjs";
import { L as Lenis } from "../_libs/lenis.mjs";
import "../_libs/sonner.mjs";
import { A as AnimatePresence, m as motion, u as useScroll, a as useTransform } from "../_libs/framer-motion.mjs";
import "./router-DSSptcs5.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function Intro() {
  const [show, setShow] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const viewed = sessionStorage.getItem("sunny_splash_seen");
    if (!viewed) {
      setShow(true);
      sessionStorage.setItem("sunny_splash_seen", "true");
      const t = setTimeout(() => setShow(false), 900);
      return () => clearTimeout(t);
    }
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: show && /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 1 },
      exit: { opacity: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
      className: "fixed inset-0 z-[100] flex items-center justify-center bg-[#070709] pointer-events-none",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-center text-center px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.h1,
          {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.4 },
            className: "text-3xl md:text-5xl font-light uppercase tracking-[0.25em] text-[#F4F4F5]",
            children: "Sunny Concepts"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.p,
          {
            initial: { opacity: 0 },
            animate: { opacity: 0.8 },
            transition: { delay: 0.2, duration: 0.3 },
            className: "mt-4 text-xs tracking-[0.3em] uppercase text-[#A1A1AA]",
            children: "Leading the world through digital services"
          }
        )
      ] })
    }
  ) });
}
const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#contact", label: "Contact" }
];
function Nav() {
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [open, setOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.header,
      {
        initial: { y: -30, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        className: "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1200px,calc(100%-2rem))] gpu-accelerated",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `glass rounded-full flex items-center justify-between px-6 py-3.5 transition-all duration-300 ${scrolled ? "bg-[#111115]/95 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.85)] border-white/20" : "bg-[#111115]/80 border-white/12"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#top", className: "flex items-center gap-2.5 group", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-[var(--sage)] shadow-[0_0_10px_var(--sage)]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm tracking-[0.25em] uppercase font-light text-[#F4F4F5]", children: "Sunny Concepts" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden md:flex items-center gap-9", children: links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: l.href,
                  className: "text-xs tracking-[0.22em] uppercase text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors font-medium",
                  children: l.label
                },
                `nav-link-${l.href}`
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "#contact",
                    className: "hidden md:inline-flex text-xs tracking-[0.22em] uppercase px-5 py-2 rounded-full border border-[var(--sage)]/40 text-[#F4F4F5] hover:bg-[var(--sage)]/15 transition-all font-medium",
                    children: "Start a Project"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => setOpen(true),
                    "aria-label": "Open navigation menu",
                    className: "md:hidden text-xs tracking-[0.22em] uppercase text-[#F4F4F5] px-3 py-1.5 rounded-lg border border-white/10",
                    children: "Menu"
                  }
                )
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 z-[60] md:hidden glass-strong flex flex-col items-center justify-center gap-8 bg-[#070709]/95 backdrop-blur-2xl",
        children: [
          links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: l.href,
              onClick: () => setOpen(false),
              className: "text-2xl tracking-[0.25em] uppercase font-light text-[#F4F4F5] hover:text-[var(--sage)] transition-colors",
              children: l.label
            },
            `mobile-link-${l.href}`
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "/admin",
              onClick: () => setOpen(false),
              className: "mt-6 text-xs tracking-[0.3em] uppercase text-[#A1A1AA] hover:text-[#F4F4F5]",
              children: "Admin Portal"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setOpen(false),
              className: "absolute top-6 right-6 text-xs tracking-[0.3em] uppercase text-[#A1A1AA] px-4 py-2 rounded-full border border-white/10",
              children: "Close"
            }
          )
        ]
      }
    ) })
  ] });
}
const HeroCanvas = reactExports.lazy(() => import("./HeroCanvas-B2xujSKN.mjs"));
function LazyHeroCanvas() {
  const [mounted, setMounted] = reactExports.useState(false);
  const [shouldRender, setShouldRender] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setMounted(true);
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isLowPower = typeof navigator !== "undefined" && navigator.hardwareConcurrency != null && navigator.hardwareConcurrency <= 4;
    if (!isMobile && !prefersReducedMotion && !isLowPower) {
      setShouldRender(true);
    }
  }, []);
  const skeletonFallback = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hero-canvas pointer-events-none", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "absolute inset-0 rounded-full blur-3xl opacity-20 pointer-events-none transition-opacity duration-1000",
      style: {
        background: "radial-gradient(circle at center, rgba(183, 215, 193, 0.25) 0%, transparent 70%)"
      }
    }
  ) });
  if (!mounted || !shouldRender) {
    return skeletonFallback;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: skeletonFallback, children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeroCanvas, {}) });
}
function Hero() {
  const ref = reactExports.useRef(null);
  const { settings } = useSiteSettings();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      ref,
      id: "top",
      className: "relative min-h-screen flex items-center justify-center overflow-hidden grain",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { style: { y }, className: "absolute inset-0 pointer-events-none gpu-accelerated", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-1/4 -left-32 h-[50vh] w-[50vh] rounded-full blur-3xl float-slow",
              style: {
                background: "radial-gradient(circle, rgba(183, 215, 193, 0.22) 0%, transparent 65%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute bottom-0 -right-40 h-[60vh] w-[60vh] rounded-full blur-3xl float-slow",
              style: {
                animationDelay: "-6s",
                background: "radial-gradient(circle, rgba(92, 33, 47, 0.3) 0%, transparent 70%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 pointer-events-none",
              style: {
                background: "linear-gradient(to bottom, transparent 40%, var(--background) 100%)"
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(LazyHeroCanvas, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            style: { opacity },
            className: "relative z-10 max-w-6xl mx-auto px-6 text-center pt-24 pb-16 gpu-accelerated",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.span,
                {
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.05, duration: 0.6 },
                  className: "inline-block text-[11px] tracking-[0.45em] uppercase text-[#A1A1AA] mb-8 font-medium",
                  children: "— A Premium Digital Agency"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.h1,
                {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  className: "text-5xl sm:text-7xl md:text-[7.5rem] leading-[0.95] text-balance font-light text-[#F4F4F5] tracking-tight",
                  children: [
                    settings.hero_headline_line1,
                    /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic text-[var(--sage)] font-light", children: settings.hero_headline_italic }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                    settings.hero_headline_line2
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.p,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { delay: 0.25, duration: 0.7 },
                  className: "mt-8 text-sm md:text-base tracking-[0.2em] uppercase text-[#A1A1AA] max-w-xl mx-auto",
                  children: settings.hero_subtitle
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 15 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.35, duration: 0.7 },
                  className: "mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "a",
                      {
                        href: settings.hero_cta_portfolio_href || "#portfolio",
                        className: "glass glass-interactive rounded-full px-9 py-3.5 text-xs tracking-[0.28em] uppercase text-[#F4F4F5] hover:border-white/30 transition-all active:scale-[0.98]",
                        children: settings.hero_cta_portfolio_text
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "a",
                      {
                        href: settings.hero_cta_contact_href || "#contact",
                        className: "rounded-full px-9 py-3.5 text-xs tracking-[0.28em] uppercase text-[#070709] font-medium transition-all hover:brightness-110 hover:shadow-[0_0_25px_rgba(183,215,193,0.45)] active:scale-[0.98]",
                        style: { background: "var(--sage)" },
                        children: settings.hero_cta_contact_text
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 0.6 },
            transition: { delay: 0.5, duration: 0.8 },
            className: "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.4em] uppercase text-[#A1A1AA]", children: "Scroll" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-px bg-gradient-to-b from-[var(--sage)] to-transparent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  animate: { y: [0, 36, 0] },
                  transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                  className: "h-2.5 w-px bg-[var(--sage)]"
                }
              ) })
            ]
          }
        )
      ]
    }
  );
}
function About() {
  const { settings } = useSiteSettings();
  const portraitUrl = settings.about_founder_portrait_url ? optimizeCloudinaryUrl(settings.about_founder_portrait_url) : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "about", className: "relative py-28 md:py-44 px-6 bg-[#070709]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
        className: "gpu-accelerated",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/12 bg-[#111115] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]", children: portraitUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: portraitUrl,
              alt: `${settings.about_founder_name || "Sunday Ibrahim"}, ${settings.about_founder_title || "Founder & Creative Director"} of Sunny Concepts`,
              className: "h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]",
              loading: "lazy"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#070709]/80 via-transparent to-transparent pointer-events-none" })
        ] }) : (
          /* Styled obsidian dynamic skeleton loader */
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full w-full flex flex-col items-center justify-center p-8 bg-[#111115] animate-pulse relative overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute inset-0 opacity-20 pointer-events-none",
                style: {
                  background: "radial-gradient(circle at center, rgba(183, 215, 193, 0.25) 0%, transparent 70%)"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 rounded-full border border-white/15 bg-white/5 flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-light text-[var(--sage)]", children: "SI" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-36 bg-white/10 rounded-full mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-48 bg-white/5 rounded-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-8 text-[10px] tracking-[0.35em] uppercase text-[#A1A1AA]/60", children: "Founder Portrait" })
          ] })
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 25 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
        className: "gpu-accelerated",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.45em] uppercase text-[var(--sage)] font-semibold", children: settings.about_tag || "— About" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-6 text-4xl md:text-6xl font-light leading-[1.08] text-balance text-[#F4F4F5]", children: [
            settings.about_headline || "Leading the world through",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic text-[var(--sage)] font-light", children: settings.about_headline_italic || "premium" }),
            " ",
            "digital services."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 text-base md:text-lg text-[#A1A1AA] leading-relaxed max-w-xl", children: settings.about_bio_p1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-base text-[#A1A1AA]/90 leading-relaxed max-w-xl", children: settings.about_bio_p2 }),
          settings.about_mission && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 p-5 rounded-2xl border border-white/10 bg-[#111115]/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.3em] uppercase text-[var(--sage)] font-mono", children: "Mission" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1.5 text-sm text-[#F4F4F5]/90 italic leading-relaxed", children: [
              '"',
              settings.about_mission,
              '"'
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 pt-6 border-t border-white/12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm tracking-[0.2em] uppercase font-medium text-[#F4F4F5]", children: settings.about_founder_name || "Sunday Ibrahim" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs tracking-[0.25em] uppercase text-[#A1A1AA]", children: settings.about_founder_title || "Founder & Creative Director" })
          ] })
        ]
      }
    )
  ] }) });
}
function Services() {
  const { settings } = useSiteSettings();
  const servicesList = [
    {
      num: settings.service_1_num || "01",
      title: settings.service_1_title || "Brand Identity",
      desc: settings.service_1_desc || "Strategic minimalist branding systems designed to communicate clarity, trust, and distinction."
    },
    {
      num: settings.service_2_num || "02",
      title: settings.service_2_title || "Media Production",
      desc: settings.service_2_desc || "Professional visual storytelling through photography, motion, and short-form content."
    },
    {
      num: settings.service_3_num || "03",
      title: settings.service_3_title || "Digital Marketing",
      desc: settings.service_3_desc || "AI-enhanced marketing systems focused on audience psychology, visibility, and growth."
    },
    {
      num: settings.service_4_num || "04",
      title: settings.service_4_title || "Printing & Logistics",
      desc: settings.service_4_desc || "From physical branding to large-format production with precision and consistency."
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "services", className: "relative py-28 md:py-44 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 25 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8 },
        className: "max-w-3xl mb-16 gpu-accelerated",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.45em] uppercase text-[var(--sage)] font-semibold", children: settings.services_tag || "— Services" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-6 text-4xl md:text-6xl font-light leading-[1.08] text-balance text-[#F4F4F5]", children: [
            settings.services_headline || "Four disciplines,",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic text-[var(--sage)] font-light", children: settings.services_headline_italic || "one cinematic" }),
            " ",
            "standard."
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-6", children: servicesList.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-40px" },
        transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
        className: "group glass rounded-3xl p-9 md:p-11 relative overflow-hidden transition-all duration-500 hover:border-white/25 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.85)] gpu-accelerated",
        style: {
          background: "rgba(17, 17, 21, 0.88)",
          borderColor: "rgba(255, 255, 255, 0.12)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute -top-24 -right-24 h-60 w-60 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none",
              style: {
                background: "radial-gradient(circle, rgba(183, 215, 193, 0.3) 0%, transparent 65%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between mb-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs tracking-[0.3em] uppercase text-[var(--sage)] font-mono font-semibold", children: s.num }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] tracking-[0.3em] uppercase text-[#A1A1AA] opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: "— Explore" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-3xl md:text-4xl font-light text-[#F4F4F5] tracking-tight", children: s.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-[#A1A1AA] leading-relaxed max-w-md text-sm md:text-base", children: s.desc })
          ] })
        ]
      },
      `service-card-${s.num}-${s.title}`
    )) })
  ] }) });
}
function Portfolio() {
  const [activeCategory, setActiveCategory] = reactExports.useState("all");
  const [lightbox, setLightbox] = reactExports.useState(null);
  const [items, setItems] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const { categories } = usePortfolioCategories();
  const { settings } = useSiteSettings();
  reactExports.useEffect(() => {
    let mounted = true;
    const fetchPortfolio = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase.from("portfolio_items").select("id,title,category,image_url,description,created_at").order("created_at", { ascending: false });
        if (!error && data && mounted) {
          setItems(data);
        }
      } catch (err) {
        console.warn("Portfolio fetch error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    void fetchPortfolio();
    return () => {
      mounted = false;
    };
  }, []);
  const categoryTabs = reactExports.useMemo(() => {
    const list = [{ slug: "all", label: "All Works" }];
    categories.forEach((cat) => {
      list.push({ slug: cat.slug, label: cat.name });
    });
    return list;
  }, [categories]);
  const displayItems = reactExports.useMemo(() => {
    return items.map((item) => ({
      id: item.id,
      src: optimizeCloudinaryUrl(item.image_url),
      title: item.title,
      category: item.category,
      description: item.description
    }));
  }, [items]);
  const filteredItems = reactExports.useMemo(() => {
    if (activeCategory === "all") return displayItems;
    const activeLower = activeCategory.toLowerCase();
    const matchingCat = categories.find(
      (c) => c.slug.toLowerCase() === activeLower || c.name.toLowerCase() === activeLower
    );
    const targetName = matchingCat ? matchingCat.name.toLowerCase() : activeLower;
    return displayItems.filter((item) => {
      const itemCatLower = (item.category || "").toLowerCase();
      return itemCatLower === activeLower || itemCatLower === targetName || matchingCat && itemCatLower === matchingCat.slug.toLowerCase();
    });
  }, [displayItems, activeCategory, categories]);
  const clientsList = reactExports.useMemo(() => {
    const raw = settings.client_marquee_list || "";
    return raw.split(",").map((c) => c.trim()).filter(Boolean);
  }, [settings.client_marquee_list]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "portfolio", className: "relative py-28 md:py-44 px-6 bg-[#070709]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 25 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.8 },
          className: "max-w-3xl mb-14 gpu-accelerated",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.45em] uppercase text-[var(--sage)] font-semibold", children: "— Selected Work" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-6 text-4xl md:text-6xl font-light leading-[1.08] text-balance text-[#F4F4F5]", children: [
              "A ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic text-[var(--sage)] font-light", children: "curated" }),
              " archive of recent productions."
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2.5 mb-12", children: categoryTabs.map((c) => {
        const isActive = activeCategory === c.slug;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setActiveCategory(c.slug),
            className: `text-[10px] tracking-[0.28em] uppercase px-5 py-2.5 rounded-full transition-all duration-300 font-medium ${isActive ? "bg-[var(--sage)] text-[#070709] shadow-[0_0_20px_rgba(183,215,193,0.35)]" : "glass text-[#A1A1AA] hover:text-[#F4F4F5] hover:border-white/20"}`,
            children: c.label
          },
          `cat-pill-${c.slug}`
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6",
          children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "aspect-[4/5] rounded-2xl bg-[#111115] border border-white/10 p-4 flex flex-col justify-end animate-pulse overflow-hidden relative shadow-lg",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-16 bg-white/10 rounded-full" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-32 bg-white/15 rounded-md" })
                ] })
              ]
            },
            `obsidian-skeleton-${i}`
          ))
        },
        "loading-skeletons"
      ) : filteredItems.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -10 },
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
          className: "grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6",
          children: filteredItems.map((item, i) => {
            const isHeroSpan = i === 0 && filteredItems.length > 2;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.button,
              {
                initial: { opacity: 0, y: 15 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: Math.min(i * 0.05, 0.3), duration: 0.6 },
                onClick: () => setLightbox(item),
                className: `group relative overflow-hidden rounded-2xl text-left border border-white/10 hover:border-white/25 transition-all duration-500 bg-[#111115] ${isHeroSpan ? "md:col-span-2 md:row-span-2" : ""}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `${isHeroSpan ? "aspect-square" : "aspect-[4/5]"} overflow-hidden rounded-2xl bg-[#070709]`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: item.src,
                          alt: item.title,
                          className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]",
                          loading: "lazy"
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#070709]/95 via-[#070709]/30 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-95 pointer-events-none" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-90 group-hover:opacity-100 transition-opacity duration-300", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.25em] uppercase glass rounded-full px-3 py-1 font-medium text-[#F4F4F5]", children: item.category }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mt-2 text-sm md:text-base font-normal text-[#F4F4F5] drop-shadow-md", children: item.title })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.3em] uppercase text-[#A1A1AA] font-mono", children: String(i + 1).padStart(2, "0") })
                  ] })
                ]
              },
              `portfolio-item-${item.id}-${i}`
            );
          })
        },
        `grid-${activeCategory}`
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          className: "rounded-3xl border border-white/10 bg-[#111115] p-16 text-center shadow-xl",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 mx-auto rounded-full bg-[var(--sage)]/10 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-[var(--sage)]" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-[#F4F4F5] font-light", children: "No published assets in this discipline yet." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-[#A1A1AA]", children: "Upload and categorize high-resolution media in the Admin Portal." })
          ]
        },
        "empty-state"
      ) }),
      clientsList.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-28 pt-14 border-t border-white/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] tracking-[0.45em] uppercase text-[#A1A1AA] mb-8 text-center font-medium", children: "Trusted by visionary clients" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-x-12 gap-y-6", children: clientsList.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-lg md:text-2xl font-light italic text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors",
            children: c
          },
          `client-brand-${c}`
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: lightbox && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        onClick: () => setLightbox(null),
        className: "fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 backdrop-blur-2xl bg-[#070709]/85",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { scale: 0.94, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.94, opacity: 0 },
            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
            className: "glass-strong rounded-3xl p-5 max-w-4xl w-full border border-white/15 bg-[#111115]",
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[70vh] aspect-[16/10] overflow-hidden rounded-2xl bg-[#070709]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: lightbox.src,
                  alt: lightbox.title,
                  className: "h-full w-full object-contain"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 px-2 flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg text-[#F4F4F5] font-light", children: lightbox.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#A1A1AA] uppercase tracking-[0.2em] mt-0.5", children: lightbox.category }),
                  lightbox.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#A1A1AA] mt-2 max-w-xl", children: lightbox.description })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => setLightbox(null),
                    className: "rounded-full px-5 py-2 text-xs uppercase tracking-[0.25em] glass hover:border-white/30 text-[#F4F4F5] transition-colors",
                    children: "Close"
                  }
                )
              ] })
            ]
          }
        )
      }
    ) })
  ] });
}
function Contact() {
  const { settings } = useSiteSettings();
  const phoneLink = `tel:${(settings.contact_phone || "+2348024493791").replace(/\s+/g, "")}`;
  const mailLink = `mailto:${settings.contact_email || "sunnyconceptsinfo@gmail.com"}`;
  const whatsappUrl = `https://wa.me/${(settings.contact_phone || "2348024493791").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    settings.contact_whatsapp_text || "Hi Sunny Concepts, I'd love to discuss a project."
  )}`;
  const socials = [
    { label: "Instagram", href: settings.social_instagram },
    { label: "LinkedIn", href: settings.social_linkedin },
    { label: "X (Twitter)", href: settings.social_x },
    { label: "Facebook", href: settings.social_facebook },
    { label: "TikTok", href: settings.social_tiktok }
  ].filter((s) => Boolean(s.href));
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "contact", className: "relative py-28 md:py-44 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
      className: "glass rounded-[2.5rem] p-10 md:p-20 text-center relative overflow-hidden gpu-accelerated",
      style: {
        background: "rgba(17, 17, 21, 0.92)",
        borderColor: "rgba(255, 255, 255, 0.14)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute -top-36 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full blur-3xl opacity-25 pointer-events-none",
            style: {
              background: "radial-gradient(circle, rgba(183, 215, 193, 0.4) 0%, transparent 65%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.45em] uppercase text-[var(--sage)] font-semibold", children: settings.contact_tag || "— Let's create" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-6 text-5xl md:text-7xl font-light leading-[1.05] text-balance text-[#F4F4F5]", children: [
            settings.contact_headline || "Begin your",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic text-[var(--sage)] font-light", children: settings.contact_headline_italic || "next chapter." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 text-base text-[#A1A1AA] max-w-lg mx-auto leading-relaxed", children: settings.contact_subtext }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: whatsappUrl,
                target: "_blank",
                rel: "noreferrer",
                className: "rounded-full px-9 py-4 text-xs tracking-[0.28em] uppercase text-[#070709] font-medium transition-all hover:brightness-110 hover:shadow-[0_0_25px_rgba(183,215,193,0.45)] active:scale-[0.98]",
                style: { background: "var(--sage)" },
                children: "Message on WhatsApp"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: mailLink,
                className: "glass glass-interactive rounded-full px-9 py-4 text-xs tracking-[0.28em] uppercase text-[#F4F4F5] hover:border-white/30 transition-all active:scale-[0.98]",
                children: settings.contact_email || "sunnyconceptsinfo@gmail.com"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: phoneLink,
                className: "glass glass-interactive rounded-full px-8 py-4 text-xs tracking-[0.25em] uppercase text-[#A1A1AA] hover:text-[#F4F4F5] hover:border-white/30 transition-all active:scale-[0.98]",
                children: [
                  "Call: ",
                  settings.contact_phone || "+234 802 449 3791"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3", children: socials.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: s.href,
              target: "_blank",
              rel: "noreferrer",
              className: "text-[11px] tracking-[0.35em] uppercase text-[#A1A1AA] hover:text-[var(--sage)] transition-colors font-medium",
              children: s.label
            },
            `contact-social-${s.label}`
          )) })
        ] })
      ]
    }
  ) }) });
}
function Footer() {
  const { settings } = useSiteSettings();
  const phoneLink = `tel:${(settings.contact_phone || "+2348024493791").replace(/\s+/g, "")}`;
  const mailLink = `mailto:${settings.contact_email || "sunnyconceptsinfo@gmail.com"}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "relative px-6 pb-12 pt-20 border-t border-white/10 bg-[#070709]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-[var(--sage)] shadow-[0_0_10px_var(--sage)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm tracking-[0.25em] uppercase font-light text-[#F4F4F5]", children: "Sunny Concepts" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-[#A1A1AA] max-w-xs leading-relaxed", children: "A premium digital agency leading the world through cinematic creative services." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] tracking-[0.4em] uppercase text-[#A1A1AA] font-medium", children: "Contact & Inquiries" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: mailLink,
            className: "block mt-3 text-sm text-[#F4F4F5] hover:text-[var(--sage)] transition-colors",
            children: settings.contact_email || "sunnyconceptsinfo@gmail.com"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: phoneLink,
            className: "block mt-1.5 text-sm text-[#A1A1AA] hover:text-[var(--sage)] transition-colors",
            children: settings.contact_phone || "+234 802 449 3791"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] tracking-[0.4em] uppercase text-[#A1A1AA] font-medium", children: "Studio Base" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-[#F4F4F5]", children: settings.studio_location || "Maiduguri — Worldwide" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3 text-[10px] tracking-[0.3em] uppercase text-[#A1A1AA]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Sunny Concepts. All rights reserved."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Designed with intentional excellence" })
    ] })
  ] }) });
}
function CreditButton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.a,
    {
      href: "https://maxxedtechltd.vercel.app",
      target: "_blank",
      rel: "noreferrer",
      initial: { opacity: 0, y: 15 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 0.4, duration: 0.6 },
      className: "fixed bottom-5 right-5 z-40 glass rounded-full px-4 py-2.5 text-[10px] tracking-[0.28em] uppercase text-[#A1A1AA] hover:text-[#F4F4F5] hover:border-white/30 transition-all flex items-center gap-2",
      style: {
        boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 15px rgba(183, 215, 193, 0.12)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-[var(--sage)] shadow-[0_0_8px_var(--sage)]" }),
        "Made by Maxxed Tech Ltd"
      ]
    }
  );
}
function SmoothScroll() {
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // fluid cubic-bezier style lerp
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false
    });
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
  return null;
}
const Scroll3DScene = reactExports.lazy(() => import("./Scroll3DScene-C52plLv-.mjs"));
function LazyScroll3D() {
  const [mounted, setMounted] = reactExports.useState(false);
  const [enabled, setEnabled] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setMounted(true);
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isLowPower = typeof navigator !== "undefined" && navigator.hardwareConcurrency != null && navigator.hardwareConcurrency <= 4;
    if (!isMobile && !prefersReducedMotion && !isLowPower) {
      setEnabled(true);
    }
  }, []);
  if (!mounted || !enabled) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 pointer-events-none z-[2]", "aria-hidden": "true" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scroll3DScene, {}) });
}
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "relative overflow-hidden bg-[#070709] min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SmoothScroll, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aurora-bg", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aurora-blob" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LazyScroll3D, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Intro, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(About, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Services, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Portfolio, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Contact, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CreditButton, {})
  ] });
}
export {
  Index as component
};
