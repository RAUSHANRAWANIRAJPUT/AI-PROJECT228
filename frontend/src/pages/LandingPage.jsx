import React, { useEffect, useState } from 'react';

const LandingPage = ({ onNavigate }) => {
  const [visibleSections, setVisibleSections] = useState({});

  useEffect(() => {
    const revealNodes = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.dataset.reveal]: true,
            }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealNodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const revealClass = (key) =>
    visibleSections[key]
      ? 'opacity-100 translate-y-0'
      : 'opacity-0 translate-y-8';

  return (
    <div className="min-h-screen bg-[#fff7ed] text-slate-950 font-sans overflow-hidden">
      <section
        data-reveal="hero"
        className={`relative overflow-hidden px-6 pt-8 pb-20 md:px-10 lg:px-16 transition-all duration-700 ease-out ${revealClass(
          'hero'
        )}`}
        style={{ transitionDelay: '60ms' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#fff8eb] via-[#ffe2c3] to-[#f3dcc7]" />
        <div className="pointer-events-none absolute -right-16 top-16 h-72 w-72 rounded-full bg-[#f6c088]/40 blur-3xl" />
        <div className="pointer-events-none absolute left-0 top-1/3 h-44 w-44 rounded-full bg-[#ffd8b4]/40 blur-3xl" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="z-10 max-w-2xl text-center lg:text-left">
            <p className="inline-flex rounded-full border border-white/70 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-700 shadow-sm backdrop-blur-sm">
              Launch your recipes with premium AI
            </p>
            <h1 className="mt-8 text-5xl font-black leading-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Cook anything with
              <span className="block bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                AI-powered recipes
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-700 md:text-lg">
              Turn ingredients, cravings, and cuisine ideas into perfectly tailored recipes. Beautiful, fast, and effortless cooking guidance for modern home chefs.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-start">
              <button
                onClick={() => onNavigate('signup')}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 px-8 py-4 text-base font-semibold text-white shadow-[0_24px_80px_-40px_rgba(251,146,60,0.75)] transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_28px_90px_-45px_rgba(251,146,60,0.8)]"
              >
                Start Cooking Free
              </button>
              <button
                onClick={() => onNavigate('login')}
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/80 px-8 py-4 text-base font-semibold text-slate-900 transition duration-300 ease-out hover:border-amber-300 hover:bg-white hover:-translate-y-0.5"
              >
                Login
              </button>
            </div>
          </div>

          <div className="relative z-10 flex w-full max-w-xl items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[520px] rounded-[40px] border border-white/50 bg-white/70 p-6 shadow-[0_45px_120px_-45px_rgba(15,23,42,0.35)] backdrop-blur-xl">
              <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-orange-200/70 blur-2xl" />
              <div className="absolute -right-8 -bottom-8 h-24 w-24 rounded-full bg-amber-300/60 blur-2xl" />
              <div className="relative rounded-[32px] bg-slate-950 p-5 text-white shadow-lg">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Featured recipe</p>
                    <h2 className="mt-3 text-xl font-semibold">Golden Coconut Curry</h2>
                  </div>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-lg">
                    🍛
                  </span>
                </div>
                <div className="space-y-3 text-sm text-slate-300">
                  <p>• 8 ingredients, 30 minutes</p>
                  <p>• Personalized spice level</p>
                  <p>• Step-by-step cooking flow</p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {['Spaghetti', 'Butter Chicken', 'Greek Salad'].map((item, idx) => (
                  <div
                    key={item}
                    className="rounded-3xl border border-slate-200/80 bg-white p-4 text-slate-900 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-3 text-2xl">
                      {idx === 0 ? '🍝' : idx === 1 ? '🍗' : '🥗'}
                      <span className="font-semibold">{item}</span>
                    </div>
                    <p className="mt-3 text-xs text-slate-500">Fast, fresh, delicious</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        data-reveal="features"
        className={`mx-auto max-w-7xl px-6 pb-20 md:px-10 transition-all duration-700 ease-out ${revealClass('features')}`}
        style={{ transitionDelay: '120ms' }}
      >
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-amber-500">Why Let Me Cook</p>
          <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">Premium recipe creation for modern cooks</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Fast Recipes',
              description: 'AI recipes generated instantly so you can cook without delay.',
              icon: '⚡',
            },
            {
              title: 'AI Powered',
              description: 'Smart cooking guidance that adapts to your ingredients and preferences.',
              icon: '🤖',
            },
            {
              title: 'Personalized',
              description: 'Every recipe feels custom-made for your taste and timing.',
              icon: '🎯',
            },
          ].map((feature) => (
            <div key={feature.title} className="group rounded-[32px] border border-white/80 bg-white/80 p-8 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-amber-100 text-2xl transition duration-300 group-hover:bg-orange-100">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-950">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        data-reveal="workflow"
        className={`mx-auto max-w-7xl px-6 pb-20 md:px-10 transition-all duration-700 ease-out ${revealClass('workflow')}`}
        style={{ transitionDelay: '180ms' }}
      >
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-amber-500">How it works</p>
            <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">Create recipes in three easy steps</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
              From ingredient list to plated dinner, our workflow keeps every step simple and delightful.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              {
                step: '1',
                title: 'Tell us what you have',
                description: 'Enter ingredients, mood, or cuisine preferences.',
              },
              {
                step: '2',
                title: 'Get a recipe instantly',
                description: 'AI crafts step-by-step instructions and ingredient guidance.',
              },
              {
                step: '3',
                title: 'Cook with confidence',
                description: 'Follow a polished recipe designed for your kitchen.',
              },
            ].map((item) => (
              <div key={item.step} className="rounded-[32px] border border-white/80 bg-white/80 p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-3xl bg-orange-500 text-lg font-bold text-white">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        data-reveal="testimonials"
        className={`mx-auto max-w-7xl px-6 pb-24 md:px-10 transition-all duration-700 ease-out ${revealClass('testimonials')}`}
        style={{ transitionDelay: '240ms' }}
      >
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-amber-500">What home cooks say</p>
          <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">Loved by food lovers and busy kitchens</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              quote: 'The recipes feel premium and precise—like having a personal chef in my pocket.',
              name: 'Mina, hobby chef',
            },
            {
              quote: 'I shave 20 minutes off every dinner with recipes that actually match my fridge.',
              name: 'Arjun, working parent',
            },
            {
              quote: 'Beautiful UI, smooth flow, and cooking just got more fun.',
              name: 'Priya, food blogger',
            },
          ].map((item) => (
            <div key={item.name} className="rounded-[32px] border border-white/80 bg-slate-950/95 p-8 text-white shadow-2xl transition duration-300 hover:-translate-y-1">
              <p className="text-base leading-8">“{item.quote}”</p>
              <p className="mt-6 font-semibold text-amber-200">{item.name}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-200/70 bg-white/90 px-6 py-10 text-slate-700 backdrop-blur-sm md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-lg font-bold text-slate-950">Let Me Cook</p>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
              Modern recipe discovery for every kitchen. Smart, simple, and beautiful.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <button
              onClick={() => onNavigate('signup')}
              className="rounded-full bg-amber-100 px-4 py-2 text-amber-700 transition hover:bg-amber-200"
            >
              Get started
            </button>
            <button
              onClick={() => onNavigate('login')}
              className="rounded-full border border-slate-300 bg-white px-4 py-2 transition hover:bg-slate-50"
            >
              Login
            </button>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200/70 pt-6 text-center text-xs uppercase tracking-[0.24em] text-slate-500">
          © 2026 Let Me Cook. Crafted for modern chefs.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
