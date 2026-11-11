import { o as __toESM } from "../_runtime.mjs";
import { f as usePortfolioCategories, o as optimizeCloudinaryUrl, p as useSiteSettings, u as supabase } from "./cloudinary-B7lKi_GN.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { i as AnimatePresence, n as useScroll, r as motion, t as useTransform } from "../_libs/framer-motion.mjs";
import { t as Lenis } from "../_libs/lenis.mjs";
// node_modules/.nitro/vite/services/ssr/assets/routes-BfvCs-E1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Intro() {
	const [show, setShow] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!sessionStorage.getItem("sunny_splash_seen")) {
			setShow(true);
			sessionStorage.setItem("sunny_splash_seen", "true");
			const t = setTimeout(() => setShow(false), 900);
			return () => clearTimeout(t);
		}
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: show && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 1 },
		exit: {
			opacity: 0,
			transition: {
				duration: .5,
				ease: [
					.16,
					1,
					.3,
					1
				]
			}
		},
		className: "fixed inset-0 z-[100] flex items-center justify-center bg-[#0F0F0F] pointer-events-none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 flex flex-col items-center text-center px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h1, {
				initial: {
					opacity: 0,
					scale: .95
				},
				animate: {
					opacity: 1,
					scale: 1
				},
				transition: { duration: .4 },
				className: "text-3xl md:text-5xl font-light uppercase tracking-[0.25em] text-[#D9D9D9]",
				children: "Sunny Concepts"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
				initial: { opacity: 0 },
				animate: { opacity: .8 },
				transition: {
					delay: .2,
					duration: .3
				},
				className: "mt-4 text-xs tracking-[0.3em] uppercase text-[#AFAFAE]",
				children: "Leading the world through digital services"
			})]
		})
	}) });
}
var links = [
	{
		href: "#about",
		label: "About"
	},
	{
		href: "#services",
		label: "Services"
	},
	{
		href: "#portfolio",
		label: "Portfolio"
	},
	{
		href: "#contact",
		label: "Contact"
	}
];
function Nav() {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 30);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.header, {
		initial: {
			y: -30,
			opacity: 0
		},
		animate: {
			y: 0,
			opacity: 1
		},
		transition: {
			delay: .1,
			duration: .6,
			ease: [
				.16,
				1,
				.3,
				1
			]
		},
		className: "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1200px,calc(100%-2rem))] gpu-accelerated",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `glass rounded-full flex items-center justify-between px-6 py-3.5 transition-all duration-300 ${scrolled ? "bg-[#3F3F3D]/95 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.85)] border-white/20" : "bg-[#3F3F3D]/80 border-[#6B6A69]/20"}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#top",
					className: "flex items-center gap-2.5 group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-[var(--sage)] shadow-[0_0_10px_var(--sage)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm tracking-[0.25em] uppercase font-light text-[#D9D9D9]",
						children: "Sunny Concepts"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden md:flex items-center gap-9",
					children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: l.href,
						className: "text-xs tracking-[0.22em] uppercase text-[#AFAFAE] hover:text-[#D9D9D9] transition-colors font-medium",
						children: l.label
					}, `nav-link-${l.href}`))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#contact",
						className: "hidden md:inline-flex text-xs tracking-[0.22em] uppercase px-5 py-2 rounded-full border border-[var(--sage)]/40 text-[#D9D9D9] hover:bg-[var(--sage)]/15 transition-all font-medium",
						children: "Start a Project"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setOpen(true),
						"aria-label": "Open navigation menu",
						className: "md:hidden text-xs tracking-[0.22em] uppercase text-[#D9D9D9] px-3 py-1.5 rounded-lg border border-[#6B6A69]/20",
						children: "Menu"
					})]
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "fixed inset-0 z-[60] md:hidden glass-strong flex flex-col items-center justify-center gap-8 bg-[#0F0F0F]/95 backdrop-blur-2xl",
		children: [
			links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: l.href,
				onClick: () => setOpen(false),
				className: "text-2xl tracking-[0.25em] uppercase font-light text-[#D9D9D9] hover:text-[var(--sage)] transition-colors",
				children: l.label
			}, `mobile-link-${l.href}`)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "/admin",
				onClick: () => setOpen(false),
				className: "mt-6 text-xs tracking-[0.3em] uppercase text-[#AFAFAE] hover:text-[#D9D9D9]",
				children: "Admin Portal"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setOpen(false),
				className: "absolute top-6 right-6 text-xs tracking-[0.3em] uppercase text-[#AFAFAE] px-4 py-2 rounded-full border border-[#6B6A69]/20",
				children: "Close"
			})
		]
	}) })] });
}
var HeroCanvas = (0, import_react.lazy)(() => import("./HeroCanvas-C0hzzA-6.mjs"));
function LazyHeroCanvas() {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const [shouldRender, setShouldRender] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMounted(true);
		const isMobile = window.innerWidth < 768;
		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const isLowPower = typeof navigator !== "undefined" && navigator.hardwareConcurrency != null && navigator.hardwareConcurrency <= 4;
		if (!isMobile && !prefersReducedMotion && !isLowPower) setShouldRender(true);
	}, []);
	const skeletonFallback = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "hero-canvas pointer-events-none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 rounded-full blur-3xl opacity-20 pointer-events-none transition-opacity duration-1000",
			style: { background: "radial-gradient(circle at center, rgba(217, 217, 217, 0.25) 0%, transparent 70%)" }
		})
	});
	if (!mounted || !shouldRender) return skeletonFallback;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: skeletonFallback,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroCanvas, {})
	});
}
function Hero() {
	const ref = (0, import_react.useRef)(null);
	const { settings } = useSiteSettings();
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"]
	});
	const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
	const opacity = useTransform(scrollYProgress, [0, .85], [1, 0]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref,
		id: "top",
		className: "relative min-h-screen flex items-center justify-center overflow-hidden grain",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				style: { y },
				className: "absolute inset-0 pointer-events-none gpu-accelerated",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-1/4 -left-32 h-[50vh] w-[50vh] rounded-full blur-3xl float-slow",
						style: { background: "radial-gradient(circle, rgba(217, 217, 217, 0.22) 0%, transparent 65%)" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute bottom-0 -right-40 h-[60vh] w-[60vh] rounded-full blur-3xl float-slow",
						style: {
							animationDelay: "-6s",
							background: "radial-gradient(circle, rgba(107, 106, 105, 0.3) 0%, transparent 70%)"
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 pointer-events-none",
						style: { background: "linear-gradient(to bottom, transparent 40%, var(--background) 100%)" }
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyHeroCanvas, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				style: { opacity },
				className: "relative z-10 max-w-6xl mx-auto px-6 text-center pt-24 pb-16 gpu-accelerated",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
						initial: {
							opacity: 0,
							y: 10
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							delay: .05,
							duration: .6
						},
						className: "inline-block text-[11px] tracking-[0.45em] uppercase text-[#AFAFAE] mb-8 font-medium",
						children: "— A Premium Digital Agency"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							delay: .15,
							duration: .8,
							ease: [
								.16,
								1,
								.3,
								1
							]
						},
						className: "text-5xl sm:text-7xl md:text-[7.5rem] leading-[0.95] text-balance font-light text-[#D9D9D9] tracking-tight",
						children: [
							settings.hero_headline_line1,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: "italic text-[var(--sage)] font-light",
								children: settings.hero_headline_italic
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							settings.hero_headline_line2
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						transition: {
							delay: .25,
							duration: .7
						},
						className: "mt-8 text-sm md:text-base tracking-[0.2em] uppercase text-[#AFAFAE] max-w-xl mx-auto",
						children: settings.hero_subtitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 15
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							delay: .35,
							duration: .7
						},
						className: "mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: settings.hero_cta_portfolio_href || "#portfolio",
							className: "glass glass-interactive rounded-full px-9 py-3.5 text-xs tracking-[0.28em] uppercase text-[#D9D9D9] hover:border-white/30 transition-all active:scale-[0.98]",
							children: settings.hero_cta_portfolio_text
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: settings.hero_cta_contact_href || "#contact",
							className: "rounded-full px-9 py-3.5 text-xs tracking-[0.28em] uppercase text-[#0F0F0F] font-medium transition-all hover:brightness-110 hover:shadow-[0_0_25px_rgba(183,215,193,0.45)] active:scale-[0.98]",
							style: { background: "var(--sage)" },
							children: settings.hero_cta_contact_text
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: .6 },
				transition: {
					delay: .5,
					duration: .8
				},
				className: "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] tracking-[0.4em] uppercase text-[#AFAFAE]",
					children: "Scroll"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-10 w-px bg-gradient-to-b from-[var(--sage)] to-transparent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						animate: { y: [
							0,
							36,
							0
						] },
						transition: {
							duration: 2.2,
							repeat: Infinity,
							ease: "easeInOut"
						},
						className: "h-2.5 w-px bg-[var(--sage)]"
					})
				})]
			})
		]
	});
}
function About() {
	const { settings, loading } = useSiteSettings();
	const portraitUrl = settings.about_founder_portrait_url ? optimizeCloudinaryUrl(settings.about_founder_portrait_url) : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "about",
		className: "relative py-28 md:py-44 px-6 bg-[#0F0F0F]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					y: 30
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: {
					once: true,
					margin: "-60px"
				},
				transition: {
					duration: .9,
					ease: [
						.16,
						1,
						.3,
						1
					]
				},
				className: "gpu-accelerated",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative aspect-[4/5] overflow-hidden rounded-3xl border border-[#6B6A69]/20 bg-[#3F3F3D] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]",
					children: portraitUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: portraitUrl,
						alt: `${settings.about_founder_name || "Sunday Ibrahim"}, ${settings.about_founder_title || "Founder & Creative Director"} of Sunny Concepts`,
						className: "h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]",
						loading: "lazy"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/80 via-transparent to-transparent pointer-events-none" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "h-full w-full flex flex-col items-center justify-center p-8 bg-[#3F3F3D] animate-pulse relative overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 opacity-20 pointer-events-none",
								style: { background: "radial-gradient(circle at center, rgba(217, 217, 217, 0.25) 0%, transparent 70%)" }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-20 w-20 rounded-full border border-[#6B6A69]/25 bg-white/5 flex items-center justify-center mb-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xl font-light text-[var(--sage)]",
									children: "SI"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-36 bg-white/10 rounded-full mb-3" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-48 bg-white/5 rounded-full" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-8 text-[10px] tracking-[0.35em] uppercase text-[#AFAFAE]/60",
								children: "Founder Portrait"
							})
						]
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 25
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: {
					once: true,
					margin: "-60px"
				},
				transition: {
					duration: .9,
					delay: .1,
					ease: [
						.16,
						1,
						.3,
						1
					]
				},
				className: "gpu-accelerated",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] tracking-[0.45em] uppercase text-[var(--sage)] font-semibold",
						children: settings.about_tag || "— About"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-6 text-4xl md:text-6xl font-light leading-[1.08] text-balance text-[#D9D9D9]",
						children: [
							settings.about_headline || "Leading the world through",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: "italic text-[var(--sage)] font-light",
								children: settings.about_headline_italic || "premium"
							}),
							" ",
							"digital services."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-8 text-base md:text-lg text-[#AFAFAE] leading-relaxed max-w-xl",
						children: settings.about_bio_p1
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-base text-[#AFAFAE]/90 leading-relaxed max-w-xl",
						children: settings.about_bio_p2
					}),
					settings.about_mission && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 p-5 rounded-2xl border border-[#6B6A69]/20 bg-[#3F3F3D]/60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] tracking-[0.3em] uppercase text-[var(--sage)] font-mono",
							children: "Mission"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1.5 text-sm text-[#D9D9D9]/90 italic leading-relaxed",
							children: [
								"\"",
								settings.about_mission,
								"\""
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 pt-6 border-t border-[#6B6A69]/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm tracking-[0.2em] uppercase font-medium text-[#D9D9D9]",
							children: settings.about_founder_name || "Sunday Ibrahim"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs tracking-[0.25em] uppercase text-[#AFAFAE]",
							children: settings.about_founder_title || "Founder & Creative Director"
						})]
					})
				]
			})]
		})
	});
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "services",
		className: "relative py-28 md:py-44 px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 25
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				transition: { duration: .8 },
				className: "max-w-3xl mb-16 gpu-accelerated",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] tracking-[0.45em] uppercase text-[var(--sage)] font-semibold",
					children: settings.services_tag || "— Services"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-6 text-4xl md:text-6xl font-light leading-[1.08] text-balance text-[#D9D9D9]",
					children: [
						settings.services_headline || "Four disciplines,",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
							className: "italic text-[var(--sage)] font-light",
							children: settings.services_headline_italic || "one cinematic"
						}),
						" ",
						"standard."
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid md:grid-cols-2 gap-6",
				children: servicesList.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 30
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: {
						once: true,
						margin: "-40px"
					},
					transition: {
						duration: .7,
						delay: i * .08,
						ease: [
							.16,
							1,
							.3,
							1
						]
					},
					className: "group glass rounded-3xl p-9 md:p-11 relative overflow-hidden transition-all duration-500 hover:border-white/25 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.85)] gpu-accelerated",
					style: {
						background: "rgba(63, 63, 61, 0.88)",
						borderColor: "rgba(255, 255, 255, 0.12)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute -top-24 -right-24 h-60 w-60 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none",
						style: { background: "radial-gradient(circle, rgba(217, 217, 217, 0.3) 0%, transparent 65%)" }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between mb-10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs tracking-[0.3em] uppercase text-[var(--sage)] font-mono font-semibold",
									children: s.num
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] tracking-[0.3em] uppercase text-[#AFAFAE] opacity-0 group-hover:opacity-100 transition-opacity duration-300",
									children: "— Explore"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-3xl md:text-4xl font-light text-[#D9D9D9] tracking-tight",
								children: s.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 text-[#AFAFAE] leading-relaxed max-w-md text-sm md:text-base",
								children: s.desc
							})
						]
					})]
				}, `service-card-${s.num}-${s.title}`))
			})]
		})
	});
}
function Portfolio() {
	const [activeCategory, setActiveCategory] = (0, import_react.useState)("all");
	const [lightbox, setLightbox] = (0, import_react.useState)(null);
	const [items, setItems] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const { categories, loading: categoriesLoading } = usePortfolioCategories();
	const { settings } = useSiteSettings();
	(0, import_react.useEffect)(() => {
		let mounted = true;
		const fetchPortfolio = async () => {
			if (!supabase) {
				setLoading(false);
				return;
			}
			try {
				const { data, error } = await supabase.from("portfolio_items").select("id,title,category,image_url,description,created_at").order("created_at", { ascending: false });
				if (!error && data && mounted) setItems(data);
			} catch (err) {
				console.warn("Portfolio fetch error:", err);
			} finally {
				if (mounted) setLoading(false);
			}
		};
		fetchPortfolio();
		return () => {
			mounted = false;
		};
	}, []);
	const categoryTabs = (0, import_react.useMemo)(() => {
		const list = [{
			slug: "all",
			label: "All Works"
		}];
		categories.forEach((cat) => {
			list.push({
				slug: cat.slug,
				label: cat.name
			});
		});
		return list;
	}, [categories]);
	const displayItems = (0, import_react.useMemo)(() => {
		return items.map((item) => ({
			id: item.id,
			src: optimizeCloudinaryUrl(item.image_url),
			title: item.title,
			category: item.category,
			description: item.description
		}));
	}, [items]);
	const filteredItems = (0, import_react.useMemo)(() => {
		if (activeCategory === "all") return displayItems;
		const activeLower = activeCategory.toLowerCase();
		const matchingCat = categories.find((c) => c.slug.toLowerCase() === activeLower || c.name.toLowerCase() === activeLower);
		const targetName = matchingCat ? matchingCat.name.toLowerCase() : activeLower;
		return displayItems.filter((item) => {
			const itemCatLower = (item.category || "").toLowerCase();
			return itemCatLower === activeLower || itemCatLower === targetName || matchingCat && itemCatLower === matchingCat.slug.toLowerCase();
		});
	}, [
		displayItems,
		activeCategory,
		categories
	]);
	const clientsList = (0, import_react.useMemo)(() => {
		return (settings.client_marquee_list || "").split(",").map((c) => c.trim()).filter(Boolean);
	}, [settings.client_marquee_list]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "portfolio",
		className: "relative py-28 md:py-44 px-6 bg-[#0F0F0F]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 25
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: { duration: .8 },
					className: "max-w-3xl mb-14 gpu-accelerated",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] tracking-[0.45em] uppercase text-[var(--sage)] font-semibold",
						children: "— Selected Work"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-6 text-4xl md:text-6xl font-light leading-[1.08] text-balance text-[#D9D9D9]",
						children: [
							"A ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: "italic text-[var(--sage)] font-light",
								children: "curated"
							}),
							" archive of recent productions."
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2.5 mb-12",
					children: categoryTabs.map((c) => {
						const isActive = activeCategory === c.slug;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActiveCategory(c.slug),
							className: `text-[10px] tracking-[0.28em] uppercase px-5 py-2.5 rounded-full transition-all duration-300 font-medium ${isActive ? "bg-[var(--sage)] text-[#0F0F0F] shadow-[0_0_20px_rgba(183,215,193,0.35)]" : "glass text-[#AFAFAE] hover:text-[#D9D9D9] hover:border-white/20"}`,
							children: c.label
						}, `cat-pill-${c.slug}`);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					mode: "wait",
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6",
						children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "aspect-[4/5] rounded-2xl bg-[#3F3F3D] border border-[#6B6A69]/20 p-4 flex flex-col justify-end animate-pulse overflow-hidden relative shadow-lg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative z-10 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-16 bg-white/10 rounded-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-32 bg-white/15 rounded-md" })]
							})]
						}, `obsidian-skeleton-${i}`))
					}, "loading-skeletons") : filteredItems.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: {
							opacity: 0,
							y: -10
						},
						transition: {
							duration: .5,
							ease: [
								.16,
								1,
								.3,
								1
							]
						},
						className: "grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6",
						children: filteredItems.map((item, i) => {
							const isHeroSpan = i === 0 && filteredItems.length > 2;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
								initial: {
									opacity: 0,
									y: 15
								},
								animate: {
									opacity: 1,
									y: 0
								},
								transition: {
									delay: Math.min(i * .05, .3),
									duration: .6
								},
								onClick: () => setLightbox(item),
								className: `group relative overflow-hidden rounded-2xl text-left border border-[#6B6A69]/20 hover:border-white/25 transition-all duration-500 bg-[#3F3F3D] ${isHeroSpan ? "md:col-span-2 md:row-span-2" : ""}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `${isHeroSpan ? "aspect-square" : "aspect-[4/5]"} overflow-hidden rounded-2xl bg-[#0F0F0F]`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: item.src,
											alt: item.title,
											className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]",
											loading: "lazy"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/95 via-[#0F0F0F]/30 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-95 pointer-events-none" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-90 group-hover:opacity-100 transition-opacity duration-300",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] tracking-[0.25em] uppercase glass rounded-full px-3 py-1 font-medium text-[#D9D9D9]",
											children: item.category
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "mt-2 text-sm md:text-base font-normal text-[#D9D9D9] drop-shadow-md",
											children: item.title
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] tracking-[0.3em] uppercase text-[#AFAFAE] font-mono",
											children: String(i + 1).padStart(2, "0")
										})]
									})
								]
							}, `portfolio-item-${item.id}-${i}`);
						})
					}, `grid-${activeCategory}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						className: "rounded-3xl border border-[#6B6A69]/20 bg-[#3F3F3D] p-16 text-center shadow-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-10 w-10 mx-auto rounded-full bg-[var(--sage)]/10 flex items-center justify-center mb-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-[var(--sage)]" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-base text-[#D9D9D9] font-light",
								children: "No published assets in this discipline yet."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-[#AFAFAE]",
								children: "Upload and categorize high-resolution media in the Admin Portal."
							})
						]
					}, "empty-state")
				}),
				clientsList.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-28 pt-14 border-t border-[#6B6A69]/20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] tracking-[0.45em] uppercase text-[#AFAFAE] mb-8 text-center font-medium",
						children: "Trusted by visionary clients"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap justify-center gap-x-12 gap-y-6",
						children: clientsList.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-lg md:text-2xl font-light italic text-[#AFAFAE] hover:text-[#D9D9D9] transition-colors",
							children: c
						}, `client-brand-${c}`))
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: lightbox && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			onClick: () => setLightbox(null),
			className: "fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 backdrop-blur-2xl bg-[#0F0F0F]/85",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					scale: .94,
					opacity: 0
				},
				animate: {
					scale: 1,
					opacity: 1
				},
				exit: {
					scale: .94,
					opacity: 0
				},
				transition: {
					duration: .4,
					ease: [
						.16,
						1,
						.3,
						1
					]
				},
				className: "glass-strong rounded-3xl p-5 max-w-4xl w-full border border-[#6B6A69]/25 bg-[#3F3F3D]",
				onClick: (e) => e.stopPropagation(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-h-[70vh] aspect-[16/10] overflow-hidden rounded-2xl bg-[#0F0F0F]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: lightbox.src,
						alt: lightbox.title,
						className: "h-full w-full object-contain"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 px-2 flex justify-between items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg text-[#D9D9D9] font-light",
							children: lightbox.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-[#AFAFAE] uppercase tracking-[0.2em] mt-0.5",
							children: lightbox.category
						}),
						lightbox.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-[#AFAFAE] mt-2 max-w-xl",
							children: lightbox.description
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setLightbox(null),
						className: "rounded-full px-5 py-2 text-xs uppercase tracking-[0.25em] glass hover:border-white/30 text-[#D9D9D9] transition-colors",
						children: "Close"
					})]
				})]
			})
		}) })]
	});
}
function Contact() {
	const { settings } = useSiteSettings();
	const phoneLink = `tel:${(settings.contact_phone || "+2348024493791").replace(/\s+/g, "")}`;
	const mailLink = `mailto:${settings.contact_email || "sunnyconceptsinfo@gmail.com"}`;
	const whatsappUrl = `https://wa.me/${(settings.contact_phone || "2348024493791").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(settings.contact_whatsapp_text || "Hi Sunny Concepts, I'd love to discuss a project.")}`;
	const socials = [
		{
			label: "Instagram",
			href: settings.social_instagram
		},
		{
			label: "LinkedIn",
			href: settings.social_linkedin
		},
		{
			label: "X (Twitter)",
			href: settings.social_x
		},
		{
			label: "Facebook",
			href: settings.social_facebook
		},
		{
			label: "TikTok",
			href: settings.social_tiktok
		}
	].filter((s) => Boolean(s.href));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "contact",
		className: "relative py-28 md:py-44 px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "max-w-6xl mx-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 30
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				transition: {
					duration: .9,
					ease: [
						.16,
						1,
						.3,
						1
					]
				},
				className: "glass rounded-[2.5rem] p-10 md:p-20 text-center relative overflow-hidden gpu-accelerated",
				style: {
					background: "rgba(63, 63, 61, 0.92)",
					borderColor: "rgba(255, 255, 255, 0.14)"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute -top-36 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full blur-3xl opacity-25 pointer-events-none",
					style: { background: "radial-gradient(circle, rgba(217, 217, 217, 0.4) 0%, transparent 65%)" }
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] tracking-[0.45em] uppercase text-[var(--sage)] font-semibold",
							children: settings.contact_tag || "— Let's create"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mt-6 text-5xl md:text-7xl font-light leading-[1.05] text-balance text-[#D9D9D9]",
							children: [
								settings.contact_headline || "Begin your",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: "italic text-[var(--sage)] font-light",
									children: settings.contact_headline_italic || "next chapter."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-8 text-base text-[#AFAFAE] max-w-lg mx-auto leading-relaxed",
							children: settings.contact_subtext
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: whatsappUrl,
									target: "_blank",
									rel: "noreferrer",
									className: "rounded-full px-9 py-4 text-xs tracking-[0.28em] uppercase text-[#0F0F0F] font-medium transition-all hover:brightness-110 hover:shadow-[0_0_25px_rgba(183,215,193,0.45)] active:scale-[0.98]",
									style: { background: "var(--sage)" },
									children: "Message on WhatsApp"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: mailLink,
									className: "glass glass-interactive rounded-full px-9 py-4 text-xs tracking-[0.28em] uppercase text-[#D9D9D9] hover:border-white/30 transition-all active:scale-[0.98]",
									children: settings.contact_email || "sunnyconceptsinfo@gmail.com"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: phoneLink,
									className: "glass glass-interactive rounded-full px-8 py-4 text-xs tracking-[0.25em] uppercase text-[#AFAFAE] hover:text-[#D9D9D9] hover:border-white/30 transition-all active:scale-[0.98]",
									children: ["Call: ", settings.contact_phone || "+234 802 449 3791"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3",
							children: socials.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: s.href,
								target: "_blank",
								rel: "noreferrer",
								className: "text-[11px] tracking-[0.35em] uppercase text-[#AFAFAE] hover:text-[var(--sage)] transition-colors font-medium",
								children: s.label
							}, `contact-social-${s.label}`))
						})
					]
				})]
			})
		})
	});
}
function Footer() {
	const { settings } = useSiteSettings();
	const phoneLink = `tel:${(settings.contact_phone || "+2348024493791").replace(/\s+/g, "")}`;
	const mailLink = `mailto:${settings.contact_email || "sunnyconceptsinfo@gmail.com"}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "relative px-6 pb-12 pt-20 border-t border-[#6B6A69]/20 bg-[#0F0F0F]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid md:grid-cols-3 gap-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-[var(--sage)] shadow-[0_0_10px_var(--sage)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm tracking-[0.25em] uppercase font-light text-[#D9D9D9]",
							children: "Sunny Concepts"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-[#AFAFAE] max-w-xs leading-relaxed",
						children: "A premium digital agency leading the world through cinematic creative services."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] tracking-[0.4em] uppercase text-[#AFAFAE] font-medium",
								children: "Contact & Inquiries"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: mailLink,
								className: "block mt-3 text-sm text-[#D9D9D9] hover:text-[var(--sage)] transition-colors",
								children: settings.contact_email || "sunnyconceptsinfo@gmail.com"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: phoneLink,
								className: "block mt-1.5 text-sm text-[#AFAFAE] hover:text-[var(--sage)] transition-colors",
								children: settings.contact_phone || "+234 802 449 3791"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] tracking-[0.4em] uppercase text-[#AFAFAE] font-medium",
							children: "Studio Base"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-[#D9D9D9]",
							children: settings.studio_location || "Maiduguri — Worldwide"
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 pt-6 border-t border-[#6B6A69]/20 flex flex-col md:flex-row justify-between gap-3 text-[10px] tracking-[0.3em] uppercase text-[#AFAFAE]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Sunny Concepts. All rights reserved."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Designed with intentional excellence" })]
			})]
		})
	});
}
function CreditButton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.a, {
		href: "https://maxxedtechltd.vercel.app",
		target: "_blank",
		rel: "noreferrer",
		initial: {
			opacity: 0,
			y: 15
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			delay: .4,
			duration: .6
		},
		className: "fixed bottom-5 right-5 z-40 glass rounded-full px-4 py-2.5 text-[10px] tracking-[0.28em] uppercase text-[#AFAFAE] hover:text-[#D9D9D9] hover:border-white/30 transition-all flex items-center gap-2",
		style: { boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 15px rgba(217, 217, 217, 0.12)" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-[var(--sage)] shadow-[0_0_8px_var(--sage)]" }), "Made by Maxxed Tech Ltd"]
	});
}
function SmoothScroll() {
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const lenis = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			orientation: "vertical",
			gestureOrientation: "vertical",
			smoothWheel: true,
			wheelMultiplier: .9,
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
var Scroll3DScene = (0, import_react.lazy)(() => import("./Scroll3DScene-DRO4AtOD.mjs"));
function LazyScroll3D() {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const [enabled, setEnabled] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMounted(true);
		const isMobile = window.innerWidth < 768;
		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const isLowPower = typeof navigator !== "undefined" && navigator.hardwareConcurrency != null && navigator.hardwareConcurrency <= 4;
		if (!isMobile && !prefersReducedMotion && !isLowPower) setEnabled(true);
	}, []);
	if (!mounted || !enabled) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 pointer-events-none z-[2]",
			"aria-hidden": "true"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scroll3DScene, {})
	});
}
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative overflow-hidden bg-[#0F0F0F] min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmoothScroll, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "aurora-bg",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aurora-blob" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyScroll3D, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Intro, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(About, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Services, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portfolio, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contact, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditButton, {})
		]
	});
}
export { Index as component };
