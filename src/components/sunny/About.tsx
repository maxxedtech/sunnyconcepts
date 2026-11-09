import { motion } from "framer-motion";
import { useSiteSettings } from "@/lib/siteSettings";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";

export function About() {
  const { settings, loading } = useSiteSettings();
  const portraitUrl = settings.about_founder_portrait_url
    ? optimizeCloudinaryUrl(settings.about_founder_portrait_url)
    : "";

  return (
    <section id="about" className="relative py-28 md:py-44 px-6 bg-[#070709]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* CEO Visual Frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="gpu-accelerated"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/12 bg-[#111115] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]">
            {portraitUrl ? (
              <>
                <img
                  src={portraitUrl}
                  alt={`${settings.about_founder_name || "Sunday Ibrahim"}, ${
                    settings.about_founder_title || "Founder & Creative Director"
                  } of Sunny Concepts`}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070709]/80 via-transparent to-transparent pointer-events-none" />
              </>
            ) : (
              /* Styled obsidian dynamic skeleton loader */
              <div className="h-full w-full flex flex-col items-center justify-center p-8 bg-[#111115] animate-pulse relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(183, 215, 193, 0.25) 0%, transparent 70%)",
                  }}
                />
                <div className="h-20 w-20 rounded-full border border-white/15 bg-white/5 flex items-center justify-center mb-6">
                  <span className="text-xl font-light text-[var(--sage)]">SI</span>
                </div>
                <div className="h-4 w-36 bg-white/10 rounded-full mb-3" />
                <div className="h-3 w-48 bg-white/5 rounded-full" />
                <span className="mt-8 text-[10px] tracking-[0.35em] uppercase text-[#A1A1AA]/60">
                  Founder Portrait
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Narrative & Bio */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="gpu-accelerated"
        >
          <span className="text-[10px] tracking-[0.45em] uppercase text-[var(--sage)] font-semibold">
            {settings.about_tag || "— About"}
          </span>
          <h2 className="mt-6 text-4xl md:text-6xl font-light leading-[1.08] text-balance text-[#F4F4F5]">
            {settings.about_headline || "Leading the world through"}{" "}
            <em className="italic text-[var(--sage)] font-light">
              {settings.about_headline_italic || "premium"}
            </em>{" "}
            digital services.
          </h2>

          <p className="mt-8 text-base md:text-lg text-[#A1A1AA] leading-relaxed max-w-xl">
            {settings.about_bio_p1}
          </p>
          <p className="mt-5 text-base text-[#A1A1AA]/90 leading-relaxed max-w-xl">
            {settings.about_bio_p2}
          </p>

          {settings.about_mission && (
            <div className="mt-6 p-5 rounded-2xl border border-white/10 bg-[#111115]/60">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--sage)] font-mono">
                Mission
              </span>
              <p className="mt-1.5 text-sm text-[#F4F4F5]/90 italic leading-relaxed">
                "{settings.about_mission}"
              </p>
            </div>
          )}

          <div className="mt-10 pt-6 border-t border-white/12">
            <p className="text-sm tracking-[0.2em] uppercase font-medium text-[#F4F4F5]">
              {settings.about_founder_name || "Sunday Ibrahim"}
            </p>
            <p className="mt-1 text-xs tracking-[0.25em] uppercase text-[#A1A1AA]">
              {settings.about_founder_title || "Founder & Creative Director"}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
