#!/bin/bash

echo "=== RasaYatra Backend API Test ==="
echo ""

BASE_URL="http://localhost:5001/api"

echo "1. Testing Recipes Endpoint..."
curl -s "$BASE_URL/recipes" | jq -r '.success, .data.recipes | length'
echo ""

echo "2. Testing Regions Endpoint..."
curl -s "$BASE_URL/regions" | jq -r '.success, .data.regions | length'
echo ""

echo "3. Testing User Registration..."
curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }' | jq -r '.success, .message // empty'
echo ""

echo "4. Testing User Login..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@rasayatra.com",
    "password": "admin123"
  }')

TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.data.token // empty')
echo "Login success: $(echo $LOGIN_RESPONSE | jq -r '.success')"

if [ "$TOKEN" != "" ] && [ "$TOKEN" != "null" ]; then
    echo "Token received: Yes"
    
    echo ""
    echo "5. Testing Authenticated Endpoints..."
    
    echo "5a. Get Favorites..."
    curl -s "$BASE_URL/favorites" \
      -H "Authorization: Bearer $TOKEN" | jq -r '.success'
    
    echo "5b. Get Bookmarks..."
    curl -s "$BASE_URL/bookmarks" \
      -H "Authorization: Bearer $TOKEN" | jq -r '.success'
    
else
    echo "Token received: No"
fi

echo ""
echo "=== Test Complete ==="
