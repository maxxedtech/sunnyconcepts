import { build } from "esbuild";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { rm } from "node:fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function buildAll() {
  const distDir = path.resolve(__dirname, "dist");

  // Clean previous build
  await rm(distDir, { recursive: true, force: true });

  await build({
    entryPoints: [path.resolve(__dirname, "src/index.ts")],
    outdir: distDir,

    platform: "node",
    format: "esm",
    target: "node18",

    // 🔥 CRITICAL: DO NOT BUNDLE
    bundle: false,
    packages: "external",

    sourcemap: true,
    logLevel: "info",
  });
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
