import { motion } from "framer-motion";

export function CreditButton() {
  return (
    <motion.a
      href="https://maxxedtechltd.vercel.app"
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="fixed bottom-5 right-5 z-40 glass rounded-full px-4 py-2.5 text-[10px] tracking-[0.28em] uppercase text-[#AFAFAE] hover:text-[#D9D9D9] hover:border-white/30 transition-all flex items-center gap-2"
      style={{
        boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 15px rgba(217, 217, 217, 0.12)",
      }}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--sage)] shadow-[0_0_8px_var(--sage)]" />
      Made by Maxxed Tech Ltd
    </motion.a>
  );
}
