import { useEffect, useState, useCallback } from "react";
import { supabase } from "./supabase";

export interface ServiceBlock {
  num: string;
  title: string;
  desc: string;
}

export interface SiteSettings {
  // Hero Section
  hero_headline_line1: string;
  hero_headline_italic: string;
  hero_headline_line2: string;
  hero_subtitle: string;
  hero_cta_portfolio_text: string;
  hero_cta_portfolio_href: string;
  hero_cta_contact_text: string;
  hero_cta_contact_href: string;

  // CEO / Founder Profile & About
  about_founder_portrait_url: string;
  about_founder_name: string;
  about_founder_title: string;
  about_tag: string;
  about_headline: string;
  about_headline_italic: string;
  about_bio_p1: string;
  about_bio_p2: string;
  about_mission: string;

  // Client Marquee List
  client_marquee_list: string;

  // Services Section (4 Disciplines)
  services_tag: string;
  services_headline: string;
  services_headline_italic: string;
  service_1_num: string;
  service_1_title: string;
  service_1_desc: string;
  service_2_num: string;
  service_2_title: string;
  service_2_desc: string;
  service_3_num: string;
  service_3_title: string;
  service_3_desc: string;
  service_4_num: string;
  service_4_title: string;
  service_4_desc: string;

  // Contact & Studio Info
  contact_tag: string;
  contact_headline: string;
  contact_headline_italic: string;
  contact_subtext: string;
  contact_email: string;
  contact_phone: string;
  contact_whatsapp_text: string;
  studio_location: string;

  // Social Links
  social_instagram: string;
  social_linkedin: string;
  social_x: string;
  social_facebook: string;
  social_tiktok: string;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  // Hero
  hero_headline_line1: "Leading the world",
  hero_headline_italic: "through digital",
  hero_headline_line2: "services.",
  hero_subtitle: "Premium digital solutions with global standards",
  hero_cta_portfolio_text: "View Portfolio",
  hero_cta_portfolio_href: "#portfolio",
  hero_cta_contact_text: "Start a Project",
  hero_cta_contact_href: "#contact",

  // CEO / Founder & About
  about_founder_portrait_url: "",
  about_founder_name: "Sunday Ibrahim",
  about_founder_title: "Founder & Creative Director",
  about_tag: "— About",
  about_headline: "Leading the world through",
  about_headline_italic: "premium",
  about_bio_p1:
    "From Maiduguri to the global market — we bridge the gap between digital dreams and high-fidelity reality. Sunny Concepts is a premium digital agency specializing in strategic brand identity, media production, digital marketing, and printing & logistics.",
  about_bio_p2:
    "We combine AI-native workflows, market-driven design strategy, and cinematic visual execution to create modern digital experiences that elevate brands globally.",
  about_mission:
    "To empower brands worldwide through purposeful design, cutting-edge creative technology, and unwavering execution standard.",

  // Client Marquee
  client_marquee_list:
    "Rommdar, Carlton Park, Kugye, Prince Delight, Habakkuk Godwin, Minister GSP",

  // Services
  services_tag: "— Services",
  services_headline: "Four disciplines,",
  services_headline_italic: "one cinematic",
  service_1_num: "01",
  service_1_title: "Brand Identity",
  service_1_desc:
    "Strategic minimalist branding systems designed to communicate clarity, trust, and distinction.",
  service_2_num: "02",
  service_2_title: "Media Production",
  service_2_desc:
    "Professional visual storytelling through photography, motion, and short-form content.",
  service_3_num: "03",
  service_3_title: "Digital Marketing",
  service_3_desc:
    "AI-enhanced marketing systems focused on audience psychology, visibility, and growth.",
  service_4_num: "04",
  service_4_title: "Printing & Logistics",
  service_4_desc:
    "From physical branding to large-format production with precision and consistency.",

  // Contact
  contact_tag: "— Let's create",
  contact_headline: "Begin your",
  contact_headline_italic: "next chapter.",
  contact_subtext:
    "Tell us about your vision. We respond within 24 hours with a tailored creative direction.",
  contact_email: "sunnyconceptsinfo@gmail.com",
  contact_phone: "+2348024493791",
  contact_whatsapp_text: "Hi Sunny Concepts, I'd love to discuss a project.",
  studio_location: "Maiduguri — Worldwide",

  // Socials
  social_instagram: "https://www.instagram.com/sunny__concepts",
  social_linkedin: "https://www.linkedin.com/in/sunday-ibrahim-116452330",
  social_x: "https://x.com/sunnyconcepts01",
  social_facebook: "https://www.facebook.com/profile.php?id=100093187495032",
  social_tiktok: "https://tiktok.com/@sunny_concepts",
};

const STORAGE_KEY = "sunny_site_settings_cache_v3";

export function getCachedSettings(): SiteSettings {
  if (typeof window === "undefined") return DEFAULT_SITE_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SITE_SETTINGS;
    return { ...DEFAULT_SITE_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
}

export async function fetchRemoteSettings(): Promise<SiteSettings> {
  const cached = getCachedSettings();
  if (!supabase) return cached;

  try {
    const { data, error } = await supabase.from("site_settings").select("key, value");
    if (error || !data || !Array.isArray(data)) {
      return cached;
    }

    const remoteMap: Record<string, string> = {};
    for (const item of data) {
      if (item.key && typeof item.value === "string") {
        remoteMap[item.key] = item.value;
      }
    }

    const merged = { ...cached, ...remoteMap };
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      } catch {
        // Ignore quota errors
      }
    }
    return merged;
  } catch (err) {
    console.warn("Error fetching site_settings from Supabase:", err);
    return cached;
  }
}

export async function persistSiteSettings(
  updated: Partial<SiteSettings>
): Promise<{ success: boolean; error?: string }> {
  const current = getCachedSettings();
  const merged: SiteSettings = { ...current, ...updated };

  // Immediately persist locally
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    } catch (e) {
      console.warn("LocalStorage persist error:", e);
    }
  }

  if (!supabase) {
    return { success: true };
  }

  try {
    const upsertRows = Object.entries(updated).map(([key, value]) => ({
      key,
      value: String(value ?? ""),
      updated_at: new Date().toISOString(),
    }));

    const { error } = await supabase.from("site_settings").upsert(upsertRows, { onConflict: "key" });

    if (error) {
      console.error("Supabase site_settings upsert error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Failed to persist site settings:", err);
    return { success: false, error: err?.message ?? "Network error saving settings." };
  }
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(getCachedSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchRemoteSettings().then((remote) => {
      if (mounted) {
        setSettings(remote);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const updateSetting = useCallback((key: keyof SiteSettings, value: string) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: value };
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // Ignore
        }
      }
      return next;
    });
  }, []);

  return { settings, setSettings, updateSetting, loading };
}
