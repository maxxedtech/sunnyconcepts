import { motion } from "framer-motion";

export function CreditButton() {
  return (
    <motion.a
      href="https://maxxedtechltd.vercel.app"
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 6, duration: 1 }}
      className="fixed bottom-5 right-5 z-40 glass rounded-full px-4 py-2.5 text-[10px] tracking-[0.3em] uppercase hover:bg-white/10 hover:scale-105 transition-all flex items-center gap-2"
      style={{ boxShadow: "0 10px 30px -10px oklch(0 0 0 / 0.5), 0 0 20px oklch(0.78 0.04 155 / 0.1)" }}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--sage)] shadow-[0_0_8px_var(--sage)]" />
      Made by Maxxed Tech Ltd
    </motion.a>
  );
}