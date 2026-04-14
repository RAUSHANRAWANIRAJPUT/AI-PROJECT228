import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import RecipeGrid from '../components/dashboard/RecipeGrid';
import RotatingShayari from '../components/shared/RotatingShayari';
import { recipeService } from '../services/api';

const promptIdeas = [
  'High protein paneer bowl',
  'Quick pasta with chicken',
  'Healthy Indian lunch',
  'Street-style noodles',
];

const DashboardPage = ({ user, onOpenChat, onLogout, onNavigate }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [filters, setFilters] = useState({ vegan: false, quick: false, cuisine: '' });

  const fetchRecipes = useCallback(async (filterParams = filters) => {
    try {
      setLoading(true);
      const data = await recipeService.getRecipes(filterParams);
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchRecipes(filters);
  }, [filters, fetchRecipes]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    try {
      const generated = await recipeService.generateRecipe(prompt);
      const saved = await recipeService.saveRecipe(generated);
      setRecipes((prev) => [saved, ...prev]);
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

  const handleToggleFavorite = async (id) => {
    try {
      const updated = await recipeService.toggleFavorite(id);
      setRecipes((prev) => prev.map((recipe) => recipe._id === id ? updated : recipe));
    } catch (err) {
      console.error('Favorite toggle failed:', err);
      alert('Unable to update favorite status. Please try again.');
    }
  };

  const favoriteCount = recipes.filter((recipe) => recipe.isFavorite || recipe.favorite).length;
  const chefName = user?.name || 'Chef';

  return (
    <div className="min-h-screen bg-[#EEF7F1] pt-[72px] text-dark">
      <div className="flex min-h-[calc(100vh-72px)] flex-col md:flex-row">
        <aside className="hidden w-full flex-shrink-0 border-r border-border bg-white md:sticky md:top-[72px] md:block md:h-[calc(100vh-72px)] md:w-[264px]">
          <Sidebar
            onNavigate={onNavigate}
            currentPage="dashboard"
            filters={filters}
            onFilterChange={handleFilterChange}
            onOpenChat={onOpenChat}
            onLogout={onLogout}
          />
        </aside>

        <main className="flex-1 overflow-hidden px-4 py-5 sm:px-6 lg:px-8">
          <section className="studio-hero animate-dashboard-enter">
            <div className="studio-copy">
              <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-olive/15 bg-white/70 px-3 py-2 text-xs font-black uppercase tracking-[0.24em] text-olive">
                <span className="h-2 w-2 rounded-full bg-olive"></span>
                Recipe studio
              </div>
              <p className="text-sm font-black text-muted">Welcome back, {chefName}</p>
              <RotatingShayari
                seed={`${chefName}-dashboard`}
                className="mt-2 font-serif text-3xl font-black leading-tight md:text-4xl"
              />
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
                Turn a craving, ingredient list, or cuisine idea into a recipe that is ready to cook.
              </p>

              <div className="mt-7 rounded-lg border border-border bg-white p-3 shadow-[0_18px_55px_rgba(17,20,15,0.08)]">
                <div className="flex flex-col gap-3 lg:flex-row">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Try: quick paneer wrap, high-protein breakfast, or spicy ramen"
                    className="min-h-12 flex-1 rounded-md bg-[#EEF7F1] px-4 text-sm text-dark outline-none ring-1 ring-transparent transition placeholder:text-muted focus:bg-white focus:ring-olive/35"
                  />
                  <div className="grid grid-cols-2 gap-3 sm:flex">
                    <button type="button" onClick={onOpenChat} className="btn-secondary">
                      Ask AI Chef
                    </button>
                    <button
                      type="button"
                      onClick={handleGenerate}
                      disabled={generating || !prompt.trim()}
                      className={`btn-primary ${generating ? 'pointer-events-none opacity-60' : ''}`}
                    >
                      {generating ? 'Generating' : 'Generate'}
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {promptIdeas.map((idea) => (
                    <button
                      key={idea}
                      type="button"
                      onClick={() => setPrompt(idea)}
                      className="rounded-md border border-border bg-white px-3 py-2 text-xs font-bold text-muted transition hover:-translate-y-0.5 hover:border-olive hover:text-olive"
                    >
                      {idea}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="studio-inspiration">
              <img
                src="https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=900&q=80"
                alt="Fresh cooking ingredients"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent"></div>
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-white/75">Today&apos;s flow</p>
                <h2 className="mt-2 font-serif text-2xl font-black">Cook smarter, not longer.</h2>
                <p className="mt-2 text-sm leading-6 text-white/80">
                  Start with one idea. Let the kitchen plan build around it.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="metric-card animate-dashboard-enter [animation-delay:80ms]">
              <span className="metric-label">Generated</span>
              <div className="mt-3 flex items-end justify-between gap-3">
                <strong className="font-serif text-4xl font-black">{recipes.length}</strong>
                <span className="metric-dot bg-olive"></span>
              </div>
              <p className="mt-2 text-xs text-muted">Recipes in your kitchen</p>
            </div>
            <div className="metric-card animate-dashboard-enter [animation-delay:140ms]">
              <span className="metric-label">Favourites</span>
              <div className="mt-3 flex items-end justify-between gap-3">
                <strong className="font-serif text-4xl font-black">{favoriteCount}</strong>
                <span className="metric-dot bg-rust"></span>
              </div>
              <p className="mt-2 text-xs text-muted">Saved for repeat cooking</p>
            </div>
            <div className="metric-card animate-dashboard-enter [animation-delay:200ms]">
              <span className="metric-label">Mode</span>
              <div className="mt-3 flex items-end justify-between gap-3">
                <strong className="font-serif text-4xl font-black">AI</strong>
                <span className="metric-dot bg-gold"></span>
              </div>
              <p className="mt-2 text-xs text-muted">Ready for new prompts</p>
            </div>
          </section>

          <section className="mt-7">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-olive">Cookbook</p>
                <h2 className="mt-2 font-serif text-2xl font-black text-dark">Your Collection</h2>
              </div>
              <button
                type="button"
                onClick={fetchRecipes}
                className="w-fit rounded-lg border border-border bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-muted transition hover:-translate-y-0.5 hover:border-olive hover:text-olive"
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center gap-4 py-16">
                <div className="h-10 w-10 rounded-full border-4 border-gold border-t-transparent animate-spin"></div>
                <p className="text-sm font-medium text-muted">Fetching your kitchen...</p>
              </div>
            ) : (
              <>
                {generating && (
                  <div className="mb-5 rounded-lg border border-gold/60 bg-white p-6 shadow-sm animate-pulse-soft">
                    <div className="mb-4 flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-gray-200/60 animate-pulse"></div>
                      <div className="flex-1">
                        <div className="mb-2 h-5 w-1/3 rounded bg-gray-200/60 animate-pulse"></div>
                        <div className="h-3 w-1/4 rounded bg-gray-200/60 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="mb-2 h-3 w-full rounded bg-gray-200/60 animate-pulse"></div>
                    <div className="h-3 w-5/6 rounded bg-gray-200/60 animate-pulse"></div>
                  </div>
                )}
                {recipes.length > 0 ? (
                  <RecipeGrid recipes={recipes} onToggleFavorite={handleToggleFavorite} />
                ) : (
                  <div className="empty-state animate-dashboard-enter">
                    <div className="mx-auto mb-5 h-28 w-28 overflow-hidden rounded-lg">
                      <img
                        src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=400&q=80"
                        alt="Recipe notebook and ingredients"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-black text-dark">Start your first recipe</h3>
                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
                      Pick a quick idea above or describe whatever is in your kitchen.
                    </p>
                    <button type="button" onClick={() => setPrompt('Simple chicken curry')} className="btn-primary mt-6">
                      Try a suggestion
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </main>
      </div>

      <button
        type="button"
        onClick={onOpenChat}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-lg bg-dark px-5 py-4 text-sm font-black text-white shadow-[0_20px_60px_rgba(17,20,15,0.25)] transition hover:-translate-y-1 hover:bg-olive"
      >
        <span className="h-2 w-2 rounded-full bg-gold animate-pulse"></span>
        <span className="hidden sm:inline">Chat with AI Chef</span>
        <span className="sm:hidden">Chat</span>
      </button>
    </div>
  );
};

export default DashboardPage;
