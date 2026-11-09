import { lazy, Suspense, useEffect, useState } from "react";

const Scroll3DScene = lazy(() => import("./Scroll3DScene"));

export function LazyScroll3D() {
  const [mounted, setMounted] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isLowPower =
      typeof navigator !== "undefined" &&
      navigator.hardwareConcurrency != null &&
      navigator.hardwareConcurrency <= 4;

    if (!isMobile && !prefersReducedMotion && !isLowPower) {
      setEnabled(true);
    }
  }, []);

  if (!mounted || !enabled) {
    return null;
  }

  return (
    <Suspense fallback={<div className="fixed inset-0 pointer-events-none z-[2]" aria-hidden="true" />}>
      <Scroll3DScene />
    </Suspense>
  );
}
