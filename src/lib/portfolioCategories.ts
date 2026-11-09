import { useEffect, useState, useCallback } from "react";
import { supabase } from "./supabase";

export interface PortfolioCategory {
  id: string;
  name: string;
  slug: string;
  display_order: number;
  created_at?: string;
}

export const DEFAULT_PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  { id: "cat-1", name: "Brand Identity", slug: "brand-identity", display_order: 1 },
  { id: "cat-2", name: "Media Production", slug: "media-production", display_order: 2 },
  { id: "cat-3", name: "Digital Marketing", slug: "digital-marketing", display_order: 3 },
  { id: "cat-4", name: "Printing & Logistics", slug: "printing-logistics", display_order: 4 },
  { id: "cat-5", name: "Art Cover", slug: "art-cover", display_order: 5 },
  { id: "cat-6", name: "Birthday Flyers", slug: "birthday-flyers", display_order: 6 },
  { id: "cat-7", name: "Church Flyers", slug: "church-flyers", display_order: 7 },
  { id: "cat-8", name: "Logos & Branding", slug: "logos-brand-identity", display_order: 8 },
];

const STORAGE_KEY = "sunny_portfolio_categories_v2";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getCachedCategories(): PortfolioCategory[] {
  if (typeof window === "undefined") return DEFAULT_PORTFOLIO_CATEGORIES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PORTFOLIO_CATEGORIES;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.sort((a, b) => a.display_order - b.display_order);
    }
  } catch (e) {
    console.warn("Error reading categories cache:", e);
  }
  return DEFAULT_PORTFOLIO_CATEGORIES;
}

export function setCachedCategories(categories: PortfolioCategory[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  } catch (e) {
    console.warn("Error saving categories cache:", e);
  }
}

/**
 * Fetch categories from Supabase `portfolio_categories` table,
 * falling back to `site_settings` table under key 'portfolio_categories' if table doesn't exist,
 * and falling back to cached defaults.
 */
export async function fetchCategories(): Promise<PortfolioCategory[]> {
  const cached = getCachedCategories();
  if (!supabase) return cached;

  try {
    // 1. First try Supabase portfolio_categories table
    const { data, error } = await supabase
      .from("portfolio_categories")
      .select("*")
      .order("display_order", { ascending: true });

    if (!error && data && Array.isArray(data) && data.length > 0) {
      const sorted = (data as PortfolioCategory[]).sort((a, b) => a.display_order - b.display_order);
      setCachedCategories(sorted);
      return sorted;
    }

    // 2. Fallback to site_settings key-value store if table doesn't exist yet
    const { data: settingData, error: settingError } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "portfolio_categories")
      .maybeSingle();

    if (!settingError && settingData?.value) {
      const parsed = JSON.parse(settingData.value);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const sorted = (parsed as PortfolioCategory[]).sort(
          (a, b) => a.display_order - b.display_order
        );
        setCachedCategories(sorted);
        return sorted;
      }
    }

    // 3. If remote is empty, seed defaults to site_settings
    await supabase.from("site_settings").upsert({
      key: "portfolio_categories",
      value: JSON.stringify(DEFAULT_PORTFOLIO_CATEGORIES),
      updated_at: new Date().toISOString(),
    });

    setCachedCategories(DEFAULT_PORTFOLIO_CATEGORIES);
    return DEFAULT_PORTFOLIO_CATEGORIES;
  } catch (err) {
    console.warn("fetchCategories error:", err);
    return cached;
  }
}

/**
 * Persist categories to Supabase and cache
 */
async function persistCategories(categories: PortfolioCategory[]): Promise<boolean> {
  const sorted = [...categories].sort((a, b) => a.display_order - b.display_order);
  setCachedCategories(sorted);

  if (!supabase) return true;

  try {
    // Attempt to upsert into portfolio_categories table
    const { error: tableError } = await supabase.from("portfolio_categories").upsert(
      sorted.map((c, i) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        display_order: i + 1,
      })),
      { onConflict: "id" }
    );

    // Also persist to site_settings table as redundancy
    await supabase.from("site_settings").upsert({
      key: "portfolio_categories",
      value: JSON.stringify(sorted),
      updated_at: new Date().toISOString(),
    });

    if (tableError) {
      // Not a fatal error if fallback succeeded
      console.warn("Table upsert note (using site_settings backup):", tableError.message);
    }
    return true;
  } catch (e) {
    console.error("persistCategories error:", e);
    return false;
  }
}

