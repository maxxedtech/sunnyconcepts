import { createFileRoute } from "@tanstack/react-router";
import { Intro } from "@/components/sunny/Intro";
import { Nav } from "@/components/sunny/Nav";
import { Hero } from "@/components/sunny/Hero";
import { About } from "@/components/sunny/About";
import { Services } from "@/components/sunny/Services";
import { Portfolio } from "@/components/sunny/Portfolio";
import { Contact } from "@/components/sunny/Contact";
import { Footer } from "@/components/sunny/Footer";
import { CreditButton } from "@/components/sunny/CreditButton";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="relative overflow-hidden" style={{ scrollBehavior: "smooth" }}>
      <div className="aurora-bg" aria-hidden="true">
        <div className="aurora-blob" />
      </div>
      <Intro />
      <Nav />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Contact />
      <Footer />
      <CreditButton />
    </main>
  );
}
