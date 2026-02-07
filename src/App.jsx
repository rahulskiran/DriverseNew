import React, { useEffect } from 'react';
import Hero from './components/Hero';
import FoundationSection from './components/FoundationSection';
import PillarsOfSupport from './components/PillarsOfSupport';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import DonationSection from './components/DonationSection';
import Footer from './components/Footer';

function App() {
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

export default App;