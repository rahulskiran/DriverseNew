import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import FoundationSection from './components/FoundationSection';
import PillarsOfSupport from './components/PillarsOfSupport';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import DonationSection from './components/DonationSection';
import Footer from './components/Footer';
import DonationSuccess from './components/DonationSuccess';
import DonationCancel from './components/DonationCancel';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import RefundPolicy from './pages/RefundPolicy';

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
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    // Observe all elements with .reveal class
    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <main className="bg-[#020617] overflow-x-hidden">
      <Hero />
      <div id="foundation">
        <FoundationSection />
      </div>
      <div id="programs">
        <PillarsOfSupport />
      </div>
      <div id="testimonials">
        <Testimonials />
      </div>
      <div id="faq">
        <FAQ />
      </div>
      <div id="donate">
        <DonationSection />
      </div>
      <Footer />
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