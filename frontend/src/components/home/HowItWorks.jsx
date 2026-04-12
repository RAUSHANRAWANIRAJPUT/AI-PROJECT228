import React from 'react';

const steps = [
  {
    num: '01',
    title: 'Describe your craving',
    description: 'Type any dish name, ingredients you have, or a cuisine style. ChefAI understands natural language.'
  },
  {
    num: '02',
    title: 'AI generates your recipe',
    description: 'Our AI crafts a complete, detailed recipe with ingredients, quantities, and cooking steps.'
  },
  {
    num: '03',
    title: 'Chat for more details',
    description: 'Ask the AI chatbot follow-up questions — substitutions, timings, tips, and more.'
  },
  {
    num: '04',
    title: 'Save & revisit anytime',
    description: 'All your generated recipes live in your personal dashboard, searchable and sorted.'
  }
];

const HowItWorks = () => {
  return (
    <section id="how" className="py-24 px-6 md:px-12 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="text-gold text-xs font-semibold uppercase tracking-widest mb-3 block">Process</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark max-w-xl leading-tight">Three steps to your perfect dish</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-card border border-border rounded-[20px] p-8 hover:-translate-y-1 transition-transform duration-300">
              <div className="font-serif text-5xl font-black text-gold-light mb-4 leading-none">{step.num}</div>
              <h3 className="text-lg font-medium text-dark mb-3">{step.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
