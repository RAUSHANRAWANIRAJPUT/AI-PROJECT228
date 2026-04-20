import express from 'express';
import { 
    generateRecipe, 
    getRecipes, 
    saveRecipe,
    deleteRecipe,
    findRecipesByIngredients
} from '../controllers/recipeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/generate', protect, generateRecipe);
router.get('/', protect, getRecipes);
router.post('/', protect, saveRecipe);
router.post('/find-recipes', protect, findRecipesByIngredients);
router.delete('/:id', protect, deleteRecipe);

export default router;
