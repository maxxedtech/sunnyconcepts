import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Placeholder } from "./Placeholder";
import artCover01 from "@/assets/photos/portfolio/art-cover/art-cover-01.jpeg";
import artCover02 from "@/assets/photos/portfolio/art-cover/art-cover-02.jpeg";
import artCover03 from "@/assets/photos/portfolio/art-cover/art-cover-03.jpeg";
import artCover04 from "@/assets/photos/portfolio/art-cover/art-cover-04.jpeg";
import artCover05 from "@/assets/photos/portfolio/art-cover/art-cover-05.jpeg";
import birthdayFlyer01 from "@/assets/photos/portfolio/birthday-flyers/birthday-flyer.jpeg";
import birthdayFlyer02 from "@/assets/photos/portfolio/birthday-flyers/birthday-flyer-02.jpeg";
import churchFlyer01 from "@/assets/photos/portfolio/church-flyers/church-flyer-01.jpeg";
import churchFlyer02 from "@/assets/photos/portfolio/church-flyers/church-flyer-02.jpeg";
import churchFlyer03 from "@/assets/photos/portfolio/church-flyers/church-flyer-03.jpeg";
import churchFlyer04 from "@/assets/photos/portfolio/church-flyers/church-flyer-04.jpeg";
import churchFlyer05 from "@/assets/photos/portfolio/church-flyers/church-flyer-05.jpeg";
import logoDesign01 from "@/assets/photos/portfolio/logos-brand-identity/logo-design-01.jpeg";
import logoDesign02 from "@/assets/photos/portfolio/logos-brand-identity/logo-design-02.jpeg";
import logoDesign03 from "@/assets/photos/portfolio/logos-brand-identity/logo-design-03.jpeg";
import logoDesign04 from "@/assets/photos/portfolio/logos-brand-identity/logo-design-04.jpeg";
import logoDesign05 from "@/assets/photos/portfolio/logos-brand-identity/logo-design-05.jpeg";
import flyer01 from "@/assets/photos/portfolio/others/flyer-01.jpeg";
import flyer02 from "@/assets/photos/portfolio/others/flyer-02.jpeg";
import flyer03 from "@/assets/photos/portfolio/others/flyer-03.jpeg";
import flyer04 from "@/assets/photos/portfolio/others/flyer-04.jpeg";
import flyer05 from "@/assets/photos/portfolio/others/flyer-05.jpeg";
import flyer06 from "@/assets/photos/portfolio/others/flyer-06.jpeg";
import flyer07 from "@/assets/photos/portfolio/others/flyer-07.jpeg";
import flyer08 from "@/assets/photos/portfolio/others/flyer-08.jpeg";

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

type PortfolioImage = {
  src: string;
  title: string;
};

const portfolioImages: Record<string, PortfolioImage[]> = {
  "art-cover": [
    { src: artCover01, title: "Art Cover 01" },
    { src: artCover02, title: "Art Cover 02" },
    { src: artCover03, title: "Art Cover 03" },
    { src: artCover04, title: "Art Cover 04" },
    { src: artCover05, title: "Art Cover 05" },
  ],
  "birthday-flyers": [
    { src: birthdayFlyer01, title: "Birthday Flyer 01" },
    { src: birthdayFlyer02, title: "Birthday Flyer 02" },
  ],
  "church-flyers": [
    { src: churchFlyer01, title: "Church Flyer 01" },
    { src: churchFlyer02, title: "Church Flyer 02" },
    { src: churchFlyer03, title: "Church Flyer 03" },
    { src: churchFlyer04, title: "Church Flyer 04" },
    { src: churchFlyer05, title: "Church Flyer 05" },
  ],
  "logos-brand-identity": [
    { src: logoDesign01, title: "Logo Design 01" },
    { src: logoDesign02, title: "Logo Design 02" },
    { src: logoDesign03, title: "Logo Design 03" },
    { src: logoDesign04, title: "Logo Design 04" },
    { src: logoDesign05, title: "Logo Design 05" },
  ],
  others: [
    { src: flyer01, title: "Flyer 01" },
    { src: flyer02, title: "Flyer 02" },
    { src: flyer03, title: "Flyer 03" },
    { src: flyer04, title: "Flyer 04" },
    { src: flyer05, title: "Flyer 05" },
    { src: flyer06, title: "Flyer 06" },
    { src: flyer07, title: "Flyer 07" },
    { src: flyer08, title: "Flyer 08" },
  ],
  "stickers-labelling": [],
  wedding: [],
};

export function Portfolio() {
  const [active, setActive] = useState(categories[0].slug);
  const [lightbox, setLightbox] = useState<PortfolioImage | null>(null);
  const current = categories.find((c) => c.slug === active)!;
  const currentImages = portfolioImages[active] ?? [];

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
          <span className="text-[10px] tracking-[0.5em] uppercase text-[var(--sage)]">- Selected Work</span>
          <h2 className="mt-6 text-4xl md:text-6xl font-light leading-[1.05] text-balance">
            An <em className="italic text-[var(--sage)]">characterized</em> archive of recent productions.
          </h2>
        </motion.div>

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
            {currentImages.length > 0 ? (
              currentImages.map((image, i) => (
                <motion.button
                  key={image.src}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.8 }}
                  onClick={() => setLightbox(image)}
                  className={`group relative overflow-hidden rounded-2xl ${
                    i === 0 ? "md:col-span-2 md:row-span-2" : ""
                  }`}
                >
                  <div className={`${i === 0 ? "aspect-square" : "aspect-[4/5]"} overflow-hidden rounded-2xl bg-black/30`}>
                    <img
                      src={image.src}
                      alt={`${current.label} - ${image.title}`}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-[10px] tracking-[0.3em] uppercase glass-strong rounded-full px-3 py-1.5">{current.label}</span>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                </motion.button>
              ))
            ) : (
              <div className="col-span-2 md:col-span-3">
                <Placeholder label={`Add ${current.label} Images`} ratio="aspect-[16/6]" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

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
              <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-black/40">
                <img src={lightbox.src} alt={lightbox.title} className="h-full w-full object-contain" />
              </div>
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
