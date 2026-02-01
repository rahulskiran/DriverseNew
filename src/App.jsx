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
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all sections with data-animate attribute
    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach(section => observer.observe(section));

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  return (
    <main className="bg-[#020617] overflow-x-hidden">
      <Hero />
      <div id="foundation" data-animate>
        <FoundationSection />
      </div>
      <div id="programs" data-animate>
        <PillarsOfSupport />
      </div>
      <div id="testimonials" data-animate>
        <Testimonials />
      </div>
      <div id="faq" data-animate>
        <FAQ />
      </div>
      <div id="donate" data-animate>
        <DonationSection />
      </div>
      <Footer />
    </main>
  );
}

export default App;