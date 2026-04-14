import React, { useEffect, useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import { recipeService } from '../services/api';

const MyRecipesPage = ({ onOpenChat, onLogout, onNavigate }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isValidUrl = (value) => {
    try {
      return Boolean(value && /^https?:\/\//i.test(value) && new URL(value));
    } catch {
      return false;
    }
  };

  const getRecipeImage = (recipe) => {
    if (recipe.image && isValidUrl(recipe.image)) {
      return recipe.image;
    }
    const query = recipe.title ? `food,${recipe.title.replace(/[^a-zA-Z0-9\s]/g, '').trim()}` : 'food';
    return `https://source.unsplash.com/600x400/?${encodeURIComponent(query)}`;
  };

  const handleImageError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = `https://source.unsplash.com/600x400/?food&sig=${Math.random()}`;
  };

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const data = await recipeService.getRecipes();
      setRecipes(data);
      setError('');
    } catch (err) {
      console.error('Failed to fetch saved recipes:', err);
      setError('Unable to load recipes right now. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this recipe from your collection?')) return;

    try {
      await recipeService.deleteRecipe(id);
      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Unable to delete recipe. Please try again.');
    }
  };

  const handleToggleFavorite = async (id) => {
    try {
      const updated = await recipeService.toggleFavorite(id);
      setRecipes((prevRecipes) => prevRecipes.map((recipe) => recipe._id === id ? updated : recipe));
    } catch (err) {
      console.error('Favorite toggle failed:', err);
      alert('Unable to update favorite status. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F2EDE3] pt-0">
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-73px)]">
        <aside className="w-full md:w-64 flex-shrink-0 md:sticky md:top-[73px] md:h-[calc(100vh-73px)] hidden md:block">
          <Sidebar onNavigate={onNavigate} currentPage="my-recipes" onOpenChat={onOpenChat} onLogout={onLogout} />
        </aside>

        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          <div className="mb-10 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-3xl font-bold text-dark mb-1">My Recipes</h2>
                <p className="text-muted text-sm">Your saved recipe collection from the kitchen.</p>
              </div>
              <button
                onClick={fetchRecipes}
                className="text-xs font-bold text-muted hover:text-dark transition-colors uppercase tracking-wider"
              >
                Refresh ↻
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-4">
              <div className="glass rounded-3xl p-5 shadow-sm">
                <div className="text-3xl font-bold text-dark">{recipes.length}</div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted">Recipes saved</div>
              </div>
              <div className="glass rounded-3xl p-5 shadow-sm col-span-full sm:col-span-2">
                <div className="text-sm text-muted leading-relaxed">
                  Your personal cookbook keeps every AI-generated recipe ready to cook. Tap delete to remove anything you no longer want.
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
              <p className="text-muted text-sm font-medium">Loading saved recipes...</p>
            </div>
          ) : error ? (
            <div className="glass rounded-3xl border border-border p-10 text-center text-sm text-rust">{error}</div>
          ) : recipes.length === 0 ? (
            <div className="glass rounded-3xl border border-border p-16 text-center">
              <div className="text-5xl mb-6 opacity-30">📚</div>
              <h4 className="text-dark font-bold mb-2">No recipes found</h4>
              <p className="text-muted text-sm mb-4">Generate a recipe from the dashboard and it will appear here.</p>
              <button
                onClick={() => onNavigate('dashboard')}
                className="bg-dark text-cream px-5 py-3 rounded-xl text-sm font-bold hover:bg-olive transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {recipes.map((recipe) => (
                <article
                  key={recipe._id}
                  className="group overflow-hidden rounded-[28px] border border-border bg-white shadow-[0_18px_60px_rgba(20,20,20,0.08)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="relative overflow-hidden bg-gradient-to-br from-[#fff7e4] via-[#f8e1c7] to-[#f3d6ac] p-6 text-center">
                    <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-[32px] bg-white/90 shadow-sm">
                      <img
                        src={getRecipeImage(recipe)}
                        alt={recipe.title || 'Recipe image'}
                        loading="lazy"
                        onError={handleImageError}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="inline-flex rounded-full bg-olive/10 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-olive">
                      {recipe.tag || 'Saved'}
                    </span>
                  </div>

                  <div className="px-6 pb-6 pt-5 sm:px-7">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-semibold text-dark mb-2 leading-tight">{recipe.title}</h3>
                        <div className="flex flex-wrap gap-2 text-[13px] text-dark">
                          <span className="inline-flex items-center gap-2 rounded-2xl bg-[#fff8f0] px-3 py-2">
                            ⏱ {recipe.time}
                          </span>
                          <span className="inline-flex items-center gap-2 rounded-2xl bg-[#eff7ff] px-3 py-2">
                            👤 {recipe.servings}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleFavorite(recipe._id)}
                          className={`rounded-2xl border px-3 py-2 text-xs font-semibold transition-colors ${recipe.isFavorite ? 'bg-rust text-white border-rust' : 'bg-white text-dark border-border hover:bg-cream'}`}
                        >
                          {recipe.isFavorite ? '❤️ Favorited' : '🤍 Favorite'}
                        </button>
                        <button
                          onClick={() => handleDelete(recipe._id)}
                          className="rounded-2xl border border-border bg-white px-3 py-2 text-xs font-semibold text-rust transition-colors hover:bg-rust hover:text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3 text-sm text-muted">
                      <div className="flex items-center justify-between rounded-2xl bg-[#f8f4e7] px-4 py-3">
                        <span>Ingredients</span>
                        <span className="font-semibold text-dark">{recipe.ingredients?.length ?? 0}</span>
                      </div>
                      <div className="flex items-center justify-between rounded-2xl bg-[#eef7ff] px-4 py-3">
                        <span>Steps</span>
                        <span className="font-semibold text-dark">{recipe.steps?.length ?? 0}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>

      <button
        onClick={onOpenChat}
        className="fixed bottom-6 right-6 bg-dark text-cream px-6 py-4 rounded-full font-bold shadow-2xl flex items-center gap-3 hover:translate-y-[-4px] transition-all cursor-pointer z-40"
      >
        <span className="text-xl">🍳</span>
        <span className="hidden sm:inline">Chat with AI Chef</span>
      </button>
    </div>
  );
};

export default MyRecipesPage;
