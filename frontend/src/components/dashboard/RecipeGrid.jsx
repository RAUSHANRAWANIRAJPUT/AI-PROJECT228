import React from 'react';

const RecipeGrid = ({ recipes = [], onDelete, onToggleFavorite }) => {
  const renderIngredients = (ingredients) => {
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return (
        <li className="text-sm leading-7 text-slate-500">No ingredients available</li>
      );
    }

    const visibleItems = ingredients.slice(0, 4);
    return (
      <>
        {visibleItems.map((item, index) => (
          <li
            key={`${item}-${index}`}
            className="text-sm leading-7 text-slate-700 before:content-['•'] before:text-orange-400 before:mr-2 list-none"
          >
            {item}
          </li>
        ))}
        {ingredients.length > 4 && (
          <li className="text-sm font-semibold text-orange-600">View more</li>
        )}
      </>
    );
  };

  const renderInstructions = (instructions) => {
    if (!Array.isArray(instructions) || instructions.length === 0) {
      return (
        <li className="text-sm leading-7 text-slate-500">No steps available</li>
      );
    }
    return instructions.map((step, index) => (
      <li key={`${step}-${index}`} className="flex items-start gap-3 text-sm leading-7 text-slate-600">
        <span className="mt-[3px] inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#fff2df] text-xs font-semibold text-orange-600">
          {index + 1}
        </span>
        <span>{step}</span>
      </li>
    ));
  };

  const isValidUrl = (value) => {
    try {
      return Boolean(value && /^https?:\/\//i.test(value) && new URL(value));
    } catch {
      return false;
    }
  };

  const getRecipeImage = (recipe, idx) => {
    const query = recipe.title ? `${recipe.title},food` : 'food';
    return `https://source.unsplash.com/600x400/?${encodeURIComponent(query)}&sig=${idx}`;
  };

  const handleImageError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = `https://source.unsplash.com/600x400/?food&sig=${Math.random()}`;
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {recipes.map((recipe, idx) => (
        <article
          key={recipe._id || idx}
          className="group relative overflow-hidden rounded-[32px] border border-white/70 bg-white/80 shadow-[0_28px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_30px_90px_rgba(15,23,42,0.18)]"
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        >
          <div className="relative overflow-hidden rounded-t-2xl h-48 bg-slate-100">
            <img
              src={getRecipeImage(recipe, idx)}
              alt={recipe.title || 'Recipe image'}
              loading="lazy"
              onError={handleImageError}
              className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
            <div className="absolute right-4 top-4 z-20 flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite?.(recipe._id, !recipe.isFavorite);
                }}
                className={`inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/80 bg-white/90 text-lg shadow-sm transition duration-300 ease-out transform ${recipe.isFavorite ? 'text-orange-600 bg-orange-100 hover:bg-orange-500 hover:text-white' : 'text-slate-900 hover:bg-[#fff4e6] hover:text-orange-600'} hover:scale-105 active:scale-95`}
                aria-label={recipe.isFavorite ? 'Unfavorite recipe' : 'Favorite recipe'}
              >
                {recipe.isFavorite ? '❤️' : '🤍'}
              </button>
            </div>
            <div className="absolute left-4 bottom-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-orange-700 shadow-sm">
              {recipe.tag || 'Chef Pick'}
            </div>
          </div>

          <div className="px-6 pb-6 pt-6 sm:px-7">
            <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-slate-700">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#fff2df] px-3 py-2 font-medium shadow-sm">
                <span>⏱</span>
                <span>{recipe.time || '—'}</span>
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#f7f3ee] px-3 py-2 font-medium text-slate-700 shadow-sm">
                <span>👤</span>
                <span>{recipe.servings || '—'}</span>
              </span>
            </div>

            <h3 className="text-2xl font-semibold tracking-[-0.04em] text-slate-950 leading-tight mb-4">
              {recipe.title || 'Untitled Recipe'}
            </h3>

            <div className="space-y-6 border-t border-slate-200/70 pt-6">
              <div>
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Ingredients
                </div>
                <ul className="grid gap-2 pl-3">{renderIngredients(recipe.ingredients)}</ul>
              </div>

              <div>
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Steps
                </div>
                <ol className="grid gap-3 pl-0">{renderInstructions(recipe.instructions)}</ol>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default RecipeGrid;
