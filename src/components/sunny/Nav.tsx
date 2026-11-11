import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1200px,calc(100%-2rem))] gpu-accelerated"
      >
        <div
          className={`glass rounded-full flex items-center justify-between px-6 py-3.5 transition-all duration-300 ${
            scrolled
              ? "bg-[#3F3F3D]/95 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.85)] border-white/20"
              : "bg-[#3F3F3D]/80 border-[#6B6A69]/20"
          }`}
        >
          <a href="#top" className="flex items-center gap-2.5 group">
            <span className="h-2 w-2 rounded-full bg-[var(--sage)] shadow-[0_0_10px_var(--sage)]" />
            <span className="text-sm tracking-[0.25em] uppercase font-light text-[#D9D9D9]">
              Sunny Concepts
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-9">
            {links.map((l) => (
              <a
                key={`nav-link-${l.href}`}
                href={l.href}
                className="text-xs tracking-[0.22em] uppercase text-[#AFAFAE] hover:text-[#D9D9D9] transition-colors font-medium"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden md:inline-flex text-xs tracking-[0.22em] uppercase px-5 py-2 rounded-full border border-[var(--sage)]/40 text-[#D9D9D9] hover:bg-[var(--sage)]/15 transition-all font-medium"
            >
              Start a Project
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open navigation menu"
              className="md:hidden text-xs tracking-[0.22em] uppercase text-[#D9D9D9] px-3 py-1.5 rounded-lg border border-[#6B6A69]/20"
            >
              Menu
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] md:hidden glass-strong flex flex-col items-center justify-center gap-8 bg-[#0F0F0F]/95 backdrop-blur-2xl"
          >
            {links.map((l) => (
              <a
                key={`mobile-link-${l.href}`}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-2xl tracking-[0.25em] uppercase font-light text-[#D9D9D9] hover:text-[var(--sage)] transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/admin"
              onClick={() => setOpen(false)}
              className="mt-6 text-xs tracking-[0.3em] uppercase text-[#AFAFAE] hover:text-[#D9D9D9]"
            >
              Admin Portal
            </a>
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 text-xs tracking-[0.3em] uppercase text-[#AFAFAE] px-4 py-2 rounded-full border border-[#6B6A69]/20"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
