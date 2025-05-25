import PageTransition from '../components/PageTransition';
import Hero from '../components/Hero';

export default function Home() {
  return (
    <PageTransition>
      <div className="min-h-screen w-full bg-white">
        <Hero />
      </div>
    </PageTransition>
  );
} 