import { useEffect } from 'react';
import FoundationSection from './components/FoundationSection';
import PillarsOfSupport from './components/PillarsOfSupport';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import DonationSection from './components/DonationSection';
import Footer from './components/Footer';
import { observeReveals } from './observeReveals';

export default function HomeSections() {
  useEffect(() => {
    observeReveals();
  }, []);

  return (
    <>
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
    </>
  );
}
