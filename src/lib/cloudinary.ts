/**
 * Cloudinary Media Engine for Sunny Concepts
 * Handles single & batch uploads, on-the-fly format/quality optimization (f_auto,q_auto),
 * and the native Cloudinary Multi-File Upload Widget.
 */

export const CLOUDINARY_CLOUD_NAME =
  (import.meta.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string | undefined) || "dq2zje0ei";

export const CLOUDINARY_UPLOAD_PRESET =
  (import.meta.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string | undefined) || "sunny_concepts";

/**
 * Injects on-the-fly Cloudinary auto-optimization (`f_auto,q_auto`)
 * ensures HD imagery compresses cleanly into WebP / AVIF based on the browser.
 */
export function optimizeCloudinaryUrl(url: string, transformations = "f_auto,q_auto"): string {
  if (!url || typeof url !== "string") return url;
  if (!url.includes("res.cloudinary.com")) return url;
  if (url.includes("f_auto,q_auto")) return url;

  // Pattern: https://res.cloudinary.com/<cloud>/image/upload/(optional version/)(public_id)
  return url.replace(/\/image\/upload\/(?:v\d+\/)?/, (match) => {
    if (match.includes("/v")) {
      return match.replace("/upload/", `/upload/${transformations}/`);
    }
    return `/upload/${transformations}/`;
  });
}

export interface UploadResult {
  url: string;
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
  original_filename: string;
}

/**
 * Uploads a single file to Cloudinary unsigned upload preset
 */
export async function uploadToCloudinary(
  file: File | Blob,
  fileName?: string
): Promise<UploadResult> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  if (fileName) {
    formData.append("filename_override", fileName);
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
  const response = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => ({}));
    throw new Error(
      errorJson?.error?.message || `Cloudinary upload failed with status ${response.status}`
    );
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
    original_filename: json.original_filename || fileName || "file",
  };
}

/**
 * Uploads multiple files simultaneously in parallel with progress updates
 */
export async function batchUploadToCloudinary(
  files: File[],
  onProgress?: (completed: number, total: number, currentFileName?: string) => void
): Promise<UploadResult[]> {
  const total = files.length;
  let completed = 0;

  const uploadPromises = files.map(async (file) => {
    try {
      const result = await uploadToCloudinary(file, file.name);
      completed++;
      if (onProgress) {
        onProgress(completed, total, file.name);
      }
      return result;
    } catch (err) {
      console.error(`Failed to upload ${file.name}:`, err);
      throw err;
    }
  });

  return Promise.all(uploadPromises);
}

declare global {
  interface Window {
    cloudinary?: {
      createUploadWidget: (
        options: Record<string, any>,
        callback: (error: any, result: any) => void
      ) => {
        open: () => void;
        close: () => void;
      };
    };
  }
}

/**
 * Loads the Cloudinary Upload Widget script dynamically
 */
export function loadCloudinaryWidgetScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Window is not available"));
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
export async function openCloudinaryMultiUploadWidget({
  onSuccess,
  onBatchComplete,
  folder = "portfolio",
}: {
  onSuccess?: (result: UploadResult) => void;
  onBatchComplete?: (results: UploadResult[]) => void;
  folder?: string;
}): Promise<void> {
  await loadCloudinaryWidgetScript();

  if (!window.cloudinary) {
    throw new Error("Cloudinary widget script failed to initialize.");
  }

  const batchResults: UploadResult[] = [];

  const widget = window.cloudinary.createUploadWidget(
    {
      cloudName: CLOUDINARY_CLOUD_NAME,
      uploadPreset: CLOUDINARY_UPLOAD_PRESET,
      folder,
      multiple: true,
      maxFiles: 50,
      clientAllowedFormats: ["png", "jpg", "jpeg", "webp", "avif", "gif"],
      sources: ["local", "url", "camera", "dropbox", "google_drive"],
      styles: {
        palette: {
          window: "#070709",
          windowBorder: "#1e1e24",
          tabIcon: "#b7d7c1",
          menuIcons: "#A1A1AA",
          textDark: "#000000",
          textLight: "#F4F4F5",
          link: "#b7d7c1",
          action: "#b7d7c1",
          inactiveTabIcon: "#71717A",
          error: "#F87171",
          inProgress: "#b7d7c1",
          complete: "#34D399",
          sourceBg: "#111115",
        },
        fonts: {
          default: null,
          "'Inter', sans-serif": {
            url: "https://fonts.googleapis.com/css?family=Inter",
            active: true,
          },
        },
      },
    },
    (error: any, result: any) => {
      if (error) {
        console.error("Cloudinary widget error:", error);
        return;
      }

      if (result && result.event === "success") {
        const info = result.info;
        const optimizedUrl = optimizeCloudinaryUrl(info.secure_url || info.url);
        const item: UploadResult = {
          url: optimizedUrl,
          secure_url: optimizedUrl,
          public_id: info.public_id,
          format: info.format,
          width: info.width,
          height: info.height,
          original_filename: info.original_filename || "file",
        };
        batchResults.push(item);
        if (onSuccess) {
          onSuccess(item);
        }
      }

      if (result && (result.event === "close" || result.event === "queues-end")) {
        if (result.event === "queues-end" && onBatchComplete && batchResults.length > 0) {
          onBatchComplete(batchResults);
        }
      }
    }
  );

  widget.open();
}
