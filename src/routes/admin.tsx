import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef, useMemo } from "react";
import {
  Eye,
  EyeOff,
  Upload,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Save,
  LogOut,
  ArrowLeft,
  RefreshCw,
  FolderPlus,
  Layers,
  Sparkles,
  ArrowUpDown,
  Edit2,
  ExternalLink,
  Plus,
  Image as ImageIcon,
  Check,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { supabase, type PortfolioItem } from "@/lib/supabase";
import {
  useSiteSettings,
  persistSiteSettings,
  DEFAULT_SITE_SETTINGS,
  type SiteSettings,
} from "@/lib/siteSettings";
import {
  usePortfolioCategories,
  addCategory,
  renameCategory,
  reorderCategories,
  deleteCategory,
  countItemsForCategory,
  type PortfolioCategory,
} from "@/lib/portfolioCategories";
import {
  uploadToCloudinary,
  batchUploadToCloudinary,
  openCloudinaryMultiUploadWidget,
  optimizeCloudinaryUrl,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
  type UploadResult,
} from "@/lib/cloudinary";

export const Route = createFileRoute("/admin")({ component: AdminPage });

const AUTH_KEY = "admin_authenticated";
const PASSCODE =
  (import.meta.env.NEXT_PUBLIC_ADMIN_PASSCODE as string | undefined) ||
  (import.meta.env.ADMIN_PASSCODE as string | undefined) ||
  "CEO_SUNDAY_SUNNY";

function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [code, setCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  useEffect(() => {
    const isAuth =
      sessionStorage.getItem(AUTH_KEY) === "true" ||
      sessionStorage.getItem("sunny-admin-session") === "active";
    if (isAuth) {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
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
    return (
      <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#0F0F0F] text-[#AFAFAE] relative overflow-hidden">
        {/* Obsidian ambient lighting */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full blur-[140px] pointer-events-none opacity-20"
          style={{ background: "radial-gradient(circle, var(--sage), transparent 70%)" }}
        />

        <div className="glass-strong rounded-3xl p-8 sm:p-12 w-full max-w-md border border-[#6B6A69]/20 relative z-10 shadow-2xl bg-[#3F3F3D]">
          <div className="flex items-center gap-2 mb-6">
            <span className="h-2 w-2 rounded-full bg-[var(--sage)] shadow-[0_0_10px_var(--sage)]" />
            <p className="text-[10px] tracking-[0.45em] uppercase text-[var(--sage)] font-semibold">
              Sunny Concepts / Security Gate
            </p>
          </div>

          <h1 className="text-3xl sm:text-4xl font-light text-[#D9D9D9] tracking-tight">
            Studio Security
          </h1>
          <p className="mt-3 text-sm text-[#AFAFAE] leading-relaxed">
            Enter the authorized master passcode to manage portfolio assets and live site content.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div className="relative">
              <input
                autoFocus
                type={showPassword ? "text" : "password"}
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Enter admin passcode"
                className="w-full rounded-2xl bg-[#0F0F0F] border border-[#6B6A69]/25 px-4 py-3.5 pr-12 text-sm text-[#D9D9D9] outline-none transition-all focus:border-[var(--sage)] focus:ring-1 focus:ring-[var(--sage)] placeholder:text-[#AFAFAE]/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#AFAFAE] hover:text-[#D9D9D9] transition-colors p-1"
                aria-label={showPassword ? "Hide passcode" : "Show passcode"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-xs text-red-400 bg-red-950/40 border border-red-500/20 rounded-xl p-3">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {loginSuccess && (
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 rounded-xl p-3">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Passcode verified. Unlocking studio...</span>
              </div>
            )}

            <button
              type="submit"
              className="mt-2 w-full rounded-2xl bg-[var(--sage)] text-[#0F0F0F] py-3.5 text-xs tracking-[0.25em] uppercase font-semibold transition-all hover:brightness-110 active:scale-[0.99] shadow-[0_0_20px_rgba(183,215,193,0.3)]"
            >
              Enter Studio
            </button>

            <Link
              to="/"
              className="mt-6 flex items-center justify-center gap-2 text-xs tracking-[0.2em] uppercase text-[#AFAFAE] hover:text-[#D9D9D9] transition-colors pt-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Website
            </Link>
          </form>
        </div>
      </main>
    );
  }

  return (
    <AdminDashboard
      onLogout={() => {
        sessionStorage.removeItem(AUTH_KEY);
        sessionStorage.removeItem("sunny-admin-session");
        setAuthenticated(false);
        toast.info("Logged out of studio administration.");
      }}
    />
  );
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<"media" | "categories" | "cms">("media");

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-[#AFAFAE] px-4 sm:px-8 py-10 md:py-14">
      <div className="max-w-7xl mx-auto">
        {/* Portal Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-8 border-b border-[#6B6A69]/20">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--sage)] shadow-[0_0_10px_var(--sage)]" />
              <p className="text-[11px] tracking-[0.45em] uppercase text-[var(--sage)] font-semibold">
                Sunny Concepts / Studio Portal
              </p>
            </div>
            <h1 className="mt-3 text-4xl sm:text-5xl font-light text-[#D9D9D9] tracking-tight">
              Studio Management
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="glass rounded-full px-5 py-2.5 text-xs tracking-[0.22em] uppercase text-[#D9D9D9] hover:border-white/30 transition-all flex items-center gap-1.5"
            >
              <ExternalLink className="w-3 h-3" />
              Live Site
            </Link>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 rounded-full border border-red-500/20 bg-red-950/20 px-5 py-2.5 text-xs tracking-[0.22em] uppercase text-red-400 hover:bg-red-900/40 hover:text-red-300 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-3 mt-8 border-b border-[#6B6A69]/20 pb-4">
          <button
            onClick={() => setActiveTab("media")}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs tracking-[0.25em] uppercase font-semibold transition-all ${
              activeTab === "media"
                ? "bg-[var(--sage)] text-[#0F0F0F] shadow-[0_0_20px_rgba(183,215,193,0.3)]"
                : "glass text-[#AFAFAE] hover:text-[#D9D9D9]"
            }`}
          >
            <FolderPlus className="w-4 h-4" />
            Media Library
          </button>

          <button
            onClick={() => setActiveTab("categories")}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs tracking-[0.25em] uppercase font-semibold transition-all ${
              activeTab === "categories"
                ? "bg-[var(--sage)] text-[#0F0F0F] shadow-[0_0_20px_rgba(183,215,193,0.3)]"
                : "glass text-[#AFAFAE] hover:text-[#D9D9D9]"
            }`}
          >
            <Layers className="w-4 h-4" />
            Portfolio Categories
          </button>

          <button
            onClick={() => setActiveTab("cms")}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs tracking-[0.25em] uppercase font-semibold transition-all ${
              activeTab === "cms"
                ? "bg-[var(--sage)] text-[#0F0F0F] shadow-[0_0_20px_rgba(183,215,193,0.3)]"
                : "glass text-[#AFAFAE] hover:text-[#D9D9D9]"
            }`}
          >
            <Save className="w-4 h-4" />
            Site Content Manager
          </button>
        </div>

        {/* Tab Body */}
        <div className="mt-8">
          {activeTab === "media" && <BatchMediaManagerTab />}
          {activeTab === "categories" && <CategoryManagerTab />}
          {activeTab === "cms" && <UniversalCmsTab />}
        </div>
      </div>
    </main>
  );
}

// ===================================================================
// TAB 1: MEDIA LIBRARY & PORTFOLIO
// ===================================================================
function BatchMediaManagerTab() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoadingItems, setIsLoadingItems] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [batchCategory, setBatchCategory] = useState("Brand Identity");
  const [defaultTitlePrefix, setDefaultTitlePrefix] = useState("");
  const [batchDescription, setBatchDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{
    completed: number;
    total: number;
    current?: string;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { categories } = usePortfolioCategories();

  const loadItems = async () => {
    setIsLoadingItems(true);
    if (!supabase) {
      setIsLoadingItems(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from("portfolio_items")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        setItems(data as PortfolioItem[]);
      }
    } catch (e) {
      console.error("Load items error:", e);
    } finally {
      setIsLoadingItems(false);
    }
  };

  useEffect(() => {
    void loadItems();
  }, []);

  const handleFilesSelected = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const newFiles = Array.from(files);
    setSelectedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesSelected(e.dataTransfer.files);
    }
  };

  // Add selected media to the portfolio
  const handleBatchUpload = async (e: React.FormEvent) => {
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
    setUploadProgress({ completed: 0, total: selectedFiles.length });

    try {
      // 1. Add files to the media library
      const uploadResults = await batchUploadToCloudinary(
        selectedFiles,
        (completed, total, current) => {
          setUploadProgress({ completed, total, current });
        },
      );

      // 2. Prepare portfolio entries
      const now = new Date().toISOString();
      const recordsToInsert = uploadResults.map((res, i) => {
        const rawName = res.original_filename.replace(/\.[^/.]+$/, "");
        const cleanTitle = defaultTitlePrefix.trim()
          ? selectedFiles.length > 1
            ? `${defaultTitlePrefix.trim()} ${String(i + 1).padStart(2, "0")}`
            : defaultTitlePrefix.trim()
          : rawName.replace(/[-_]/g, " ");

        return {
          title: cleanTitle,
          category: batchCategory,
          image_url: optimizeCloudinaryUrl(res.secure_url || res.url),
          description: batchDescription.trim() || null,
          storage_path: res.public_id,
          created_at: now,
        };
      });

      // 3. Batch atomic insert into portfolio_items
      const { data, error } = await supabase
        .from("portfolio_items")
        .insert(recordsToInsert)
        .select();

      if (error) {
        throw new Error(`Could not add the selected media: ${error.message}`);
      }

      toast.success(
        `Upload complete. Successfully added ${recordsToInsert.length} asset${
          recordsToInsert.length > 1 ? "s" : ""
        } to ${batchCategory}.`,
      );

      // Reset form
      setSelectedFiles([]);
      setDefaultTitlePrefix("");
      setBatchDescription("");
      setUploadProgress(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      await loadItems();
    } catch (err: any) {
      console.error("Batch upload failed:", err);
      toast.error(err?.message || "Failed to complete batch upload.");
    } finally {
      setIsUploading(false);
    }
  };

  // Open the multi-file upload panel
  const launchCloudinaryWidget = async () => {
    try {
      toast.loading("Opening upload panel...", { id: "cld-widget" });
      await openCloudinaryMultiUploadWidget({
        folder: `sunny_concepts/${batchCategory.toLowerCase().replace(/\s+/g, "_")}`,
        onBatchComplete: async (results) => {
          if (!supabase || results.length === 0) return;
          try {
            const now = new Date().toISOString();
            const records = results.map((res, idx) => ({
              title:
                res.original_filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ") ||
                `Asset ${idx + 1}`,
              category: batchCategory,
              image_url: optimizeCloudinaryUrl(res.secure_url || res.url),
              description: null,
              storage_path: res.public_id,
              created_at: now,
            }));

            const { error } = await supabase.from("portfolio_items").insert(records);
            if (error) throw error;

            toast.success(`Upload complete. Added ${records.length} assets to ${batchCategory}.`);
            await loadItems();
          } catch (e: any) {
            toast.error(`Could not save the portfolio entries: ${e.message}`);
          }
        },
      });
      toast.dismiss("cld-widget");
    } catch (e: any) {
      toast.dismiss("cld-widget");
      toast.error(e?.message || "Could not open the upload panel.");
    }
  };

  const handleDeleteItem = async (item: PortfolioItem) => {
    if (!window.confirm(`Permanently remove "${item.title}" from the portfolio archive?`)) {
      return;
    }
    if (!supabase) return;

    try {
      const { error } = await supabase.from("portfolio_items").delete().eq("id", item.id);
      if (error) throw error;
      toast.success(`Asset Removed Successfully: "${item.title}".`);
      setItems((prev) => prev.filter((p) => p.id !== item.id));
    } catch (e: any) {
      toast.error(e?.message || "Failed to delete item.");
    }
  };

  return (
    <div className="grid lg:grid-cols-[1.1fr_1.4fr] gap-8">
      {/* Batch Upload Form Card */}
      <div className="glass rounded-3xl p-6 sm:p-8 h-fit border border-[#6B6A69]/20 shadow-xl bg-[#3F3F3D]">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h2 className="text-2xl font-light text-[#D9D9D9]">Add Portfolio Media</h2>
            <p className="mt-1 text-xs text-[#AFAFAE]">
              Add multiple images at once and prepare them for the portfolio.
            </p>
          </div>
          <button
            type="button"
            onClick={launchCloudinaryWidget}
            className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-[11px] tracking-[0.18em] uppercase font-semibold bg-[var(--sage)]/15 border border-[var(--sage)]/30 text-[var(--sage)] hover:bg-[var(--sage)]/25 transition-all"
            title="Open upload panel"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Upload Asset
          </button>
        </div>

        <form onSubmit={handleBatchUpload} className="mt-6 space-y-5">
          {/* Drag & Drop Multi-File Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition-all ${
              isDragging
                ? "border-[var(--sage)] bg-[var(--sage)]/10"
                : "border-[#6B6A69]/25 bg-[#0F0F0F] hover:border-white/30"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFilesSelected(e.target.files)}
            />

            <div className="flex flex-col items-center justify-center py-4">
              <Upload className="w-8 h-8 text-[var(--sage)] mb-2" />
              <p className="text-sm text-[#D9D9D9] font-medium">
                {selectedFiles.length > 0
                  ? `${selectedFiles.length} file${selectedFiles.length > 1 ? "s" : ""} queued for batch upload`
                  : "Drag & drop multiple images here"}
              </p>
              <p className="text-xs text-[#AFAFAE] mt-1">
                or click to browse your system (batch mode)
              </p>
              <span className="mt-3 text-[10px] tracking-[0.2em] uppercase glass rounded-full px-3 py-1 text-[#AFAFAE]">
                PNG, JPG, WEBP, AVIF — MULTIPLE: TRUE
              </span>
            </div>
          </div>

          {/* Selected File Previews / Queue */}
          {selectedFiles.length > 0 && (
            <div className="rounded-2xl border border-[#6B6A69]/20 bg-[#0F0F0F] p-4 max-h-48 overflow-y-auto space-y-2">
              <div className="flex justify-between items-center text-xs text-[#AFAFAE] pb-1 border-b border-white/5">
                <span>Selected queue ({selectedFiles.length} files)</span>
                <button
                  type="button"
                  onClick={() => setSelectedFiles([])}
                  className="text-red-400 hover:text-red-300 text-[11px]"
                >
                  Clear all
                </button>
              </div>
              {selectedFiles.map((f, idx) => (
                <div
                  key={`queued-file-${idx}-${f.name}`}
                  className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-white/5"
                >
                  <span className="truncate max-w-[240px] text-[#D9D9D9]">{f.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-[#AFAFAE]">
                      {(f.size / 1024).toFixed(0)} KB
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFiles((prev) => prev.filter((_, i) => i !== idx));
                      }}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Category Assignment */}
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-[#AFAFAE] mb-2 font-medium">
              Category Assignment
            </label>
            <select
              value={batchCategory}
              onChange={(e) => setBatchCategory(e.target.value)}
              className="w-full rounded-2xl bg-[#0F0F0F] border border-[#6B6A69]/25 px-4 py-3 text-sm text-[#D9D9D9] outline-none focus:border-[var(--sage)]"
            >
              {categories.map((c) => (
                <option key={`cat-select-${c.id}`} value={c.name} className="bg-[#3F3F3D]">
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Optional Title Prefix */}
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-[#AFAFAE] mb-2 font-medium">
              Title / Series Prefix{" "}
              <span className="text-[#AFAFAE]/50 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={defaultTitlePrefix}
              onChange={(e) => setDefaultTitlePrefix(e.target.value)}
              placeholder="e.g. Minimalist Identity or Art Cover"
              className="w-full rounded-2xl bg-[#0F0F0F] border border-[#6B6A69]/25 px-4 py-3 text-sm text-[#D9D9D9] outline-none focus:border-[var(--sage)] placeholder:text-[#AFAFAE]/40"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-[#AFAFAE] mb-2 font-medium">
              Description / Notes <span className="text-[#AFAFAE]/50 font-normal">(optional)</span>
            </label>
            <textarea
              value={batchDescription}
              onChange={(e) => setBatchDescription(e.target.value)}
              rows={2}
              placeholder="Short commentary on the project background..."
              className="w-full rounded-2xl bg-[#0F0F0F] border border-[#6B6A69]/25 px-4 py-3 text-sm text-[#D9D9D9] outline-none focus:border-[var(--sage)] placeholder:text-[#AFAFAE]/40"
            />
          </div>

          {/* Progress Indicator */}
          {uploadProgress && (
            <div className="space-y-1.5 p-3 rounded-xl bg-white/5 border border-[#6B6A69]/20">
              <div className="flex justify-between text-xs text-[#D9D9D9]">
                <span>Uploading assets...</span>
                <span>
                  {uploadProgress.completed} / {uploadProgress.total}
                </span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--sage)] transition-all duration-300"
                  style={{
                    width: `${Math.round((uploadProgress.completed / uploadProgress.total) * 100)}%`,
                  }}
                />
              </div>
              {uploadProgress.current && (
                <p className="text-[10px] text-[#AFAFAE] truncate">
                  Current: {uploadProgress.current}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isUploading || selectedFiles.length === 0}
            className={`w-full rounded-2xl py-3.5 text-xs tracking-[0.25em] uppercase font-semibold transition-all flex items-center justify-center gap-2 ${
              isUploading || selectedFiles.length === 0
                ? "bg-white/10 text-white/40 cursor-not-allowed"
                : "bg-[var(--sage)] text-[#0F0F0F] hover:brightness-110 active:scale-[0.99] shadow-[0_0_20px_rgba(183,215,193,0.3)]"
            }`}
          >
            {isUploading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Adding assets to the portfolio...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                {selectedFiles.length > 0
                  ? `Upload ${selectedFiles.length} Asset${selectedFiles.length > 1 ? "s" : ""}`
                  : "Upload Asset"}
              </>
            )}
          </button>
        </form>
      </div>

      {/* Cataloged Items List */}
      <div className="glass rounded-3xl p-6 sm:p-8 border border-[#6B6A69]/20 shadow-xl bg-[#3F3F3D]">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-light text-[#D9D9D9]">Live Portfolio Archive</h2>
            <p className="text-xs text-[#AFAFAE]">
              {items.length} portfolio asset{items.length !== 1 ? "s" : ""} currently published
            </p>
          </div>
          <button
            onClick={loadItems}
            className="glass rounded-full p-2.5 text-[#AFAFAE] hover:text-[#D9D9D9] transition-colors"
            title="Refresh portfolio"
          >
            <RefreshCw className={`w-4 h-4 ${isLoadingItems ? "animate-spin" : ""}`} />
          </button>
        </div>

        {isLoadingItems ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={`item-skel-${i}`} className="h-16 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-[#6B6A69]/20 bg-[#0F0F0F] p-12 text-center">
            <ImageIcon className="w-10 h-10 mx-auto text-[#AFAFAE]/40 mb-3" />
            <p className="text-sm text-[#D9D9D9]">No portfolio assets yet.</p>
            <p className="text-xs text-[#AFAFAE] mt-1">
              Select files or use the upload panel on the left to start publishing.
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[680px] overflow-y-auto pr-1">
            {items.map((item) => (
              <div
                key={`admin-portfolio-item-${item.id}`}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0F0F0F] border border-[#6B6A69]/20 hover:border-white/20 transition-all gap-4"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="h-14 w-14 shrink-0 rounded-xl overflow-hidden bg-black/50 border border-[#6B6A69]/20">
                    <img
                      src={optimizeCloudinaryUrl(item.image_url)}
                      alt={item.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm text-[#D9D9D9] truncate font-medium">{item.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full bg-[var(--sage)]/10 text-[var(--sage)] font-mono">
                        {item.category}
                      </span>
                      {item.created_at && (
                        <span className="text-[10px] text-[#AFAFAE]">
                          {new Date(item.created_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={item.image_url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl text-[#AFAFAE] hover:text-[#D9D9D9] hover:bg-white/5 transition-all"
                    title="Open CDN Image"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => handleDeleteItem(item)}
                    className="p-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-all"
                    title="Delete Asset"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ===================================================================
// TAB 2: CATEGORY MANAGEMENT SYSTEM (FULL CRUD)
// ===================================================================
function CategoryManagerTab() {
  const { categories, refresh, setCategories } = usePortfolioCategories();
  const [newCatName, setNewCatName] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [deletingCat, setDeletingCat] = useState<PortfolioCategory | null>(null);
  const [itemCounts, setItemCounts] = useState<Record<string, number>>({});
  const [reassignCategoryName, setReassignCategoryName] = useState<string>("");

  useEffect(() => {
    // Load item counts for each category
    const loadCounts = async () => {
      const counts: Record<string, number> = {};
      for (const cat of categories) {
        counts[cat.id] = await countItemsForCategory(cat.name, cat.slug);
      }
      setItemCounts(counts);
    };
    void loadCounts();
  }, [categories]);

  const handleAddCategory = async (e: React.FormEvent) => {
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

  const handleStartRename = (cat: PortfolioCategory) => {
    setEditingId(cat.id);
    setEditingName(cat.name);
  };

  const handleSaveRename = async (cat: PortfolioCategory) => {
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

  const handleMove = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= categories.length) return;

    const reordered = [...categories];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);

    setCategories(reordered);
    await reorderCategories(reordered);
    toast.success("Category order updated.");
  };

  const confirmDeleteCategory = async (deleteAssociated: boolean) => {
    if (!deletingCat) return;

    const res = await deleteCategory({
      id: deletingCat.id,
      reassignToName: deleteAssociated ? undefined : reassignCategoryName || undefined,
      deleteAssociatedItems: deleteAssociated,
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

  return (
    <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8">
      {/* Create Category Panel */}
      <div className="glass rounded-3xl p-6 sm:p-8 h-fit border border-[#6B6A69]/20 shadow-xl bg-[#3F3F3D]">
        <h2 className="text-2xl font-light text-[#D9D9D9]">Add New Category</h2>
        <p className="mt-1 text-xs text-[#AFAFAE]">
          Create a new portfolio discipline. Landing page filter tabs update automatically.
        </p>

        <form onSubmit={handleAddCategory} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-[#AFAFAE] mb-2 font-medium">
              Category Name
            </label>
            <input
              type="text"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              placeholder="e.g. 3D Architectural Renders"
              className="w-full rounded-2xl bg-[#0F0F0F] border border-[#6B6A69]/25 px-4 py-3.5 text-sm text-[#D9D9D9] outline-none focus:border-[var(--sage)]"
            />
          </div>

          <button
            type="submit"
            disabled={isAdding || !newCatName.trim()}
            className={`w-full rounded-2xl py-3.5 text-xs tracking-[0.25em] uppercase font-semibold transition-all flex items-center justify-center gap-2 ${
              isAdding || !newCatName.trim()
                ? "bg-white/10 text-white/40 cursor-not-allowed"
                : "bg-[var(--sage)] text-[#0F0F0F] hover:brightness-110 active:scale-[0.99] shadow-[0_0_20px_rgba(183,215,193,0.3)]"
            }`}
          >
            <Plus className="w-4 h-4" />
            Add Category
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#6B6A69]/20">
          <h3 className="text-xs uppercase tracking-[0.2em] text-[#D9D9D9] font-semibold mb-2">
            Safety & Auto-Relinking Note
          </h3>
          <p className="text-xs text-[#AFAFAE] leading-relaxed">
            Renaming a category automatically updates its portfolio entries. Removing a category
            lets you move its portfolio assets first or remove them cleanly.
          </p>
        </div>
      </div>

      {/* Categories CRUD List */}
      <div className="glass rounded-3xl p-6 sm:p-8 border border-[#6B6A69]/20 shadow-xl bg-[#3F3F3D]">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-light text-[#D9D9D9]">Active Portfolio Categories</h2>
            <p className="text-xs text-[#AFAFAE]">
              {categories.length} categories configured with real-time asset counts
            </p>
          </div>
          <button
            onClick={() => refresh()}
            className="glass rounded-full p-2.5 text-[#AFAFAE] hover:text-[#D9D9D9] transition-colors"
            title="Refresh categories"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {categories.map((cat, idx) => {
            const count = itemCounts[cat.id] ?? 0;
            const isEditing = editingId === cat.id;

            return (
              <div
                key={`cat-crud-${cat.id}`}
                className="flex items-center justify-between p-4 rounded-2xl bg-[#0F0F0F] border border-[#6B6A69]/20 hover:border-white/20 transition-all gap-4"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {/* Reorder Buttons */}
                  <div className="flex flex-col gap-1 shrink-0">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMove(idx, "up")}
                      className={`p-1 rounded text-xs transition-colors ${
                        idx === 0
                          ? "text-white/10"
                          : "text-[#AFAFAE] hover:text-[#D9D9D9] hover:bg-white/5"
                      }`}
                      title="Move up"
                    >
                      ▲
                    </button>
                    <button
                      type="button"
                      disabled={idx === categories.length - 1}
                      onClick={() => handleMove(idx, "down")}
                      className={`p-1 rounded text-xs transition-colors ${
                        idx === categories.length - 1
                          ? "text-white/10"
                          : "text-[#AFAFAE] hover:text-[#D9D9D9] hover:bg-white/5"
                      }`}
                      title="Move down"
                    >
                      ▼
                    </button>
                  </div>

                  {/* Name / Edit input */}
                  {isEditing ? (
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="rounded-xl bg-[#3F3F3D] border border-[var(--sage)] px-3 py-1.5 text-sm text-[#D9D9D9] outline-none flex-1"
                        autoFocus
                      />
                      <button
                        onClick={() => handleSaveRename(cat)}
                        className="p-2 rounded-xl bg-[var(--sage)] text-[#0F0F0F] hover:brightness-110"
                        title="Save rename"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="p-2 rounded-xl bg-white/10 text-[#D9D9D9] hover:bg-white/20"
                        title="Cancel"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="min-w-0">
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm font-medium text-[#D9D9D9]">{cat.name}</span>
                        <span className="text-[10px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full bg-white/5 text-[#AFAFAE] font-mono">
                          {cat.slug}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#AFAFAE] mt-0.5">
                        {count} asset{count !== 1 ? "s" : ""} cataloged
                      </p>
                    </div>
                  )}
                </div>

                {!isEditing && (
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleStartRename(cat)}
                      className="p-2 rounded-xl text-[#AFAFAE] hover:text-[#D9D9D9] hover:bg-white/5 transition-all"
                      title="Rename Category"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeletingCat(cat)}
                      className="p-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-all"
                      title="Delete Category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Safety Modal for Category Deletion */}
      {deletingCat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-strong rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#6B6A69]/25 bg-[#3F3F3D]">
            <h3 className="text-xl font-light text-[#D9D9D9]">
              Delete Category: "{deletingCat.name}"
            </h3>
            <p className="mt-2 text-sm text-[#AFAFAE] leading-relaxed">
              There are currently {itemCounts[deletingCat.id] ?? 0} assets assigned to this
              category. How would you like to handle existing assets?
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-[#AFAFAE] mb-2 font-medium">
                  Option A: Reassign assets to another category
                </label>
                <select
                  value={reassignCategoryName}
                  onChange={(e) => setReassignCategoryName(e.target.value)}
                  className="w-full rounded-2xl bg-[#0F0F0F] border border-[#6B6A69]/25 px-4 py-3 text-sm text-[#D9D9D9] outline-none"
                >
                  <option value="" className="bg-[#3F3F3D]">
                    Select destination category...
                  </option>
                  {categories
                    .filter((c) => c.id !== deletingCat.id)
                    .map((c) => (
                      <option
                        key={`reassign-target-${c.id}`}
                        value={c.name}
                        className="bg-[#3F3F3D]"
                      >
                        {c.name}
                      </option>
                    ))}
                </select>

                <button
                  type="button"
                  disabled={!reassignCategoryName}
                  onClick={() => confirmDeleteCategory(false)}
                  className={`mt-2 w-full rounded-xl py-2.5 text-xs uppercase tracking-[0.2em] font-semibold transition-all ${
                    reassignCategoryName
                      ? "bg-[var(--sage)] text-[#0F0F0F] hover:brightness-110"
                      : "bg-white/10 text-white/30 cursor-not-allowed"
                  }`}
                >
                  Reassign Assets & Delete Category
                </button>
              </div>

              <div className="pt-4 border-t border-[#6B6A69]/20">
                <label className="block text-xs uppercase tracking-[0.2em] text-red-400 mb-2 font-medium">
                  Option B: Permanently delete all associated assets
                </label>
                <button
                  type="button"
                  onClick={() => confirmDeleteCategory(true)}
                  className="w-full rounded-xl py-2.5 text-xs uppercase tracking-[0.2em] font-semibold bg-red-950/40 border border-red-500/30 text-red-400 hover:bg-red-900/50 transition-all"
                >
                  Delete Category and All Its Assets
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setDeletingCat(null)}
              className="mt-6 w-full rounded-xl py-2.5 text-xs uppercase tracking-[0.2em] glass text-[#AFAFAE] hover:text-[#D9D9D9] transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ===================================================================
// TAB 3: UNIVERSAL CMS & VISUAL EDITOR
// ===================================================================
function UniversalCmsTab() {
  const { settings, updateSetting } = useSiteSettings();
  const [formData, setFormData] = useState<SiteSettings>(settings);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingPortrait, setIsUploadingPortrait] = useState(false);
  const portraitInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleChange = (field: keyof SiteSettings, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveAll = async (e: React.FormEvent) => {
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

  // Add the founder portrait to the media library
  const handlePortraitUpload = async (file: File | null) => {
    if (!file) return;
    setIsUploadingPortrait(true);
    toast.loading("Adding founder portrait...", { id: "founder-upload" });

    try {
      const uploadRes = await uploadToCloudinary(file, `founder-portrait-${Date.now()}`);
      const optimizedUrl = optimizeCloudinaryUrl(uploadRes.secure_url || uploadRes.url);

      handleChange("about_founder_portrait_url", optimizedUrl);

      // Auto-save portrait URL to database immediately
      await persistSiteSettings({ about_founder_portrait_url: optimizedUrl });
      toast.dismiss("founder-upload");
      toast.success("Upload complete. Founder portrait updated successfully.");
    } catch (err: any) {
      toast.dismiss("founder-upload");
      toast.error(err?.message || "Failed to upload founder portrait.");
    } finally {
      setIsUploadingPortrait(false);
    }
  };

  return (
    <form onSubmit={handleSaveAll} className="space-y-10">
      {/* Action Bar Sticky Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-5 rounded-2xl glass border border-[#6B6A69]/25 bg-[#3F3F3D] sticky top-4 z-20 shadow-xl">
        <div>
          <h2 className="text-xl font-light text-[#D9D9D9]">Site Content Manager</h2>
          <p className="text-xs text-[#AFAFAE]">
            Edit the words and visuals that appear across the Sunny Concepts website.
          </p>
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className={`flex items-center gap-2 px-8 py-3.5 rounded-2xl text-xs tracking-[0.25em] uppercase font-semibold transition-all ${
            isSaving
              ? "bg-white/10 text-white/40 cursor-not-allowed"
              : "bg-[var(--sage)] text-[#0F0F0F] hover:brightness-110 active:scale-[0.99] shadow-[0_0_20px_rgba(183,215,193,0.3)]"
          }`}
        >
          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save All Changes
        </button>
      </div>

      {/* 1. CEO / FOUNDER PROFILE */}
      <div className="glass rounded-3xl p-6 sm:p-8 border border-[#6B6A69]/20 bg-[#3F3F3D]">
        <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-[#6B6A69]/20">
          <span className="h-2 w-2 rounded-full bg-[var(--sage)]" />
          <h3 className="text-lg font-light text-[#D9D9D9] uppercase tracking-[0.2em]">
            1. CEO & Founder Profile
          </h3>
        </div>

        <div className="grid md:grid-cols-[240px_1fr] gap-8">
          {/* Portrait Uploader */}
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-[#AFAFAE] mb-2 font-medium">
              Founder Portrait
            </label>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#6B6A69]/25 bg-[#0F0F0F] flex flex-col items-center justify-center group">
              {formData.about_founder_portrait_url ? (
                <>
                  <img
                    src={optimizeCloudinaryUrl(formData.about_founder_portrait_url)}
                    alt="Founder Portrait"
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <button
                      type="button"
                      onClick={() => portraitInputRef.current?.click()}
                      className="rounded-full px-4 py-2 bg-[var(--sage)] text-[#0F0F0F] text-xs font-semibold uppercase tracking-wider"
                    >
                      Replace
                    </button>
                  </div>
                </>
              ) : (
                <div
                  onClick={() => portraitInputRef.current?.click()}
                  className="cursor-pointer text-center p-4 flex flex-col items-center"
                >
                  <Upload className="w-8 h-8 text-[var(--sage)] mb-2" />
                  <p className="text-xs text-[#D9D9D9] font-medium">Upload Portrait</p>
                  <p className="text-[10px] text-[#AFAFAE] mt-1">Add to Media Library</p>
                </div>
              )}

              {isUploadingPortrait && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-[var(--sage)] animate-spin" />
                </div>
              )}
            </div>

            <input
              ref={portraitInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handlePortraitUpload(e.target.files?.[0] || null)}
            />

            <button
              type="button"
              onClick={() => portraitInputRef.current?.click()}
              className="mt-3 w-full rounded-xl py-2 text-[11px] tracking-[0.18em] uppercase glass hover:border-white/30 text-[#D9D9D9] transition-all"
            >
              Upload Asset
            </button>
          </div>

          {/* Founder Bio Fields */}
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-[#AFAFAE] mb-2 font-medium">
                  Founder Name
                </label>
                <input
                  type="text"
                  value={formData.about_founder_name}
                  onChange={(e) => handleChange("about_founder_name", e.target.value)}
                  className="w-full rounded-2xl bg-[#0F0F0F] border border-[#6B6A69]/25 px-4 py-3 text-sm text-[#D9D9D9] outline-none focus:border-[var(--sage)]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-[#AFAFAE] mb-2 font-medium">
                  Founder Title
                </label>
                <input
                  type="text"
                  value={formData.about_founder_title}
                  onChange={(e) => handleChange("about_founder_title", e.target.value)}
                  className="w-full rounded-2xl bg-[#0F0F0F] border border-[#6B6A69]/25 px-4 py-3 text-sm text-[#D9D9D9] outline-none focus:border-[var(--sage)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-[#AFAFAE] mb-2 font-medium">
                Founder Bio (Paragraph 1)
              </label>
              <textarea
                rows={3}
                value={formData.about_bio_p1}
                onChange={(e) => handleChange("about_bio_p1", e.target.value)}
                className="w-full rounded-2xl bg-[#0F0F0F] border border-[#6B6A69]/25 px-4 py-3 text-sm text-[#D9D9D9] outline-none focus:border-[var(--sage)]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-[#AFAFAE] mb-2 font-medium">
                Founder Bio (Paragraph 2)
              </label>
              <textarea
                rows={3}
                value={formData.about_bio_p2}
                onChange={(e) => handleChange("about_bio_p2", e.target.value)}
                className="w-full rounded-2xl bg-[#0F0F0F] border border-[#6B6A69]/25 px-4 py-3 text-sm text-[#D9D9D9] outline-none focus:border-[var(--sage)]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-[#AFAFAE] mb-2 font-medium">
                Company Mission Statement
              </label>
              <input
                type="text"
                value={formData.about_mission}
                onChange={(e) => handleChange("about_mission", e.target.value)}
                className="w-full rounded-2xl bg-[#0F0F0F] border border-[#6B6A69]/25 px-4 py-3 text-sm text-[#D9D9D9] outline-none focus:border-[var(--sage)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <div className="glass rounded-3xl p-6 sm:p-8 border border-[#6B6A69]/20 bg-[#3F3F3D]">
        <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-[#6B6A69]/20">
          <span className="h-2 w-2 rounded-full bg-[var(--sage)]" />
          <h3 className="text-lg font-light text-[#D9D9D9] uppercase tracking-[0.2em]">
            2. Hero Section
          </h3>
        </div>

        <div className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-[#AFAFAE] mb-2 font-medium">
                Headline (Line 1)
              </label>
              <input
                type="text"
                value={formData.hero_headline_line1}
                onChange={(e) => handleChange("hero_headline_line1", e.target.value)}
                className="w-full rounded-2xl bg-[#0F0F0F] border border-[#6B6A69]/25 px-4 py-3 text-sm text-[#D9D9D9] outline-none focus:border-[var(--sage)]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-[#AFAFAE] mb-2 font-medium">
                Headline (Italic Accent)
              </label>
              <input
                type="text"
                value={formData.hero_headline_italic}
                onChange={(e) => handleChange("hero_headline_italic", e.target.value)}
                className="w-full rounded-2xl bg-[#0F0F0F] border border-[#6B6A69]/25 px-4 py-3 text-sm text-[#D9D9D9] outline-none focus:border-[var(--sage)]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-[#AFAFAE] mb-2 font-medium">
                Headline (Line 2)
              </label>
              <input
                type="text"
                value={formData.hero_headline_line2}
                onChange={(e) => handleChange("hero_headline_line2", e.target.value)}
                className="w-full rounded-2xl bg-[#0F0F0F] border border-[#6B6A69]/25 px-4 py-3 text-sm text-[#D9D9D9] outline-none focus:border-[var(--sage)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-[#AFAFAE] mb-2 font-medium">
              Hero Subtitle
            </label>
            <input
              type="text"
              value={formData.hero_subtitle}
              onChange={(e) => handleChange("hero_subtitle", e.target.value)}
              className="w-full rounded-2xl bg-[#0F0F0F] border border-[#6B6A69]/25 px-4 py-3 text-sm text-[#D9D9D9] outline-none focus:border-[var(--sage)]"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6 pt-2">
            <div className="p-4 rounded-2xl bg-[#0F0F0F] border border-[#6B6A69]/20 space-y-3">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--sage)] font-mono">
                Primary CTA Button
              </span>
              <div>
                <label className="block text-[11px] text-[#AFAFAE] mb-1">Button Label</label>
                <input
                  type="text"
                  value={formData.hero_cta_portfolio_text}
                  onChange={(e) => handleChange("hero_cta_portfolio_text", e.target.value)}
                  className="w-full rounded-xl bg-[#3F3F3D] border border-[#6B6A69]/25 px-3 py-2 text-xs text-[#D9D9D9] outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#AFAFAE] mb-1">Target Href (Link)</label>
                <input
                  type="text"
                  value={formData.hero_cta_portfolio_href}
                  onChange={(e) => handleChange("hero_cta_portfolio_href", e.target.value)}
                  className="w-full rounded-xl bg-[#3F3F3D] border border-[#6B6A69]/25 px-3 py-2 text-xs text-[#D9D9D9] outline-none"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0F0F0F] border border-[#6B6A69]/20 space-y-3">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--sage)] font-mono">
                Secondary CTA Button
              </span>
              <div>
                <label className="block text-[11px] text-[#AFAFAE] mb-1">Button Label</label>
                <input
                  type="text"
                  value={formData.hero_cta_contact_text}
                  onChange={(e) => handleChange("hero_cta_contact_text", e.target.value)}
                  className="w-full rounded-xl bg-[#3F3F3D] border border-[#6B6A69]/25 px-3 py-2 text-xs text-[#D9D9D9] outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#AFAFAE] mb-1">Target Href (Link)</label>
                <input
                  type="text"
                  value={formData.hero_cta_contact_href}
                  onChange={(e) => handleChange("hero_cta_contact_href", e.target.value)}
                  className="w-full rounded-xl bg-[#3F3F3D] border border-[#6B6A69]/25 px-3 py-2 text-xs text-[#D9D9D9] outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SERVICES SECTION (4 DISCIPLINES) */}
      <div className="glass rounded-3xl p-6 sm:p-8 border border-[#6B6A69]/20 bg-[#3F3F3D]">
        <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-[#6B6A69]/20">
          <span className="h-2 w-2 rounded-full bg-[var(--sage)]" />
          <h3 className="text-lg font-light text-[#D9D9D9] uppercase tracking-[0.2em]">
            3. Services Section & Disciplines
          </h3>
        </div>

        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-[#AFAFAE] mb-2 font-medium">
                Section Headline
              </label>
              <input
                type="text"
                value={formData.services_headline}
                onChange={(e) => handleChange("services_headline", e.target.value)}
                className="w-full rounded-2xl bg-[#0F0F0F] border border-[#6B6A69]/25 px-4 py-3 text-sm text-[#D9D9D9] outline-none focus:border-[var(--sage)]"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-[#AFAFAE] mb-2 font-medium">
                Headline (Italic Accent)
              </label>
              <input
                type="text"
                value={formData.services_headline_italic}
                onChange={(e) => handleChange("services_headline_italic", e.target.value)}
                className="w-full rounded-2xl bg-[#0F0F0F] border border-[#6B6A69]/25 px-4 py-3 text-sm text-[#D9D9D9] outline-none focus:border-[var(--sage)]"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-2">
            {[1, 2, 3, 4].map((num) => {
              const numKey = `service_${num}_num` as keyof SiteSettings;
              const titleKey = `service_${num}_title` as keyof SiteSettings;
              const descKey = `service_${num}_desc` as keyof SiteSettings;

              return (
                <div
                  key={`service-editor-card-${num}`}
                  className="p-5 rounded-2xl bg-[#0F0F0F] border border-[#6B6A69]/20 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.25em] text-[var(--sage)] font-mono font-semibold">
                      Discipline #{num}
                    </span>
                    <input
                      type="text"
                      value={formData[numKey] as string}
                      onChange={(e) => handleChange(numKey, e.target.value)}
                      className="w-16 text-center rounded-lg bg-[#3F3F3D] border border-[#6B6A69]/25 px-2 py-1 text-xs text-[#D9D9D9] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#AFAFAE] mb-1">
                      Discipline Title
                    </label>
                    <input
                      type="text"
                      value={formData[titleKey] as string}
                      onChange={(e) => handleChange(titleKey, e.target.value)}
                      className="w-full rounded-xl bg-[#3F3F3D] border border-[#6B6A69]/25 px-3 py-2 text-xs text-[#D9D9D9] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#AFAFAE] mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={formData[descKey] as string}
                      onChange={(e) => handleChange(descKey, e.target.value)}
                      className="w-full rounded-xl bg-[#3F3F3D] border border-[#6B6A69]/25 px-3 py-2 text-xs text-[#D9D9D9] outline-none"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. CLIENT MARQUEE & BRAND COPY */}
      <div className="glass rounded-3xl p-6 sm:p-8 border border-[#6B6A69]/20 bg-[#3F3F3D]">
        <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-[#6B6A69]/20">
          <span className="h-2 w-2 rounded-full bg-[var(--sage)]" />
          <h3 className="text-lg font-light text-[#D9D9D9] uppercase tracking-[0.2em]">
            4. Client Marquee & Partner Brands
          </h3>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-[0.2em] text-[#AFAFAE] mb-2 font-medium">
            Client Brands (Comma-separated list)
          </label>
          <input
            type="text"
            value={formData.client_marquee_list}
            onChange={(e) => handleChange("client_marquee_list", e.target.value)}
            placeholder="Rommdar, Carlton Park, Kugye, Prince Delight, Habakkuk Godwin, Minister GSP"
            className="w-full rounded-2xl bg-[#0F0F0F] border border-[#6B6A69]/25 px-4 py-3 text-sm text-[#D9D9D9] outline-none focus:border-[var(--sage)]"
          />
          <p className="mt-2 text-xs text-[#AFAFAE]">
            Rendered across the client trust marquee on the public portfolio page.
          </p>
        </div>
      </div>

      {/* 5. FOOTER & CONTACT CHANNELS */}
      <div className="glass rounded-3xl p-6 sm:p-8 border border-[#6B6A69]/20 bg-[#3F3F3D]">
        <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-[#6B6A69]/20">
          <span className="h-2 w-2 rounded-full bg-[var(--sage)]" />
          <h3 className="text-lg font-light text-[#D9D9D9] uppercase tracking-[0.2em]">
            5. Footer & Contact Channels
          </h3>
        </div>

        <div className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-[#AFAFAE] mb-2 font-medium">
                Studio Email Address
              </label>
              <input
                type="email"
                value={formData.contact_email}
                onChange={(e) => handleChange("contact_email", e.target.value)}
                className="w-full rounded-2xl bg-[#0F0F0F] border border-[#6B6A69]/25 px-4 py-3 text-sm text-[#D9D9D9] outline-none focus:border-[var(--sage)]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-[#AFAFAE] mb-2 font-medium">
                Phone / WhatsApp Number
              </label>
              <input
                type="text"
                value={formData.contact_phone}
                onChange={(e) => handleChange("contact_phone", e.target.value)}
                className="w-full rounded-2xl bg-[#0F0F0F] border border-[#6B6A69]/25 px-4 py-3 text-sm text-[#D9D9D9] outline-none focus:border-[var(--sage)]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-[#AFAFAE] mb-2 font-medium">
                Studio Physical Location
              </label>
              <input
                type="text"
                value={formData.studio_location}
                onChange={(e) => handleChange("studio_location", e.target.value)}
                className="w-full rounded-2xl bg-[#0F0F0F] border border-[#6B6A69]/25 px-4 py-3 text-sm text-[#D9D9D9] outline-none focus:border-[var(--sage)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-[#AFAFAE] mb-2 font-medium">
              WhatsApp Pre-filled Greeting
            </label>
            <input
              type="text"
              value={formData.contact_whatsapp_text}
              onChange={(e) => handleChange("contact_whatsapp_text", e.target.value)}
              className="w-full rounded-2xl bg-[#0F0F0F] border border-[#6B6A69]/25 px-4 py-3 text-sm text-[#D9D9D9] outline-none focus:border-[var(--sage)]"
            />
          </div>

          <div className="pt-4 border-t border-[#6B6A69]/20">
            <span className="block text-xs uppercase tracking-[0.2em] text-[#D9D9D9] font-semibold mb-3">
              Social Media Profile Links
            </span>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] text-[#AFAFAE] mb-1">Instagram URL</label>
                <input
                  type="text"
                  value={formData.social_instagram}
                  onChange={(e) => handleChange("social_instagram", e.target.value)}
                  className="w-full rounded-xl bg-[#0F0F0F] border border-[#6B6A69]/25 px-3 py-2 text-xs text-[#D9D9D9] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] text-[#AFAFAE] mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  value={formData.social_linkedin}
                  onChange={(e) => handleChange("social_linkedin", e.target.value)}
                  className="w-full rounded-xl bg-[#0F0F0F] border border-[#6B6A69]/25 px-3 py-2 text-xs text-[#D9D9D9] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] text-[#AFAFAE] mb-1">X (Twitter) URL</label>
                <input
                  type="text"
                  value={formData.social_x}
                  onChange={(e) => handleChange("social_x", e.target.value)}
                  className="w-full rounded-xl bg-[#0F0F0F] border border-[#6B6A69]/25 px-3 py-2 text-xs text-[#D9D9D9] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] text-[#AFAFAE] mb-1">Facebook URL</label>
                <input
                  type="text"
                  value={formData.social_facebook}
                  onChange={(e) => handleChange("social_facebook", e.target.value)}
                  className="w-full rounded-xl bg-[#0F0F0F] border border-[#6B6A69]/25 px-3 py-2 text-xs text-[#D9D9D9] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] text-[#AFAFAE] mb-1">TikTok URL</label>
                <input
                  type="text"
                  value={formData.social_tiktok}
                  onChange={(e) => handleChange("social_tiktok", e.target.value)}
                  className="w-full rounded-xl bg-[#0F0F0F] border border-[#6B6A69]/25 px-3 py-2 text-xs text-[#D9D9D9] outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
