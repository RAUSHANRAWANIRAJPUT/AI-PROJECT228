const express = require('express');
const router = express.Router();
const { 
    generateRecipe, 
    getRecipes, 
    saveRecipe, 
    deleteRecipe,
    toggleFavorite 
} = require('../controllers/recipeController');
const { protect } = require('../middleware/authMiddleware');

router.post('/generate', protect, generateRecipe);
router.get('/', protect, getRecipes);
router.post('/', protect, saveRecipe);
router.put('/:id/favorite', protect, toggleFavorite);
router.delete('/:id', protect, deleteRecipe);

module.exports = router;
