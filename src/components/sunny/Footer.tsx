export function Footer() {
  return (
    <footer className="relative px-6 pb-10 pt-20">
      <div className="max-w-7xl mx-auto">
        <div className="border-t border-white/8 pt-12 grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--sage)] shadow-[0_0_12px_var(--sage)]" />
              <span className="text-sm tracking-[0.25em] uppercase font-light">Sunny Concepts</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
              A premium digital agency leading the world through cinematic creative services.
            </p>
          </div>
          <div className="md:text-center">
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">Contact</p>
            <a href="mailto:sunnyconceptsinfo@gmail.com" className="block mt-3 text-sm hover:text-[var(--sage)] transition-colors">sunnyconceptsinfo@gmail.com</a>
            <a href="tel:08024493791" className="block mt-1 text-sm hover:text-[var(--sage)] transition-colors">+234 802 449 3791</a>
          </div>
          <div className="md:text-right">
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">Studio</p>
            <p className="mt-3 text-sm">Maiduguri — Worldwide</p>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between gap-3 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
          <span>© {new Date().getFullYear()} Sunny Concepts</span>
          <span>Crafted with intention</span>
        </div>
      </div>
    </footer>
  );
}