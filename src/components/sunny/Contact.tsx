import { motion } from "framer-motion";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/sunny__concepts" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100093187495032" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sunday-ibrahim-116452330" },
  { label: "TikTok", href: "https://tiktok.com/@sunny_concepts" },
  { label: "X", href: "https://x.com/sunnyconcepts01" },
];

export function Contact() {
  return (
    <section id="contact" className="relative py-32 md:py-48 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="glass rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full blur-3xl opacity-30" style={{ background: "radial-gradient(circle, var(--sage), transparent 60%)" }} />
          <div className="relative">
            <span className="text-[10px] tracking-[0.5em] uppercase text-[var(--sage)]">— Let's create</span>
            <h2 className="mt-6 text-5xl md:text-7xl font-light leading-[1.05] text-balance">
              Begin your <em className="italic text-[var(--sage)]">next chapter</em>.
            </h2>
            <p className="mt-8 text-muted-foreground max-w-lg mx-auto">
              Tell us about your vision. We respond within 24 hours with a tailored creative direction.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/2348024493791?text=Hi%20Sunny%20Concepts%2C%20I%27d%20love%20to%20discuss%20a%20project."
                target="_blank"
                rel="noreferrer"
                className="rounded-full px-10 py-4 text-xs tracking-[0.3em] uppercase text-[var(--primary-foreground)] hover:scale-[1.03] transition-all"
                style={{ background: "var(--sage)", boxShadow: "var(--glow-sage)" }}
              >
                Message on WhatsApp
              </a>
              <a href="mailto:sunnyconceptsinfo@gmail.com" className="glass rounded-full px-10 py-4 text-xs tracking-[0.3em] uppercase hover:bg-black/5 transition-all">
                sunnyconceptsinfo@gmail.com
              </a>
            </div>
            <div className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground hover:text-[var(--sage)] transition-colors">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}