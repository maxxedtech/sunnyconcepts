import { lazy, Suspense, useEffect, useState } from "react";

const Scroll3DScene = lazy(() => import("./Scroll3DScene"));

export function LazyScroll3D() {
  const [mounted, setMounted] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Keep the ambient scene visible on mobile; its renderer is DPR-capped.
    setEnabled(!prefersReducedMotion);
  }, []);

  if (!mounted || !enabled) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <Scroll3DScene />
    </Suspense>
  );
}
