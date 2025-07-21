const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken } = require('../middleware/auth');
const { validate, recipeSchema, updateRecipeSchema } = require('../middleware/validation');

const router = express.Router();
const prisma = new PrismaClient();

// Get all recipes with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      region,
      difficulty,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    // Build where clause
    const where = {};
    
    if (region) {
      where.region = { contains: region, mode: 'insensitive' };
    }
    
    if (difficulty) {
      where.difficulty = difficulty;
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Get recipes with pagination
    const [recipes, total] = await Promise.all([
      prisma.recipe.findMany({
        where,
        skip,
        take,
        orderBy: { [sortBy]: sortOrder },
        include: {
          author: {
            select: { id: true, name: true }
          }
        }
      }),
      prisma.recipe.count({ where })
    ]);

    const totalPages = Math.ceil(total / take);

    res.status(200).json({
      success: true,
      data: {
        recipes,
        pagination: {
          page: parseInt(page),
          limit: take,
          total,
          pages: totalPages,
          hasNext: parseInt(page) < totalPages,
          hasPrev: parseInt(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Get recipes error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recipes'
    });
  }
});

// Get a specific recipe by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await prisma.recipe.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, name: true }
        }
      }
    });

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        recipe
      }
    });
  } catch (error) {
    console.error('Get recipe error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recipe'
    });
  }
});

// Create a new recipe
router.post('/', authenticateToken, validate(recipeSchema), async (req, res) => {
  try {
    const recipeData = {
      ...req.body,
      authorId: req.user.id
    };

    const recipe = await prisma.recipe.create({
      data: recipeData,
      include: {
        author: {
          select: { id: true, name: true }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Recipe created successfully',
      data: {
        recipe
      }
    });
  } catch (error) {
    console.error('Create recipe error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create recipe'
    });
  }
});

// Update a recipe
router.put('/:id', authenticateToken, validate(updateRecipeSchema), async (req, res) => {
  try {
    const { id } = req.params;

    // Check if recipe exists and user owns it
    const existingRecipe = await prisma.recipe.findUnique({
      where: { id }
    });

    if (!existingRecipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    if (existingRecipe.authorId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own recipes'
      });
    }

    const recipe = await prisma.recipe.update({
      where: { id },
      data: req.body,
      include: {
        author: {
          select: { id: true, name: true }
        }
      }
    });

    res.status(200).json({
      success: true,
      message: 'Recipe updated successfully',
      data: {
        recipe
      }
    });
  } catch (error) {
    console.error('Update recipe error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update recipe'
    });
  }
});

// Delete a recipe
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if recipe exists and user owns it
    const existingRecipe = await prisma.recipe.findUnique({
      where: { id }
    });

    if (!existingRecipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    if (existingRecipe.authorId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own recipes'
      });
    }

    await prisma.recipe.delete({
      where: { id }
    });

    res.status(200).json({
      success: true,
      message: 'Recipe deleted successfully'
    });
  } catch (error) {
    console.error('Delete recipe error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete recipe'
    });
  }
});

// Get featured recipes (top rated)
router.get('/featured/top', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;

    const recipes = await prisma.recipe.findMany({
      take: limit,
      orderBy: [
        { rating: 'desc' },
        { createdAt: 'desc' }
      ],
      include: {
        author: {
          select: { id: true, name: true }
        }
      }
    });

    res.status(200).json({
      success: true,
      data: {
        recipes
      }
    });
  } catch (error) {
    console.error('Get featured recipes error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured recipes'
    });
  }
});

// Get recipes by region
router.get('/region/:region', async (req, res) => {
  try {
    const { region } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const [recipes, total] = await Promise.all([
      prisma.recipe.findMany({
        where: {
          region: { contains: region, mode: 'insensitive' }
        },
        skip,
        take,
        orderBy: { rating: 'desc' },
        include: {
          author: {
            select: { id: true, name: true }
          }
        }
      }),
      prisma.recipe.count({
        where: {
          region: { contains: region, mode: 'insensitive' }
        }
      })
    ]);

    const totalPages = Math.ceil(total / take);

    res.status(200).json({
      success: true,
      data: {
        recipes,
        pagination: {
          page: parseInt(page),
          limit: take,
          total,
          pages: totalPages
        }
      }
    });
  } catch (error) {
    console.error('Get recipes by region error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recipes by region'
    });
  }
});

module.exports = router;
