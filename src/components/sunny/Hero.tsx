import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden grain">
      {/* ambient layers */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 h-[60vh] w-[60vh] rounded-full blur-3xl float-slow" style={{ background: "radial-gradient(circle, var(--sage) 0%, transparent 60%)", opacity: 0.18 }} />
        <div className="absolute bottom-0 -right-40 h-[70vh] w-[70vh] rounded-full blur-3xl float-slow" style={{ animationDelay: "-6s", background: "radial-gradient(circle, var(--burgundy) 0%, transparent 65%)", opacity: 0.35 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, var(--background) 100%)" }} />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.6, duration: 1 }}
          className="inline-block text-[10px] tracking-[0.5em] uppercase text-muted-foreground mb-8"
        >
          — A Premium Digital Agency
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.8, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-7xl md:text-[8rem] leading-[0.95] text-balance font-light"
        >
          Leading the world<br />
          <em className="italic text-[var(--sage)] font-light">through digital</em><br />
          services.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ delay: 5.4, duration: 1.2 }}
          className="mt-10 text-sm md:text-base tracking-[0.2em] uppercase text-muted-foreground max-w-xl mx-auto"
        >
          Premium digital solutions with global standards
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.6, duration: 1 }}
          className="mt-14 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#portfolio" className="glass rounded-full px-10 py-4 text-xs tracking-[0.3em] uppercase hover:bg-white/8 transition-all hover:scale-[1.03]">
            View Portfolio
          </a>
          <a href="#contact" className="rounded-full px-10 py-4 text-xs tracking-[0.3em] uppercase text-[var(--primary-foreground)] hover:scale-[1.03] transition-all" style={{ background: "var(--sage)", boxShadow: "var(--glow-sage)" }}>
            Start a Project
          </a>
        </motion.div>
      </motion.div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 6, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">Scroll</span>
        <div className="h-12 w-px bg-gradient-to-b from-[var(--sage)] to-transparent">
          <motion.div
            animate={{ y: [0, 48, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-3 w-px bg-[var(--sage)]"
          />
        </div>
      </motion.div>
    </section>
  );
}