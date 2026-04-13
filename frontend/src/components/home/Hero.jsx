import React from 'react';

const Hero = ({ onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-16 text-center relative overflow-hidden">
      {/* Hero BG Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(245,223,160,0.15),transparent)] pointer-events-none"></div>
      
      <div className="inline-flex items-center gap-2 bg-gold-light text-rust px-4 py-1.5 rounded-full text-xs font-medium mb-8 tracking-widest uppercase animate-fade-in-up" style={{ animationFillMode: 'both', animationDelay: '100ms' }}>
        ✦ Powered by OpenRouter AI
      </div>
      
      <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-black leading-[1.08] max-w-4xl text-dark mb-6 animate-fade-in-up" style={{ animationFillMode: 'both', animationDelay: '200ms' }}>
        Cook anything with <br />
        <span className="text-gradient-gold italic">AI-powered</span> recipes
      </h1>
      
      <p className="max-w-xl text-muted text-lg md:text-xl leading-relaxed mb-10 mx-auto animate-fade-in-up" style={{ animationFillMode: 'both', animationDelay: '300ms' }}>
        Describe your craving, ingredients, or cuisine and Let Me Cook generates step-by-step recipes crafted just for you.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up" style={{ animationFillMode: 'both', animationDelay: '400ms' }}>
        <button 
          onClick={() => onNavigate('signup')}
          className="bg-gradient-to-r from-dark to-olive text-cream px-8 py-4 rounded-full text-lg font-medium hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer"
        >
          Start Cooking Free →
        </button>
        <button 
          onClick={() => onNavigate('login')}
          className="glass text-dark border border-white/40 px-8 py-4 rounded-full text-lg font-medium hover:bg-white/90 hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer"
        >
          I have an account
        </button>
      </div>

      {/* Floating Cards Mockup */}
      <div className="flex flex-wrap gap-5 justify-center mt-12 animate-fade-in-up" style={{ animationFillMode: 'both', animationDelay: '500ms' }}>
        <div className="glass border border-white/50 rounded-2xl p-4 flex items-center gap-3 shadow-md animate-bounce-slow">
          <span className="text-2xl">🍝</span>
          <div className="text-left">
            <strong className="block text-sm text-dark">Spaghetti Carbonara</strong>
            <span className="text-xs text-muted">Ready in 25 min</span>
          </div>
        </div>
        <div className="glass border border-white/50 rounded-2xl p-4 flex items-center gap-3 shadow-md animate-bounce-slow delay-100">
          <span className="text-2xl">🍛</span>
          <div className="text-left">
            <strong className="block text-sm text-dark">Butter Chicken</strong>
            <span className="text-xs text-muted">Step-by-step guide</span>
          </div>
        </div>
        <div className="glass border border-white/50 rounded-2xl p-4 flex items-center gap-3 shadow-md animate-bounce-slow delay-200">
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
