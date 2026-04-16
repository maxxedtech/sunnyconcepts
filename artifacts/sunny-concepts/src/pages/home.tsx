import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useListBackgrounds, getListBackgroundsQueryKey, useGetCeoProfile, getGetCeoProfileQueryKey, useGetSiteContent, getGetSiteContentQueryKey, useListPortfolioImages, getListPortfolioImagesQueryKey } from "@workspace/api-client-react";
import { Layers, Video, TrendingUp, Package, ChevronRight, X, Menu, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [showIntro, setShowIntro] = useState(() => !sessionStorage.getItem("introSeen"));
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!showIntro) {
      sessionStorage.setItem("introSeen", "true");
    }
  }, [showIntro]);

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      <AnimatePresence>
        {showIntro && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6"
          >
            <div className="absolute top-8 right-8">
              <Button variant="ghost" onClick={() => setShowIntro(false)} className="text-muted-foreground hover:text-white">
                Skip Intro
              </Button>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-center"
            >
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-white mb-6">
                Sunny Concepts
              </h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                onAnimationComplete={() => {
                  setTimeout(() => setShowIntro(false), 2500);
                }}
                className="text-muted-foreground uppercase tracking-[0.3em] text-sm md:text-base"
              >
                Leading the world through digital services
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />

      <main>
        <HeroSection />
        <CeoSection />
        <ServicesSection />
        <PortfolioSection onImageClick={setSelectedImage} />
        <ContactSection />
      </main>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-12 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <Button 
              variant="ghost" 
              size="icon"
              className="absolute top-6 right-6 text-white hover:bg-white/10 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X className="w-8 h-8" />
            </Button>
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={selectedImage}
              alt="Fullscreen portfolio"
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating "Made by" button */}
      <motion.a
        href="https://maxxedtechltd.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/70 backdrop-blur-sm text-xs text-muted-foreground hover:text-white hover:border-white/30 transition-colors shadow-lg shadow-black/40"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        Made by Maxxed Tech Ltd
      </motion.a>
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }} className="font-serif text-2xl font-bold tracking-wide text-white">
          SC<span className="text-primary">.</span>
        </a>
        
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide uppercase">
          <button onClick={() => scrollTo('ceo')} className="text-muted-foreground hover:text-white transition-colors">Vision</button>
          <button onClick={() => scrollTo('services')} className="text-muted-foreground hover:text-white transition-colors">Expertise</button>
          <button onClick={() => scrollTo('portfolio')} className="text-muted-foreground hover:text-white transition-colors">Work</button>
          <button onClick={() => scrollTo('contact')} className="text-muted-foreground hover:text-white transition-colors">Connect</button>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Menu />
        </Button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b border-white/5 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              <button onClick={() => scrollTo('ceo')} className="text-left text-lg font-serif">Vision</button>
              <button onClick={() => scrollTo('services')} className="text-left text-lg font-serif">Expertise</button>
              <button onClick={() => scrollTo('portfolio')} className="text-left text-lg font-serif">Work</button>
              <button onClick={() => scrollTo('contact')} className="text-left text-lg font-serif">Connect</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function HeroSection() {
  const { data: content } = useGetSiteContent({ query: { queryKey: getGetSiteContentQueryKey() } });
  const { data: backgrounds } = useListBackgrounds({ query: { queryKey: getListBackgroundsQueryKey() } });

  const activeBackgrounds = backgrounds?.filter(b => b.isActive) || [];
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    if (activeBackgrounds.length <= 1) return;
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % activeBackgrounds.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeBackgrounds.length]);

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          {activeBackgrounds.length > 0 ? (
            <motion.div
              key={activeBackgrounds[bgIndex].id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${activeBackgrounds[bgIndex].imageUrl})` }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-b from-secondary to-background" />
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-background/80 md:bg-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-6 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-8 leading-tight">
            {content?.heroHeading || "Leading the World Through Digital Services"}
          </h1>
          <p className="text-lg md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light">
            {content?.heroSubtext || "Premium digital solutions with global standards"}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-base tracking-wide rounded-none"
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Portfolio
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 px-8 text-base tracking-wide rounded-none border-white/20 hover:bg-white/5"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start a Project
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CeoSection() {
  const { data: ceo } = useGetCeoProfile({ query: { queryKey: getGetCeoProfileQueryKey() } });

  return (
    <section id="ceo" className="py-24 md:py-32 bg-background relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-[3/4] relative group overflow-hidden">
              {ceo?.imageUrl ? (
                <img 
                  src={ceo.imageUrl} 
                  alt={ceo.name || "CEO"} 
                  className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-card border border-dashed border-primary/30 text-muted-foreground uppercase tracking-widest text-sm">
                  Add CEO Image
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-serif text-4xl md:text-5xl text-white mb-2">{ceo?.name || "CEO Name"}</h2>
              <p className="text-primary uppercase tracking-[0.2em] text-sm">Visionary & Founder</p>
            </div>
            
            <div className="space-y-6 text-lg text-muted-foreground font-light leading-relaxed">
              <p>{ceo?.bio || "A visionary leader committed to excellence in the digital landscape. With years of experience across multiple disciplines, we bring a unique perspective to every project."}</p>
              
              <blockquote className="pl-6 border-l-2 border-primary italic text-white/90">
                "{ceo?.vision || "Our vision is to elevate brands to their highest potential through uncompromising quality and creative brilliance."}"
              </blockquote>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const { data: content } = useGetSiteContent({ query: { queryKey: getGetSiteContentQueryKey() } });
  
  const defaultServices = [
    { id: '1', title: 'Brand Identity', description: 'Crafting memorable, timeless brand marks and cohesive visual systems.', icon: 'Layers' },
    { id: '2', title: 'Media Production', description: 'High-end photography, videography, and cinematic storytelling.', icon: 'Video' },
    { id: '3', title: 'Digital Marketing', description: 'Data-driven campaigns that build audience and drive real conversion.', icon: 'TrendingUp' },
    { id: '4', title: 'Printing & Logistics', description: 'Premium physical deliverables managed from press to destination.', icon: 'Package' }
  ];

  const services = content?.services?.length ? content.services : defaultServices;

  const iconMap: Record<string, React.ReactNode> = {
    'Layers': <Layers className="w-8 h-8" />,
    'Video': <Video className="w-8 h-8" />,
    'TrendingUp': <TrendingUp className="w-8 h-8" />,
    'Package': <Package className="w-8 h-8" />
  };

  return (
    <section id="services" className="py-24 md:py-32 bg-card relative">
      <div className="container mx-auto px-6">
        <div className="mb-20 md:w-2/3">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary uppercase tracking-[0.2em] text-sm mb-4"
          >
            Our Expertise
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-6xl text-white"
          >
            Disciplines of Craft
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-white/5">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-card p-12 hover:bg-white/[0.02] transition-colors group cursor-pointer relative"
            >
              <div className="text-primary mb-8 transition-transform duration-500 group-hover:-translate-y-2">
                {service.icon && iconMap[service.icon] ? iconMap[service.icon] : <Layers className="w-8 h-8" />}
              </div>
              <h3 className="font-serif text-2xl text-white mb-4">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed max-w-sm">
                {service.description}
              </p>
              <div className="absolute bottom-12 right-12 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                <ChevronRight className="w-6 h-6 text-primary" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioSection({ onImageClick }: { onImageClick: (url: string) => void }) {
  const categories = [
    "Art Cover", "Birthday Flyers", "Church Flyers", 
    "Logos & Brand Identity", "Others", "Stickers & Labelling", 
    "Wedding Cards, Jotters & Wedding Programs"
  ];
  
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  
  const { data: images, isLoading } = useListPortfolioImages(
    { category: activeCategory },
    { query: { queryKey: getListPortfolioImagesQueryKey({ category: activeCategory }) } }
  );

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-background min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4">Selected Work</p>
            <h2 className="font-serif text-4xl md:text-6xl text-white">Our Portfolio</h2>
          </div>
        </div>

        <div className="flex overflow-x-auto pb-4 mb-12 gap-4 scrollbar-hide no-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-3 text-sm font-medium tracking-wide transition-all ${
                activeCategory === cat 
                  ? "bg-white text-black" 
                  : "border border-white/10 text-muted-foreground hover:text-white hover:border-white/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="min-h-[500px]">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <Skeleton key={i} className="aspect-[4/5] bg-card" />
              ))}
            </div>
          ) : images && images.length > 0 ? (
            <motion.div 
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {images.map((img) => (
                <motion.div 
                  key={img.id}
                  whileHover={{ y: -10 }}
                  className="group relative aspect-[4/5] overflow-hidden bg-card cursor-pointer"
                  onClick={() => onImageClick(img.imageUrl)}
                >
                  <img 
                    src={img.imageUrl} 
                    alt={img.title || activeCategory}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <h3 className="text-white font-serif text-2xl">{img.title || "Untitled Project"}</h3>
                    {img.description && <p className="text-white/70 mt-2 text-sm">{img.description}</p>}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[1, 2, 3].map(i => (
                <div key={i} className="aspect-[4/5] bg-card border border-dashed border-primary/20 flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
                  <p className="uppercase tracking-widest text-sm mb-2 text-primary/50">Add Image</p>
                  <p className="text-xs">{activeCategory}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { data: content } = useGetSiteContent({ query: { queryKey: getGetSiteContentQueryKey() } });
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, message } = form;

    const emailAddress = content?.contactEmail || "hello@sunnyconcepts.com";
    const subject = encodeURIComponent(`New Message from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
    );
    window.open(`mailto:${emailAddress}?subject=${subject}&body=${body}`, "_blank");

    const whatsappPhone = (content?.contactPhone || "").replace(/\D/g, "");
    const waText = encodeURIComponent(
      `Hello Sunny Concepts!\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
    );
    if (whatsappPhone) {
      setTimeout(() => window.open(`https://wa.me/${whatsappPhone}?text=${waText}`, "_blank"), 500);
    } else {
      setTimeout(() => window.open(`https://wa.me/?text=${waText}`, "_blank"), 500);
    }

    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", phone: "", message: "" });
    }, 4000);
  };

  return (
    <footer id="contact" className="bg-card pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 mb-24">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-serif text-5xl md:text-7xl text-white mb-8"
            >
              Ready to create?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-xl text-muted-foreground max-w-md font-light mb-12"
            >
              Let's build something extraordinary together. Send us a message and we'll reach back via email and WhatsApp.
            </motion.p>

            <div className="space-y-8">
              <div>
                <p className="text-primary uppercase tracking-widest text-xs mb-4">Contact</p>
                <div className="space-y-2 text-xl font-serif text-white">
                  {content?.contactEmail && <p><a href={`mailto:${content.contactEmail}`} className="hover:text-primary transition-colors">{content.contactEmail}</a></p>}
                  {content?.contactPhone && <p><a href={`tel:${content.contactPhone}`} className="hover:text-primary transition-colors">{content.contactPhone}</a></p>}
                  {content?.contactAddress && <p className="text-muted-foreground text-lg">{content.contactAddress}</p>}
                  {!content?.contactEmail && !content?.contactPhone && <p>hello@sunnyconcepts.agency</p>}
                </div>
              </div>

              <div>
                <p className="text-primary uppercase tracking-widest text-xs mb-4">Socials</p>
                <div className="flex space-x-6 text-lg">
                  <a href={content?.socialInstagram || "#"} className="text-white hover:text-primary transition-colors">Instagram</a>
                  <a href={content?.socialTwitter || "#"} className="text-white hover:text-primary transition-colors">Twitter</a>
                  <a href={content?.socialFacebook || "#"} className="text-white hover:text-primary transition-colors">Facebook</a>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-primary uppercase tracking-widest text-xs mb-6">Send a Message</p>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 border border-primary/30 rounded-sm text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Send className="w-5 h-5 text-primary" />
                </div>
                <p className="font-serif text-xl text-white mb-2">Message sent!</p>
                <p className="text-muted-foreground text-sm">Your email and WhatsApp are opening now.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-muted-foreground uppercase tracking-widest mb-2">Name *</label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Your name"
                      className="w-full bg-transparent border border-white/10 rounded-sm px-4 py-3 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground uppercase tracking-widest mb-2">Email *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="your@email.com"
                      className="w-full bg-transparent border border-white/10 rounded-sm px-4 py-3 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-muted-foreground uppercase tracking-widest mb-2">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="+1 234 567 8900"
                    className="w-full bg-transparent border border-white/10 rounded-sm px-4 py-3 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs text-muted-foreground uppercase tracking-widest mb-2">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Tell us about your project..."
                    className="w-full bg-transparent border border-white/10 rounded-sm px-4 py-3 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors text-sm resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm uppercase tracking-widest font-medium hover:bg-primary/90 transition-colors rounded-sm"
                  >
                    <Send className="w-4 h-4" />
                    Send via Email
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 border border-[#25D366]/40 text-[#25D366] px-6 py-3 text-sm uppercase tracking-widest font-medium hover:bg-[#25D366]/10 transition-colors rounded-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </motion.button>
                </div>
                <p className="text-muted-foreground/50 text-xs pt-1">
                  Submitting opens your email app and WhatsApp with the message pre-filled.
                </p>
              </form>
            )}
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Sunny Concepts. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
