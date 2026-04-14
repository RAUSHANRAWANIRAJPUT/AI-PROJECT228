const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    tag: {
        type: String,
        required: [true, 'Please add a tag']
    },
    time: {
        type: String,
        required: [true, 'Please add a time estimate']
    },
    servings: {
        type: String,
        required: [true, 'Please add servings']
    },
    ingredients: {
        type: [String],
        required: [true, 'Please add ingredients']
    },
    instructions: {
        type: [String],
        required: [true, 'Please add instructions']
    },
    image: {
        type: String,
        default: '🥘'
    },
    isFavorite: {
        type: Boolean,
        default: false
    },
    isVegan: {
        type: Boolean,
        default: false
    },
    cookingTime: {
        type: Number,
        default: 0
    },
    cuisine: {
        type: String,
        default: 'General'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Recipe', recipeSchema);
