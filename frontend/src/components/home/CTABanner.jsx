import React from 'react';

const CTABanner = ({ onNavigate }) => {
  return (
    <section className="bg-dark py-24 px-6 md:px-12 text-center relative overflow-hidden">
      {/* Decorative Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(200,146,42,0.1),transparent_70%)] pointer-events-none"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <span className="text-gold text-xs font-semibold uppercase tracking-widest mb-4 block">Start Today</span>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-8 leading-tight">
          Your next favourite recipe <br />is one prompt away
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => onNavigate('signup')}
            className="bg-gold text-dark px-10 py-5 rounded-full text-lg font-bold hover:bg-gold-light transition-all transform hover:-translate-y-1 cursor-pointer shadow-xl"
          >
            Create Free Account →
          </button>
          <button 
            onClick={() => onNavigate('login')}
            className="bg-transparent text-cream border border-white/20 px-10 py-5 rounded-full text-lg font-bold hover:bg-white/5 transition-all cursor-pointer"
          >
            Log In
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
