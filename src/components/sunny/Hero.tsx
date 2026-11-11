import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LazyHeroCanvas } from "./LazyHeroCanvas";
import { useSiteSettings } from "@/lib/siteSettings";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { settings } = useSiteSettings();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grain"
    >
      {/* Ambient background glows */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none gpu-accelerated">
        <div
          className="absolute top-1/4 -left-32 h-[50vh] w-[50vh] rounded-full blur-3xl float-slow"
          style={{
            background: "radial-gradient(circle, rgba(217, 217, 217, 0.22) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-0 -right-40 h-[60vh] w-[60vh] rounded-full blur-3xl float-slow"
          style={{
            animationDelay: "-6s",
            background: "radial-gradient(circle, rgba(107, 106, 105, 0.3) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent 40%, var(--background) 100%)",
          }}
        />
      </motion.div>

      {/* Dynamic 3D Hero Canvas */}
      <LazyHeroCanvas />

      {/* Hero Typography & CTAs */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-24 pb-16 gpu-accelerated"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.6 }}
          className="inline-block text-[11px] tracking-[0.45em] uppercase text-[#AFAFAE] mb-8 font-medium"
        >
          — A Premium Digital Agency
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl md:text-[7.5rem] leading-[0.95] text-balance font-light text-[#D9D9D9] tracking-tight"
        >
          {settings.hero_headline_line1}
          <br />
          <em className="italic text-[var(--sage)] font-light">
            {settings.hero_headline_italic}
          </em>
          <br />
          {settings.hero_headline_line2}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="mt-8 text-sm md:text-base tracking-[0.2em] uppercase text-[#AFAFAE] max-w-xl mx-auto"
        >
          {settings.hero_subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href={settings.hero_cta_portfolio_href || "#portfolio"}
            className="glass glass-interactive rounded-full px-9 py-3.5 text-xs tracking-[0.28em] uppercase text-[#D9D9D9] hover:border-white/30 transition-all active:scale-[0.98]"
          >
            {settings.hero_cta_portfolio_text}
          </a>
          <a
            href={settings.hero_cta_contact_href || "#contact"}
            className="rounded-full px-9 py-3.5 text-xs tracking-[0.28em] uppercase text-[#0F0F0F] font-medium transition-all hover:brightness-110 hover:shadow-[0_0_25px_rgba(183,215,193,0.45)] active:scale-[0.98]"
            style={{ background: "var(--sage)" }}
          >
            {settings.hero_cta_contact_text}
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase text-[#AFAFAE]">Scroll</span>
        <div className="h-10 w-px bg-gradient-to-b from-[var(--sage)] to-transparent">
          <motion.div
            animate={{ y: [0, 36, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="h-2.5 w-px bg-[var(--sage)]"
          />
        </div>
      </motion.div>
    </section>
  );
}
