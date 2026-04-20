import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import RecipeGrid from '../components/dashboard/RecipeGrid';
import RotatingShayari from '../components/shared/RotatingShayari';
import HungryCharacter from '../components/dashboard/HungryCharacter';
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
  const [generationError, setGenerationError] = useState('');
  const [filters, setFilters] = useState({ vegan: false, quick: false, cuisine: '' });
  
  // New state for Find Recipe by Ingredients
  const [ingredients, setIngredients] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  // Character State Logic
  const [characterState, setCharacterState] = useState('idle');
  const [characterMessage, setCharacterMessage] = useState("I'm hungry... what can we cook?");

  // Monitor Character State Changes
  useEffect(() => {
    if (generating || searching) {
      setCharacterState('searching');
      setCharacterMessage("Cooking something delicious...");
    } else if (generationError || searchError) {
      setCharacterState('error');
      setCharacterMessage("No food? That's sad...");
    } else if (prompt.trim() || ingredients.trim()) {
      setCharacterState('typing');
      setCharacterMessage("Hmm... nice ingredients!");
    } else {
      setCharacterState('idle');
      setCharacterMessage("I'm hungry... what can we cook?");
    }
  }, [generating, searching, generationError, searchError, prompt, ingredients]);

  // Success trigger specifically after a process completes
  useEffect(() => {
    // Only trigger if we aren't loading initial data
    if (!loading && !generating && !searching && (recipes.length > 0 || suggestions.length > 0)) {
      // Avoid triggering on simple filter changes or other background updates
      // We only want this after a 'Generate' or 'Find' action
      // A simple way is to check if we were just in a searching/generating state
      // (This could be further refined with a ref, but this is a good start)
    }
  }, [generating, searching, recipes.length, suggestions.length, loading]);

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
    setGenerationError('');
    try {
      const generated = await recipeService.generateRecipe(prompt);
      const saved = await recipeService.saveRecipe(generated);
      setRecipes((prev) => [saved, ...prev]);
      setPrompt('');
    } catch (err) {
      console.error('Generation failed:', err);
      let message = err.response?.data?.message || err.message || 'Failed to generate recipe. Check your API key.';
      if (typeof message === 'object') {
        message = JSON.stringify(message);
      }
      setGenerationError(message);
    } finally {
      setGenerating(false);
    }
  };

  const handleFindRecipes = async () => {
    if (!ingredients.trim()) return;
    setSearching(true);
    setSearchError('');
    setSuggestions([]);
    try {
      const results = await recipeService.findRecipesByIngredients(ingredients);
      setSuggestions(results);
    } catch (err) {
      console.error('Search failed:', err);
      setSearchError('Failed to find recipes. Please try again.');
    } finally {
      setSearching(false);
    }
  };

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
          <section className="studio-hero animate-dashboard-enter mb-10">
            <div className="studio-copy lg:col-span-4">
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

              <div className="mt-7 rounded-lg border border-border bg-[#EEF7F1]/30 p-3 shadow-inner">
                <div className="flex flex-col gap-3 lg:flex-row">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Try: quick paneer wrap, high-protein breakfast, or spicy ramen"
                    className="min-h-12 flex-1 rounded-md bg-white px-4 text-sm text-dark outline-none ring-1 ring-border transition placeholder:text-muted focus:ring-olive/35"
                  />
                  <div className="grid grid-cols-2 gap-3 sm:flex">
                    <button type="button" onClick={onOpenChat} className="btn-secondary whitespace-nowrap">
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

                {generationError && (
                  <div className="mt-4 rounded-lg border border-rust/30 bg-rust/10 px-4 py-3 text-sm font-bold leading-6 text-rust">
                    {generationError}
                  </div>
                )}
              </div>
            </div>

            {/* Character Section */}
            <div className="flex items-center justify-end lg:col-span-1 lg:pt-6 h-full min-h-[200px]">
              <HungryCharacter state={characterState} message={characterMessage} />
            </div>
          </section>

          {/* New Find Recipe by Ingredients Section */}
          <section className="mb-12 animate-dashboard-enter [animation-delay:100ms]">
            <div className="studio-copy">
              <div className="mb-6">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-olive mb-2">Smart Search</p>
                <h2 className="font-serif text-2xl font-black text-dark">Find Recipe by Ingredients</h2>
                <p className="text-sm text-muted mt-1">Enter what you have in your fridge, and let AI suggest what you can cook.</p>
              </div>
              
              <div className="flex flex-col gap-3 sm:flex-row mt-6">
                <input
                  type="text"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="Example: onion, tomato, paneer, garlic"
                  className="min-h-12 flex-1 rounded-md border border-border bg-[#F9FBF9] px-4 text-sm text-dark outline-none transition placeholder:text-muted focus:bg-white focus:ring-1 focus:ring-olive/35"
                />
                <button
                  type="button"
                  onClick={handleFindRecipes}
                  disabled={searching || !ingredients.trim()}
                  className={`btn-primary px-8 ${searching ? 'pointer-events-none opacity-60' : ''}`}
                >
                  {searching ? 'Searching...' : 'Find Recipes'}
                </button>
              </div>

              {searchError && (
                <div className="mt-4 text-sm font-bold text-rust">{searchError}</div>
              )}

              {suggestions.length > 0 && (
                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {suggestions.map((item, idx) => (
                    <div key={idx} className="group relative overflow-hidden rounded-xl border border-border bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-olive/40 hover:shadow-[0_20px_40px_rgba(17,20,15,0.06)]">
                      <div className="absolute top-0 left-0 h-1 w-0 bg-olive transition-all duration-500 group-hover:w-full"></div>
                      <h3 className="font-bold text-dark mb-2">{item.title}</h3>
                      <p className="text-xs leading-relaxed text-muted line-clamp-3">{item.description}</p>
                      <button 
                        onClick={() => {
                          setPrompt(`How to cook ${item.title}`);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="mt-4 flex items-center gap-2 text-xs font-black text-olive transition hover:gap-3"
                      >
                        Cook this <span>→</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
                {recipes.length > 0 ? (
                  <RecipeGrid recipes={recipes} />
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
