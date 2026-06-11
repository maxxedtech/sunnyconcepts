import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function Intro() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 4200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[100] flex items-center justify-center grain"
          style={{ background: "var(--gradient-cinematic)" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 1.4 }}
            animate={{ opacity: 0.55, scale: 1 }}
            transition={{ duration: 2.4, ease: "easeOut" }}
            className="absolute h-[60vh] w-[60vh] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, var(--sage), transparent 60%)" }}
          />
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            <motion.h1
              initial={{ opacity: 0, y: 20, letterSpacing: "0.4em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.18em" }}
              transition={{ duration: 2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-6xl font-light uppercase text-foreground"
            >
              Sunny Concepts
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ duration: 1.6, delay: 2 }}
              className="mt-6 text-xs md:text-sm tracking-[0.35em] uppercase text-muted-foreground"
            >
              Leading the world through digital services
            </motion.p>
          </div>
          <button
            onClick={() => setShow(false)}
            className="absolute bottom-10 right-10 text-[10px] tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}