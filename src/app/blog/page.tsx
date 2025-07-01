import Navigation from '@/components/Navigation';
import BlogSection from '@/components/BlogSection';
import Footer from '@/components/Footer';

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
} 