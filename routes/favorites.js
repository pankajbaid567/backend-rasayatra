const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Get user's favorite recipes
router.get('/', authenticateToken, async (req, res) => {
  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId: req.user.id },
      include: {
        recipe: {
          include: {
            author: {
              select: { id: true, name: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({
      success: true,
      data: {
        favorites
      }
    });
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch favorites'
    });
  }
});

// Add a recipe to favorites
router.post('/:recipeId', authenticateToken, async (req, res) => {
  try {
    const { recipeId } = req.params;
    const userId = req.user.id;

    // Check if recipe exists
    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId }
    });

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    // Check if already favorited
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_recipeId: {
          userId,
          recipeId
        }
      }
    });

    if (existingFavorite) {
      return res.status(409).json({
        success: false,
        message: 'Recipe already in favorites'
      });
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId,
        recipeId
      },
      include: {
        recipe: {
          select: { id: true, title: true, description: true, image: true }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Recipe added to favorites',
      data: {
        favorite
      }
    });
  } catch (error) {
    console.error('Add to favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add recipe to favorites'
    });
  }
});

// Remove a recipe from favorites
router.delete('/:recipeId', authenticateToken, async (req, res) => {
  try {
    const { recipeId } = req.params;
    const userId = req.user.id;

    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_recipeId: {
          userId,
          recipeId
        }
      }
    });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: 'Favorite not found'
      });
    }

    await prisma.favorite.delete({
      where: {
        userId_recipeId: {
          userId,
          recipeId
        }
      }
    });

    res.status(200).json({
      success: true,
      message: 'Recipe removed from favorites'
    });
  } catch (error) {
    console.error('Remove from favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove recipe from favorites'
    });
  }
});

// Check if a recipe is favorited by the current user
router.get('/check/:recipeId', authenticateToken, async (req, res) => {
  try {
    const { recipeId } = req.params;
    const userId = req.user.id;

    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_recipeId: {
          userId,
          recipeId
        }
      }
    });

    res.status(200).json({
      success: true,
      data: {
        isFavorite: !!favorite
      }
    });
  } catch (error) {
    console.error('Check favorite error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check favorite status'
    });
  }
});

module.exports = router;
