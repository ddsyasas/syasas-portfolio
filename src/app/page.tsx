import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Qualifications from '@/components/Qualifications';
// HIDDEN: Portfolio component import - Hidden until Portfolio section data is finalized
// import Portfolio from '@/components/Portfolio';
import Insights from '@/components/Insights';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <Navigation />
      <main className="w-full">
        <Hero />
        <About />
        <Skills />
        <Qualifications />
        {/* HIDDEN: Portfolio component - Hidden until Portfolio section data is finalized */}
        {/* <Portfolio /> */}
        <Insights />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
