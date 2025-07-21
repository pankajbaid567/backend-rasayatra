# RasaYatra Backend API

## Environment Setup
```bash
npm install
cp .env.example .env
# Configure your PostgreSQL database in .env
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

## Environment Variables
```env
DATABASE_URL="postgresql://username:password@localhost:5432/rasayatra"
JWT_SECRET="your-super-secret-jwt-key"
PORT=5000
NODE_ENV=development
```

## API Documentation

### Authentication Routes

#### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "jwt_token_here"
  }
}
```

**cURL Test:**
```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### POST /api/auth/login
Authenticate user and get access token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "jwt_token_here"
  }
}
```

**cURL Test:**
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### GET /api/auth/me
Get current authenticated user profile.

**Headers:**
- Authorization: Bearer {token}

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2025-07-20T10:00:00.000Z"
    }
  }
}
```

**cURL Test:**
```bash
curl -X GET http://localhost:5001/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Recipe Routes

#### GET /api/recipes
Get all recipes with pagination and filtering.

**Query Parameters:**
- page (optional): Page number (default: 1)
- limit (optional): Items per page (default: 10)
- region (optional): Filter by region
- difficulty (optional): Filter by difficulty
- search (optional): Search in title and description

**Response (200):**
```json
{
  "success": true,
  "data": {
    "recipes": [
      {
        "id": "uuid",
        "title": "Butter Chicken",
        "description": "Rich and creamy curry",
        "region": "Punjab",
        "prepTime": 30,
        "cookTime": 45,
        "difficulty": "Medium",
        "rating": 4.9,
        "servings": 4,
        "image": "image_url",
        "ingredients": [...],
        "instructions": [...],
        "healthBenefits": [...],
        "culturalStory": "...",
        "tips": [...],
        "createdAt": "2025-07-20T10:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "pages": 5
    }
  }
}
```

**cURL Test:**
```bash
curl -X GET "http://localhost:5001/api/recipes?page=1&limit=5&region=Punjab"
```

#### GET /api/recipes/:id
Get a specific recipe by ID.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "recipe": {
      "id": "uuid",
      "title": "Butter Chicken",
      "description": "Rich and creamy curry",
      "region": "Punjab",
      "prepTime": 30,
      "cookTime": 45,
      "difficulty": "Medium",
      "rating": 4.9,
      "servings": 4,
      "image": "image_url",
      "ingredients": [
        {
          "name": "Chicken",
          "quantity": "500g",
          "healthBenefits": ["High protein", "Rich in vitamins"]
        }
      ],
      "instructions": [...],
      "healthBenefits": [
        "Rich in protein",
        "Contains antioxidants from tomatoes",
        "Good source of calcium from dairy"
      ],
      "culturalStory": "...",
      "tips": [...]
    }
  }
}
```

**cURL Test:**
```bash
curl -X GET http://localhost:5001/api/recipes/RECIPE_ID
```

#### POST /api/recipes
Create a new recipe (requires authentication).

**Headers:**
- Authorization: Bearer {token}
- Content-Type: application/json

**Request Body:**
```json
{
  "title": "New Recipe",
  "description": "A delicious recipe",
  "region": "Punjab",
  "prepTime": 30,
  "cookTime": 45,
  "difficulty": "Medium",
  "servings": 4,
  "image": "image_url",
  "ingredients": [
    {
      "name": "Chicken",
      "quantity": "500g",
      "healthBenefits": ["High protein"]
    }
  ],
  "instructions": [
    "Step 1: Prepare ingredients",
    "Step 2: Cook the dish"
  ],
  "healthBenefits": [
    "Rich in protein",
    "Good for heart health"
  ],
  "culturalStory": "This recipe has a rich history...",
  "tips": [
    "Tip 1: Use fresh ingredients",
    "Tip 2: Cook on medium heat"
  ]
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Recipe created successfully",
  "data": {
    "recipe": {
      "id": "uuid",
      "title": "New Recipe",
      "description": "A delicious recipe",
      ...
    }
  }
}
```

**cURL Test:**
```bash
curl -X POST http://localhost:5001/api/recipes \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Recipe",
    "description": "A test recipe",
    "region": "Punjab",
    "prepTime": 30,
    "cookTime": 45,
    "difficulty": "Easy",
    "servings": 4,
    "image": "https://example.com/image.jpg",
    "ingredients": [{"name": "Salt", "quantity": "1 tsp", "healthBenefits": ["Essential mineral"]}],
    "instructions": ["Mix ingredients"],
    "healthBenefits": ["Tasty and nutritious"],
    "culturalStory": "A simple test recipe",
    "tips": ["Cook with love"]
  }'
```

#### PUT /api/recipes/:id
Update an existing recipe (requires authentication and ownership).

**Headers:**
- Authorization: Bearer {token}
- Content-Type: application/json

**Request Body:** Same as POST /api/recipes

**Response (200):**
```json
{
  "success": true,
  "message": "Recipe updated successfully",
  "data": {
    "recipe": {...}
  }
}
```

**cURL Test:**
```bash
curl -X PUT http://localhost:5001/api/recipes/RECIPE_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Recipe",
    "description": "Updated description"
  }'
