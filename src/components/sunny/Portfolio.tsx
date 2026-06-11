import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Placeholder } from "./Placeholder";

const categories = [
  { slug: "art-cover", label: "Art Cover" },
  { slug: "birthday-flyers", label: "Birthday Flyers" },
  { slug: "church-flyers", label: "Church Flyers" },
  { slug: "logos-brand-identity", label: "Logos & Brand Identity" },
  { slug: "others", label: "Others" },
  { slug: "stickers-labelling", label: "Stickers & Labelling" },
  { slug: "wedding", label: "Wedding Cards & Programs" },
];

const clients = ["Rommdar", "Carlton Park", "Kugye", "Prince Delight", "Habakkuk Godwin", "Minister GSP"];

export function Portfolio() {
  const [active, setActive] = useState(categories[0].slug);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const current = categories.find((c) => c.slug === active)!;

  return (
    <section id="portfolio" className="relative py-32 md:py-48 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-3xl mb-16"
        >
          <span className="text-[10px] tracking-[0.5em] uppercase text-[var(--sage)]">— Selected Work</span>
          <h2 className="mt-6 text-4xl md:text-6xl font-light leading-[1.05] text-balance">
            An <em className="italic text-[var(--sage)]">characterized</em> archive of recent productions.
          </h2>
        </motion.div>

        {/* category tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setActive(c.slug)}
              className={`text-[10px] tracking-[0.3em] uppercase px-5 py-2.5 rounded-full transition-all duration-500 ${
                active === c.slug
                  ? "bg-[var(--sage)] text-[var(--primary-foreground)]"
                  : "glass hover:bg-white/8"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.8 }}
                onClick={() => setLightbox(`${current.label} — Project ${i + 1}`)}
                className={`group relative overflow-hidden rounded-2xl ${
                  i === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <Placeholder
                  label={`Add Characterized Portfolio Image`}
                  ratio={i === 0 ? "aspect-square" : "aspect-[4/5]"}
                  className="group-hover:scale-[1.02] transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-[10px] tracking-[0.3em] uppercase glass-strong rounded-full px-3 py-1.5">{current.label}</span>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">0{i + 1}</span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* clients marquee */}
        <div className="mt-32 pt-16 border-t border-white/8">
          <p className="text-[10px] tracking-[0.5em] uppercase text-muted-foreground mb-10 text-center">Trusted by visionary clients</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
            {clients.map((c) => (
              <span key={c} className="text-lg md:text-2xl font-light italic text-muted-foreground hover:text-foreground transition-colors">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[80] flex items-center justify-center p-6 backdrop-blur-2xl"
            style={{ background: "oklch(0.08 0.01 165 / 0.85)" }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong rounded-3xl p-4 max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Placeholder label={lightbox} ratio="aspect-[16/10]" />
              <button onClick={() => setLightbox(null)} className="mt-4 w-full text-[10px] tracking-[0.4em] uppercase text-muted-foreground hover:text-foreground py-2">
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}