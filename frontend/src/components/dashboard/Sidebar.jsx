import React from 'react';

const Sidebar = ({ onOpenChat, onLogout }) => {
  return (
    <div className="bg-card border-r border-border h-full p-6 flex flex-col gap-6 overflow-y-auto">
      <div className="space-y-1">
        <div className="bg-dark text-cream p-3 rounded-xl flex items-center gap-3 text-sm font-medium cursor-pointer">
          <span className="text-lg">🏠</span> Dashboard
        </div>
        <div className="text-muted hover:bg-cream p-3 rounded-xl flex items-center gap-3 text-sm font-medium cursor-pointer transition-colors">
          <span className="text-lg">📚</span> My Recipes
        </div>
        <div 
          onClick={onOpenChat}
          className="text-muted hover:bg-cream p-3 rounded-xl flex items-center gap-3 text-sm font-medium cursor-pointer transition-colors"
        >
          <span className="text-lg">💬</span> AI Chatbot
        </div>
        <div className="text-muted hover:bg-cream p-3 rounded-xl flex items-center gap-3 text-sm font-medium cursor-pointer transition-colors">
          <span className="text-lg">❤️</span> Favourites
        </div>
      </div>

      <div>
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-4">Filters</div>
        <div className="space-y-1">
          <div className="text-muted hover:bg-cream p-3 rounded-xl flex items-center gap-3 text-sm font-medium cursor-pointer transition-colors">
            <span className="text-lg">🥗</span> Vegan
          </div>
          <div className="text-muted hover:bg-cream p-3 rounded-xl flex items-center gap-3 text-sm font-medium cursor-pointer transition-colors">
            <span className="text-lg">🔥</span> Quick ({"<"} 20 min)
          </div>
          <div className="text-muted hover:bg-cream p-3 rounded-xl flex items-center gap-3 text-sm font-medium cursor-pointer transition-colors">
            <span className="text-lg">🌍</span> World Cuisines
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
