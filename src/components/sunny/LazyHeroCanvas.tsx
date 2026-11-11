import { lazy, Suspense, useEffect, useState } from "react";

const HeroCanvas = lazy(() => import("./HeroCanvas"));

export function LazyHeroCanvas() {
  const [mounted, setMounted] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Automatically unmount or freeze WebGL contexts on low-power mode or screens smaller than 768px
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isLowPower =
      typeof navigator !== "undefined" &&
      navigator.hardwareConcurrency != null &&
      navigator.hardwareConcurrency <= 4;

    if (!isMobile && !prefersReducedMotion && !isLowPower) {
      setShouldRender(true);
    }
  }, []);

  const skeletonFallback = (
    <div className="hero-canvas pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-20 pointer-events-none transition-opacity duration-1000"
        style={{
          background: "radial-gradient(circle at center, rgba(217, 217, 217, 0.25) 0%, transparent 70%)",
        }}
      />
    </div>
  );

  if (!mounted || !shouldRender) {
    return skeletonFallback;
  }

  return (
    <Suspense fallback={skeletonFallback}>
      <HeroCanvas />
    </Suspense>
  );
}
