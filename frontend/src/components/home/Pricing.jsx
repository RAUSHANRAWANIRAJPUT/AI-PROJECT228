import React from 'react';

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    period: 'forever',
    features: ['10 recipes per month', 'Basic chatbot access', 'Recipe history (30 days)', '3 cuisine filters'],
    cta: 'Get Started',
    featured: false
  },
  {
    name: 'Pro Chef',
    price: '$9',
    period: '/ month',
    features: ['Unlimited recipes', 'Full chatbot with memory', 'Lifetime recipe history', 'All cuisine & diet filters', 'Priority AI responses'],
    cta: 'Start Free Trial',
    featured: true
  },
  {
    name: 'Team',
    price: '$29',
    period: '/ month',
    features: ['Everything in Pro', 'Up to 5 members', 'Shared recipe collections', 'Analytics dashboard', 'Priority support'],
    cta: 'Contact Sales',
    featured: false
  }
];

const Pricing = ({ onNavigate }) => {
  return (
    <section id="pricing" className="py-24 px-6 md:px-12 bg-cream text-center">
      <div className="max-w-6xl mx-auto">
        <span className="text-gold text-xs font-semibold uppercase tracking-widest mb-3 block">Pricing</span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark mb-12 mx-auto leading-tight">Simple, honest pricing</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`rounded-[24px] p-8 text-left transition-all duration-300 hover:-translate-y-2 border-2 ${
                plan.featured 
                ? 'bg-dark text-cream border-dark shadow-2xl scale-105 z-10' 
                : 'bg-card text-dark border-border shadow-sm'
              }`}
            >
              <div className={`text-xs font-bold uppercase tracking-widest mb-4 ${plan.featured ? 'text-gold-light' : 'text-muted'}`}>
                {plan.name}
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className={`font-serif text-5xl font-black ${plan.featured ? 'text-gold' : 'text-dark'}`}>{plan.price}</span>
                <span className={`text-sm ${plan.featured ? 'text-gray-400' : 'text-muted'}`}>{plan.period}</span>
              </div>
              
              <ul className="space-y-4 my-8">
                {plan.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3 text-sm">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.featured ? 'bg-white/10' : 'bg-green-light'}`}>
                       <svg className={`w-3 h-3 ${plan.featured ? 'text-gold' : 'text-green'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                       </svg>
                    </div>
                    <span className={plan.featured ? 'text-gray-300' : 'text-muted'}>{feat}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => onNavigate('signup')}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                  plan.featured 
                  ? 'bg-gold text-dark hover:bg-gold-light' 
                  : 'bg-transparent border border-border hover:border-dark text-dark'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
