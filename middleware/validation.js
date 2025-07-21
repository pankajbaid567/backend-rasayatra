const Joi = require('joi');

// User validation schemas
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    'string.min': 'Name must be at least 2 characters long',
    'string.max': 'Name cannot exceed 50 characters',
    'any.required': 'Name is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  }),
  password: Joi.string().min(6).max(100).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'string.max': 'Password cannot exceed 100 characters',
    'any.required': 'Password is required'
  })
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required'
  })
});

// Recipe validation schemas
const ingredientSchema = Joi.object({
  name: Joi.string().required(),
  quantity: Joi.string().required(),
  healthBenefits: Joi.array().items(Joi.string()).default([])
});

const recipeSchema = Joi.object({
  title: Joi.string().min(2).max(200).required().messages({
    'string.min': 'Recipe title must be at least 2 characters long',
    'string.max': 'Recipe title cannot exceed 200 characters',
    'any.required': 'Recipe title is required'
  }),
  description: Joi.string().min(10).max(1000).required().messages({
    'string.min': 'Description must be at least 10 characters long',
    'string.max': 'Description cannot exceed 1000 characters',
    'any.required': 'Description is required'
  }),
  region: Joi.string().required().messages({
    'any.required': 'Region is required'
  }),
  prepTime: Joi.number().integer().min(0).max(10080).required().messages({ // max 1 week
    'number.min': 'Prep time cannot be negative',
    'number.max': 'Prep time cannot exceed 1 week (10080 minutes)',
    'any.required': 'Prep time is required'
  }),
  cookTime: Joi.number().integer().min(0).max(10080).required().messages({
    'number.min': 'Cook time cannot be negative',
    'number.max': 'Cook time cannot exceed 1 week (10080 minutes)',
    'any.required': 'Cook time is required'
  }),
  difficulty: Joi.string().valid('Easy', 'Medium', 'Hard').required().messages({
    'any.only': 'Difficulty must be Easy, Medium, or Hard',
    'any.required': 'Difficulty is required'
  }),
  servings: Joi.number().integer().min(1).max(50).required().messages({
    'number.min': 'Servings must be at least 1',
    'number.max': 'Servings cannot exceed 50',
    'any.required': 'Servings is required'
  }),
  image: Joi.string().uri().optional(),
  ingredients: Joi.array().items(ingredientSchema).min(1).required().messages({
    'array.min': 'At least one ingredient is required',
    'any.required': 'Ingredients are required'
  }),
  instructions: Joi.array().items(Joi.string().min(5)).min(1).required().messages({
    'array.min': 'At least one instruction is required',
    'any.required': 'Instructions are required'
  }),
  healthBenefits: Joi.array().items(Joi.string()).default([]),
  culturalStory: Joi.string().max(2000).optional(),
  tips: Joi.array().items(Joi.string()).default([])
});

const updateRecipeSchema = recipeSchema.fork(
  ['title', 'description', 'region', 'prepTime', 'cookTime', 'difficulty', 'servings', 'ingredients', 'instructions'],
  (schema) => schema.optional()
);

// Validation middleware
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join('; ');
      return res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors: error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message
        }))
      });
    }
    next();
  };
};

module.exports = {
  registerSchema,
  loginSchema,
  recipeSchema,
  updateRecipeSchema,
  validate
};
