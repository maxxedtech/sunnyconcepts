import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { A as AnimatePresence, m as motion, u as useScroll, a as useTransform } from "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function Intro() {
  const [show, setShow] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setShow(false), 4200);
    return () => clearTimeout(t);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: show && /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 1 },
      exit: { opacity: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
      className: "fixed inset-0 z-[100] flex items-center justify-center grain",
      style: { background: "var(--gradient-cinematic)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, scale: 1.4 },
            animate: { opacity: 0.55, scale: 1 },
            transition: { duration: 2.4, ease: "easeOut" },
            className: "absolute h-[60vh] w-[60vh] rounded-full blur-3xl",
            style: { background: "radial-gradient(circle, var(--sage), transparent 60%)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-center text-center px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h1,
            {
              initial: { opacity: 0, y: 20, letterSpacing: "0.4em" },
              animate: { opacity: 1, y: 0, letterSpacing: "0.18em" },
              transition: { duration: 2, delay: 0.6, ease: [0.22, 1, 0.36, 1] },
              className: "text-4xl md:text-6xl font-light uppercase text-foreground",
              children: "Sunny Concepts"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 14 },
              animate: { opacity: 0.7, y: 0 },
              transition: { duration: 1.6, delay: 2 },
              className: "mt-6 text-xs md:text-sm tracking-[0.35em] uppercase text-muted-foreground",
              children: "Leading the world through digital services"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setShow(false),
            className: "absolute bottom-10 right-10 text-[10px] tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors",
            children: "Skip"
          }
        )
      ]
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
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.header,
      {
        initial: { y: -40, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { delay: 4.4, duration: 1, ease: [0.22, 1, 0.36, 1] },
        className: "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1200px,calc(100%-2rem))]",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `glass rounded-full flex items-center justify-between px-6 py-3 transition-all duration-700 ${scrolled ? "shadow-2xl" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#top", className: "flex items-center gap-2 group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-[var(--sage)] shadow-[0_0_12px_var(--sage)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm tracking-[0.25em] uppercase font-light", children: "Sunny Concepts" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden md:flex items-center gap-10", children: links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: l.href, className: "text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors", children: l.label }, l.href)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#contact", className: "hidden md:inline-flex text-xs tracking-[0.2em] uppercase px-5 py-2 rounded-full border border-[var(--sage)]/30 text-foreground hover:bg-[var(--sage)]/10 transition-colors", children: "Start a Project" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setOpen(true), "aria-label": "Menu", className: "md:hidden text-xs tracking-[0.2em] uppercase", children: "Menu" })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 z-[60] md:hidden glass-strong flex flex-col items-center justify-center gap-8", children: [
      links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: l.href, onClick: () => setOpen(false), className: "text-2xl tracking-[0.2em] uppercase font-light", children: l.label }, l.href)),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setOpen(false), className: "absolute top-6 right-6 text-xs tracking-[0.3em] uppercase", children: "Close" })
    ] }) })
  ] });
}
function Hero() {
  const ref = reactExports.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref, id: "top", className: "relative min-h-screen flex items-center justify-center overflow-hidden grain", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { style: { y }, className: "absolute inset-0 pointer-events-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/4 -left-32 h-[60vh] w-[60vh] rounded-full blur-3xl float-slow", style: { background: "radial-gradient(circle, var(--sage) 0%, transparent 60%)", opacity: 0.18 } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 -right-40 h-[70vh] w-[70vh] rounded-full blur-3xl float-slow", style: { animationDelay: "-6s", background: "radial-gradient(circle, var(--burgundy) 0%, transparent 65%)", opacity: 0.35 } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: { background: "linear-gradient(to bottom, transparent 40%, var(--background) 100%)" } })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { style: { opacity }, className: "relative z-10 max-w-6xl mx-auto px-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.span,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 4.6, duration: 1 },
          className: "inline-block text-[10px] tracking-[0.5em] uppercase text-muted-foreground mb-8",
          children: "— A Premium Digital Agency"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.h1,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 4.8, duration: 1.4, ease: [0.22, 1, 0.36, 1] },
          className: "text-5xl sm:text-7xl md:text-[8rem] leading-[0.95] text-balance font-light",
          children: [
            "Leading the world",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic text-[var(--sage)] font-light", children: "through digital" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "services."
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.p,
        {
          initial: { opacity: 0 },
          animate: { opacity: 0.75 },
          transition: { delay: 5.4, duration: 1.2 },
          className: "mt-10 text-sm md:text-base tracking-[0.2em] uppercase text-muted-foreground max-w-xl mx-auto",
          children: "Premium digital solutions with global standards"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 5.6, duration: 1 },
          className: "mt-14 flex flex-col sm:flex-row gap-4 justify-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#portfolio", className: "glass rounded-full px-10 py-4 text-xs tracking-[0.3em] uppercase hover:bg-white/8 transition-all hover:scale-[1.03]", children: "View Portfolio" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#contact", className: "rounded-full px-10 py-4 text-xs tracking-[0.3em] uppercase text-[var(--primary-foreground)] hover:scale-[1.03] transition-all", style: { background: "var(--sage)", boxShadow: "var(--glow-sage)" }, children: "Start a Project" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 0.5 },
        transition: { delay: 6, duration: 1 },
        className: "absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.4em] uppercase text-muted-foreground", children: "Scroll" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-px bg-gradient-to-b from-[var(--sage)] to-transparent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              animate: { y: [0, 48, 0] },
              transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
              className: "h-3 w-px bg-[var(--sage)]"
            }
          ) })
        ]
      }
    )
  ] });
}
const ceoImage = "/assets/ceo-BsYXupPi.jpeg";
function About() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "about", className: "relative py-32 md:py-48 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "placeholder-frame relative aspect-[4/5] overflow-hidden rounded-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: ceoImage,
              alt: "Sunday Ibrahim, Founder and Creative Director of Sunny Concepts",
              className: "h-full w-full object-cover"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.5em] uppercase text-[var(--sage)]", children: "— About" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-6 text-4xl md:text-6xl font-light leading-[1.05] text-balance", children: [
            "Leading the world through ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic text-[var(--sage)]", children: "premium" }),
            " digital services."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-10 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl", children: "From Maiduguri to the global market — we bridge the gap between digital dreams and high-fidelity reality. Sunny Concepts is a premium digital agency specializing in strategic brand identity, media production, digital marketing, and printing & logistics." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-base text-muted-foreground/80 leading-relaxed max-w-xl", children: "We combine AI-native workflows, market-driven design strategy, and cinematic visual execution to create modern digital experiences that elevate brands globally." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 pt-8 border-t border-white/8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm tracking-[0.2em] uppercase", children: "Sunday Ibrahim" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs tracking-[0.3em] uppercase text-muted-foreground", children: "Founder & Creative Director" })
          ] })
        ]
      }
    )
  ] }) });
}
const services = [
  { n: "01", title: "Brand Identity", body: "Strategic minimalist branding systems designed to communicate clarity, trust, and distinction." },
  { n: "02", title: "Media Production", body: "Professional visual storytelling through photography, motion, and short-form content." },
  { n: "03", title: "Digital Marketing", body: "AI-enhanced marketing systems focused on audience psychology, visibility, and growth." },
  { n: "04", title: "Printing & Logistics", body: "From physical branding to large-format production with precision and consistency." }
];
function Services() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "services", className: "relative py-32 md:py-48 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 1 },
        className: "max-w-3xl mb-20",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.5em] uppercase text-[var(--sage)]", children: "— Services" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-6 text-4xl md:text-6xl font-light leading-[1.05] text-balance", children: [
            "Four disciplines, ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic text-[var(--sage)]", children: "one cinematic" }),
            " standard."
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-6", children: services.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
        className: "group glass rounded-3xl p-10 md:p-12 relative overflow-hidden hover:-translate-y-1 transition-transform duration-700",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700", style: { background: "radial-gradient(circle, var(--sage), transparent 60%)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between mb-12", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs tracking-[0.3em] uppercase text-[var(--sage)]", children: s.n }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs tracking-[0.3em] uppercase text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity", children: "— Explore" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-3xl md:text-4xl font-light", children: s.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-muted-foreground leading-relaxed max-w-md", children: s.body })
          ] })
        ]
      },
      s.n
    )) })
  ] }) });
}
function Placeholder({
  label,
  className = "",
  children,
  ratio = "aspect-[4/5]"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `placeholder-frame rounded-2xl ${ratio} ${className} flex items-center justify-center`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-6 rounded-xl border border-white/5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-center gap-3 text-center px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-full border border-[var(--sage)]/40 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-1.5 rounded-full bg-[var(--sage)] shadow-[0_0_10px_var(--sage)]" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.4em] uppercase text-muted-foreground", children: label }),
      children
    ] })
  ] });
}
const artCover01 = "/assets/art-cover-01-CHk3iSG0.jpeg";
const artCover02 = "/assets/art-cover-02-oKnpY_1k.jpeg";
const artCover03 = "/assets/art-cover-03-Dc9XFfki.jpeg";
const artCover04 = "/assets/art-cover-04-C-OKZjQ8.jpeg";
const artCover05 = "/assets/art-cover-05-Ca-3I-n0.jpeg";
const birthdayFlyer01 = "/assets/birthday-flyer-Dh4xdx4D.jpeg";
const birthdayFlyer02 = "/assets/birthday-flyer-02-DiV3CCTG.jpeg";
const churchFlyer01 = "/assets/church-flyer-01-B8zW_y3g.jpeg";
const churchFlyer02 = "/assets/church-flyer-02-CTIculn-.jpeg";
const churchFlyer03 = "/assets/church-flyer-03-D0ZeyZLw.jpeg";
const churchFlyer04 = "/assets/church-flyer-04-DCGE__uR.jpeg";
const churchFlyer05 = "/assets/church-flyer-05-DXlLIVTa.jpeg";
const logoDesign01 = "/assets/logo-design-01-C_lOcpUf.jpeg";
const logoDesign02 = "/assets/logo-design-02-CvLmH_2D.jpeg";
const logoDesign03 = "/assets/logo-design-03-B3hM9An2.jpeg";
const logoDesign04 = "/assets/logo-design-04-jusxN2iD.jpeg";
const logoDesign05 = "/assets/logo-design-05-tIUiKX6M.jpeg";
const flyer01 = "/assets/flyer-01-Yi-8fLz-.jpeg";
const flyer02 = "/assets/flyer-02-Bvyzha6a.jpeg";
const flyer03 = "/assets/flyer-03-DKGeA_jv.jpeg";
const flyer04 = "/assets/flyer-04-BkuRXNBW.jpeg";
const flyer05 = "/assets/flyer-05-CAq8CeHM.jpeg";
const flyer06 = "/assets/flyer-06-C3VpaoHM.jpeg";
const flyer07 = "/assets/flyer-07-CMaCKHHL.jpeg";
const flyer08 = "/assets/flyer-08-Cw7y3AF4.jpeg";
const categories = [
  { slug: "art-cover", label: "Art Cover" },
  { slug: "birthday-flyers", label: "Birthday Flyers" },
  { slug: "church-flyers", label: "Church Flyers" },
  { slug: "logos-brand-identity", label: "Logos & Brand Identity" },
  { slug: "others", label: "Others" },
  { slug: "stickers-labelling", label: "Stickers & Labelling" },
  { slug: "wedding", label: "Wedding Cards & Programs" }
];
const clients = ["Rommdar", "Carlton Park", "Kugye", "Prince Delight", "Habakkuk Godwin", "Minister GSP"];
const portfolioImages = {
  "art-cover": [
    { src: artCover01, title: "Art Cover 01" },
    { src: artCover02, title: "Art Cover 02" },
    { src: artCover03, title: "Art Cover 03" },
    { src: artCover04, title: "Art Cover 04" },
    { src: artCover05, title: "Art Cover 05" }
  ],
  "birthday-flyers": [
    { src: birthdayFlyer01, title: "Birthday Flyer 01" },
    { src: birthdayFlyer02, title: "Birthday Flyer 02" }
  ],
  "church-flyers": [
    { src: churchFlyer01, title: "Church Flyer 01" },
    { src: churchFlyer02, title: "Church Flyer 02" },
    { src: churchFlyer03, title: "Church Flyer 03" },
    { src: churchFlyer04, title: "Church Flyer 04" },
    { src: churchFlyer05, title: "Church Flyer 05" }
  ],
  "logos-brand-identity": [
    { src: logoDesign01, title: "Logo Design 01" },
    { src: logoDesign02, title: "Logo Design 02" },
    { src: logoDesign03, title: "Logo Design 03" },
    { src: logoDesign04, title: "Logo Design 04" },
    { src: logoDesign05, title: "Logo Design 05" }
  ],
  others: [
    { src: flyer01, title: "Flyer 01" },
    { src: flyer02, title: "Flyer 02" },
    { src: flyer03, title: "Flyer 03" },
    { src: flyer04, title: "Flyer 04" },
    { src: flyer05, title: "Flyer 05" },
    { src: flyer06, title: "Flyer 06" },
    { src: flyer07, title: "Flyer 07" },
    { src: flyer08, title: "Flyer 08" }
  ],
  "stickers-labelling": [],
  wedding: []
};
function Portfolio() {
  const [active, setActive] = reactExports.useState(categories[0].slug);
  const [lightbox, setLightbox] = reactExports.useState(null);
  const current = categories.find((c) => c.slug === active);
  const currentImages = portfolioImages[active] ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "portfolio", className: "relative py-32 md:py-48 px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 1 },
          className: "max-w-3xl mb-16",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.5em] uppercase text-[var(--sage)]", children: "- Selected Work" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-6 text-4xl md:text-6xl font-light leading-[1.05] text-balance", children: [
              "An ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic text-[var(--sage)]", children: "characterized" }),
              " archive of recent productions."
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-12", children: categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setActive(c.slug),
          className: `text-[10px] tracking-[0.3em] uppercase px-5 py-2.5 rounded-full transition-all duration-500 ${active === c.slug ? "bg-[var(--sage)] text-[var(--primary-foreground)]" : "glass hover:bg-white/8"}`,
          children: c.label
        },
        c.slug
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -10 },
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          className: "grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6",
          children: currentImages.length > 0 ? currentImages.map((image, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.button,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: i * 0.06, duration: 0.8 },
              onClick: () => setLightbox(image),
              className: `group relative overflow-hidden rounded-2xl ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${i === 0 ? "aspect-square" : "aspect-[4/5]"} overflow-hidden rounded-2xl bg-black/30`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: image.src,
                    alt: `${current.label} - ${image.title}`,
                    className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]",
                    loading: "lazy"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.3em] uppercase glass-strong rounded-full px-3 py-1.5", children: current.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.3em] uppercase text-muted-foreground", children: String(i + 1).padStart(2, "0") })
                ] })
              ]
            },
            image.src
          )) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 md:col-span-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Placeholder, { label: `Add ${current.label} Images`, ratio: "aspect-[16/6]" }) })
        },
        active
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-32 pt-16 border-t border-white/8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] tracking-[0.5em] uppercase text-muted-foreground mb-10 text-center", children: "Trusted by visionary clients" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-x-12 gap-y-6", children: clients.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg md:text-2xl font-light italic text-muted-foreground hover:text-foreground transition-colors", children: c }, c)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: lightbox && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        onClick: () => setLightbox(null),
        className: "fixed inset-0 z-[80] flex items-center justify-center p-6 backdrop-blur-2xl",
        style: { background: "oklch(0.08 0.01 165 / 0.85)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { scale: 0.92, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.95, opacity: 0 },
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            className: "glass-strong rounded-3xl p-4 max-w-3xl w-full",
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[16/10] overflow-hidden rounded-2xl bg-black/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: lightbox.src, alt: lightbox.title, className: "h-full w-full object-contain" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setLightbox(null), className: "mt-4 w-full text-[10px] tracking-[0.4em] uppercase text-muted-foreground hover:text-foreground py-2", children: "Close" })
            ]
          }
        )
      }
    ) })
  ] });
}
const socials = [
  { label: "Instagram", href: "https://www.instagram.com/sunny__concepts" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100093187495032" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sunday-ibrahim-116452330" },
  { label: "TikTok", href: "https://tiktok.com/@sunny_concepts" },
  { label: "X", href: "https://x.com/sunnyconcepts01" }
];
function Contact() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "contact", className: "relative py-32 md:py-48 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 40 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
      className: "glass rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full blur-3xl opacity-30", style: { background: "radial-gradient(circle, var(--sage), transparent 60%)" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.5em] uppercase text-[var(--sage)]", children: "— Let's create" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-6 text-5xl md:text-7xl font-light leading-[1.05] text-balance", children: [
            "Begin your ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic text-[var(--sage)]", children: "next chapter" }),
            "."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 text-muted-foreground max-w-lg mx-auto", children: "Tell us about your vision. We respond within 24 hours with a tailored creative direction." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex flex-col sm:flex-row gap-4 justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "https://wa.me/2348024493791?text=Hi%20Sunny%20Concepts%2C%20I%27d%20love%20to%20discuss%20a%20project.",
                target: "_blank",
                rel: "noreferrer",
                className: "rounded-full px-10 py-4 text-xs tracking-[0.3em] uppercase text-[var(--primary-foreground)] hover:scale-[1.03] transition-all",
                style: { background: "var(--sage)", boxShadow: "var(--glow-sage)" },
                children: "Message on WhatsApp"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:sunnyconceptsinfo@gmail.com", className: "glass rounded-full px-10 py-4 text-xs tracking-[0.3em] uppercase hover:bg-black/5 transition-all", children: "sunnyconceptsinfo@gmail.com" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3", children: socials.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: s.href, target: "_blank", rel: "noreferrer", className: "text-[10px] tracking-[0.4em] uppercase text-muted-foreground hover:text-[var(--sage)] transition-colors", children: s.label }, s.label)) })
        ] })
      ]
    }
  ) }) });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "relative px-6 pb-10 pt-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-white/8 pt-12 grid md:grid-cols-3 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-[var(--sage)] shadow-[0_0_12px_var(--sage)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm tracking-[0.25em] uppercase font-light", children: "Sunny Concepts" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed", children: "A premium digital agency leading the world through cinematic creative services." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] tracking-[0.4em] uppercase text-muted-foreground", children: "Contact" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:sunnyconceptsinfo@gmail.com", className: "block mt-3 text-sm hover:text-[var(--sage)] transition-colors", children: "sunnyconceptsinfo@gmail.com" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "tel:08024493791", className: "block mt-1 text-sm hover:text-[var(--sage)] transition-colors", children: "+234 802 449 3791" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] tracking-[0.4em] uppercase text-muted-foreground", children: "Studio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm", children: "Maiduguri — Worldwide" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between gap-3 text-[10px] tracking-[0.3em] uppercase text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Sunny Concepts"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Crafted with intention" })
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
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 6, duration: 1 },
      className: "fixed bottom-5 right-5 z-40 glass rounded-full px-4 py-2.5 text-[10px] tracking-[0.3em] uppercase hover:bg-white/10 hover:scale-105 transition-all flex items-center gap-2",
      style: { boxShadow: "0 10px 30px -10px oklch(0 0 0 / 0.5), 0 0 20px oklch(0.78 0.04 155 / 0.1)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-[var(--sage)] shadow-[0_0_8px_var(--sage)]" }),
        "Made by Maxxed Tech Ltd"
      ]
    }
  );
}
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "relative overflow-hidden", style: {
    scrollBehavior: "smooth"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aurora-bg", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aurora-blob" }) }),
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
