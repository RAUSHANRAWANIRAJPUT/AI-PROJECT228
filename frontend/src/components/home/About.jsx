import React from 'react';

const About = ({ onNavigate }) => {
  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-cream">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-gold text-xs font-semibold uppercase tracking-widest mb-3 block">About Let Me Cook</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark mb-6 leading-tight">Built for food lovers, by food lovers</h2>
          <p className="text-muted text-lg leading-relaxed mb-6">
            Let Me Cook was born from a simple idea: cooking should be joyful, not stressful. We combine the power of large language models via OpenRouter with a clean, intuitive interface to make recipe discovery effortless for everyone.
          </p>
          <p className="text-muted text-lg leading-relaxed mb-10">
            Whether you're a beginner trying your first dish or a seasoned cook exploring new cuisines, Let Me Cook is your personal kitchen companion.
          </p>
          <button 
            onClick={() => onNavigate('signup')}
            className="bg-dark text-cream px-8 py-4 rounded-full text-lg font-medium hover:bg-olive transition-all transform hover:-translate-y-0.5 cursor-pointer inline-flex items-center gap-2 group shadow-lg"
          >
            Join Let Me Cook <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-3xl p-8 hover:-translate-y-1 transition-transform duration-300">
            <div className="text-4xl mb-4">🔥</div>
            <h3 className="text-xl font-bold text-dark mb-2 font-serif">Real Recipes</h3>
            <p className="text-muted text-sm leading-relaxed text-xs">Not generic — crafted to your exact request.</p>
          </div>
          <div className="bg-card border border-border rounded-3xl p-8 translate-y-8 hover:translate-y-7 transition-transform duration-300">
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="text-xl font-bold text-dark mb-2 font-serif">Smart AI</h3>
            <p className="text-muted text-sm leading-relaxed text-xs">Learns your preferences over time.</p>
          </div>
          <div className="bg-card border border-border rounded-3xl p-8 hover:-translate-y-1 transition-transform duration-300">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-dark mb-2 font-serif">Instant</h3>
            <p className="text-muted text-sm leading-relaxed text-xs">Recipes in under 10 seconds, always.</p>
          </div>
          <div className="bg-card border border-border rounded-3xl p-8 translate-y-8 hover:translate-y-7 transition-transform duration-300">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold text-dark mb-2 font-serif">Private</h3>
            <p className="text-muted text-sm leading-relaxed text-xs">Your data stays yours, always.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
