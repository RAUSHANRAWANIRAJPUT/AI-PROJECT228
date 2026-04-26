import React from 'react';

const Pricing = ({ onNavigate }) => {
  const tiers = [
    {
      name: 'Free',
      price: '0',
      description: 'Perfect for casual home cooks starting their AI journey.',
      features: ['5 recipes per day', 'Basic AI engine', 'Community support', 'Standard response time'],
      buttonText: 'Get Started',
      highlight: false,
    },
    {
      name: 'Pro',
      price: '9',
      description: 'For passionate foodies who want more power and speed.',
      features: ['Unlimited recipes', 'Advanced AI (GPT-4 tier)', 'Priority generation', 'Save favorite recipes', 'PDF exports'],
      buttonText: 'Go Pro',
      highlight: true,
    },
    {
      name: 'Chef',
      price: '29',
      description: 'Advanced features for culinary professionals and bloggers.',
      features: ['Everything in Pro', 'Custom cuisine training', 'Nutrition analysis', 'API access (Beta)', 'Personal culinary assistant'],
      buttonText: 'Contact Sales',
      highlight: false,
    },
  ];

  return (
    <div className="py-12">
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-black text-slate-950 sm:text-5xl">Simple, transparent pricing</h2>
        <p className="mt-4 text-lg text-slate-600">Choose the plan that fits your culinary ambitions.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`relative flex flex-col rounded-[2.5rem] p-8 transition-all duration-500 hover:-translate-y-2 ${
              tier.highlight
                ? 'bg-slate-950 text-white shadow-[0_40px_100px_-20px_rgba(15,23,42,0.4)]'
                : 'border border-slate-200 bg-white shadow-xl hover:shadow-2xl'
            }`}
          >
            {tier.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                Most Popular
              </div>
            )}

            <div className="mb-8">
              <h3 className={`text-xl font-bold ${tier.highlight ? 'text-amber-400' : 'text-slate-900'}`}>
                {tier.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-black">${tier.price}</span>
                <span className={`text-sm ${tier.highlight ? 'text-slate-400' : 'text-slate-500'}`}>/month</span>
              </div>
              <p className={`mt-4 text-sm leading-6 ${tier.highlight ? 'text-slate-300' : 'text-slate-600'}`}>
                {tier.description}
              </p>
            </div>

            <ul className="mb-10 flex-1 space-y-4">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm">
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                    tier.highlight ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-600'
                  }`}>
                    ✓
                  </span>
                  <span className={tier.highlight ? 'text-slate-200' : 'text-slate-700'}>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => onNavigate('signup')}
              className={`w-full rounded-2xl py-4 text-sm font-bold transition-all duration-300 ${
                tier.highlight
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white hover:opacity-90 hover:shadow-lg hover:shadow-orange-500/20'
                  : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
              }`}
            >
              {tier.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
