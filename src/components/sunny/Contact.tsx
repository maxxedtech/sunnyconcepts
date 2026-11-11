import { motion } from "framer-motion";
import { useSiteSettings } from "@/lib/siteSettings";

export function Contact() {
  const { settings } = useSiteSettings();

  const phoneLink = `tel:${(settings.contact_phone || "+2348024493791").replace(/\s+/g, "")}`;
  const mailLink = `mailto:${settings.contact_email || "sunnyconceptsinfo@gmail.com"}`;
  const whatsappUrl = `https://wa.me/${(settings.contact_phone || "2348024493791").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    settings.contact_whatsapp_text || "Hi Sunny Concepts, I'd love to discuss a project.",
  )}`;

  const socials = [
    { label: "Instagram", href: settings.social_instagram },
    { label: "LinkedIn", href: settings.social_linkedin },
    { label: "X (Twitter)", href: settings.social_x },
    { label: "Facebook", href: settings.social_facebook },
    { label: "TikTok", href: settings.social_tiktok },
  ].filter((s) => Boolean(s.href));

  return (
    <section id="contact" className="relative py-28 md:py-44 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="glass rounded-[2.5rem] p-10 md:p-20 text-center relative overflow-hidden gpu-accelerated"
          style={{
            background: "color-mix(in srgb, var(--card) 92%, transparent)",
            borderColor: "var(--border)",
          }}
        >
          <div
            className="absolute -top-36 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full blur-3xl opacity-25 pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(217, 217, 217, 0.4) 0%, transparent 65%)",
            }}
          />

          <div className="relative z-10">
            <span className="text-[10px] tracking-[0.45em] uppercase text-[var(--sage)] font-semibold">
              {settings.contact_tag || "— Let's create"}
            </span>

            <h2 className="mt-6 text-5xl md:text-7xl font-light leading-[1.05] text-balance text-[#D9D9D9]">
              {settings.contact_headline || "Begin your"}{" "}
              <em className="italic text-[var(--sage)] font-light">
                {settings.contact_headline_italic || "next chapter."}
              </em>
            </h2>

            <p className="mt-8 text-base text-[#AFAFAE] max-w-lg mx-auto leading-relaxed">
              {settings.contact_subtext}
            </p>

            {/* Interactive Action Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full px-9 py-4 text-xs tracking-[0.28em] uppercase text-[#0F0F0F] font-medium transition-all hover:brightness-110 hover:shadow-[0_0_25px_rgba(183,215,193,0.45)] active:scale-[0.98]"
                style={{ background: "var(--sage)" }}
              >
                Message on WhatsApp
              </a>

              <a
                href={mailLink}
                className="glass glass-interactive rounded-full px-9 py-4 text-xs tracking-[0.28em] uppercase text-[#D9D9D9] hover:border-white/30 transition-all active:scale-[0.98]"
              >
                {settings.contact_email || "sunnyconceptsinfo@gmail.com"}
              </a>

              <a
                href={phoneLink}
                className="glass glass-interactive rounded-full px-8 py-4 text-xs tracking-[0.25em] uppercase text-[#AFAFAE] hover:text-[#D9D9D9] hover:border-white/30 transition-all active:scale-[0.98]"
              >
                Call: {settings.contact_phone || "+234 802 449 3791"}
              </a>
            </div>

            {/* Social Links */}
            <div className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3">
              {socials.map((s) => (
                <a
                  key={`contact-social-${s.label}`}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] tracking-[0.35em] uppercase text-[#AFAFAE] hover:text-[var(--sage)] transition-colors font-medium"
                >
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
