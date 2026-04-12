import React from 'react';
import Hero from '../components/home/Hero';
import HowItWorks from '../components/home/HowItWorks';
import Features from '../components/home/Features';
import Stats from '../components/home/Stats';
import Testimonials from '../components/home/Testimonials';
import Pricing from '../components/home/Pricing';
import About from '../components/home/About';
import CTABanner from '../components/home/CTABanner';

const LandingPage = ({ onNavigate }) => {
  return (
    <div className="pt-0">
      <Hero onNavigate={onNavigate} />
      <HowItWorks />
      <Features />
      <Stats />
      <Testimonials />
      <Pricing onNavigate={onNavigate} />
      <About onNavigate={onNavigate} />
      <CTABanner onNavigate={onNavigate} />
    </div>
  );
};

export default LandingPage;