```

#### DELETE /api/recipes/:id
Delete a recipe (requires authentication and ownership).

**Headers:**
- Authorization: Bearer {token}

**Response (200):**
```json
{
  "success": true,
  "message": "Recipe deleted successfully"
}
```

**cURL Test:**
```bash
curl -X DELETE http://localhost:5001/api/recipes/RECIPE_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Favorites Routes

#### GET /api/favorites
Get user's favorite recipes (requires authentication).

**Headers:**
- Authorization: Bearer {token}

**Response (200):**
```json
{
  "success": true,
  "data": {
    "favorites": [
      {
        "id": "uuid",
        "recipe": {
          "id": "uuid",
          "title": "Butter Chicken",
          "description": "Rich and creamy curry",
          "image": "image_url",
          "rating": 4.9
        },
        "createdAt": "2025-07-20T10:00:00.000Z"
      }
    ]
  }
}
```

**cURL Test:**
```bash
curl -X GET http://localhost:5001/api/favorites \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### POST /api/favorites/:recipeId
Add a recipe to favorites (requires authentication).

**Headers:**
- Authorization: Bearer {token}

**Response (201):**
```json
{
  "success": true,
  "message": "Recipe added to favorites",
  "data": {
    "favorite": {
      "id": "uuid",
      "recipeId": "recipe_uuid",
      "userId": "user_uuid"
    }
  }
}
```

**cURL Test:**
```bash
curl -X POST http://localhost:5001/api/favorites/RECIPE_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### DELETE /api/favorites/:recipeId
Remove a recipe from favorites (requires authentication).

**Headers:**
- Authorization: Bearer {token}

**Response (200):**
```json
{
  "success": true,
  "message": "Recipe removed from favorites"
}
```

**cURL Test:**
```bash
curl -X DELETE http://localhost:5001/api/favorites/RECIPE_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Bookmarks Routes

#### GET /api/bookmarks
Get user's bookmarked recipes (requires authentication).

**Headers:**
- Authorization: Bearer {token}

**Response (200):**
```json
{
  "success": true,
  "data": {
    "bookmarks": [
      {
        "id": "uuid",
        "recipe": {
          "id": "uuid",
          "title": "Masala Dosa",
          "description": "Crispy fermented crepe",
          "image": "image_url"
        },
        "createdAt": "2025-07-20T10:00:00.000Z"
      }
    ]
  }
}
```

**cURL Test:**
```bash
curl -X GET http://localhost:5001/api/bookmarks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### POST /api/bookmarks/:recipeId
Bookmark a recipe (requires authentication).

**Headers:**
- Authorization: Bearer {token}

**Response (201):**
```json
{
  "success": true,
  "message": "Recipe bookmarked successfully",
  "data": {
    "bookmark": {
      "id": "uuid",
      "recipeId": "recipe_uuid",
      "userId": "user_uuid"
    }
  }
}
```

**cURL Test:**
```bash
curl -X POST http://localhost:5001/api/bookmarks/RECIPE_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### DELETE /api/bookmarks/:recipeId
Remove a recipe from bookmarks (requires authentication).

**Headers:**
- Authorization: Bearer {token}

**Response (200):**
```json
{
  "success": true,
  "message": "Recipe removed from bookmarks"
}
```

**cURL Test:**
```bash
curl -X DELETE http://localhost:5001/api/bookmarks/RECIPE_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Regions Routes

#### GET /api/regions
Get all culinary regions.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "regions": [
      {
        "id": "north-india",
        "name": "North India",
        "states": ["Punjab", "Haryana", ...],
        "description": "North Indian cuisine description...",
        "famousDishes": ["Butter Chicken", ...],
        "keyIngredients": ["Wheat flour", ...],
        "culinaryInfluences": ["Mughal", ...],
        "imageUrl": "image_url"
      }
    ]
  }
}
```

**cURL Test:**
```bash
curl -X GET http://localhost:5001/api/regions
```

#### GET /api/regions/:id
Get a specific region by ID.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "region": {
      "id": "north-india",
      "name": "North India",
      "states": ["Punjab", "Haryana", ...],
      "description": "North Indian cuisine description...",
      "famousDishes": ["Butter Chicken", ...],
      "keyIngredients": ["Wheat flour", ...],
      "culinaryInfluences": ["Mughal", ...],
      "imageUrl": "image_url",
      "recipes": [...]
    }
  }
}
```

**cURL Test:**
```bash
curl -X GET http://localhost:5001/api/regions/north-india
```

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information (in development mode)"
}
```

**Common HTTP Status Codes:**
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict (e.g., email already exists)
- 422: Validation Error
- 500: Internal Server Error

## Rate Limiting
- Authentication routes: 5 requests per 15 minutes per IP
- General API routes: 100 requests per 15 minutes per IP

## Database Schema

The application uses PostgreSQL with Prisma ORM. Key tables:
- users: User accounts and profiles
- recipes: Recipe information with ingredients and health benefits
- favorites: User favorite recipes
- bookmarks: User bookmarked recipes

## Testing All Routes

You can test all routes using the provided cURL commands. Make sure to:
1. Start the server: `npm run dev`
2. Create a user account first
3. Get the JWT token from login response
4. Use the token in Authorization header for protected routes
