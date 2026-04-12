import React from 'react';

const Hero = ({ onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-16 text-center relative overflow-hidden">
      {/* Hero BG Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(245,223,160,0.15),transparent)] pointer-events-none"></div>
      
      <div className="inline-flex items-center gap-2 bg-gold-light text-rust px-4 py-1.5 rounded-full text-xs font-medium mb-8 tracking-widest uppercase">
        ✦ Powered by OpenRouter AI
      </div>
      
      <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-black leading-[1.08] max-w-4xl text-dark mb-6">
        Cook anything with <br />
        <span className="text-gold italic">AI-powered</span> recipes
      </h1>
      
      <p className="max-w-xl text-muted text-lg md:text-xl leading-relaxed mb-10 mx-auto">
        Describe your craving, ingredients, or cuisine and ChefAI generates step-by-step recipes crafted just for you.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
        <button 
          onClick={() => onNavigate('signup')}
          className="bg-dark text-cream px-8 py-4 rounded-full text-lg font-medium hover:bg-olive transition-all transform hover:-translate-y-0.5 cursor-pointer shadow-lg"
        >
          Start Cooking Free →
        </button>
        <button 
          onClick={() => onNavigate('login')}
          className="bg-transparent text-dark border-1.5 border-border px-8 py-4 rounded-full text-lg font-medium hover:border-dark transition-all transform hover:-translate-y-0.5 cursor-pointer"
        >
          I have an account
        </button>
      </div>

      {/* Floating Cards Mockup */}
      <div className="flex flex-wrap gap-5 justify-center mt-12">
        <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3 shadow-sm animate-bounce-slow">
          <span className="text-2xl">🍝</span>
          <div className="text-left">
            <strong className="block text-sm text-dark">Spaghetti Carbonara</strong>
            <span className="text-xs text-muted">Ready in 25 min</span>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3 shadow-sm animate-bounce-slow delay-100">
          <span className="text-2xl">🍛</span>
          <div className="text-left">
            <strong className="block text-sm text-dark">Butter Chicken</strong>
            <span className="text-xs text-muted">Step-by-step guide</span>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3 shadow-sm animate-bounce-slow delay-200">
          <span className="text-2xl">🥗</span>
          <div className="text-left">
            <strong className="block text-sm text-dark">Greek Salad</strong>
            <span className="text-xs text-muted">Healthy & quick</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
