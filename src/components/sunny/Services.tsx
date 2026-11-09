import { motion } from "framer-motion";
import { useSiteSettings } from "@/lib/siteSettings";

export function Services() {
  const { settings } = useSiteSettings();

  const servicesList = [
    {
      num: settings.service_1_num || "01",
      title: settings.service_1_title || "Brand Identity",
      desc: settings.service_1_desc || "Strategic minimalist branding systems designed to communicate clarity, trust, and distinction.",
    },
    {
      num: settings.service_2_num || "02",
      title: settings.service_2_title || "Media Production",
      desc: settings.service_2_desc || "Professional visual storytelling through photography, motion, and short-form content.",
    },
    {
      num: settings.service_3_num || "03",
      title: settings.service_3_title || "Digital Marketing",
      desc: settings.service_3_desc || "AI-enhanced marketing systems focused on audience psychology, visibility, and growth.",
    },
    {
      num: settings.service_4_num || "04",
      title: settings.service_4_title || "Printing & Logistics",
      desc: settings.service_4_desc || "From physical branding to large-format production with precision and consistency.",
    },
  ];

  return (
    <section id="services" className="relative py-28 md:py-44 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-16 gpu-accelerated"
        >
          <span className="text-[10px] tracking-[0.45em] uppercase text-[var(--sage)] font-semibold">
            {settings.services_tag || "— Services"}
          </span>
          <h2 className="mt-6 text-4xl md:text-6xl font-light leading-[1.08] text-balance text-[#F4F4F5]">
            {settings.services_headline || "Four disciplines,"}{" "}
            <em className="italic text-[var(--sage)] font-light">
              {settings.services_headline_italic || "one cinematic"}
            </em>{" "}
            standard.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {servicesList.map((s, i) => (
            <motion.div
              key={`service-card-${s.num}-${s.title}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group glass rounded-3xl p-9 md:p-11 relative overflow-hidden transition-all duration-500 hover:border-white/25 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.85)] gpu-accelerated"
              style={{
                background: "rgba(17, 17, 21, 0.88)",
                borderColor: "rgba(255, 255, 255, 0.12)",
              }}
            >
              <div
                className="absolute -top-24 -right-24 h-60 w-60 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(183, 215, 193, 0.3) 0%, transparent 65%)",
                }}
              />
              <div className="relative z-10">
                <div className="flex items-baseline justify-between mb-10">
                  <span className="text-xs tracking-[0.3em] uppercase text-[var(--sage)] font-mono font-semibold">
                    {s.num}
                  </span>
                  <span className="text-[11px] tracking-[0.3em] uppercase text-[#A1A1AA] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    — Explore
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-light text-[#F4F4F5] tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-5 text-[#A1A1AA] leading-relaxed max-w-md text-sm md:text-base">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
