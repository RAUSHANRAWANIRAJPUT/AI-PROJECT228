import express from 'express';
import { 
    generateRecipe, 
    getRecipes, 
    saveRecipe, 
    deleteRecipe,
    toggleFavorite 
} from '../controllers/recipeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/generate', protect, generateRecipe);
router.get('/', protect, getRecipes);
router.post('/', protect, saveRecipe);
router.put('/:id/favorite', protect, toggleFavorite);
router.delete('/:id', protect, deleteRecipe);

export default router;
