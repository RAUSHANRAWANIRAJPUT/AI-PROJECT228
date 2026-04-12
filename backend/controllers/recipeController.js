const Recipe = require('../models/Recipe');
const axios = require('axios');

// @desc    Generate recipe using AI
// @route   POST /api/recipes/generate
// @access  Private
const generateRecipe = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ message: 'Please provide a prompt' });
    }

    try {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'google/gemini-2.0-flash-exp:free', // Use a standard model
                messages: [
                    {
                        role: 'system',
                        content: 'You are a professional chef. Generate a detailed recipe based on the user prompt. Return ONLY a JSON object with the following structure: {"title": "string", "tag": "string", "time": "string", "servings": "string", "ingredients": ["string"], "instructions": ["string"]}. Ensure "tag" is a cuisine type (e.g., Italian, healthy, etc.) and "time" includes units.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                response_format: { type: 'json_object' }
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'HTTP-Referer': 'https://chefai.app',
                    'X-Title': 'ChefAI'
                }
            }
        );

        const recipeData = JSON.parse(response.data.choices[0].message.content);
        res.status(200).json(recipeData);
    } catch (error) {
        console.error('AI Generation Error:', error.response?.data || error.message);
        res.status(500).json({ message: 'Failed to generate recipe with AI' });
    }
};

// @desc    Get user recipes
// @route   GET /api/recipes
// @access  Private
const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Save a recipe
// @route   POST /api/recipes
// @access  Private
const saveRecipe = async (req, res) => {
    const { title, tag, time, servings, ingredients, instructions, image } = req.body;

    try {
        const recipe = await Recipe.create({
            userId: req.user.id,
            title,
            tag,
            time,
            servings,
            ingredients,
            instructions,
            image
        });
        res.status(201).json(recipe);
    } catch (error) {
        res.status(400).json({ message: 'Invalid recipe data' });
    }
};

// @desc    Delete a recipe
// @route   DELETE /api/recipes/:id
// @access  Private
const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        // Check for user
        if (recipe.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await recipe.deleteOne();
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    generateRecipe,
    getRecipes,
    saveRecipe,
    deleteRecipe
};
