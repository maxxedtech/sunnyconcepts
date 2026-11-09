import { useEffect, useState } from "react";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const elapsed = now - started;
      const next = Math.min(100, Math.round((elapsed / 1750) * 100));
      setProgress(next);
      if (next < 100) frame = requestAnimationFrame(tick);
      else {
        setLeaving(true);
        window.setTimeout(() => setVisible(false), 650);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!visible) return null;
  return (
    <div className={`preloader ${leaving ? "preloader--leaving" : ""}`} aria-label="Loading Sunny Concepts" role="status">
      <div className="preloader__frame">
        <div className="preloader__mark"><span /><span /><span /></div>
        <p className="preloader__eyebrow">Sunny Concepts</p>
        <div className="preloader__line"><span style={{ width: `${progress}%` }} /></div>
        <div className="preloader__meta"><span>Preparing the studio</span><strong>{progress}%</strong></div>
      </div>
    </div>
  );
}
