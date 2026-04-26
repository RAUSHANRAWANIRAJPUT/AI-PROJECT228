import React from 'react';

const Features = () => {
  const features = [
    {
      title: 'AI Flavor Profile',
      description: 'Our AI understands flavor combinations, not just ingredients.',
      icon: '👅',
      delay: '0ms',
    },
    {
      title: 'Smart Substitutions',
      description: 'Missing an ingredient? We suggest perfect swaps instantly.',
      icon: '🔄',
      delay: '100ms',
    },
    {
      title: 'Speed Mode',
      description: 'Generate complete cooking instructions in under 2 seconds.',
      icon: '🏎️',
      delay: '200ms',
    },
    {
      title: 'Dietary Guard',
      description: 'Strict adherence to your allergies and dietary preferences.',
      icon: '🛡️',
      delay: '300ms',
    },
    {
      title: 'Visual Plating',
      description: 'AI-generated descriptions of how to plate your dish beautifully.',
      icon: '🍽️',
      delay: '400ms',
    },
    {
      title: 'Global Cuisine',
      description: 'Master recipes from over 50 different culinary traditions.',
      icon: '🌎',
      delay: '500ms',
    },
  ];

  return (
    <div className="py-20">
      <div className="mb-16 grid gap-8 md:grid-cols-2 md:items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-950 sm:text-5xl">Engineered for taste</h2>
          <p className="mt-6 max-w-lg text-lg text-slate-600">
            We've built the world's most advanced culinary AI to ensure every meal is a masterpiece.
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group rounded-[2.5rem] border border-white/50 bg-white/40 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-amber-200 hover:bg-white hover:shadow-xl"
            style={{ transitionDelay: feature.delay }}
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-3xl bg-white text-2xl shadow-sm transition-transform duration-300 group-hover:scale-110">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
