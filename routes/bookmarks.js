const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Get user's bookmarked recipes
router.get('/', authenticateToken, async (req, res) => {
  try {
    const bookmarks = await prisma.bookmark.findMany({
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
        bookmarks
      }
    });
  } catch (error) {
    console.error('Get bookmarks error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookmarks'
    });
  }
});

// Bookmark a recipe
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

    // Check if already bookmarked
    const existingBookmark = await prisma.bookmark.findUnique({
      where: {
        userId_recipeId: {
          userId,
          recipeId
        }
      }
    });

    if (existingBookmark) {
      return res.status(409).json({
        success: false,
        message: 'Recipe already bookmarked'
      });
    }

    const bookmark = await prisma.bookmark.create({
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
      message: 'Recipe bookmarked successfully',
      data: {
        bookmark
      }
    });
  } catch (error) {
    console.error('Bookmark recipe error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to bookmark recipe'
    });
  }
});

// Remove a recipe from bookmarks
router.delete('/:recipeId', authenticateToken, async (req, res) => {
  try {
    const { recipeId } = req.params;
    const userId = req.user.id;

    const bookmark = await prisma.bookmark.findUnique({
      where: {
        userId_recipeId: {
          userId,
          recipeId
        }
      }
    });

    if (!bookmark) {
      return res.status(404).json({
        success: false,
        message: 'Bookmark not found'
      });
    }

    await prisma.bookmark.delete({
      where: {
        userId_recipeId: {
          userId,
          recipeId
        }
      }
    });

    res.status(200).json({
      success: true,
      message: 'Recipe removed from bookmarks'
    });
  } catch (error) {
    console.error('Remove bookmark error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove bookmark'
    });
  }
});

// Check if a recipe is bookmarked by the current user
router.get('/check/:recipeId', authenticateToken, async (req, res) => {
  try {
    const { recipeId } = req.params;
    const userId = req.user.id;

    const bookmark = await prisma.bookmark.findUnique({
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
        isBookmarked: !!bookmark
      }
    });
  } catch (error) {
    console.error('Check bookmark error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check bookmark status'
    });
  }
});

module.exports = router;
