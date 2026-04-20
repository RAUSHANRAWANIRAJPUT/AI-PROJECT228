import React, { useState } from 'react';

const cuisineOptions = ['Indian', 'Chinese', 'Italian', 'Mexican', 'Japanese', 'Mediterranean'];

const Icon = ({ children }) => (
  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-white text-xs font-black text-olive transition group-hover:border-olive/40 group-hover:bg-olive/10">
    {children}
  </span>
);

const Sidebar = ({ onNavigate, currentPage, filters = {}, onFilterChange, onOpenChat, onLogout }) => {
  const [showCuisineMenu, setShowCuisineMenu] = useState(false);
  const canFilter = typeof onFilterChange === 'function';

  const navItems = [
    { key: 'dashboard', label: 'Dashboard', icon: 'D' },
    { key: 'my-recipes', label: 'My Recipes', icon: 'R' },
  ];

  const itemClass = (active) =>
    `group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-bold transition ${
      active
        ? 'bg-dark text-white shadow-[0_12px_30px_rgba(17,20,15,0.16)]'
        : 'text-muted hover:bg-[#eef4ef] hover:text-dark'
    }`;

  const filterClass = (active) =>
    `flex w-full items-center justify-between rounded-lg border px-3 py-3 text-sm font-bold transition ${
      active
        ? 'border-olive bg-olive/10 text-olive'
        : 'border-border bg-white text-muted hover:border-olive/50 hover:text-dark'
    }`;

  return (
    <div className="flex h-full flex-col gap-7 overflow-y-auto p-5">
      <div>
        <p className="mb-3 px-2 text-[11px] font-black uppercase tracking-[0.26em] text-muted/70">Workspace</p>
        <div className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => onNavigate(item.key)}
              className={itemClass(currentPage === item.key)}
            >
              <Icon>{item.icon}</Icon>
              {item.label}
            </button>
          ))}
          <button
            type="button"
            onClick={onOpenChat}
            className={itemClass(false)}
          >
            <Icon>AI</Icon>
            AI Chef
          </button>
        </div>
      </div>

      {canFilter && (
        <div>
          <p className="mb-3 px-2 text-[11px] font-black uppercase tracking-[0.26em] text-muted/70">Filters</p>
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => onFilterChange('vegan', !filters.vegan)}
              className={filterClass(filters.vegan)}
            >
              <span>Vegan</span>
              <span className="h-2 w-2 rounded-full bg-olive"></span>
            </button>
            <button
              type="button"
              onClick={() => onFilterChange('quick', !filters.quick)}
              className={filterClass(filters.quick)}
            >
              <span>Quick under 20 min</span>
              <span className="h-2 w-2 rounded-full bg-gold"></span>
            </button>
            <div>
              <button
                type="button"
                onClick={() => setShowCuisineMenu((prev) => !prev)}
                className={filterClass(Boolean(filters.cuisine))}
              >
                <span>{filters.cuisine || 'World cuisines'}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="m7 10 5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {showCuisineMenu && (
                <div className="mt-2 overflow-hidden rounded-lg border border-border bg-white shadow-[0_18px_45px_rgba(17,20,15,0.10)]">
                  <button
                    type="button"
                    onClick={() => {
                      onFilterChange('cuisine', '');
                      setShowCuisineMenu(false);
                    }}
                    className={`w-full px-4 py-3 text-left text-sm transition ${filters.cuisine === '' ? 'bg-[#eef4ef] font-bold text-dark' : 'text-muted hover:bg-[#f5f7f3]'}`}
                  >
                    All cuisines
                  </button>
                  {cuisineOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        onFilterChange('cuisine', filters.cuisine === option ? '' : option);
                        setShowCuisineMenu(false);
                      }}
                      className={`w-full px-4 py-3 text-left text-sm transition ${filters.cuisine === option ? 'bg-[#eef4ef] font-bold text-dark' : 'text-muted hover:bg-[#f5f7f3]'}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mt-auto border-t border-border pt-5">
        <p className="mb-3 px-2 text-[11px] font-black uppercase tracking-[0.26em] text-muted/70">Account</p>
        <div className="space-y-2">
          <button type="button" className={itemClass(false)}>
            <Icon>S</Icon>
            Settings
          </button>
          <button type="button" className="flex w-full items-center justify-between rounded-lg border border-gold/60 bg-gold/10 px-3 py-3 text-sm font-black text-dark transition hover:-translate-y-0.5 hover:bg-gold/20">
            Upgrade to Pro
            <span className="rounded-md bg-white px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-muted">New</span>
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-bold text-rust transition hover:bg-rust/10"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