/**
 * Add a new category
 */
export async function addCategory(name: string): Promise<{ success: boolean; category?: PortfolioCategory; error?: string }> {
  const trimmed = name.trim();
  if (!trimmed) return { success: false, error: "Category name cannot be empty." };

  const current = await fetchCategories();
  const slug = slugify(trimmed);

  if (current.some((c) => c.slug === slug || c.name.toLowerCase() === trimmed.toLowerCase())) {
    return { success: false, error: `Category "${trimmed}" already exists.` };
  }

  const newCat: PortfolioCategory = {
    id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `cat-${Date.now()}`,
    name: trimmed,
    slug,
    display_order: current.length + 1,
    created_at: new Date().toISOString(),
  };

  const updated = [...current, newCat];
  const ok = await persistCategories(updated);
  return ok ? { success: true, category: newCat } : { success: false, error: "Failed to persist category." };
}

/**
 * Rename an existing category and automatically update all portfolio items linked to it
 */
export async function renameCategory(
  id: string,
  newName: string
): Promise<{ success: boolean; error?: string }> {
  const trimmed = newName.trim();
  if (!trimmed) return { success: false, error: "New category name cannot be empty." };

  const current = await fetchCategories();
  const target = current.find((c) => c.id === id);
  if (!target) return { success: false, error: "Category not found." };

  const oldName = target.name;
  const oldSlug = target.slug;
  const newSlug = slugify(trimmed);

  // 1. Update category record
  const updated = current.map((c) => {
    if (c.id === id) {
      return { ...c, name: trimmed, slug: newSlug };
    }
    return c;
  });

  await persistCategories(updated);

  // 2. Automatically update all portfolio_items linked to the old name or old slug
  if (supabase) {
    try {
      await supabase
        .from("portfolio_items")
        .update({ category: trimmed })
        .eq("category", oldName);

      await supabase
        .from("portfolio_items")
        .update({ category: trimmed })
        .eq("category", oldSlug);
    } catch (e) {
      console.warn("Relinking portfolio_items error:", e);
    }
  }

  return { success: true };
}

/**
 * Re-order categories by moving an index or applying new list
 */
export async function reorderCategories(
  orderedCategories: PortfolioCategory[]
): Promise<boolean> {
  const withOrder = orderedCategories.map((c, index) => ({
    ...c,
    display_order: index + 1,
  }));
  return persistCategories(withOrder);
}

/**
 * Delete a category and optionally reassign or delete its associated portfolio items
 */
export async function deleteCategory({
  id,
  reassignToName,
  deleteAssociatedItems = false,
}: {
  id: string;
  reassignToName?: string;
  deleteAssociatedItems?: boolean;
}): Promise<{ success: boolean; error?: string }> {
  const current = await fetchCategories();
  const target = current.find((c) => c.id === id);
  if (!target) return { success: false, error: "Category not found." };

  if (supabase) {
    try {
      if (reassignToName) {
        // Reassign items to the designated category
        await supabase
          .from("portfolio_items")
          .update({ category: reassignToName })
          .or(`category.eq.${target.name},category.eq.${target.slug}`);
      } else if (deleteAssociatedItems) {
        // Delete items under this category
        await supabase
          .from("portfolio_items")
          .delete()
          .or(`category.eq.${target.name},category.eq.${target.slug}`);
      }

      // Try delete from table if exists
      await supabase.from("portfolio_categories").delete().eq("id", id);
    } catch (e) {
      console.warn("Supabase item cleanup warning:", e);
    }
  }

  const updated = current.filter((c) => c.id !== id);
  await persistCategories(updated);
  return { success: true };
}

/**
 * Count portfolio items associated with a given category
 */
export async function countItemsForCategory(categoryName: string, categorySlug: string): Promise<number> {
  if (!supabase) return 0;
  try {
    const { count, error } = await supabase
      .from("portfolio_items")
      .select("*", { count: "exact", head: true })
      .or(`category.eq.${categoryName},category.eq.${categorySlug}`);

    if (error) return 0;
    return count || 0;
  } catch {
    return 0;
  }
}

/**
 * React hook to access and manage categories
 */
export function usePortfolioCategories() {
  const [categories, setCategories] = useState<PortfolioCategory[]>(getCachedCategories);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const data = await fetchCategories();
    setCategories(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    let mounted = true;
    fetchCategories().then((data) => {
      if (mounted) {
        setCategories(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return { categories, loading, refresh, setCategories };
}
