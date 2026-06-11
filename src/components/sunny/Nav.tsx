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
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 4.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1200px,calc(100%-2rem))]"
      >
        <div className={`glass rounded-full flex items-center justify-between px-6 py-3 transition-all duration-700 ${scrolled ? "shadow-2xl" : ""}`}>
          <a href="#top" className="flex items-center gap-2 group">
            <span className="h-2 w-2 rounded-full bg-[var(--sage)] shadow-[0_0_12px_var(--sage)]" />
            <span className="text-sm tracking-[0.25em] uppercase font-light">Sunny Concepts</span>
          </a>
          <nav className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
          <a href="#contact" className="hidden md:inline-flex text-xs tracking-[0.2em] uppercase px-5 py-2 rounded-full border border-[var(--sage)]/30 text-foreground hover:bg-[var(--sage)]/10 transition-colors">
            Start a Project
          </a>
          <button onClick={() => setOpen(true)} aria-label="Menu" className="md:hidden text-xs tracking-[0.2em] uppercase">Menu</button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] md:hidden glass-strong flex flex-col items-center justify-center gap-8">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-2xl tracking-[0.2em] uppercase font-light">{l.label}</a>
            ))}
            <button onClick={() => setOpen(false)} className="absolute top-6 right-6 text-xs tracking-[0.3em] uppercase">Close</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}