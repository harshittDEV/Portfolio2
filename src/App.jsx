import { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react';
import Lenis from 'lenis';

import LoadingScreen from './components/common/LoadingScreen';
import Navigation from './components/navigation/Navigation';
import Hero from './components/hero/Hero';
import About from './components/hero/About';
import Projects from './components/projects/Projects';
import Stack from './components/stack/Stack';
import Journey from './components/journey/Journey';
import Hackathon from './components/journey/Hackathon';
import DSA from './components/journey/DSA';
import Contact from './components/contact/Contact';
import Footer from './components/contact/Footer';

// Lazy load the 3D scene since it's heavy
const Scene = lazy(() => import('./components/three/Scene'));

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [sceneOpacity, setSceneOpacity] = useState(1);
  const rafIdRef = useRef(null);

  const handleLoadComplete = useCallback(() => {
    setShowContent(true);
  }, []);

  // Scroll-based 3D scene opacity — fade out as user scrolls past hero
  useEffect(() => {
    if (!showContent) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeStart = window.innerHeight * 0.3;
      const fadeEnd = window.innerHeight * 1.2;

      if (scrollY <= fadeStart) {
        setSceneOpacity(1);
      } else if (scrollY >= fadeEnd) {
        setSceneOpacity(0);
      } else {
        const progress = (scrollY - fadeStart) / (fadeEnd - fadeStart);
        setSceneOpacity(1 - progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [showContent]);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    if (!showContent) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Make lenis globally accessible for smooth scroll-to
    window.__lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    }

    rafIdRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      lenis.destroy();
      window.__lenis = null;
    };
  }, [showContent]);

  // Mark as loaded after a short delay (for fonts etc)
  useEffect(() => {
    const timeout = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {/* Subtle grain texture for physical feel */}
      <div className="grain-overlay" aria-hidden="true" />
      {!showContent && (
        <LoadingScreen onComplete={handleLoadComplete} />
      )}

      {isLoaded && (
        <Suspense fallback={null}>
          <div
            style={{
              opacity: sceneOpacity,
              transition: 'opacity 0.1s linear',
              pointerEvents: sceneOpacity < 0.1 ? 'none' : 'auto',
            }}
          >
            <Scene />
          </div>
        </Suspense>
      )}

      {showContent && (
        <>
          <Navigation />

          <main className="main-content" role="main">
            <Hero />
            <About />
            <Projects />
            <Stack />
            <Journey />
            <Hackathon />
            <DSA />
            <Contact />
          </main>

          <Footer />
        </>
      )}
    </>
  );
}
