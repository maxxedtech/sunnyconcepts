import { lazy, Suspense, useEffect, useState } from "react";

const HeroCanvas = lazy(() => import("./HeroCanvas"));

export function LazyHeroCanvas() {
  const [mounted, setMounted] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setMounted(true);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Keep the scene available on mobile; HeroCanvas adapts DPR and geometry there.
    setShouldRender(!prefersReducedMotion);
  }, []);

  if (!mounted || !shouldRender) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <HeroCanvas />
    </Suspense>
  );
}
