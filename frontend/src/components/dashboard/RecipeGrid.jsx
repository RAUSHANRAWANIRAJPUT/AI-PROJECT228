import React, { useState } from 'react';

const timeImages = {
  breakfast: [
    'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=900&q=80',
  ],
  lunch: [
    'https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
  ],
  dinner: [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
  ],
  late: [
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=900&q=80',
  ],
};

const keywordImages = [
  {
    terms: ['paneer', 'masala'],
    images: [
      'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    terms: ['pasta', 'spaghetti', 'noodle'],
    images: [
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    terms: ['chicken', 'grilled'],
    images: [
      'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    terms: ['rice', 'biryani', 'fried rice'],
    images: [
      'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    terms: ['salad', 'vegan', 'healthy', 'bowl'],
    images: [
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    terms: ['breakfast', 'egg', 'toast'],
    images: [
      'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    terms: ['indian', 'curry'],
    images: [
      'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=80',
    ],
  },
];

const getMealPeriod = () => {
  const hour = new Date().getHours();

  if (hour < 11) return 'breakfast';
  if (hour < 16) return 'lunch';
  if (hour < 21) return 'dinner';
  return 'late';
};

const hashText = (value) => {
  return [...value].reduce((hash, char) => hash + char.charCodeAt(0), 0);
};

const RecipeGrid = ({ recipes = [], onToggleFavorite }) => {
  const [expanded, setExpanded] = useState({});

  const getSteps = (recipe) => {
    if (Array.isArray(recipe.instructions)) return recipe.instructions;
    if (Array.isArray(recipe.steps)) return recipe.steps;
    return [];
  };

  const getRecipeKey = (recipe, idx) => recipe._id || `${recipe.title || 'recipe'}-${idx}`;

  const toggleExpanded = (key, section) => {
    setExpanded((prev) => ({
      ...prev,
      [`${key}:${section}`]: !prev[`${key}:${section}`],
    }));
  };

  const isValidUrl = (value) => {
    try {
      return Boolean(value && /^https?:\/\//i.test(value) && new URL(value));
    } catch {
      return false;
    }
  };

  const getRecipeImage = (recipe, idx) => {
    const searchableText = [
      recipe.title,
      recipe.cuisine,
      recipe.tag,
      ...(Array.isArray(recipe.ingredients) ? recipe.ingredients : []),
    ].join(' ').toLowerCase();

    const keywordMatch = keywordImages.find((entry) =>
      entry.terms.some((term) => searchableText.includes(term))
    );

    if (keywordMatch) {
      const imageIndex = hashText(`${recipe.title || ''}-${idx}`) % keywordMatch.images.length;
      return keywordMatch.images[imageIndex];
    }

    if (recipe.image && isValidUrl(recipe.image)) {
      return recipe.image;
    }

    const mealImages = timeImages[getMealPeriod()];
    return mealImages[idx % mealImages.length];
  };

  const handleImageError = (e, idx) => {
    e.currentTarget.onerror = null;
    const fallbackImages = timeImages[getMealPeriod()];
    e.currentTarget.src = fallbackImages[idx % fallbackImages.length];
  };

  const renderIngredients = (ingredients, key) => {
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return <li className="text-sm leading-6 text-muted">No ingredients available</li>;
    }

    const isOpen = Boolean(expanded[`${key}:ingredients`]);
    const visibleItems = isOpen ? ingredients : ingredients.slice(0, 4);

    return (
      <>
        {visibleItems.map((item, index) => (
          <li key={`${item}-${index}`} className="flex items-start gap-2 text-sm leading-6 text-dark/80">
            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-olive"></span>
            <span>{item}</span>
          </li>
        ))}
        {ingredients.length > 4 && (
          <li>
            <button
              type="button"
              onClick={() => toggleExpanded(key, 'ingredients')}
              className="mt-1 text-xs font-black text-olive underline-offset-4 transition hover:text-dark hover:underline"
            >
              {isOpen ? 'Show fewer ingredients' : `Show ${ingredients.length - 4} more ingredients`}
            </button>
          </li>
        )}
      </>
    );
  };

  const renderInstructions = (steps, key) => {
    if (!Array.isArray(steps) || steps.length === 0) {
      return <li className="text-sm leading-6 text-muted">No steps available</li>;
    }

    const isOpen = Boolean(expanded[`${key}:steps`]);
    const visibleSteps = isOpen ? steps : steps.slice(0, 3);

    return (
      <>
        {visibleSteps.map((step, index) => (
          <li key={`${step}-${index}`} className="flex items-start gap-3 text-sm leading-6 text-dark/75">
            <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-[#E8F5EE] text-xs font-black text-olive">
              {index + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
        {steps.length > 3 && (
          <li>
            <button
              type="button"
              onClick={() => toggleExpanded(key, 'steps')}
              className="mt-1 text-xs font-black text-olive underline-offset-4 transition hover:text-dark hover:underline"
            >
              {isOpen ? 'Show fewer steps' : `Show ${steps.length - 3} more steps`}
            </button>
          </li>
        )}
      </>
    );
  };

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {recipes.map((recipe, idx) => {
        const key = getRecipeKey(recipe, idx);
        const steps = getSteps(recipe);
        const isFavorite = recipe.isFavorite || recipe.favorite;

        return (
          <article
            key={key}
            className="recipe-card group animate-dashboard-enter"
            style={{ animationDelay: `${Math.min(idx * 70, 420)}ms` }}
          >
            <div className="relative h-52 overflow-hidden bg-[#DCECDF]">
              <img
                src={getRecipeImage(recipe, idx)}
                alt={recipe.title || 'Recipe image'}
                loading="lazy"
                onError={(e) => handleImageError(e, idx)}
                className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/22 to-transparent"></div>
              <div className="absolute left-4 top-4 rounded-md bg-white/90 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-olive shadow-sm">
                {recipe.tag || getMealPeriod()}
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (recipe._id) onToggleFavorite?.(recipe._id);
                }}
                className={`absolute right-4 top-4 rounded-lg border border-white/80 px-3 py-2 text-xs font-black shadow-sm transition hover:-translate-y-0.5 ${
                  isFavorite ? 'bg-rust text-white' : 'bg-white/90 text-dark hover:text-rust'
                }`}
                aria-label={isFavorite ? 'Unfavorite recipe' : 'Favorite recipe'}
              >
                {isFavorite ? 'Saved' : 'Save'}
              </button>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="line-clamp-2 font-serif text-2xl font-black leading-tight text-white drop-shadow">
                  {recipe.title || 'Untitled Recipe'}
                </h3>
              </div>
            </div>

            <div className="p-5">
              <div className="mb-5 flex flex-wrap gap-2 text-xs font-bold text-dark">
                <span className="rounded-md bg-[#E8F5EE] px-3 py-2">{recipe.time || 'Time pending'}</span>
                <span className="rounded-md bg-[#FFF1BF] px-3 py-2">{recipe.servings || 'Servings pending'}</span>
                <span className="rounded-md bg-[#F1EAFB] px-3 py-2">{recipe.cuisine || 'General'}</span>
              </div>

              <div className="grid gap-5">
                <section>
                  <h4 className="mb-3 text-[11px] font-black uppercase tracking-[0.22em] text-muted">Ingredients</h4>
                  <ul className="grid gap-2">{renderIngredients(recipe.ingredients, key)}</ul>
                </section>

                <section className="border-t border-border pt-5">
                  <h4 className="mb-3 text-[11px] font-black uppercase tracking-[0.22em] text-muted">Method</h4>
                  <ol className="grid gap-3">{renderInstructions(steps, key)}</ol>
                </section>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default RecipeGrid;
