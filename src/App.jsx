import React, { useEffect, lazy, Suspense } from 'react';
import Hero from './components/Hero';
import { observeReveals } from './observeReveals';

const HomeSections = lazy(() => import('./HomeSections.jsx'));

function App() {
  useEffect(() => {
    observeReveals();
    document.documentElement.style.scrollBehavior = 'smooth';
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