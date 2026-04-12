import React from 'react';

const Navbar = ({ onNavigate, currentPage }) => {
  const isAuthPage = ['login', 'signup', 'dashboard'].includes(currentPage);

  if (isAuthPage && currentPage !== 'dashboard') return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 py-4 md:px-12 bg-cream/90 backdrop-blur-xl border-b border-border">
      <div 
        className="font-serif text-2xl font-black text-dark flex items-center gap-2 cursor-pointer"
        onClick={() => onNavigate('home')}
      >
        <span className="w-2.5 h-2.5 bg-gold rounded-full inline-block"></span>
        ChefAI
      </div>
      
      <div className="hidden md:flex items-center gap-8">
        <a href="#how" className="text-muted text-sm font-medium hover:text-dark transition-colors">How it Works</a>
        <a href="#features" className="text-muted text-sm font-medium hover:text-dark transition-colors">Features</a>
        <a href="#pricing" className="text-muted text-sm font-medium hover:text-dark transition-colors">Pricing</a>
        <a href="#about" className="text-muted text-sm font-medium hover:text-dark transition-colors">About</a>
        <button 
          onClick={() => onNavigate('login')}
          className="text-dark text-sm font-medium cursor-pointer"
        >
          Log in
        </button>
        <button 
          onClick={() => onNavigate('signup')}
          className="bg-dark text-cream px-5 py-2 rounded-full text-sm font-medium hover:bg-olive transition-all cursor-pointer"
        >
          Get Started Free
        </button>
      </div>

      {/* Mobile Menu Toggle (simplified for now) */}
      <div className="md:hidden">
         <button onClick={() => onNavigate('signup')} className="bg-dark text-cream px-4 py-1.5 rounded-full text-xs font-medium">Get Started</button>
      </div>
    </nav>
  );
};

export default Navbar;
