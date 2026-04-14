import React from 'react';

const Navbar = ({ onNavigate, currentPage, user }) => {
  const isAuthPage = ['login', 'signup'].includes(currentPage);
  const userInitial = user?.name?.charAt(0) || 'C';
  const isActive = (page) => currentPage === page;

  if (isAuthPage) return null;

  const navLink = (page, label) => (
    <button
      type="button"
      onClick={() => onNavigate(page)}
      className={`rounded-lg px-3 py-2 text-sm font-bold transition ${
        isActive(page)
          ? 'bg-olive/10 text-olive'
          : 'text-muted hover:bg-[#eef4ef] hover:text-dark'
      }`}
    >
      {label}
    </button>
  );

  return (
    <nav className="fixed left-0 right-0 top-0 z-[100] flex h-[72px] items-center justify-between border-b border-border bg-white/95 px-5 shadow-[0_10px_35px_rgba(17,20,15,0.06)] backdrop-blur-xl md:px-10">
      <button
        type="button"
        className="group flex items-center gap-3 text-left"
        onClick={() => onNavigate(user ? 'dashboard' : 'home')}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-dark text-sm font-black text-white transition group-hover:bg-olive">
          LC
        </span>
        <span className="font-serif text-2xl font-black text-dark">Let Me Cook</span>
      </button>

      <div className="hidden items-center gap-2 md:flex">
        {!user && (
          <>
            <a href="#how" className="rounded-lg px-3 py-2 text-sm font-bold text-muted transition hover:bg-[#eef4ef] hover:text-dark">How it Works</a>
            <a href="#features" className="rounded-lg px-3 py-2 text-sm font-bold text-muted transition hover:bg-[#eef4ef] hover:text-dark">Features</a>
            <a href="#pricing" className="rounded-lg px-3 py-2 text-sm font-bold text-muted transition hover:bg-[#eef4ef] hover:text-dark">Pricing</a>
          </>
        )}

        {user ? (
          <div className="flex items-center gap-2">
            {navLink('dashboard', 'My Kitchen')}
            {navLink('my-recipes', 'My Recipes')}
            {navLink('favorites', 'Favourites')}
            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="ml-3 flex h-10 w-10 items-center justify-center rounded-lg bg-dark text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-olive"
              aria-label="Open dashboard"
            >
              {userInitial}
            </button>
          </div>
        ) : (
          <div className="ml-4 flex items-center gap-3 border-l border-border pl-4">
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="rounded-lg px-4 py-2 text-sm font-bold text-dark transition hover:bg-[#eef4ef]"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => onNavigate('signup')}
              className="btn-primary"
            >
              Get Started
            </button>
          </div>
        )}
      </div>

      <div className="md:hidden">
        {user ? (
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-dark text-sm font-black text-white"
            aria-label="Open dashboard"
          >
            {userInitial}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onNavigate('signup')}
            className="rounded-lg bg-dark px-4 py-2 text-xs font-bold text-white"
          >
            Start
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
