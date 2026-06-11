import { motion } from "framer-motion";

const services = [
  { n: "01", title: "Brand Identity", body: "Strategic minimalist branding systems designed to communicate clarity, trust, and distinction." },
  { n: "02", title: "Media Production", body: "Professional visual storytelling through photography, motion, and short-form content." },
  { n: "03", title: "Digital Marketing", body: "AI-enhanced marketing systems focused on audience psychology, visibility, and growth." },
  { n: "04", title: "Printing & Logistics", body: "From physical branding to large-format production with precision and consistency." },
];

export function Services() {
  return (
    <section id="services" className="relative py-32 md:py-48 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-3xl mb-20"
        >
          <span className="text-[10px] tracking-[0.5em] uppercase text-[var(--sage)]">— Services</span>
          <h2 className="mt-6 text-4xl md:text-6xl font-light leading-[1.05] text-balance">
            Four disciplines, <em className="italic text-[var(--sage)]">one cinematic</em> standard.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group glass rounded-3xl p-10 md:p-12 relative overflow-hidden hover:-translate-y-1 transition-transform duration-700"
            >
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: "radial-gradient(circle, var(--sage), transparent 60%)" }} />
              <div className="relative">
                <div className="flex items-baseline justify-between mb-12">
                  <span className="text-xs tracking-[0.3em] uppercase text-[var(--sage)]">{s.n}</span>
                  <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">— Explore</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-light">{s.title}</h3>
                <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">{s.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}