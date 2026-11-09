import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function Intro() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show quick cinematic splash on first visit in the session
    const viewed = sessionStorage.getItem("sunny_splash_seen");
    if (!viewed) {
      setShow(true);
      sessionStorage.setItem("sunny_splash_seen", "true");
      const t = setTimeout(() => setShow(false), 900);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#070709] pointer-events-none"
        >
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-3xl md:text-5xl font-light uppercase tracking-[0.25em] text-[#F4F4F5]"
            >
              Sunny Concepts
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="mt-4 text-xs tracking-[0.3em] uppercase text-[#A1A1AA]"
            >
              Leading the world through digital services
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
