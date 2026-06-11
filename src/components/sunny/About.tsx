import { motion } from "framer-motion";
import ceoImage from "@/assets/photos/branding/ceo.jpeg";

export function About() {
  return (
    <section id="about" className="relative py-32 md:py-48 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="placeholder-frame relative aspect-[4/5] overflow-hidden rounded-2xl">
            <img
              src={ceoImage}
              alt="Sunday Ibrahim, Founder and Creative Director of Sunny Concepts"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-[10px] tracking-[0.5em] uppercase text-[var(--sage)]">— About</span>
          <h2 className="mt-6 text-4xl md:text-6xl font-light leading-[1.05] text-balance">
            Leading the world through <em className="italic text-[var(--sage)]">premium</em> digital services.
          </h2>
          <p className="mt-10 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
            From Maiduguri to the global market — we bridge the gap between digital dreams and high-fidelity reality. Sunny Concepts is a premium digital agency specializing in strategic brand identity, media production, digital marketing, and printing & logistics.
          </p>
          <p className="mt-6 text-base text-muted-foreground/80 leading-relaxed max-w-xl">
            We combine AI-native workflows, market-driven design strategy, and cinematic visual execution to create modern digital experiences that elevate brands globally.
          </p>

          <div className="mt-12 pt-8 border-t border-white/8">
            <p className="text-sm tracking-[0.2em] uppercase">Sunday Ibrahim</p>
            <p className="mt-1 text-xs tracking-[0.3em] uppercase text-muted-foreground">Founder & Creative Director</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
