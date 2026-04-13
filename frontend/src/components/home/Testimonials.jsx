import React from 'react';

const testimonials = [
  {
    quote: '"Let Me Cook transformed my weeknight cooking. I just type what\'s in my fridge and get a full recipe in seconds. The chatbot even helped me fix my curry when it was too spicy!"',
    author: 'Priya Sharma',
    role: 'Home Cook · Mumbai',
    avatar: 'PS'
  },
  {
    quote: '"As a culinary student, I use Let Me Cook to explore recipes I haven\'t tried before. The step-by-step instructions are incredibly detailed and professional."',
    author: 'James Moreno',
    role: 'Culinary Student · NYC',
    avatar: 'JM'
  },
  {
    quote: '"The dietary filter feature is a lifesaver. I\'m gluten-free and Let Me Cook always remembers to give me safe alternatives without me having to ask twice."',
    author: 'Aisha Khan',
    role: 'Food Blogger · London',
    avatar: 'AK'
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-[#F5F0E8]">
      <div className="max-w-6xl mx-auto">
        <span className="text-gold text-xs font-semibold uppercase tracking-widest mb-3 block">Testimonials</span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark mb-12 leading-tight">What our chefs say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testi, idx) => (
            <div key={idx} className="bg-card border border-border rounded-[20px] p-8 shadow-sm">
              <p className="text-dark text-lg italic leading-relaxed mb-8 italic">
                {testi.quote}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-olive flex items-center justify-center text-cream font-medium text-sm">
                  {testi.avatar}
                </div>
                <div>
                  <div className="text-dark font-semibold text-sm">{testi.author}</div>
                  <div className="text-muted text-xs">{testi.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
