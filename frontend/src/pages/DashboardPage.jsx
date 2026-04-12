import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import RecipeGrid from '../components/dashboard/RecipeGrid';

const DashboardPage = ({ onOpenChat, onLogout }) => {
  return (
    <div className="min-h-screen bg-[#F2EDE3] pt-0">
      <nav className="bg-white border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="font-serif text-xl font-black flex items-center gap-2">
          <span className="text-gold">✦</span> ChefAI
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-sm text-muted">Good morning, Chef!</span>
          <div className="w-10 h-10 rounded-full bg-olive text-cream flex items-center justify-center font-bold text-sm">GR</div>
          <button 
            onClick={onLogout}
            className="md:hidden bg-cream border border-border px-3 py-1.5 rounded-lg text-xs font-bold"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="flex flex-col md:flex-row min-h-[calc(100vh-73px)]">
        <aside className="w-full md:w-64 flex-shrink-0 md:sticky md:top-[73px] md:h-[calc(100vh-73px)] hidden md:block">
          <Sidebar onOpenChat={onOpenChat} onLogout={onLogout} />
        </aside>

        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          <div className="mb-10">
            <h2 className="font-serif text-3xl font-bold text-dark mb-1">Your Recipe Dashboard</h2>
            <p className="text-muted text-sm">You've generated 24 recipes this month · 6 remaining on Free plan</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-white border border-border rounded-2xl p-6 shadow-sm group hover:border-gold transition-colors">
              <div className="font-serif text-3xl font-bold text-dark mb-1 group-hover:text-gold transition-colors">24</div>
              <div className="text-xs font-bold text-muted uppercase tracking-wider">Recipes Generated</div>
            </div>
            <div className="bg-white border border-border rounded-2xl p-6 shadow-sm group hover:border-gold transition-colors">
              <div className="font-serif text-3xl font-bold text-dark mb-1 group-hover:text-gold transition-colors">7</div>
              <div className="text-xs font-bold text-muted uppercase tracking-wider">Saved Favourites</div>
            </div>
            <div className="bg-white border border-border rounded-2xl p-6 shadow-sm group hover:border-gold transition-colors">
              <div className="font-serif text-3xl font-bold text-dark mb-1 group-hover:text-gold transition-colors">12</div>
              <div className="text-xs font-bold text-muted uppercase tracking-wider">AI Chats</div>
            </div>
          </div>

          <div className="bg-white border border-border rounded-2xl p-6 mb-10 shadow-sm flex flex-col md:flex-row items-center gap-4">
            <input 
              type="text" 
              placeholder="Describe a dish, ingredient, or cuisine... e.g. 'Quick pasta with chicken and spinach'"
              className="flex-1 bg-cream border-1.5 border-border rounded-xl px-4 py-3 text-sm focus:border-gold outline-none transition-colors w-full"
            />
            <div className="flex gap-2 w-full md:w-auto">
              <button 
                onClick={onOpenChat}
                className="flex-1 md:flex-none bg-dark text-cream px-6 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-olive transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>💬</span> Ask AI Chef
              </button>
              <button 
                 onClick={onOpenChat}
                 className="flex-1 md:flex-none bg-gold text-dark px-6 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-gold-light transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>✨</span> Generate
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-dark">Recent Recipes</h3>
            <button className="text-xs font-bold text-muted hover:text-dark transition-colors cursor-pointer">View all →</button>
          </div>

          <RecipeGrid />
        </main>
      </div>

      <button 
        onClick={onOpenChat}
        className="fixed bottom-6 right-6 bg-dark text-cream px-6 py-4 rounded-full font-bold shadow-2xl flex items-center gap-3 hover:translate-y-[-4px] transition-all cursor-pointer z-40 group"
      >
        <span className="text-xl group-hover:rotate-12 transition-transform">🍳</span>
        <span>Chat with AI Chef</span>
      </button>
    </div>
  );
};

export default DashboardPage;
