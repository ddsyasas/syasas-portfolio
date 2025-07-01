import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Qualifications from '@/components/Qualifications';
import Portfolio from '@/components/Portfolio';
import Insights from '@/components/Insights';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Qualifications />
        <Portfolio />
        <Insights />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
