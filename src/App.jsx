import React, { useEffect, lazy, Suspense } from 'react';
import Hero from './components/Hero';
import { observeReveals } from './observeReveals';

const HomeSections = lazy(() => import('./HomeSections.jsx'));

// Scroll to top on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Scroll to hash target after a short delay (for rendering)
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          const offsetTop = el.offsetTop - 100;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

// Homepage with all sections
function HomePage() {
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

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/donation-success" element={<DonationSuccess />} />
        <Route path="/donation-cancel" element={<DonationCancel />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/refund" element={<RefundPolicy />} />
      </Routes>
    </Router>
  );
}

export default App;