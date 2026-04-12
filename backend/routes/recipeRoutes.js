const express = require('express');
const router = express.Router();
const { 
    generateRecipe, 
    getRecipes, 
    saveRecipe, 
    deleteRecipe 
} = require('../controllers/recipeController');
const { protect } = require('../middleware/authMiddleware');

router.post('/generate', protect, generateRecipe);
router.get('/', protect, getRecipes);
router.post('/', protect, saveRecipe);
router.delete('/:id', protect, deleteRecipe);

module.exports = router;
