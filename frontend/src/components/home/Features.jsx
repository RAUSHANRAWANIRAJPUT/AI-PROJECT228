import React from 'react';

const features = [
  { icon: '🤖', title: 'AI Recipe Generation', description: 'Instant, detailed recipes for any dish using cutting-edge language models via OpenRouter.' },
  { icon: '💬', title: 'Interactive Chatbot', description: 'Ask follow-up questions about any recipe — get substitutions, tips, and cooking guidance.' },
  { icon: '📚', title: 'Recipe History', description: 'All your generated recipes saved automatically. Search, filter, and revisit past dishes.' },
  { icon: '🥗', title: 'Dietary Filters', description: 'Vegan, gluten-free, keto, or any custom dietary preference — just mention it in your prompt.' },
  { icon: '⏱️', title: 'Time Estimates', description: 'Every recipe includes prep time, cook time, and difficulty level so you plan your meals perfectly.' },
  { icon: '🌍', title: 'Global Cuisines', description: 'From Italian to Japanese to Indian — explore thousands of world cuisine styles and flavors.' },
];

const Features = () => {
  return (
    <section id="features" className="py-24 px-6 md:px-12 bg-[#F5F0E8]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="text-gold text-xs font-semibold uppercase tracking-widest mb-3 block">Features</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark max-w-xl leading-tight">Everything a home chef needs</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <div key={idx} className="bg-card border border-border rounded-[20px] p-8 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-dark flex items-center justify-center text-xl mb-6">
                {feat.icon}
              </div>
              <h3 className="text-lg font-medium text-dark mb-2">{feat.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
