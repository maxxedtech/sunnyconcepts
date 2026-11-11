import { o as __toESM } from "../_runtime.mjs";
import { c as require_react } from "../_libs/@react-three/drei+[...].mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
// node_modules/.nitro/vite/services/ssr/assets/cloudinary-DKfsfRuI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var supabase = createClient("https://wwyqjdklftoxsgbultka.supabase.co", "sb_publishable_6zAX638L9JwmiL6-TQwOVA_gFovom2k", { auth: {
	persistSession: false,
	autoRefreshToken: false
} });
var DEFAULT_SITE_SETTINGS = {
	hero_headline_line1: "Leading the world",
	hero_headline_italic: "through digital",
	hero_headline_line2: "services.",
	hero_subtitle: "Premium digital solutions with global standards",
	hero_cta_portfolio_text: "View Portfolio",
	hero_cta_portfolio_href: "#portfolio",
	hero_cta_contact_text: "Start a Project",
	hero_cta_contact_href: "#contact",
	about_founder_portrait_url: "",
	about_founder_name: "Sunday Ibrahim",
	about_founder_title: "Founder & Creative Director",
	about_tag: "— About",
	about_headline: "Leading the world through",
	about_headline_italic: "premium",
	about_bio_p1: "From Maiduguri to the global market — we bridge the gap between digital dreams and high-fidelity reality. Sunny Concepts is a premium digital agency specializing in strategic brand identity, media production, digital marketing, and printing & logistics.",
	about_bio_p2: "We combine AI-native workflows, market-driven design strategy, and cinematic visual execution to create modern digital experiences that elevate brands globally.",
	about_mission: "To empower brands worldwide through purposeful design, cutting-edge creative technology, and unwavering execution standard.",
	client_marquee_list: "Rommdar, Carlton Park, Kugye, Prince Delight, Habakkuk Godwin, Minister GSP",
	services_tag: "— Services",
	services_headline: "Four disciplines,",
	services_headline_italic: "one cinematic",
	service_1_num: "01",
	service_1_title: "Brand Identity",
	service_1_desc: "Strategic minimalist branding systems designed to communicate clarity, trust, and distinction.",
	service_2_num: "02",
	service_2_title: "Media Production",
	service_2_desc: "Professional visual storytelling through photography, motion, and short-form content.",
	service_3_num: "03",
	service_3_title: "Digital Marketing",
	service_3_desc: "AI-enhanced marketing systems focused on audience psychology, visibility, and growth.",
	service_4_num: "04",
	service_4_title: "Printing & Logistics",
	service_4_desc: "From physical branding to large-format production with precision and consistency.",
	contact_tag: "— Let's create",
	contact_headline: "Begin your",
	contact_headline_italic: "next chapter.",
	contact_subtext: "Tell us about your vision. We respond within 24 hours with a tailored creative direction.",
	contact_email: "sunnyconceptsinfo@gmail.com",
	contact_phone: "+2348024493791",
	contact_whatsapp_text: "Hi Sunny Concepts, I'd love to discuss a project.",
	studio_location: "Maiduguri — Worldwide",
	social_instagram: "https://www.instagram.com/sunny__concepts",
	social_linkedin: "https://www.linkedin.com/in/sunday-ibrahim-116452330",
	social_x: "https://x.com/sunnyconcepts01",
	social_facebook: "https://www.facebook.com/profile.php?id=100093187495032",
	social_tiktok: "https://tiktok.com/@sunny_concepts"
};
var STORAGE_KEY$1 = "sunny_site_settings_cache_v3";
function getCachedSettings() {
	if (typeof window === "undefined") return DEFAULT_SITE_SETTINGS;
	try {
		const raw = localStorage.getItem(STORAGE_KEY$1);
		if (!raw) return DEFAULT_SITE_SETTINGS;
		return {
			...DEFAULT_SITE_SETTINGS,
			...JSON.parse(raw)
		};
	} catch {
		return DEFAULT_SITE_SETTINGS;
	}
}
async function fetchRemoteSettings() {
	const cached = getCachedSettings();
	if (!supabase) return cached;
	try {
		const { data, error } = await supabase.from("site_settings").select("key, value");
		if (error || !data || !Array.isArray(data)) return cached;
		const remoteMap = {};
		for (const item of data) if (item.key && typeof item.value === "string") remoteMap[item.key] = item.value;
		const merged = {
			...cached,
			...remoteMap
		};
		if (typeof window !== "undefined") try {
			localStorage.setItem(STORAGE_KEY$1, JSON.stringify(merged));
		} catch {}
		return merged;
	} catch (err) {
		console.warn("Error fetching site_settings from Supabase:", err);
		return cached;
	}
}
async function persistSiteSettings(updated) {
	const merged = {
		...getCachedSettings(),
		...updated
	};
	if (typeof window !== "undefined") try {
		localStorage.setItem(STORAGE_KEY$1, JSON.stringify(merged));
	} catch (e) {
		console.warn("LocalStorage persist error:", e);
	}
	if (!supabase) return { success: true };
	try {
		const upsertRows = Object.entries(updated).map(([key, value]) => ({
			key,
			value: String(value ?? ""),
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		}));
		const { error } = await supabase.from("site_settings").upsert(upsertRows, { onConflict: "key" });
		if (error) {
			console.error("Supabase site_settings upsert error:", error);
			return {
				success: false,
				error: error.message
			};
		}
		return { success: true };
	} catch (err) {
		console.error("Failed to persist site settings:", err);
		return {
			success: false,
			error: err?.message ?? "Network error saving settings."
		};
	}
}
function useSiteSettings() {
	const [settings, setSettings] = (0, import_react.useState)(getCachedSettings);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
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
	return {
		settings,
		setSettings,
		updateSetting: (0, import_react.useCallback)((key, value) => {
			setSettings((prev) => {
				const next = {
					...prev,
					[key]: value
				};
				if (typeof window !== "undefined") try {
					localStorage.setItem(STORAGE_KEY$1, JSON.stringify(next));
				} catch {}
				return next;
			});
		}, []),
		loading
	};
}
var DEFAULT_PORTFOLIO_CATEGORIES = [
	{
		id: "cat-1",
		name: "Brand Identity",
		slug: "brand-identity",
		display_order: 1
	},
	{
		id: "cat-2",
		name: "Media Production",
		slug: "media-production",
		display_order: 2
	},
	{
		id: "cat-3",
		name: "Digital Marketing",
		slug: "digital-marketing",
		display_order: 3
	},
	{
		id: "cat-4",
		name: "Printing & Logistics",
		slug: "printing-logistics",
		display_order: 4
	},
	{
		id: "cat-5",
		name: "Art Cover",
		slug: "art-cover",
		display_order: 5
	},
	{
		id: "cat-6",
		name: "Birthday Flyers",
		slug: "birthday-flyers",
		display_order: 6
	},
	{
		id: "cat-7",
		name: "Church Flyers",
		slug: "church-flyers",
		display_order: 7
	},
	{
		id: "cat-8",
		name: "Logos & Branding",
		slug: "logos-brand-identity",
		display_order: 8
	}
];
var STORAGE_KEY = "sunny_portfolio_categories_v2";
function slugify(text) {
	return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
function getCachedCategories() {
	if (typeof window === "undefined") return DEFAULT_PORTFOLIO_CATEGORIES;
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return DEFAULT_PORTFOLIO_CATEGORIES;
		const parsed = JSON.parse(raw);
		if (Array.isArray(parsed) && parsed.length > 0) return parsed.sort((a, b) => a.display_order - b.display_order);
	} catch (e) {
		console.warn("Error reading categories cache:", e);
	}
	return DEFAULT_PORTFOLIO_CATEGORIES;
}
function setCachedCategories(categories) {
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
async function fetchCategories() {
	const cached = getCachedCategories();
	if (!supabase) return cached;
	try {
		const { data, error } = await supabase.from("portfolio_categories").select("*").order("display_order", { ascending: true });
		if (!error && data && Array.isArray(data) && data.length > 0) {
			const sorted = data.sort((a, b) => a.display_order - b.display_order);
			setCachedCategories(sorted);
			return sorted;
		}
		const { data: settingData, error: settingError } = await supabase.from("site_settings").select("value").eq("key", "portfolio_categories").maybeSingle();
		if (!settingError && settingData?.value) {
			const parsed = JSON.parse(settingData.value);
			if (Array.isArray(parsed) && parsed.length > 0) {
				const sorted = parsed.sort((a, b) => a.display_order - b.display_order);
				setCachedCategories(sorted);
				return sorted;
			}
		}
		await supabase.from("site_settings").upsert({
			key: "portfolio_categories",
			value: JSON.stringify(DEFAULT_PORTFOLIO_CATEGORIES),
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
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
async function persistCategories(categories) {
	const sorted = [...categories].sort((a, b) => a.display_order - b.display_order);
	setCachedCategories(sorted);
	if (!supabase) return true;
	try {
		const { error: tableError } = await supabase.from("portfolio_categories").upsert(sorted.map((c, i) => ({
			id: c.id,
			name: c.name,
			slug: c.slug,
			display_order: i + 1
		})), { onConflict: "id" });
		await supabase.from("site_settings").upsert({
			key: "portfolio_categories",
			value: JSON.stringify(sorted),
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		});
		if (tableError) console.warn("Table upsert note (using site_settings backup):", tableError.message);
		return true;
	} catch (e) {
		console.error("persistCategories error:", e);
		return false;
	}
}
/**
* Add a new category
*/
async function addCategory(name) {
	const trimmed = name.trim();
	if (!trimmed) return {
		success: false,
		error: "Category name cannot be empty."
	};
	const current = await fetchCategories();
	const slug = slugify(trimmed);
	if (current.some((c) => c.slug === slug || c.name.toLowerCase() === trimmed.toLowerCase())) return {
		success: false,
		error: `Category "${trimmed}" already exists.`
	};
	const newCat = {
		id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `cat-${Date.now()}`,
		name: trimmed,
		slug,
		display_order: current.length + 1,
		created_at: (/* @__PURE__ */ new Date()).toISOString()
	};
	return await persistCategories([...current, newCat]) ? {
		success: true,
		category: newCat
	} : {
		success: false,
		error: "Failed to persist category."
	};
}
/**
* Rename an existing category and automatically update all portfolio items linked to it
*/
async function renameCategory(id, newName) {
	const trimmed = newName.trim();
	if (!trimmed) return {
		success: false,
		error: "New category name cannot be empty."
	};
	const current = await fetchCategories();
	const target = current.find((c) => c.id === id);
	if (!target) return {
		success: false,
		error: "Category not found."
	};
	const oldName = target.name;
	const oldSlug = target.slug;
	const newSlug = slugify(trimmed);
	await persistCategories(current.map((c) => {
		if (c.id === id) return {
			...c,
			name: trimmed,
			slug: newSlug
		};
		return c;
	}));
	if (supabase) try {
		await supabase.from("portfolio_items").update({ category: trimmed }).eq("category", oldName);
		await supabase.from("portfolio_items").update({ category: trimmed }).eq("category", oldSlug);
	} catch (e) {
		console.warn("Relinking portfolio_items error:", e);
	}
	return { success: true };
}
/**
* Re-order categories by moving an index or applying new list
*/
async function reorderCategories(orderedCategories) {
	return persistCategories(orderedCategories.map((c, index) => ({
		...c,
		display_order: index + 1
	})));
}
/**
* Delete a category and optionally reassign or delete its associated portfolio items
*/
async function deleteCategory({ id, reassignToName, deleteAssociatedItems = false }) {
	const current = await fetchCategories();
	const target = current.find((c) => c.id === id);
	if (!target) return {
		success: false,
		error: "Category not found."
	};
	if (supabase) try {
		if (reassignToName) await supabase.from("portfolio_items").update({ category: reassignToName }).or(`category.eq.${target.name},category.eq.${target.slug}`);
		else if (deleteAssociatedItems) await supabase.from("portfolio_items").delete().or(`category.eq.${target.name},category.eq.${target.slug}`);
		await supabase.from("portfolio_categories").delete().eq("id", id);
	} catch (e) {
		console.warn("Supabase item cleanup warning:", e);
	}
	await persistCategories(current.filter((c) => c.id !== id));
	return { success: true };
}
/**
* Count portfolio items associated with a given category
*/
async function countItemsForCategory(categoryName, categorySlug) {
	if (!supabase) return 0;
	try {
		const { count, error } = await supabase.from("portfolio_items").select("*", {
			count: "exact",
			head: true
		}).or(`category.eq.${categoryName},category.eq.${categorySlug}`);
		if (error) return 0;
		return count || 0;
	} catch {
		return 0;
	}
}
/**
* React hook to access and manage categories
*/
function usePortfolioCategories() {
	const [categories, setCategories] = (0, import_react.useState)(getCachedCategories);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const refresh = (0, import_react.useCallback)(async () => {
		setLoading(true);
		const data = await fetchCategories();
		setCategories(data);
		setLoading(false);
	}, []);
	(0, import_react.useEffect)(() => {
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
	return {
		categories,
		loading,
		refresh,
		setCategories
	};
}
/**
* Cloudinary Media Engine for Sunny Concepts
* Handles single & batch uploads, on-the-fly format/quality optimization (f_auto,q_auto),
* and the native Cloudinary Multi-File Upload Widget.
*/
var CLOUDINARY_CLOUD_NAME = "dq2zje0ei";
var CLOUDINARY_UPLOAD_PRESET = "sunny_concepts";
/**
* Injects on-the-fly Cloudinary auto-optimization (`f_auto,q_auto`)
* ensures HD imagery compresses cleanly into WebP / AVIF based on the browser.
*/
function optimizeCloudinaryUrl(url, transformations = "f_auto,q_auto") {
	if (!url || typeof url !== "string") return url;
	if (!url.includes("res.cloudinary.com")) return url;
	if (url.includes("f_auto,q_auto")) return url;
	return url.replace(/\/image\/upload\/(?:v\d+\/)?/, (match) => {
		if (match.includes("/v")) return match.replace("/upload/", `/upload/${transformations}/`);
		return `/upload/${transformations}/`;
	});
}
/** Builds a responsive, bounded Cloudinary delivery URL for rendered media. */
function responsiveCloudinaryUrl(url, width) {
	return optimizeCloudinaryUrl(url, `f_auto,q_auto:eco,w_${width},c_limit`);
}
function responsiveCloudinarySrcSet(url) {
	if (!url?.includes("res.cloudinary.com")) return void 0;
	return [
		600,
		900,
		1200
	].map((width) => `${responsiveCloudinaryUrl(url, width)} ${width}w`).join(", ");
}
/**
* Uploads a single file to Cloudinary unsigned upload preset
*/
async function uploadToCloudinary(file, fileName) {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
	if (fileName) formData.append("filename_override", fileName);
	const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
		method: "POST",
		body: formData
	});
	if (!response.ok) {
		const errorJson = await response.json().catch(() => ({}));
		throw new Error(errorJson?.error?.message || `Cloudinary upload failed with status ${response.status}`);
	}
	const json = await response.json();
	const optimizedSecureUrl = optimizeCloudinaryUrl(json.secure_url || json.url);
	return {
		url: optimizedSecureUrl,
		secure_url: optimizedSecureUrl,
		public_id: json.public_id,
		format: json.format,
		width: json.width,
		height: json.height,
		original_filename: json.original_filename || fileName || "file"
	};
}
/**
* Uploads multiple files simultaneously in parallel with progress updates
*/
async function batchUploadToCloudinary(files, onProgress) {
	const total = files.length;
	let completed = 0;
	const uploadPromises = files.map(async (file) => {
		try {
			const result = await uploadToCloudinary(file, file.name);
			completed++;
			if (onProgress) onProgress(completed, total, file.name);
			return result;
		} catch (err) {
			console.error(`Failed to upload ${file.name}:`, err);
			throw err;
		}
	});
	return Promise.all(uploadPromises);
}
/**
* Loads the Cloudinary Upload Widget script dynamically
*/
function loadCloudinaryWidgetScript() {
	return new Promise((resolve, reject) => {
		if (typeof window === "undefined") {
			reject(/* @__PURE__ */ new Error("Window is not available"));
			return;
		}
		if (window.cloudinary?.createUploadWidget) {
			resolve();
			return;
		}
		const existingScript = document.getElementById("cloudinary-upload-widget");
		if (existingScript) {
			existingScript.addEventListener("load", () => resolve());
			existingScript.addEventListener("error", (e) => reject(e));
			return;
		}
		const script = document.createElement("script");
		script.id = "cloudinary-upload-widget";
		script.src = "https://upload-widget.cloudinary.com/global/all.js";
		script.async = true;
		script.onload = () => resolve();
		script.onerror = (e) => reject(e);
		document.body.appendChild(script);
	});
}
/**
* Opens Cloudinary's native multiple-upload widget with batch support
*/
async function openCloudinaryMultiUploadWidget({ onSuccess, onBatchComplete, folder = "portfolio" }) {
	await loadCloudinaryWidgetScript();
	if (!window.cloudinary) throw new Error("Cloudinary widget script failed to initialize.");
	const batchResults = [];
	window.cloudinary.createUploadWidget({
		cloudName: CLOUDINARY_CLOUD_NAME,
		uploadPreset: CLOUDINARY_UPLOAD_PRESET,
		folder,
		multiple: true,
		maxFiles: 50,
		clientAllowedFormats: [
			"png",
			"jpg",
			"jpeg",
			"webp",
			"avif",
			"gif"
		],
		sources: [
			"local",
			"url",
			"camera",
			"dropbox",
			"google_drive"
		],
		styles: {
			palette: {
				window: "#0F0F0F",
				windowBorder: "#6B6A69",
				tabIcon: "#D9D9D9",
				menuIcons: "#AFAFAE",
				textDark: "#000000",
				textLight: "#D9D9D9",
				link: "#D9D9D9",
				action: "#D9D9D9",
				inactiveTabIcon: "#AFAFAE",
				error: "#D9D9D9",
				inProgress: "#D9D9D9",
				complete: "#D9D9D9",
				sourceBg: "#3F3F3D"
			},
			fonts: {
				default: null,
				"'Inter', sans-serif": {
					url: "https://fonts.googleapis.com/css?family=Inter",
					active: true
				}
			}
		}
	}, (error, result) => {
		if (error) {
			console.error("Cloudinary widget error:", error);
			return;
		}
		if (result && result.event === "success") {
			const info = result.info;
			const optimizedUrl = optimizeCloudinaryUrl(info.secure_url || info.url);
			const item = {
				url: optimizedUrl,
				secure_url: optimizedUrl,
				public_id: info.public_id,
				format: info.format,
				width: info.width,
				height: info.height,
				original_filename: info.original_filename || "file"
			};
			batchResults.push(item);
			if (onSuccess) onSuccess(item);
		}
		if (result && (result.event === "close" || result.event === "queues-end")) {
			if (result.event === "queues-end" && onBatchComplete && batchResults.length > 0) onBatchComplete(batchResults);
		}
	}).open();
}
export { openCloudinaryMultiUploadWidget as a, renameCategory as c, responsiveCloudinaryUrl as d, supabase as f, useSiteSettings as h, deleteCategory as i, reorderCategories as l, usePortfolioCategories as m, batchUploadToCloudinary as n, optimizeCloudinaryUrl as o, uploadToCloudinary as p, countItemsForCategory as r, persistSiteSettings as s, addCategory as t, responsiveCloudinarySrcSet as u };
