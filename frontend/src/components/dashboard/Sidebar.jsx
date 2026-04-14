import React, { useState } from 'react';

const cuisineOptions = ['Indian', 'Chinese', 'Italian', 'Mexican', 'Japanese', 'Mediterranean'];

const Sidebar = ({ onNavigate, currentPage, filters = {}, onFilterChange, onOpenChat, onLogout }) => {
  const [showCuisineMenu, setShowCuisineMenu] = useState(false);

  const activeClass = 'rounded-xl flex items-center gap-3 text-sm font-medium cursor-pointer p-3 bg-dark text-cream';
  const inactiveClass = 'rounded-xl flex items-center gap-3 text-sm font-medium cursor-pointer p-3 text-muted hover:bg-cream transition-colors';

  return (
    <div className="bg-card border-r border-border h-full p-6 flex flex-col gap-6 overflow-y-auto">
      <div className="space-y-1">
        <div
          onClick={() => onNavigate('dashboard')}
          className={currentPage === 'dashboard' ? activeClass : inactiveClass}
        >
          <span className="text-lg">🏠</span> Dashboard
        </div>
        <div
          onClick={() => onNavigate('my-recipes')}
          className={currentPage === 'my-recipes' ? activeClass : inactiveClass}
        >
          <span className="text-lg">📚</span> My Recipes
        </div>
        <div
          onClick={() => onNavigate('favorites')}
          className={currentPage === 'favorites' ? activeClass : inactiveClass}
        >
          <span className="text-lg">❤️</span> Favourites
        </div>
        <div 
          onClick={onOpenChat}
          className="text-muted hover:bg-cream p-3 rounded-xl flex items-center gap-3 text-sm font-medium cursor-pointer transition-colors"
        >
          <span className="text-lg">💬</span> AI Chatbot
        </div>
      </div>

      <div>
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-4">Filters</div>
        <div className="space-y-1">
          <div
            onClick={() => onFilterChange('vegan', !filters.vegan)}
            className={filters.vegan ? activeClass : inactiveClass}
          >
            <span className="text-lg">🥗</span> Vegan
          </div>
          <div
            onClick={() => onFilterChange('quick', !filters.quick)}
            className={filters.quick ? activeClass : inactiveClass}
          >
            <span className="text-lg">🔥</span> Quick ({"<"} 20 min)
          </div>
          <div>
            <button
              type="button"
              onClick={() => setShowCuisineMenu((prev) => !prev)}
              className={filters.cuisine ? activeClass : inactiveClass}
            >
              <span className="text-lg">🌍</span>
              {filters.cuisine ? ` ${filters.cuisine}` : ' World Cuisines'}
            </button>
            {showCuisineMenu && (
              <div className="mt-2 rounded-3xl border border-border bg-white shadow-sm overflow-hidden">
                <button
                  type="button"
                  onClick={() => {
                    onFilterChange('cuisine', '');
                    setShowCuisineMenu(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm ${filters.cuisine === '' ? 'bg-[#F2EDE3] font-semibold' : 'hover:bg-cream'}`}
                >
                  All Cuisines
                </button>
                {cuisineOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      onFilterChange('cuisine', filters.cuisine === option ? '' : option);
                      setShowCuisineMenu(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm ${filters.cuisine === option ? 'bg-[#F2EDE3] font-semibold' : 'hover:bg-cream'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-4">Account</div>
        <div className="space-y-1">
          <div className="text-muted hover:bg-cream p-3 rounded-xl flex items-center gap-3 text-sm font-medium cursor-pointer transition-colors">
            <span className="text-lg">⚙️</span> Settings
          </div>
          <div className="text-gold bg-gold/5 p-3 rounded-xl flex items-center gap-3 text-sm font-bold cursor-pointer hover:bg-gold/10 transition-colors">
            <span className="text-lg">💎</span> Upgrade to Pro
          </div>
          <div 
            onClick={onLogout}
            className="text-rust hover:bg-rust/5 p-3 rounded-xl flex items-center gap-3 text-sm font-medium cursor-pointer transition-colors"
          >
            <span className="text-lg">🚪</span> Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
