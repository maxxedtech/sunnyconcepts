import { motion, AnimatePresence } from "framer-motion";
import { memo, useState, useEffect, useMemo, useCallback } from "react";
import { supabase, type PortfolioItem } from "@/lib/supabase";
import { usePortfolioCategories } from "@/lib/portfolioCategories";
import { useSiteSettings } from "@/lib/siteSettings";
import { responsiveCloudinarySrcSet, responsiveCloudinaryUrl } from "@/lib/cloudinary";

interface DisplayItem {
  id: string;
  src: string;
  srcSet?: string;
  title: string;
  category: string;
  description?: string | null;
}

const PortfolioMotionButton = memo(motion.button);

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightbox, setLightbox] = useState<DisplayItem | null>(null);
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { categories, loading: categoriesLoading } = usePortfolioCategories();
  const { settings } = useSiteSettings();

  useEffect(() => {
    let mounted = true;
    const fetchPortfolio = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from("portfolio_items")
          .select("id,title,category,image_url,description,created_at")
          .order("created_at", { ascending: false });

        if (!error && data && mounted) {
          setItems(data as PortfolioItem[]);
        }
      } catch (err) {
        console.warn("Portfolio fetch error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    void fetchPortfolio();
    return () => {
      mounted = false;
    };
  }, []);

  // Filter tabs: "All Works" + dynamically fetched categories
  const categoryTabs = useMemo(() => {
    const list = [{ slug: "all", label: "All Works" }];
    categories.forEach((cat) => {
      list.push({ slug: cat.slug, label: cat.name });
    });
    return list;
  }, [categories]);

  // Dynamic portfolio items
  const displayItems = useMemo<DisplayItem[]>(() => {
    return items.map((item) => ({
      id: item.id,
      src: responsiveCloudinaryUrl(item.image_url, 1200),
      srcSet: responsiveCloudinarySrcSet(item.image_url),
      title: item.title,
      category: item.category,
      description: item.description,
    }));
  }, [items]);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return displayItems;
    const activeLower = activeCategory.toLowerCase();
    const matchingCat = categories.find(
      (c) => c.slug.toLowerCase() === activeLower || c.name.toLowerCase() === activeLower,
    );
    const targetName = matchingCat ? matchingCat.name.toLowerCase() : activeLower;

    return displayItems.filter((item) => {
      const itemCatLower = (item.category || "").toLowerCase();
      return (
        itemCatLower === activeLower ||
        itemCatLower === targetName ||
        (matchingCat && itemCatLower === matchingCat.slug.toLowerCase())
      );
    });
  }, [displayItems, activeCategory, categories]);

  // Clients list from site settings
  const clientsList = useMemo(() => {
    const raw = settings.client_marquee_list || "";
    return raw
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);
  }, [settings.client_marquee_list]);

  const openLightbox = useCallback((item: DisplayItem) => setLightbox(item), []);

  return (
    <section id="portfolio" className="relative py-28 md:py-44 px-6 bg-[#0F0F0F]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-14 gpu-accelerated"
        >
          <span className="text-[10px] tracking-[0.45em] uppercase text-[var(--sage)] font-semibold">
            — Selected Work
          </span>
          <h2 className="mt-6 text-4xl md:text-6xl font-light leading-[1.08] text-balance text-[#D9D9D9]">
            A <em className="italic text-[var(--sage)] font-light">curated</em> archive of recent
            productions.
          </h2>
        </motion.div>

        {/* Dynamic Category Pills */}
        <div className="flex flex-wrap gap-2.5 mb-12">
          {categoryTabs.map((c) => {
            const isActive = activeCategory === c.slug;
            return (
              <button
                key={`cat-pill-${c.slug}`}
                onClick={() => setActiveCategory(c.slug)}
                className={`text-[10px] tracking-[0.28em] uppercase px-5 py-2.5 rounded-full transition-all duration-300 font-medium ${
                  isActive
                    ? "bg-[var(--sage)] text-[#0F0F0F] shadow-[0_0_20px_rgba(183,215,193,0.35)]"
                    : "glass text-[#AFAFAE] hover:text-[#D9D9D9] hover:border-white/20"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Portfolio Grid & Dynamic Obsidian Skeletons */}
        <AnimatePresence mode="sync" initial={false}>
          {loading ? (
            <div
              key="loading-skeletons"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={`obsidian-skeleton-${i}`}
                  className="aspect-[4/5] rounded-2xl bg-[#3F3F3D] border border-[#6B6A69]/20 p-4 flex flex-col justify-end overflow-hidden relative shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="relative z-10 space-y-2">
                    <div className="h-3 w-16 bg-white/10 rounded-full" />
                    <div className="h-4 w-32 bg-white/15 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredItems.length > 0 ? (
            <motion.div
              key={`grid-${activeCategory}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
            >
              {filteredItems.map((item, i) => {
                const isHeroSpan = i === 0 && filteredItems.length > 2;
                return (
                  <PortfolioMotionButton
                    key={`portfolio-item-${item.id}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.05, 0.3), duration: 0.6 }}
                    onClick={() => openLightbox(item)}
                    className={`group relative overflow-hidden rounded-2xl text-left border border-[#6B6A69]/20 hover:border-white/25 transition-[border-color,box-shadow] duration-500 bg-[#3F3F3D] ${
                      isHeroSpan ? "md:col-span-2 md:row-span-2" : ""
                    }`}
                  >
                    <div
                      className={`${
                        isHeroSpan ? "aspect-square" : "aspect-[4/5]"
                      } overflow-hidden rounded-2xl bg-[#0F0F0F]`}
                    >
                      <img
                        src={item.src}
                        srcSet={item.srcSet}
                        sizes="(max-width: 767px) 50vw, (max-width: 1279px) 33vw, 400px"
                        alt={item.title}
                        className="h-full w-full object-cover transform-gpu transition-transform duration-700 group-hover:scale-[1.04]"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/95 via-[#0F0F0F]/30 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-95 pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                      <div>
                        <span className="text-[10px] tracking-[0.25em] uppercase glass rounded-full px-3 py-1 font-medium text-[#D9D9D9]">
                          {item.category}
                        </span>
                        <h4 className="mt-2 text-sm md:text-base font-normal text-[#D9D9D9] drop-shadow-md">
                          {item.title}
                        </h4>
                      </div>
                      <span className="text-[10px] tracking-[0.3em] uppercase text-[#AFAFAE] font-mono">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </PortfolioMotionButton>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-3xl border border-[#6B6A69]/20 bg-[#3F3F3D] p-16 text-center shadow-xl"
            >
              <div className="h-10 w-10 mx-auto rounded-full bg-[var(--sage)]/10 flex items-center justify-center mb-4">
                <span className="h-2 w-2 rounded-full bg-[var(--sage)]" />
              </div>
              <p className="text-base text-[#D9D9D9] font-light">
                No published assets in this discipline yet.
              </p>
              <p className="mt-2 text-xs text-[#AFAFAE]">
                Upload and categorize high-resolution media in the Admin Portal.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Visionary Clients Banner */}
        {clientsList.length > 0 && (
          <div className="mt-28 pt-14 border-t border-[#6B6A69]/20">
            <p className="text-[10px] tracking-[0.45em] uppercase text-[#AFAFAE] mb-8 text-center font-medium">
              Trusted by visionary clients
            </p>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
              {clientsList.map((c) => (
                <span
                  key={`client-brand-${c}`}
                  className="text-lg md:text-2xl font-light italic text-[#AFAFAE] hover:text-[#D9D9D9] transition-colors"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 backdrop-blur-2xl bg-[#0F0F0F]/85"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="glass-strong rounded-3xl p-5 max-w-4xl w-full border border-[#6B6A69]/25 bg-[#3F3F3D]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-h-[70vh] aspect-[16/10] overflow-hidden rounded-2xl bg-[#0F0F0F]">
                <img
                  src={lightbox.src}
                  alt={lightbox.title}
                  className="h-full w-full object-contain"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div className="mt-4 px-2 flex justify-between items-center">
                <div>
                  <h3 className="text-lg text-[#D9D9D9] font-light">{lightbox.title}</h3>
                  <p className="text-xs text-[#AFAFAE] uppercase tracking-[0.2em] mt-0.5">
                    {lightbox.category}
                  </p>
                  {lightbox.description && (
                    <p className="text-sm text-[#AFAFAE] mt-2 max-w-xl">{lightbox.description}</p>
                  )}
                </div>
                <button
                  onClick={() => setLightbox(null)}
                  className="rounded-full px-5 py-2 text-xs uppercase tracking-[0.25em] glass hover:border-white/30 text-[#D9D9D9] transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
