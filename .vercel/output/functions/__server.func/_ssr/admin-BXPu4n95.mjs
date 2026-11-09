import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { T as ThemeToggle, u as usePortfolioCategories, o as optimizeCloudinaryUrl, a as useSiteSettings, s as supabase, b as openCloudinaryMultiUploadWidget, c as batchUploadToCloudinary, d as countItemsForCategory, e as addCategory, r as reorderCategories, f as renameCategory, g as deleteCategory, p as persistSiteSettings, h as uploadToCloudinary } from "./cloudinary-Cm-WRUo0.mjs";
import { E as EyeOff, a as Eye, C as CircleAlert, b as CircleCheck, A as ArrowLeft, c as ExternalLink, L as LogOut, F as FolderPlus, d as Layers, S as Save, e as Sparkles, U as Upload, X, R as RefreshCw, I as Image, T as Trash2, P as Plus, f as Check, g as Pen } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./router-DSSptcs5.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const AUTH_KEY = "admin_authenticated";
const PASSCODE = "CEO_SUNDAY_SUNNY";
function AdminPage() {
  const [authenticated, setAuthenticated] = reactExports.useState(false);
  const [code, setCode] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [loginSuccess, setLoginSuccess] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const isAuth = sessionStorage.getItem(AUTH_KEY) === "true" || sessionStorage.getItem("sunny-admin-session") === "active";
    if (isAuth) {
      setAuthenticated(true);
    }
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    const inputCode = code.trim();
    if (inputCode === PASSCODE || inputCode === "CEO_SUNDAY_SUNNY") {
      sessionStorage.setItem(AUTH_KEY, "true");
      sessionStorage.setItem("sunny-admin-session", "active");
      setLoginSuccess(true);
      toast.success("Access verified. Welcome to the studio.");
      setTimeout(() => {
        setAuthenticated(true);
      }, 400);
    } else {
      setError("That passcode is not recognized. Please try again.");
      toast.error("Access denied. Please check your passcode.");
    }
  };
  if (!authenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen flex items-center justify-center px-4 py-12 bg-[#070709] text-[#A1A1AA] relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full blur-[140px] pointer-events-none opacity-20", style: {
        background: "radial-gradient(circle, var(--sage), transparent 70%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong rounded-3xl p-8 sm:p-12 w-full max-w-md border border-white/12 relative z-10 shadow-2xl bg-[#111115]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-[var(--sage)] shadow-[0_0_10px_var(--sage)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] tracking-[0.45em] uppercase text-[var(--sage)] font-semibold", children: "Sunny Concepts / Security Gate" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl sm:text-4xl font-light text-[#F4F4F5] tracking-tight", children: "Studio Security" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-[#A1A1AA] leading-relaxed", children: "Enter the authorized master passcode to manage portfolio assets and live site content." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLogin, className: "mt-8 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { autoFocus: true, type: showPassword ? "text" : "password", value: code, onChange: (e) => {
              setCode(e.target.value);
              if (error) setError("");
            }, placeholder: "Enter admin passcode", className: "w-full rounded-2xl bg-[#070709] border border-white/15 px-4 py-3.5 pr-12 text-sm text-[#F4F4F5] outline-none transition-all focus:border-[var(--sage)] focus:ring-1 focus:ring-[var(--sage)] placeholder:text-[#A1A1AA]/50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-4 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors p-1", "aria-label": showPassword ? "Hide passcode" : "Show passcode", children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }) })
          ] }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-red-400 bg-red-950/40 border border-red-500/20 rounded-xl p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: error })
          ] }),
          loginSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 rounded-xl p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Passcode verified. Unlocking studio..." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "mt-2 w-full rounded-2xl bg-[var(--sage)] text-[#070709] py-3.5 text-xs tracking-[0.25em] uppercase font-semibold transition-all hover:brightness-110 active:scale-[0.99] shadow-[0_0_20px_rgba(183,215,193,0.3)]", children: "Enter Studio" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "mt-6 flex items-center justify-center gap-2 text-xs tracking-[0.2em] uppercase text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5" }),
            "Return to Website"
          ] })
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminDashboard, { onLogout: () => {
    sessionStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem("sunny-admin-session");
    setAuthenticated(false);
    toast.info("Logged out of studio administration.");
  } });
}
function AdminDashboard({
  onLogout
}) {
  const [activeTab, setActiveTab] = reactExports.useState("media");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-screen bg-[#070709] text-[#A1A1AA] px-4 sm:px-8 py-10 md:py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-8 border-b border-white/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2.5 w-2.5 rounded-full bg-[var(--sage)] shadow-[0_0_10px_var(--sage)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] tracking-[0.45em] uppercase text-[var(--sage)] font-semibold", children: "Sunny Concepts / Studio Portal" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 text-4xl sm:text-5xl font-light text-[#F4F4F5] tracking-tight", children: "Studio Management" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "glass rounded-full px-5 py-2.5 text-xs tracking-[0.22em] uppercase text-[#F4F4F5] hover:border-white/30 transition-all flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" }),
          "Live Site"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onLogout, className: "flex items-center gap-2 rounded-full border border-red-500/20 bg-red-950/20 px-5 py-2.5 text-xs tracking-[0.22em] uppercase text-red-400 hover:bg-red-900/40 hover:text-red-300 transition-all", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-3.5 h-3.5" }),
          "Sign Out"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 mt-8 border-b border-white/10 pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveTab("media"), className: `flex items-center gap-2 px-6 py-3 rounded-2xl text-xs tracking-[0.25em] uppercase font-semibold transition-all ${activeTab === "media" ? "bg-[var(--sage)] text-[#070709] shadow-[0_0_20px_rgba(183,215,193,0.3)]" : "glass text-[#A1A1AA] hover:text-[#F4F4F5]"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FolderPlus, { className: "w-4 h-4" }),
        "Media Library"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveTab("categories"), className: `flex items-center gap-2 px-6 py-3 rounded-2xl text-xs tracking-[0.25em] uppercase font-semibold transition-all ${activeTab === "categories" ? "bg-[var(--sage)] text-[#070709] shadow-[0_0_20px_rgba(183,215,193,0.3)]" : "glass text-[#A1A1AA] hover:text-[#F4F4F5]"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-4 h-4" }),
        "Portfolio Categories"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveTab("cms"), className: `flex items-center gap-2 px-6 py-3 rounded-2xl text-xs tracking-[0.25em] uppercase font-semibold transition-all ${activeTab === "cms" ? "bg-[var(--sage)] text-[#070709] shadow-[0_0_20px_rgba(183,215,193,0.3)]" : "glass text-[#A1A1AA] hover:text-[#F4F4F5]"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
        "Site Content Manager"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
      activeTab === "media" && /* @__PURE__ */ jsxRuntimeExports.jsx(BatchMediaManagerTab, {}),
      activeTab === "categories" && /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryManagerTab, {}),
      activeTab === "cms" && /* @__PURE__ */ jsxRuntimeExports.jsx(UniversalCmsTab, {})
    ] })
  ] }) });
}
function BatchMediaManagerTab() {
  const [items, setItems] = reactExports.useState([]);
  const [isLoadingItems, setIsLoadingItems] = reactExports.useState(true);
  const [selectedFiles, setSelectedFiles] = reactExports.useState([]);
  const [batchCategory, setBatchCategory] = reactExports.useState("Brand Identity");
  const [defaultTitlePrefix, setDefaultTitlePrefix] = reactExports.useState("");
  const [batchDescription, setBatchDescription] = reactExports.useState("");
  const [isUploading, setIsUploading] = reactExports.useState(false);
  const [uploadProgress, setUploadProgress] = reactExports.useState(null);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const fileInputRef = reactExports.useRef(null);
  const {
    categories
  } = usePortfolioCategories();
  const loadItems = async () => {
    setIsLoadingItems(true);
    if (!supabase) {
      setIsLoadingItems(false);
      return;
    }
    try {
      const {
        data,
        error
      } = await supabase.from("portfolio_items").select("*").order("created_at", {
        ascending: false
      });
      if (!error && data) {
        setItems(data);
      }
    } catch (e) {
      console.error("Load items error:", e);
    } finally {
      setIsLoadingItems(false);
    }
  };
  reactExports.useEffect(() => {
    void loadItems();
  }, []);
  const handleFilesSelected = (files) => {
    if (!files || files.length === 0) return;
    const newFiles = Array.from(files);
    setSelectedFiles((prev) => [...prev, ...newFiles]);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesSelected(e.dataTransfer.files);
    }
  };
  const handleBatchUpload = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      toast.error("Please select one or more files to upload.");
      return;
    }
    if (!supabase) {
      toast.error("The studio is not ready yet. Please try again.");
      return;
    }
    setIsUploading(true);
    setUploadProgress({
      completed: 0,
      total: selectedFiles.length
    });
    try {
      const uploadResults = await batchUploadToCloudinary(selectedFiles, (completed, total, current) => {
        setUploadProgress({
          completed,
          total,
          current
        });
      });
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const recordsToInsert = uploadResults.map((res, i) => {
        const rawName = res.original_filename.replace(/\.[^/.]+$/, "");
        const cleanTitle = defaultTitlePrefix.trim() ? selectedFiles.length > 1 ? `${defaultTitlePrefix.trim()} ${String(i + 1).padStart(2, "0")}` : defaultTitlePrefix.trim() : rawName.replace(/[-_]/g, " ");
        return {
          title: cleanTitle,
          category: batchCategory,
          image_url: optimizeCloudinaryUrl(res.secure_url || res.url),
          description: batchDescription.trim() || null,
          storage_path: res.public_id,
          created_at: now
        };
      });
      const {
        data,
        error
      } = await supabase.from("portfolio_items").insert(recordsToInsert).select();
      if (error) {
        throw new Error(`Could not add the selected media: ${error.message}`);
      }
      toast.success(`Upload complete. Successfully added ${recordsToInsert.length} asset${recordsToInsert.length > 1 ? "s" : ""} to ${batchCategory}.`);
      setSelectedFiles([]);
      setDefaultTitlePrefix("");
      setBatchDescription("");
      setUploadProgress(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      await loadItems();
    } catch (err) {
      console.error("Batch upload failed:", err);
      toast.error(err?.message || "Failed to complete batch upload.");
    } finally {
      setIsUploading(false);
    }
  };
  const launchCloudinaryWidget = async () => {
    try {
      toast.loading("Opening media picker...", {
        id: "cld-widget"
      });
      await openCloudinaryMultiUploadWidget({
        folder: `sunny_concepts/${batchCategory.toLowerCase().replace(/\s+/g, "_")}`,
        onBatchComplete: async (results) => {
          if (!supabase || results.length === 0) return;
          try {
            const now = (/* @__PURE__ */ new Date()).toISOString();
            const records = results.map((res, idx) => ({
              title: res.original_filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ") || `Asset ${idx + 1}`,
              category: batchCategory,
              image_url: optimizeCloudinaryUrl(res.secure_url || res.url),
              description: null,
              storage_path: res.public_id,
              created_at: now
            }));
            const {
              error
            } = await supabase.from("portfolio_items").insert(records);
            if (error) throw error;
            toast.success(`Upload complete. Added ${records.length} assets to ${batchCategory}.`);
            await loadItems();
          } catch (e) {
            toast.error(`Could not save the portfolio entries: ${e.message}`);
          }
        }
      });
      toast.dismiss("cld-widget");
    } catch (e) {
      toast.dismiss("cld-widget");
      toast.error(e?.message || "Could not open the media picker.");
    }
  };
  const handleDeleteItem = async (item) => {
    if (!window.confirm(`Permanently remove "${item.title}" from the portfolio archive?`)) {
      return;
    }
    if (!supabase) return;
    try {
      const {
        error
      } = await supabase.from("portfolio_items").delete().eq("id", item.id);
      if (error) throw error;
      toast.success(`Asset Removed Successfully: "${item.title}".`);
      setItems((prev) => prev.filter((p) => p.id !== item.id));
    } catch (e) {
      toast.error(e?.message || "Failed to delete item.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[1.1fr_1.4fr] gap-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-6 sm:p-8 h-fit border border-white/12 shadow-xl bg-[#111115]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-light text-[#F4F4F5]", children: "Add Portfolio Media" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-[#A1A1AA]", children: "Add multiple images at once and prepare them for the portfolio." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: launchCloudinaryWidget, className: "shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-[11px] tracking-[0.18em] uppercase font-semibold bg-[var(--sage)]/15 border border-[var(--sage)]/30 text-[var(--sage)] hover:bg-[var(--sage)]/25 transition-all", title: "Open media picker", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
          "Widget Modal"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleBatchUpload, className: "mt-6 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onDragOver: (e) => {
          e.preventDefault();
          setIsDragging(true);
        }, onDragLeave: () => setIsDragging(false), onDrop: handleDrop, onClick: () => fileInputRef.current?.click(), className: `relative cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition-all ${isDragging ? "border-[var(--sage)] bg-[var(--sage)]/10" : "border-white/15 bg-[#070709] hover:border-white/30"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: fileInputRef, type: "file", multiple: true, accept: "image/*", className: "hidden", onChange: (e) => handleFilesSelected(e.target.files) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-8 h-8 text-[var(--sage)] mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#F4F4F5] font-medium", children: selectedFiles.length > 0 ? `${selectedFiles.length} file${selectedFiles.length > 1 ? "s" : ""} queued for batch upload` : "Drag & drop multiple images here" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#A1A1AA] mt-1", children: "or click to browse your system (batch mode)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-3 text-[10px] tracking-[0.2em] uppercase glass rounded-full px-3 py-1 text-[#A1A1AA]", children: "PNG, JPG, WEBP, AVIF — MULTIPLE: TRUE" })
          ] })
        ] }),
        selectedFiles.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/10 bg-[#070709] p-4 max-h-48 overflow-y-auto space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-xs text-[#A1A1AA] pb-1 border-b border-white/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Selected queue (",
              selectedFiles.length,
              " files)"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setSelectedFiles([]), className: "text-red-400 hover:text-red-300 text-[11px]", children: "Clear all" })
          ] }),
          selectedFiles.map((f, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-white/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[240px] text-[#F4F4F5]", children: f.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-[#A1A1AA]", children: [
                (f.size / 1024).toFixed(0),
                " KB"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: (e) => {
                e.stopPropagation();
                setSelectedFiles((prev) => prev.filter((_, i) => i !== idx));
              }, className: "text-red-400 hover:text-red-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" }) })
            ] })
          ] }, `queued-file-${idx}-${f.name}`))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs uppercase tracking-[0.2em] text-[#A1A1AA] mb-2 font-medium", children: "Category Assignment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: batchCategory, onChange: (e) => setBatchCategory(e.target.value), className: "w-full rounded-2xl bg-[#070709] border border-white/15 px-4 py-3 text-sm text-[#F4F4F5] outline-none focus:border-[var(--sage)]", children: categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.name, className: "bg-[#111115]", children: c.name }, `cat-select-${c.id}`)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs uppercase tracking-[0.2em] text-[#A1A1AA] mb-2 font-medium", children: [
            "Title / Series Prefix ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#A1A1AA]/50 font-normal", children: "(optional)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: defaultTitlePrefix, onChange: (e) => setDefaultTitlePrefix(e.target.value), placeholder: "e.g. Minimalist Identity or Art Cover", className: "w-full rounded-2xl bg-[#070709] border border-white/15 px-4 py-3 text-sm text-[#F4F4F5] outline-none focus:border-[var(--sage)] placeholder:text-[#A1A1AA]/40" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs uppercase tracking-[0.2em] text-[#A1A1AA] mb-2 font-medium", children: [
            "Description / Notes ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#A1A1AA]/50 font-normal", children: "(optional)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: batchDescription, onChange: (e) => setBatchDescription(e.target.value), rows: 2, placeholder: "Short commentary on the project background...", className: "w-full rounded-2xl bg-[#070709] border border-white/15 px-4 py-3 text-sm text-[#F4F4F5] outline-none focus:border-[var(--sage)] placeholder:text-[#A1A1AA]/40" })
        ] }),
        uploadProgress && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 p-3 rounded-xl bg-white/5 border border-white/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-[#F4F4F5]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Uploading batch..." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              uploadProgress.completed,
              " / ",
              uploadProgress.total
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full bg-white/10 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-[var(--sage)] transition-all duration-300", style: {
            width: `${Math.round(uploadProgress.completed / uploadProgress.total * 100)}%`
          } }) }),
          uploadProgress.current && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-[#A1A1AA] truncate", children: [
            "Current: ",
            uploadProgress.current
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: isUploading || selectedFiles.length === 0, className: `w-full rounded-2xl py-3.5 text-xs tracking-[0.25em] uppercase font-semibold transition-all flex items-center justify-center gap-2 ${isUploading || selectedFiles.length === 0 ? "bg-white/10 text-white/40 cursor-not-allowed" : "bg-[var(--sage)] text-[#070709] hover:brightness-110 active:scale-[0.99] shadow-[0_0_20px_rgba(183,215,193,0.3)]"}`, children: isUploading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 animate-spin" }),
          "Adding assets to the portfolio..."
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
          "Upload ",
          selectedFiles.length > 0 ? `${selectedFiles.length} Assets` : "Batch",
          " to Portfolio"
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-6 sm:p-8 border border-white/12 shadow-xl bg-[#111115]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-light text-[#F4F4F5]", children: "Live Portfolio Archive" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#A1A1AA]", children: [
            items.length,
            " portfolio asset",
            items.length !== 1 ? "s" : "",
            " currently published"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: loadItems, className: "glass rounded-full p-2.5 text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors", title: "Refresh portfolio", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `w-4 h-4 ${isLoadingItems ? "animate-spin" : ""}` }) })
      ] }),
      isLoadingItems ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Array.from({
        length: 4
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 rounded-2xl bg-white/5 animate-pulse" }, `item-skel-${i}`)) }) : items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/10 bg-[#070709] p-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-10 h-10 mx-auto text-[#A1A1AA]/40 mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#F4F4F5]", children: "No portfolio assets yet." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#A1A1AA] mt-1", children: "Select files or use the media picker on the left to start publishing." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-h-[680px] overflow-y-auto pr-1", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3.5 rounded-2xl bg-[#070709] border border-white/10 hover:border-white/20 transition-all gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3.5 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 shrink-0 rounded-xl overflow-hidden bg-black/50 border border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: optimizeCloudinaryUrl(item.image_url), alt: item.title, className: "h-full w-full object-cover", loading: "lazy" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm text-[#F4F4F5] truncate font-medium", children: item.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full bg-[var(--sage)]/10 text-[var(--sage)] font-mono", children: item.category }),
              item.created_at && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-[#A1A1AA]", children: new Date(item.created_at).toLocaleDateString() })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: item.image_url, target: "_blank", rel: "noreferrer", className: "p-2 rounded-xl text-[#A1A1AA] hover:text-[#F4F4F5] hover:bg-white/5 transition-all", title: "Open CDN Image", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleDeleteItem(item), className: "p-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-all", title: "Delete Asset", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }) })
        ] })
      ] }, `admin-portfolio-item-${item.id}`)) })
    ] })
  ] });
}
function CategoryManagerTab() {
  const {
    categories,
    refresh,
    setCategories
  } = usePortfolioCategories();
  const [newCatName, setNewCatName] = reactExports.useState("");
  const [isAdding, setIsAdding] = reactExports.useState(false);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [editingName, setEditingName] = reactExports.useState("");
  const [deletingCat, setDeletingCat] = reactExports.useState(null);
  const [itemCounts, setItemCounts] = reactExports.useState({});
  const [reassignCategoryName, setReassignCategoryName] = reactExports.useState("");
  reactExports.useEffect(() => {
    const loadCounts = async () => {
      const counts = {};
      for (const cat of categories) {
        counts[cat.id] = await countItemsForCategory(cat.name, cat.slug);
      }
      setItemCounts(counts);
    };
    void loadCounts();
  }, [categories]);
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    setIsAdding(true);
    const res = await addCategory(newCatName);
    setIsAdding(false);
    if (res.success) {
      toast.success(`Category "${newCatName.trim()}" created successfully!`);
      setNewCatName("");
      await refresh();
    } else {
      toast.error(res.error || "Failed to add category.");
    }
  };
  const handleStartRename = (cat) => {
    setEditingId(cat.id);
    setEditingName(cat.name);
  };
  const handleSaveRename = async (cat) => {
    if (!editingName.trim()) return;
    const res = await renameCategory(cat.id, editingName.trim());
    if (res.success) {
      toast.success(`Renamed to "${editingName.trim()}" and updated portfolio assets.`);
      setEditingId(null);
      await refresh();
    } else {
      toast.error(res.error || "Failed to rename category.");
    }
  };
  const handleMove = async (index, direction) => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= categories.length) return;
    const reordered = [...categories];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);
    setCategories(reordered);
    await reorderCategories(reordered);
    toast.success("Category order updated.");
  };
  const confirmDeleteCategory = async (deleteAssociated) => {
    if (!deletingCat) return;
    const res = await deleteCategory({
      id: deletingCat.id,
      reassignToName: deleteAssociated ? void 0 : reassignCategoryName || void 0,
      deleteAssociatedItems: deleteAssociated
    });
    if (res.success) {
      toast.success(`Category "${deletingCat.name}" removed.`);
      setDeletingCat(null);
      setReassignCategoryName("");
      await refresh();
    } else {
      toast.error(res.error || "Failed to delete category.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[1fr_1.5fr] gap-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-6 sm:p-8 h-fit border border-white/12 shadow-xl bg-[#111115]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-light text-[#F4F4F5]", children: "Add New Category" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-[#A1A1AA]", children: "Create a new portfolio discipline. Landing page filter tabs update automatically." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleAddCategory, className: "mt-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs uppercase tracking-[0.2em] text-[#A1A1AA] mb-2 font-medium", children: "Category Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: newCatName, onChange: (e) => setNewCatName(e.target.value), placeholder: "e.g. 3D Architectural Renders", className: "w-full rounded-2xl bg-[#070709] border border-white/15 px-4 py-3.5 text-sm text-[#F4F4F5] outline-none focus:border-[var(--sage)]" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: isAdding || !newCatName.trim(), className: `w-full rounded-2xl py-3.5 text-xs tracking-[0.25em] uppercase font-semibold transition-all flex items-center justify-center gap-2 ${isAdding || !newCatName.trim() ? "bg-white/10 text-white/40 cursor-not-allowed" : "bg-[var(--sage)] text-[#070709] hover:brightness-110 active:scale-[0.99] shadow-[0_0_20px_rgba(183,215,193,0.3)]"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
          "Add Category"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 pt-6 border-t border-white/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs uppercase tracking-[0.2em] text-[#F4F4F5] font-semibold mb-2", children: "Safety & Auto-Relinking Note" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#A1A1AA] leading-relaxed", children: "Renaming a category automatically updates its portfolio entries. Removing a category lets you move its portfolio assets first or remove them cleanly." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-6 sm:p-8 border border-white/12 shadow-xl bg-[#111115]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-light text-[#F4F4F5]", children: "Active Portfolio Categories" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#A1A1AA]", children: [
            categories.length,
            " categories configured with real-time asset counts"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => refresh(), className: "glass rounded-full p-2.5 text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors", title: "Refresh categories", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: categories.map((cat, idx) => {
        const count = itemCounts[cat.id] ?? 0;
        const isEditing = editingId === cat.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 rounded-2xl bg-[#070709] border border-white/10 hover:border-white/20 transition-all gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", disabled: idx === 0, onClick: () => handleMove(idx, "up"), className: `p-1 rounded text-xs transition-colors ${idx === 0 ? "text-white/10" : "text-[#A1A1AA] hover:text-[#F4F4F5] hover:bg-white/5"}`, title: "Move up", children: "▲" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", disabled: idx === categories.length - 1, onClick: () => handleMove(idx, "down"), className: `p-1 rounded text-xs transition-colors ${idx === categories.length - 1 ? "text-white/10" : "text-[#A1A1AA] hover:text-[#F4F4F5] hover:bg-white/5"}`, title: "Move down", children: "▼" })
            ] }),
            isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: editingName, onChange: (e) => setEditingName(e.target.value), className: "rounded-xl bg-[#111115] border border-[var(--sage)] px-3 py-1.5 text-sm text-[#F4F4F5] outline-none flex-1", autoFocus: true }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleSaveRename(cat), className: "p-2 rounded-xl bg-[var(--sage)] text-[#070709] hover:brightness-110", title: "Save rename", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditingId(null), className: "p-2 rounded-xl bg-white/10 text-[#F4F4F5] hover:bg-white/20", title: "Cancel", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" }) })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-[#F4F4F5]", children: cat.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full bg-white/5 text-[#A1A1AA] font-mono", children: cat.slug })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-[#A1A1AA] mt-0.5", children: [
                count,
                " asset",
                count !== 1 ? "s" : "",
                " cataloged"
              ] })
            ] })
          ] }),
          !isEditing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleStartRename(cat), className: "p-2 rounded-xl text-[#A1A1AA] hover:text-[#F4F4F5] hover:bg-white/5 transition-all", title: "Rename Category", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setDeletingCat(cat), className: "p-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-all", title: "Delete Category", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }) })
          ] })
        ] }, `cat-crud-${cat.id}`);
      }) })
    ] }),
    deletingCat && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-white/15 bg-[#111115]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xl font-light text-[#F4F4F5]", children: [
        'Delete Category: "',
        deletingCat.name,
        '"'
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-[#A1A1AA] leading-relaxed", children: [
        "There are currently ",
        itemCounts[deletingCat.id] ?? 0,
        " assets assigned to this category. How would you like to handle existing assets?"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs uppercase tracking-[0.2em] text-[#A1A1AA] mb-2 font-medium", children: "Option A: Reassign assets to another category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: reassignCategoryName, onChange: (e) => setReassignCategoryName(e.target.value), className: "w-full rounded-2xl bg-[#070709] border border-white/15 px-4 py-3 text-sm text-[#F4F4F5] outline-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", className: "bg-[#111115]", children: "Select destination category..." }),
            categories.filter((c) => c.id !== deletingCat.id).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.name, className: "bg-[#111115]", children: c.name }, `reassign-target-${c.id}`))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", disabled: !reassignCategoryName, onClick: () => confirmDeleteCategory(false), className: `mt-2 w-full rounded-xl py-2.5 text-xs uppercase tracking-[0.2em] font-semibold transition-all ${reassignCategoryName ? "bg-[var(--sage)] text-[#070709] hover:brightness-110" : "bg-white/10 text-white/30 cursor-not-allowed"}`, children: "Reassign Assets & Delete Category" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t border-white/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs uppercase tracking-[0.2em] text-red-400 mb-2 font-medium", children: "Option B: Permanently delete all associated assets" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => confirmDeleteCategory(true), className: "w-full rounded-xl py-2.5 text-xs uppercase tracking-[0.2em] font-semibold bg-red-950/40 border border-red-500/30 text-red-400 hover:bg-red-900/50 transition-all", children: "Delete Category and All Its Assets" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setDeletingCat(null), className: "mt-6 w-full rounded-xl py-2.5 text-xs uppercase tracking-[0.2em] glass text-[#A1A1AA] hover:text-[#F4F4F5] transition-all", children: "Cancel" })
    ] }) })
  ] });
}
function UniversalCmsTab() {
  const {
    settings
  } = useSiteSettings();
  const [formData, setFormData] = reactExports.useState(settings);
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const [isUploadingPortrait, setIsUploadingPortrait] = reactExports.useState(false);
  const portraitInputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    setFormData(settings);
  }, [settings]);
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSaveAll = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const res = await persistSiteSettings(formData);
    setIsSaving(false);
    if (res.success) {
      toast.success("Changes Saved Successfully! Live site updated.");
    } else {
      toast.error(res.error || "Failed to save studio content.");
    }
  };
  const handlePortraitUpload = async (file) => {
    if (!file) return;
    setIsUploadingPortrait(true);
    toast.loading("Adding founder portrait...", {
      id: "founder-upload"
    });
    try {
      const uploadRes = await uploadToCloudinary(file, `founder-portrait-${Date.now()}`);
      const optimizedUrl = optimizeCloudinaryUrl(uploadRes.secure_url || uploadRes.url);
      handleChange("about_founder_portrait_url", optimizedUrl);
      await persistSiteSettings({
        about_founder_portrait_url: optimizedUrl
      });
      toast.dismiss("founder-upload");
      toast.success("Upload complete. Founder portrait updated successfully.");
    } catch (err) {
      toast.dismiss("founder-upload");
      toast.error(err?.message || "Failed to upload founder portrait.");
    } finally {
      setIsUploadingPortrait(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSaveAll, className: "space-y-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-5 rounded-2xl glass border border-white/15 bg-[#111115] sticky top-4 z-20 shadow-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-light text-[#F4F4F5]", children: "Universal Site-Wide CMS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#A1A1AA]", children: "Edit the words and visuals that appear across the Sunny Concepts website." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: isSaving, className: `flex items-center gap-2 px-8 py-3.5 rounded-2xl text-xs tracking-[0.25em] uppercase font-semibold transition-all ${isSaving ? "bg-white/10 text-white/40 cursor-not-allowed" : "bg-[var(--sage)] text-[#070709] hover:brightness-110 active:scale-[0.99] shadow-[0_0_20px_rgba(183,215,193,0.3)]"}`, children: [
        isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
        "Save All Changes"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-6 sm:p-8 border border-white/12 bg-[#111115]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-6 pb-4 border-b border-white/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-[var(--sage)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-light text-[#F4F4F5] uppercase tracking-[0.2em]", children: "1. CEO & Founder Profile" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-[240px_1fr] gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs uppercase tracking-[0.2em] text-[#A1A1AA] mb-2 font-medium", children: "Founder Portrait" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/15 bg-[#070709] flex flex-col items-center justify-center group", children: [
            formData.about_founder_portrait_url ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: optimizeCloudinaryUrl(formData.about_founder_portrait_url), alt: "Founder Portrait", className: "h-full w-full object-cover" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => portraitInputRef.current?.click(), className: "rounded-full px-4 py-2 bg-[var(--sage)] text-[#070709] text-xs font-semibold uppercase tracking-wider", children: "Replace" }) })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => portraitInputRef.current?.click(), className: "cursor-pointer text-center p-4 flex flex-col items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-8 h-8 text-[var(--sage)] mb-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#F4F4F5] font-medium", children: "Upload Portrait" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-[#A1A1AA] mt-1", children: "Add to Media Library" })
            ] }),
            isUploadingPortrait && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/80 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-6 h-6 text-[var(--sage)] animate-spin" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: portraitInputRef, type: "file", accept: "image/*", className: "hidden", onChange: (e) => handlePortraitUpload(e.target.files?.[0] || null) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => portraitInputRef.current?.click(), className: "mt-3 w-full rounded-xl py-2 text-[11px] tracking-[0.18em] uppercase glass hover:border-white/30 text-[#F4F4F5] transition-all", children: "Upload Asset" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs uppercase tracking-[0.2em] text-[#A1A1AA] mb-2 font-medium", children: "Founder Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData.about_founder_name, onChange: (e) => handleChange("about_founder_name", e.target.value), className: "w-full rounded-2xl bg-[#070709] border border-white/15 px-4 py-3 text-sm text-[#F4F4F5] outline-none focus:border-[var(--sage)]" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs uppercase tracking-[0.2em] text-[#A1A1AA] mb-2 font-medium", children: "Founder Title" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData.about_founder_title, onChange: (e) => handleChange("about_founder_title", e.target.value), className: "w-full rounded-2xl bg-[#070709] border border-white/15 px-4 py-3 text-sm text-[#F4F4F5] outline-none focus:border-[var(--sage)]" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs uppercase tracking-[0.2em] text-[#A1A1AA] mb-2 font-medium", children: "Founder Bio (Paragraph 1)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, value: formData.about_bio_p1, onChange: (e) => handleChange("about_bio_p1", e.target.value), className: "w-full rounded-2xl bg-[#070709] border border-white/15 px-4 py-3 text-sm text-[#F4F4F5] outline-none focus:border-[var(--sage)]" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs uppercase tracking-[0.2em] text-[#A1A1AA] mb-2 font-medium", children: "Founder Bio (Paragraph 2)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, value: formData.about_bio_p2, onChange: (e) => handleChange("about_bio_p2", e.target.value), className: "w-full rounded-2xl bg-[#070709] border border-white/15 px-4 py-3 text-sm text-[#F4F4F5] outline-none focus:border-[var(--sage)]" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs uppercase tracking-[0.2em] text-[#A1A1AA] mb-2 font-medium", children: "Company Mission Statement" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData.about_mission, onChange: (e) => handleChange("about_mission", e.target.value), className: "w-full rounded-2xl bg-[#070709] border border-white/15 px-4 py-3 text-sm text-[#F4F4F5] outline-none focus:border-[var(--sage)]" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-6 sm:p-8 border border-white/12 bg-[#111115]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-6 pb-4 border-b border-white/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-[var(--sage)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-light text-[#F4F4F5] uppercase tracking-[0.2em]", children: "2. Hero Section" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs uppercase tracking-[0.2em] text-[#A1A1AA] mb-2 font-medium", children: "Headline (Line 1)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData.hero_headline_line1, onChange: (e) => handleChange("hero_headline_line1", e.target.value), className: "w-full rounded-2xl bg-[#070709] border border-white/15 px-4 py-3 text-sm text-[#F4F4F5] outline-none focus:border-[var(--sage)]" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs uppercase tracking-[0.2em] text-[#A1A1AA] mb-2 font-medium", children: "Headline (Italic Accent)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData.hero_headline_italic, onChange: (e) => handleChange("hero_headline_italic", e.target.value), className: "w-full rounded-2xl bg-[#070709] border border-white/15 px-4 py-3 text-sm text-[#F4F4F5] outline-none focus:border-[var(--sage)]" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs uppercase tracking-[0.2em] text-[#A1A1AA] mb-2 font-medium", children: "Headline (Line 2)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData.hero_headline_line2, onChange: (e) => handleChange("hero_headline_line2", e.target.value), className: "w-full rounded-2xl bg-[#070709] border border-white/15 px-4 py-3 text-sm text-[#F4F4F5] outline-none focus:border-[var(--sage)]" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs uppercase tracking-[0.2em] text-[#A1A1AA] mb-2 font-medium", children: "Hero Subtitle" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData.hero_subtitle, onChange: (e) => handleChange("hero_subtitle", e.target.value), className: "w-full rounded-2xl bg-[#070709] border border-white/15 px-4 py-3 text-sm text-[#F4F4F5] outline-none focus:border-[var(--sage)]" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-6 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-2xl bg-[#070709] border border-white/10 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.25em] uppercase text-[var(--sage)] font-mono", children: "Primary CTA Button" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] text-[#A1A1AA] mb-1", children: "Button Label" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData.hero_cta_portfolio_text, onChange: (e) => handleChange("hero_cta_portfolio_text", e.target.value), className: "w-full rounded-xl bg-[#111115] border border-white/15 px-3 py-2 text-xs text-[#F4F4F5] outline-none" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] text-[#A1A1AA] mb-1", children: "Target Href (Link)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData.hero_cta_portfolio_href, onChange: (e) => handleChange("hero_cta_portfolio_href", e.target.value), className: "w-full rounded-xl bg-[#111115] border border-white/15 px-3 py-2 text-xs text-[#F4F4F5] outline-none" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-2xl bg-[#070709] border border-white/10 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.25em] uppercase text-[var(--sage)] font-mono", children: "Secondary CTA Button" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] text-[#A1A1AA] mb-1", children: "Button Label" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData.hero_cta_contact_text, onChange: (e) => handleChange("hero_cta_contact_text", e.target.value), className: "w-full rounded-xl bg-[#111115] border border-white/15 px-3 py-2 text-xs text-[#F4F4F5] outline-none" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] text-[#A1A1AA] mb-1", children: "Target Href (Link)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData.hero_cta_contact_href, onChange: (e) => handleChange("hero_cta_contact_href", e.target.value), className: "w-full rounded-xl bg-[#111115] border border-white/15 px-3 py-2 text-xs text-[#F4F4F5] outline-none" })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-6 sm:p-8 border border-white/12 bg-[#111115]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-6 pb-4 border-b border-white/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-[var(--sage)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-light text-[#F4F4F5] uppercase tracking-[0.2em]", children: "3. Services Section & Disciplines" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs uppercase tracking-[0.2em] text-[#A1A1AA] mb-2 font-medium", children: "Section Headline" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData.services_headline, onChange: (e) => handleChange("services_headline", e.target.value), className: "w-full rounded-2xl bg-[#070709] border border-white/15 px-4 py-3 text-sm text-[#F4F4F5] outline-none focus:border-[var(--sage)]" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs uppercase tracking-[0.2em] text-[#A1A1AA] mb-2 font-medium", children: "Headline (Italic Accent)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData.services_headline_italic, onChange: (e) => handleChange("services_headline_italic", e.target.value), className: "w-full rounded-2xl bg-[#070709] border border-white/15 px-4 py-3 text-sm text-[#F4F4F5] outline-none focus:border-[var(--sage)]" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-6 pt-2", children: [1, 2, 3, 4].map((num) => {
          const numKey = `service_${num}_num`;
          const titleKey = `service_${num}_title`;
          const descKey = `service_${num}_desc`;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-2xl bg-[#070709] border border-white/10 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs uppercase tracking-[0.25em] text-[var(--sage)] font-mono font-semibold", children: [
                "Discipline #",
                num
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData[numKey], onChange: (e) => handleChange(numKey, e.target.value), className: "w-16 text-center rounded-lg bg-[#111115] border border-white/15 px-2 py-1 text-xs text-[#F4F4F5] outline-none" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] text-[#A1A1AA] mb-1", children: "Discipline Title" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData[titleKey], onChange: (e) => handleChange(titleKey, e.target.value), className: "w-full rounded-xl bg-[#111115] border border-white/15 px-3 py-2 text-xs text-[#F4F4F5] outline-none" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] text-[#A1A1AA] mb-1", children: "Description" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 2, value: formData[descKey], onChange: (e) => handleChange(descKey, e.target.value), className: "w-full rounded-xl bg-[#111115] border border-white/15 px-3 py-2 text-xs text-[#F4F4F5] outline-none" })
            ] })
          ] }, `service-editor-card-${num}`);
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-6 sm:p-8 border border-white/12 bg-[#111115]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-6 pb-4 border-b border-white/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-[var(--sage)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-light text-[#F4F4F5] uppercase tracking-[0.2em]", children: "4. Client Marquee & Partner Brands" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs uppercase tracking-[0.2em] text-[#A1A1AA] mb-2 font-medium", children: "Client Brands (Comma-separated list)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData.client_marquee_list, onChange: (e) => handleChange("client_marquee_list", e.target.value), placeholder: "Rommdar, Carlton Park, Kugye, Prince Delight, Habakkuk Godwin, Minister GSP", className: "w-full rounded-2xl bg-[#070709] border border-white/15 px-4 py-3 text-sm text-[#F4F4F5] outline-none focus:border-[var(--sage)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-[#A1A1AA]", children: "Rendered across the client trust marquee on the public portfolio page." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-6 sm:p-8 border border-white/12 bg-[#111115]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-6 pb-4 border-b border-white/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-[var(--sage)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-light text-[#F4F4F5] uppercase tracking-[0.2em]", children: "5. Footer & Contact Channels" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs uppercase tracking-[0.2em] text-[#A1A1AA] mb-2 font-medium", children: "Studio Email Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: formData.contact_email, onChange: (e) => handleChange("contact_email", e.target.value), className: "w-full rounded-2xl bg-[#070709] border border-white/15 px-4 py-3 text-sm text-[#F4F4F5] outline-none focus:border-[var(--sage)]" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs uppercase tracking-[0.2em] text-[#A1A1AA] mb-2 font-medium", children: "Phone / WhatsApp Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData.contact_phone, onChange: (e) => handleChange("contact_phone", e.target.value), className: "w-full rounded-2xl bg-[#070709] border border-white/15 px-4 py-3 text-sm text-[#F4F4F5] outline-none focus:border-[var(--sage)]" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs uppercase tracking-[0.2em] text-[#A1A1AA] mb-2 font-medium", children: "Studio Physical Location" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData.studio_location, onChange: (e) => handleChange("studio_location", e.target.value), className: "w-full rounded-2xl bg-[#070709] border border-white/15 px-4 py-3 text-sm text-[#F4F4F5] outline-none focus:border-[var(--sage)]" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs uppercase tracking-[0.2em] text-[#A1A1AA] mb-2 font-medium", children: "WhatsApp Pre-filled Greeting" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData.contact_whatsapp_text, onChange: (e) => handleChange("contact_whatsapp_text", e.target.value), className: "w-full rounded-2xl bg-[#070709] border border-white/15 px-4 py-3 text-sm text-[#F4F4F5] outline-none focus:border-[var(--sage)]" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t border-white/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs uppercase tracking-[0.2em] text-[#F4F4F5] font-semibold mb-3", children: "Social Media Profile Links" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] text-[#A1A1AA] mb-1", children: "Instagram URL" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData.social_instagram, onChange: (e) => handleChange("social_instagram", e.target.value), className: "w-full rounded-xl bg-[#070709] border border-white/15 px-3 py-2 text-xs text-[#F4F4F5] outline-none" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] text-[#A1A1AA] mb-1", children: "LinkedIn URL" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData.social_linkedin, onChange: (e) => handleChange("social_linkedin", e.target.value), className: "w-full rounded-xl bg-[#070709] border border-white/15 px-3 py-2 text-xs text-[#F4F4F5] outline-none" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] text-[#A1A1AA] mb-1", children: "X (Twitter) URL" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData.social_x, onChange: (e) => handleChange("social_x", e.target.value), className: "w-full rounded-xl bg-[#070709] border border-white/15 px-3 py-2 text-xs text-[#F4F4F5] outline-none" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] text-[#A1A1AA] mb-1", children: "Facebook URL" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData.social_facebook, onChange: (e) => handleChange("social_facebook", e.target.value), className: "w-full rounded-xl bg-[#070709] border border-white/15 px-3 py-2 text-xs text-[#F4F4F5] outline-none" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] text-[#A1A1AA] mb-1", children: "TikTok URL" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: formData.social_tiktok, onChange: (e) => handleChange("social_tiktok", e.target.value), className: "w-full rounded-xl bg-[#070709] border border-white/15 px-3 py-2 text-xs text-[#F4F4F5] outline-none" })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  AdminPage as component
};
