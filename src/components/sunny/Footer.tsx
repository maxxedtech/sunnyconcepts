import { useSiteSettings } from "@/lib/siteSettings";

export function Footer() {
  const { settings } = useSiteSettings();

  const phoneLink = `tel:${(settings.contact_phone || "+2348024493791").replace(/\s+/g, "")}`;
  const mailLink = `mailto:${settings.contact_email || "sunnyconceptsinfo@gmail.com"}`;

  return (
    <footer className="relative px-6 pb-12 pt-20 border-t border-[#6B6A69]/20 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[var(--sage)] shadow-[0_0_10px_var(--sage)]" />
              <span className="text-sm tracking-[0.25em] uppercase font-light text-[#D9D9D9]">
                Sunny Concepts
              </span>
            </div>
            <p className="mt-4 text-sm text-[#AFAFAE] max-w-xs leading-relaxed">
              A premium digital agency leading the world through cinematic creative services.
            </p>
          </div>

          <div className="md:text-center">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#AFAFAE] font-medium">
              Contact & Inquiries
            </p>
            <a
              href={mailLink}
              className="block mt-3 text-sm text-[#D9D9D9] hover:text-[var(--sage)] transition-colors"
            >
              {settings.contact_email || "sunnyconceptsinfo@gmail.com"}
            </a>
            <a
              href={phoneLink}
              className="block mt-1.5 text-sm text-[#AFAFAE] hover:text-[var(--sage)] transition-colors"
            >
              {settings.contact_phone || "+234 802 449 3791"}
            </a>
          </div>

          <div className="md:text-right">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#AFAFAE] font-medium">
              Studio Base
            </p>
            <p className="mt-3 text-sm text-[#D9D9D9]">
              {settings.studio_location || "Maiduguri — Worldwide"}
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#6B6A69]/20 flex flex-col md:flex-row justify-between gap-3 text-[10px] tracking-[0.3em] uppercase text-[#AFAFAE]">
          <span>© {new Date().getFullYear()} Sunny Concepts. All rights reserved.</span>
          <span>Designed with intentional excellence</span>
        </div>
      </div>
    </footer>
  );
}
