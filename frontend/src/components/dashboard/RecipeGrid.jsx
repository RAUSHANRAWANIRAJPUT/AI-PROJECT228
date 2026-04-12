import React from 'react';

const recipes = [
  { img: '🍝', tag: 'Italian', title: 'Spaghetti Carbonara', time: '25 min', servings: '2 servings' },
  { img: '🍛', tag: 'Indian', title: 'Butter Chicken Masala', time: '45 min', servings: '4 servings' },
  { img: '🥗', tag: 'Healthy', title: 'Greek Salad Bowl', time: '10 min', servings: '1 serving' },
  { img: '🍜', tag: 'Japanese', title: 'Tonkotsu Ramen', time: '3 hrs', servings: '2 servings' },
  { img: '🌮', tag: 'Mexican', title: 'Beef Tacos al Pastor', time: '35 min', servings: '4 servings' },
  { img: '🍰', tag: 'Dessert', title: 'Classic Tiramisu', time: '30 min', servings: '6 servings' },
];

const RecipeGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe, idx) => (
        <div 
          key={idx} 
          className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group"
        >
          <div className="h-40 bg-gradient-to-br from-gold-light to-[#E8D4A0] flex items-center justify-center text-5xl group-hover:scale-105 transition-transform duration-500">
            {recipe.img}
          </div>
          <div className="p-5">
            <span className="inline-block bg-green-light text-green text-[10px] font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
              {recipe.tag}
            </span>
            <h3 className="font-bold text-dark mb-2">{recipe.title}</h3>
            <div className="flex items-center gap-4 text-xs text-muted font-medium">
              <span className="flex items-center gap-1">⏱ {recipe.time}</span>
              <span className="flex items-center gap-1">👤 {recipe.servings}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeGrid;
