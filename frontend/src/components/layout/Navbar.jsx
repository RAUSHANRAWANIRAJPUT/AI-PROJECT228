import React from 'react';

const Navbar = ({ onNavigate, currentPage, user }) => {
  const isAuthPage = ['login', 'signup'].includes(currentPage);
  if (isAuthPage) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 py-4 md:px-12 glass border-none">
      <div 
        className="font-serif text-2xl font-black text-dark flex items-center gap-2 cursor-pointer group"
        onClick={() => onNavigate('home')}
      >
        <span className="w-2.5 h-2.5 bg-gold rounded-full inline-block group-hover:scale-125 transition-transform"></span>
        Let Me Cook
      </div>
      
      <div className="hidden md:flex items-center gap-8">
        <a href="#how" className="text-muted text-sm font-medium hover:text-dark transition-colors">How it Works</a>
        <a href="#features" className="text-muted text-sm font-medium hover:text-dark transition-colors">Features</a>
        <a href="#pricing" className="text-muted text-sm font-medium hover:text-dark transition-colors">Pricing</a>
        
        {user ? (
          <div className="flex items-center gap-6 pl-4 border-l border-border">
            <span 
              onClick={() => onNavigate('dashboard')}
              className={`text-sm font-bold cursor-pointer transition-colors ${currentPage === 'dashboard' ? 'text-gold' : 'text-dark hover:text-gold'}`}
            >
              My Kitchen
            </span>
            <span 
              onClick={() => onNavigate('my-recipes')}
              className={`text-sm font-bold cursor-pointer transition-colors ${currentPage === 'my-recipes' ? 'text-gold' : 'text-dark hover:text-gold'}`}
            >
              My Recipes
            </span>
            <span 
              onClick={() => onNavigate('favorites')}
              className={`text-sm font-bold cursor-pointer transition-colors ${currentPage === 'favorites' ? 'text-gold' : 'text-dark hover:text-gold'}`}
            >
              Favourites
            </span>
            <div 
              onClick={() => onNavigate('dashboard')}
              className="w-10 h-10 rounded-full bg-olive text-cream flex items-center justify-center font-bold text-sm border-2 border-white shadow-sm cursor-pointer hover:scale-105 transition-transform"
            >
              {user.name.charAt(0)}
            </div>
          </div>
        ) : (
          <>
            <button 
              onClick={() => onNavigate('login')}
              className="text-dark text-sm font-bold cursor-pointer hover:text-gold transition-colors"
            >
              Log in
            </button>
            <button 
              onClick={() => onNavigate('signup')}
              className="bg-dark text-cream px-6 py-2.5 rounded-full text-sm font-bold hover:bg-olive transition-all transform active:scale-95 cursor-pointer shadow-lg shadow-dark/10"
            >
              Get Started
            </button>
          </>
        )}
      </div>

      <div className="md:hidden">
         {user ? (
           <div 
            onClick={() => onNavigate('dashboard')}
            className="w-8 h-8 rounded-full bg-olive text-cream flex items-center justify-center font-bold text-xs cursor-pointer"
           >
             {user.name.charAt(0)}
           </div>
         ) : (
           <button onClick={() => onNavigate('signup')} className="bg-dark text-cream px-4 py-1.5 rounded-full text-xs font-bold">Get Started</button>
         )}
      </div>
    </nav>
  );
};

export default Navbar;
