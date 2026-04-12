import React from 'react';

const stats = [
  { num: '50K+', lbl: 'Recipes Generated' },
  { num: '12K+', lbl: 'Active Users' },
  { num: '98%', lbl: 'Satisfaction Rate' },
  { num: '200+', lbl: 'Cuisine Styles' },
];

const Stats = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-cream text-center">
      <div className="max-w-6xl mx-auto">
        <span className="text-gold text-xs font-semibold uppercase tracking-widest mb-3 block">By the numbers</span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark mb-12 mx-auto">Trusted by home chefs worldwide</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx}>
              <div className="font-serif text-5xl md:text-6xl font-black text-gold mb-2">{stat.num}</div>
              <div className="text-muted text-sm tracking-wide">{stat.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
