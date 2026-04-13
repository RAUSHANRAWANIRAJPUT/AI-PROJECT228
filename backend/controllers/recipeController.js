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
        if (!process.env.OPENROUTER_API_KEY) {
            return res.status(500).json({ message: 'OpenRouter API key is not configured' });
        }

        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'openai/gpt-4o-mini',
                temperature: 0.7,
                max_tokens: 900,
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
                response_format: {
                    type: 'json_schema',
                    json_schema: {
                        name: 'recipe',
                        schema: {
                            type: 'object',
                            properties: {
                                title: { type: 'string' },
                                tag: { type: 'string' },
                                time: { type: 'string' },
                                servings: { type: 'string' },
                                ingredients: { type: 'array', items: { type: 'string' } },
                                instructions: { type: 'array', items: { type: 'string' } }
                            },
                            required: ['title', 'tag', 'time', 'servings', 'ingredients', 'instructions']
                        }
                    }
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    'Referer': 'https://letmecook.app',
                    'X-Title': 'Let Me Cook'
                }
            }
        );

        const choice = response.data?.choices?.[0];
        const content = choice?.message?.content;
        if (!content) {
            console.error('AI Generation Error: missing content', response.data);
            return res.status(500).json({ message: 'AI service returned an empty response' });
        }

        let recipeData = content;
        if (typeof content === 'string') {
            try {
                recipeData = JSON.parse(content);
            } catch (parseError) {
                console.error('AI Generation Parse Error:', parseError, 'rawContent:', content);
                return res.status(500).json({ message: 'AI service returned invalid recipe format' });
            }
        }

        res.status(200).json(recipeData);
    } catch (error) {
        const apiError = error.response?.data || error.message;
        console.error('AI Generation Error:', apiError);

        let message = error.response?.data?.message ||
            error.response?.data?.error ||
            error.response?.data?.detail ||
            error.message ||
            'Failed to generate recipe with AI';

        if (typeof message === 'object') {
            message = JSON.stringify(message);
        }

        res.status(error.response?.status || 500).json({ message });
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
