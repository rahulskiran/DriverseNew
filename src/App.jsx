import React, { useEffect, lazy, Suspense } from 'react';
import Hero from './components/Hero';
import { observeReveals } from './observeReveals';

const HomeSections = lazy(() => import('./HomeSections.jsx'));

function App() {
  useEffect(() => {
    observeReveals();
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  // Handle hash scrolling on load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          const offsetTop = el.offsetTop - 100;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return (
    <main className="bg-[#020617] overflow-x-hidden">
      <Hero />
      <Suspense fallback={null}>
        <HomeSections />
      </Suspense>
    </main>
  );
}

export default App;