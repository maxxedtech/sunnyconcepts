import { build } from "esbuild";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { rm } from "node:fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function buildAll() {
  const distDir = path.resolve(__dirname, "dist");

  // Clean dist
  await rm(distDir, { recursive: true, force: true });

  await build({
    entryPoints: [path.resolve(__dirname, "src/index.ts")],
    outdir: distDir,
    platform: "node",
    format: "esm",

    // ✅ CRITICAL FIX
    bundle: false,
    packages: "external",

    target: "node18",
    sourcemap: true,
    logLevel: "info",
  });
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
