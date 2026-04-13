import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import RecipeGrid from '../components/dashboard/RecipeGrid';
import { recipeService } from '../services/api';

const DashboardPage = ({ user, onOpenChat, onLogout }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const data = await recipeService.getRecipes();
      setRecipes(data);
    } catch (err) {
      console.error('Failed to fetch recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    try {
      const generated = await recipeService.generateRecipe(prompt);
      // Auto-save the generated recipe for this demo
      const saved = await recipeService.saveRecipe(generated);
      setRecipes(prev => [saved, ...prev]);
      setPrompt('');
      alert('Recipe generated and saved!');
    } catch (err) {
      console.error('Generation failed:', err);
      let message = err.response?.data?.message || err.message || 'Failed to generate recipe. Check your API key.';
      if (typeof message === 'object') {
        message = JSON.stringify(message);
      }
      alert(message);
    } finally {
      setGenerating(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await recipeService.deleteRecipe(id);
        setRecipes(prev => prev.filter(r => r._id !== id));
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F2EDE3] pt-0">
      <nav className="glass bg-white/60 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="font-serif text-xl font-black flex items-center gap-2">
          <span className="text-gold animate-pulse">✦</span> Let Me Cook
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-sm text-muted">Good morning, {user?.name || 'Chef'}!</span>
          <div className="w-10 h-10 rounded-full bg-olive text-cream flex items-center justify-center font-bold text-sm">
            {user?.name?.charAt(0) || 'C'}
          </div>
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
            <p className="text-muted text-sm">You've generated {recipes.length} recipes total</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="glass rounded-2xl p-6 shadow-sm group hover:border-gold transition-all transform hover:-translate-y-1">
              <div className="font-serif text-3xl font-bold text-dark mb-1 group-hover:text-gradient-gold transition-colors">{recipes.length}</div>
              <div className="text-xs font-bold text-muted uppercase tracking-wider">Recipes Generated</div>
            </div>
            <div className="glass rounded-2xl p-6 shadow-sm group hover:border-gold transition-all transform hover:-translate-y-1">
              <div className="font-serif text-3xl font-bold text-dark mb-1 group-hover:text-gradient-gold transition-colors">
                {recipes.filter(r => r.favorite).length || 0}
              </div>
              <div className="text-xs font-bold text-muted uppercase tracking-wider">Saved Favourites</div>
            </div>
            <div className="glass rounded-2xl p-6 shadow-sm group hover:border-gold transition-all transform hover:-translate-y-1">
              <div className="font-serif text-3xl font-bold text-dark mb-1 group-hover:text-gradient-gold transition-colors">---</div>
              <div className="text-xs font-bold text-muted uppercase tracking-wider">AI Credits</div>
            </div>
          </div>

          <div className="glass rounded-2xl p-6 mb-10 shadow-sm flex flex-col md:flex-row items-center gap-4 hover:shadow-md transition-shadow">
            <input 
              type="text" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
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
                 onClick={handleGenerate}
                 disabled={generating || !prompt.trim()}
                 className={`flex-1 md:flex-none bg-gold text-dark px-6 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-gold-light transition-colors cursor-pointer whitespace-nowrap ${generating ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span>✨</span> {generating ? 'Generating...' : 'Generate'}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-dark text-lg">My Collection</h3>
            <button 
              onClick={fetchRecipes}
              className="text-xs font-bold text-muted hover:text-dark transition-colors cursor-pointer uppercase tracking-wider"
            >
              Refresh ↻
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
              <p className="text-muted text-sm font-medium">Fetching your kitchen...</p>
            </div>
          ) : (
            <>
              {generating && (
                <div className="mb-6 glass rounded-2xl p-6 shadow-sm animate-pulse-soft border-gold/50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gray-200/60 rounded-xl animate-pulse"></div>
                    <div className="flex-1">
                       <div className="h-5 bg-gray-200/60 rounded w-1/3 mb-2 animate-pulse"></div>
                       <div className="h-3 bg-gray-200/60 rounded w-1/4 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="h-3 bg-gray-200/60 rounded w-full mb-2 animate-pulse"></div>
                  <div className="h-3 bg-gray-200/60 rounded w-5/6 animate-pulse"></div>
                </div>
              )}
              {recipes.length > 0 ? (
                <RecipeGrid recipes={recipes} onDelete={handleDelete} />
              ) : (
                <div className="glass border-2 border-dashed border-border rounded-3xl p-20 text-center">
                  <div className="text-5xl mb-6 opacity-30 animate-bounce-slow">🍳</div>
                  <h4 className="text-dark font-bold mb-2">No recipes yet</h4>
                  <p className="text-muted text-sm mb-8">Enter a prompt above to generate your first AI dish!</p>
                  <button 
                    onClick={() => setPrompt('Simple chicken curry')}
                    className="text-gold font-bold text-sm hover:underline cursor-pointer"
                  >
                    Try a suggestion
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      <button 
        onClick={onOpenChat}
        className="fixed bottom-6 right-6 bg-dark text-cream px-6 py-4 rounded-full font-bold shadow-2xl flex items-center gap-3 hover:translate-y-[-4px] transition-all cursor-pointer z-40 group"
      >
        <span className="text-xl group-hover:rotate-12 transition-transform">🍳</span>
        <span className="hidden sm:inline">Chat with AI Chef</span>
      </button>
    </div>
  );
};

export default DashboardPage;
