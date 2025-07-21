const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

// Recipe data with health benefits
const recipesData = [
  {
    title: 'Butter Chicken',
    description: 'A rich and creamy tomato-based curry with tender chicken pieces.',
    region: 'Punjab',
    prepTime: 30,
    cookTime: 45,
    difficulty: 'Medium',
    rating: 4.9,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2070&auto=format&fit=crop',
    ingredients: [
      {
        name: '500g boneless chicken, cut into pieces',
        quantity: '500g',
        healthBenefits: [
          'High in protein for muscle building',
          'Rich in vitamin B6 for brain health',
          'Contains selenium for immune function'
        ]
      },
      {
        name: 'Butter',
        quantity: '2 tbsp',
        healthBenefits: [
          'Contains vitamin A for eye health',
          'Source of healthy fats'
        ]
      },
      {
        name: 'Onion',
        quantity: '1 large, finely chopped',
        healthBenefits: [
          'Rich in antioxidants',
          'Contains quercetin for heart health',
          'Anti-inflammatory properties'
        ]
      },
      {
        name: 'Garlic',
        quantity: '3 cloves, minced',
        healthBenefits: [
          'Boosts immune system',
          'Has antimicrobial properties',
          'May help reduce blood pressure'
        ]
      },
      {
        name: 'Ginger',
        quantity: '1 inch, grated',
        healthBenefits: [
          'Anti-inflammatory properties',
          'Aids digestion',
          'May help reduce nausea'
        ]
      },
      {
        name: 'Tomatoes',
        quantity: '400g canned, crushed',
        healthBenefits: [
          'High in lycopene antioxidant',
          'Rich in vitamin C',
          'May help protect against heart disease'
        ]
      },
      {
        name: 'Heavy cream',
        quantity: '1/2 cup',
        healthBenefits: [
          'Source of calcium for bone health',
          'Contains vitamin K2'
        ]
      }
    ],
    instructions: [
      'Marinate chicken pieces with salt, red chili powder, and half of the garam masala for 30 minutes.',
      'Heat butter in a large pan and cook marinated chicken until golden brown. Remove and set aside.',
      'In the same pan, add chopped onions and cook until golden brown.',
      'Add minced garlic and grated ginger. Cook for 2 minutes until fragrant.',
      'Add tomato paste and cook for 1 minute, then add crushed tomatoes.',
      'Add remaining spices and let the sauce simmer for 10 minutes until thickened.',
      'Return the chicken to the pan and simmer for 15 minutes.',
      'Stir in heavy cream and cook for another 5 minutes.',
      'Garnish with fresh cilantro and serve hot with basmati rice or naan.'
    ],
    healthBenefits: [
      'High protein content supports muscle growth and repair',
      'Tomatoes provide lycopene, a powerful antioxidant that may reduce cancer risk',
      'Garlic and ginger offer anti-inflammatory and immune-boosting properties',
      'Onions contain quercetin which supports heart health',
      'Spices like turmeric and garam masala have anti-inflammatory benefits',
      'Calcium from dairy supports bone health'
    ],
    culturalStory: 'Butter Chicken, also known as Murgh Makhani, was invented in the 1950s by Kundan Lal Gujral at his restaurant Moti Mahal in Delhi. Legend has it that this iconic dish was created by accident when leftover tandoori chicken was mixed with tomato gravy, butter, and cream. Today, it\'s one of the most beloved Indian dishes worldwide, representing the rich culinary heritage of North India.',
    tips: [
      'For best results, marinate the chicken overnight in the refrigerator.',
      'Use good quality tomatoes for a richer flavor in the sauce.',
      'Don\'t skip the cream - it\'s essential for the authentic taste and texture.',
      'Serve with basmati rice or fresh naan bread for the complete experience.'
    ]
  },
  {
    title: 'Masala Dosa',
    description: 'A crispy, golden crepe made from fermented rice and lentil batter, filled with spiced potato curry.',
    region: 'South India',
    prepTime: 480, // 8 hours for fermentation
    cookTime: 30,
    difficulty: 'Hard',
    rating: 4.8,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?q=80&w=2070&auto=format&fit=crop',
    ingredients: [
      {
        name: 'Rice',
        quantity: '3 cups',
        healthBenefits: [
          'Provides complex carbohydrates for sustained energy',
          'Good source of B vitamins',
          'Gluten-free grain'
        ]
      },
      {
        name: 'Urad dal (black lentils)',
        quantity: '1 cup',
        healthBenefits: [
          'High in protein and fiber',
          'Rich in iron for blood health',
          'Contains folate for cell division'
        ]
      },
      {
        name: 'Potatoes',
        quantity: '4 large, boiled and cubed',
        healthBenefits: [
          'Rich in potassium for heart health',
          'Good source of vitamin C',
          'Provides complex carbohydrates'
        ]
      },
      {
        name: 'Mustard seeds',
        quantity: '1 tsp',
        healthBenefits: [
          'Contains selenium and magnesium',
          'May help reduce inflammation',
          'Supports digestive health'
        ]
      },
      {
        name: 'Curry leaves',
        quantity: '10-12 leaves',
        healthBenefits: [
          'Rich in antioxidants',
          'May help regulate blood sugar',
          'Supports digestive health'
        ]
      },
      {
        name: 'Turmeric',
        quantity: '1/2 tsp',
        healthBenefits: [
          'Powerful anti-inflammatory properties',
          'Contains curcumin antioxidant',
          'May support brain health'
        ]
      }
    ],
    instructions: [
      'Soak rice and urad dal separately for 4-6 hours.',
      'Grind them separately to make a smooth batter.',
      'Mix both batters and add salt. Let it ferment for 8-12 hours.',
      'For filling: Heat oil, add mustard seeds and curry leaves.',
      'Add onions, green chilies, ginger, and sauté.',
      'Add turmeric, boiled potatoes, and mix well.',
      'Heat a non-stick pan and pour dosa batter to make thin crepes.',
      'Add potato filling and fold the dosa.',
      'Serve hot with coconut chutney and sambar.'
    ],
    healthBenefits: [
      'Fermented batter provides probiotics for gut health',
      'High in protein from lentils for muscle maintenance',
      'Rice provides sustained energy from complex carbohydrates',
      'Turmeric offers powerful anti-inflammatory benefits',
      'Curry leaves contain antioxidants that support overall health',
      'Low in saturated fat and naturally gluten-free'
    ],
    culturalStory: 'Masala Dosa originated in the Udupi region of Karnataka and has become one of South India\'s most iconic dishes. The art of making dosas dates back over 1,000 years, with the fermentation process being a testament to ancient Indian food preservation techniques. The masala (spiced potato filling) was added later, making it a complete meal that\'s both nutritious and delicious.',
    tips: [
      'The batter consistency should be like thick buttermilk.',
      'Fermentation time depends on climate - warmer weather ferments faster.',
      'Use a well-seasoned cast iron or non-stick pan for best results.',
      'The pan should be at medium heat - too hot and the dosa will burn.'
    ]
  },
  {
    title: 'Rajma (Kidney Bean Curry)',
    description: 'A hearty and protein-rich North Indian curry made with kidney beans in a spiced tomato gravy.',
    region: 'North India',
    prepTime: 480, // 8 hours soaking
    cookTime: 60,
    difficulty: 'Medium',
    rating: 4.6,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2070&auto=format&fit=crop',
    ingredients: [
      {
        name: 'Kidney beans',
        quantity: '2 cups, soaked overnight',
        healthBenefits: [
          'Excellent source of plant-based protein',
          'High in fiber for digestive health',
          'Rich in folate and iron',
          'May help regulate blood sugar'
        ]
      },
      {
        name: 'Onions',
        quantity: '2 large, chopped',
        healthBenefits: [
          'Contains quercetin for heart health',
          'Rich in antioxidants',
          'May help reduce inflammation'
        ]
      },
      {
        name: 'Tomatoes',
        quantity: '3 large, chopped',
        healthBenefits: [
          'High in lycopene antioxidant',
          'Rich in vitamin C for immune support',
          'May help protect against heart disease'
        ]
      },
      {
        name: 'Ginger-garlic paste',
        quantity: '2 tbsp',
        healthBenefits: [
          'Anti-inflammatory properties',
          'Supports immune system',
          'Aids in digestion'
        ]
      }
    ],
    instructions: [
      'Soak kidney beans overnight, then pressure cook until soft.',
      'Heat oil in a pan, add cumin seeds and let them splutter.',
      'Add onions and cook until golden brown.',
      'Add ginger-garlic paste and cook for 2 minutes.',
      'Add tomatoes and cook until they break down completely.',
      'Add all spices and cook for 2-3 minutes.',
      'Add cooked kidney beans with their cooking liquid.',
      'Simmer for 30-40 minutes until the gravy thickens.',
      'Garnish with cilantro and serve with rice or roti.'
    ],
    healthBenefits: [
      'High in plant-based protein for vegetarians and vegans',
      'Rich in fiber supports digestive health and weight management',
      'Iron content helps prevent anemia',
      'Folate is essential for cell division and DNA synthesis',
      'Low in fat and cholesterol-free',
      'Complex carbohydrates provide sustained energy'
    ],
    culturalStory: 'Rajma is a staple dish from the northern regions of India, particularly Punjab and Kashmir. The dish gained popularity across India and is often considered comfort food. The combination of rajma with rice (rajma-chawal) is a beloved meal that provides complete protein, making it nutritionally comparable to meat dishes.',
    tips: [
      'Always soak kidney beans overnight to reduce cooking time and improve digestibility.',
      'Don\'t add salt while cooking beans as it can make them tough.',
      'Mash some beans to naturally thicken the gravy.',
      'Let the curry rest for a few hours - it tastes better the next day!'
    ]
  },
  {
    title: 'Fish Curry (Bengali Style)',
    description: 'A traditional Bengali fish curry made with fresh fish in a mustard seed and coconut-based gravy.',
    region: 'East India',
    prepTime: 20,
    cookTime: 30,
    difficulty: 'Medium',
    rating: 4.7,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=2070&auto=format&fit=crop',
    ingredients: [
      {
        name: 'Fresh fish (Rohu or Hilsa)',
        quantity: '500g, cut into steaks',
        healthBenefits: [
          'High in omega-3 fatty acids for heart health',
          'Rich in protein for muscle development',
          'Contains vitamin D for bone health',
          'Good source of selenium'
        ]
      },
      {
        name: 'Mustard seeds',
        quantity: '2 tbsp',
        healthBenefits: [
          'Contains selenium and magnesium',
          'Anti-inflammatory properties',
          'May help with respiratory health'
        ]
      },
      {
        name: 'Coconut',
        quantity: '1/2 cup grated',
        healthBenefits: [
          'Rich in healthy fats',
          'Contains medium-chain triglycerides',
          'Good source of fiber'
        ]
      },
      {
        name: 'Green chilies',
        quantity: '4-5 slit',
        healthBenefits: [
          'High in vitamin C',
          'Contains capsaicin which may boost metabolism',
          'Anti-inflammatory properties'
        ]
      },
      {
        name: 'Turmeric',
        quantity: '1 tsp',
        healthBenefits: [
          'Powerful anti-inflammatory compound',
          'Contains curcumin antioxidant',
          'May support immune system'
        ]
      }
    ],
    instructions: [
      'Marinate fish pieces with salt and turmeric for 15 minutes.',
      'Grind mustard seeds and green chilies with a little water to make paste.',
      'Heat mustard oil in a pan and lightly fry the fish pieces. Set aside.',
      'In the same oil, add panch phoron (five spice mix) and let it splutter.',
      'Add the mustard seed paste and cook for 2-3 minutes.',
      'Add grated coconut and cook for another minute.',
      'Add water to make a gravy consistency and bring to boil.',
      'Gently add the fried fish pieces and simmer for 10-12 minutes.',
      'Garnish with fresh cilantro and serve with steamed rice.'
    ],
    healthBenefits: [
      'Rich in omega-3 fatty acids that support heart and brain health',
      'High-quality protein helps in muscle maintenance and growth',
      'Mustard seeds provide selenium and anti-inflammatory compounds',
      'Coconut provides healthy fats for sustained energy',
      'Turmeric offers powerful antioxidant and anti-inflammatory benefits',
      'Low in saturated fat and rich in essential nutrients'
    ],
    culturalStory: 'Fish curry is the soul of Bengali cuisine, reflecting the region\'s proximity to rivers and the Bay of Bengal. Bengali fish curry, especially with Hilsa (the king of fish), is considered a delicacy and is deeply embedded in Bengali culture. The use of mustard oil and panch phoron gives it a distinctive flavor that\'s synonymous with Bengali cooking.',
    tips: [
      'Use fresh fish for the best flavor and texture.',
      'Don\'t overcook the fish to prevent it from breaking apart.',
      'Mustard oil is essential for authentic flavor - don\'t substitute.',
      'Let the curry rest for 10 minutes before serving for flavors to meld.'
    ]
  },
  {
    title: 'Dhokla',
    description: 'A steamed savory cake from Gujarat made with fermented chickpea flour, light and spongy in texture.',
    region: 'West India',
    prepTime: 15,
    cookTime: 20,
    difficulty: 'Medium',
    rating: 4.5,
    servings: 6,
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=2070&auto=format&fit=crop',
    ingredients: [
      {
        name: 'Chickpea flour (Besan)',
        quantity: '2 cups',
        healthBenefits: [
          'High in protein and fiber',
          'Rich in folate and iron',
          'Gluten-free alternative to wheat',
          'May help regulate blood sugar'
        ]
      },
      {
        name: 'Yogurt',
        quantity: '1/2 cup',
        healthBenefits: [
          'Contains probiotics for gut health',
          'Rich in calcium and protein',
          'Supports immune system'
        ]
      },
      {
        name: 'Ginger',
        quantity: '1 inch, grated',
        healthBenefits: [
          'Anti-inflammatory properties',
          'Aids digestion',
          'May help reduce nausea'
        ]
      },
      {
        name: 'Green chilies',
        quantity: '2, finely chopped',
        healthBenefits: [
          'High in vitamin C',
          'Contains capsaicin',
          'May boost metabolism'
        ]
      },
      {
        name: 'Mustard seeds',
        quantity: '1 tsp',
        healthBenefits: [
          'Contains selenium and magnesium',
          'Anti-inflammatory properties',
          'Supports heart health'
        ]
      }
    ],
    instructions: [
      'Mix chickpea flour, yogurt, ginger-green chili paste, and salt with water to make smooth batter.',
      'Add turmeric and mix well. Let it rest for 10 minutes.',
      'Add fruit salt (Eno) just before steaming and mix gently.',
      'Grease a steaming plate and pour the batter.',
      'Steam for 15-20 minutes until a toothpick comes out clean.',
      'Let it cool completely before cutting into squares.',
      'For tempering: Heat oil, add mustard seeds, curry leaves, and green chilies.',
      'Pour the tempering over cut dhokla pieces.',
      'Garnish with fresh cilantro and grated coconut. Serve with green chutney.'
    ],
    healthBenefits: [
      'High in plant-based protein from chickpea flour',
      'Steaming preserves nutrients without adding excess oil',
      'Fermentation aids digestion and nutrient absorption',
      'Rich in fiber supports digestive health',
      'Low in calories and fat, making it weight-friendly',
      'Gluten-free option suitable for celiac patients'
    ],
    culturalStory: 'Dhokla is a beloved snack from Gujarat that has become popular across India. This steamed delicacy represents the Gujarati philosophy of healthy, vegetarian eating. The dish showcases the ingenious use of fermentation and steaming techniques that have been perfected over generations in Gujarati households.',
    tips: [
      'The batter consistency should be like thick buttermilk.',
      'Add fruit salt just before steaming for maximum fluffiness.',
      'Don\'t overmix after adding fruit salt.',
      'Let dhokla cool completely before cutting to prevent breaking.'
    ]
  },
  {
    title: 'Rogan Josh',
    description: 'An aromatic Kashmiri lamb curry cooked in a rich tomato and yogurt-based sauce with traditional spices.',
    region: 'North India',
    prepTime: 30,
    cookTime: 90,
    difficulty: 'Hard',
    rating: 4.8,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=2070&auto=format&fit=crop',
    ingredients: [
      {
        name: 'Lamb or goat meat',
        quantity: '1 kg, cut into pieces',
        healthBenefits: [
          'High in protein for muscle development',
          'Rich in iron and zinc',
          'Contains vitamin B12',
          'Good source of selenium'
        ]
      },
      {
        name: 'Yogurt',
        quantity: '1 cup',
        healthBenefits: [
          'Contains probiotics for digestive health',
          'Rich in calcium and protein',
          'Helps tenderize meat'
        ]
      },
      {
        name: 'Onions',
        quantity: '4 large, sliced',
        healthBenefits: [
          'Rich in antioxidants and quercetin',
          'May help reduce inflammation',
          'Supports heart health'
        ]
      },
      {
        name: 'Kashmiri red chili powder',
        quantity: '2 tbsp',
        healthBenefits: [
          'Rich in capsaicin and antioxidants',
          'May boost metabolism',
          'Contains vitamin A'
        ]
      },
      {
        name: 'Fennel powder',
        quantity: '1 tsp',
        healthBenefits: [
          'Aids digestion',
          'Contains antioxidants',
          'May help reduce inflammation'
        ]
      }
    ],
    instructions: [
      'Marinate lamb pieces with yogurt, salt, and half the spices for 2 hours.',
      'Heat ghee in a heavy-bottomed pot and fry onions until golden.',
      'Add marinated lamb and cook on high heat for 10 minutes.',
      'Add remaining spices and cook until meat is well-coated.',
      'Add tomatoes and cook until they break down.',
      'Cover and cook on low heat for 1-1.5 hours until meat is tender.',
      'Stir occasionally and add water if needed.',
      'Garnish with fresh cilantro and serve with rice or naan.'
    ],
    healthBenefits: [
      'High-quality protein supports muscle growth and repair',
      'Rich in iron helps prevent anemia',
      'Vitamin B12 supports nervous system health',
      'Spices like fennel and cardamom aid digestion',
      'Yogurt provides probiotics for gut health',
      'Antioxidants from spices may help reduce inflammation'
    ],
    culturalStory: 'Rogan Josh is the crown jewel of Kashmiri cuisine, brought to Kashmir by the Mughals. The name comes from Persian words "rogan" (oil/color) and "josh" (heat/passion). This dish represents the rich culinary heritage of Kashmir and is traditionally cooked in earthenware pots that enhance its flavor.',
    tips: [
      'Use good quality Kashmiri chili powder for authentic color and mild heat.',
      'Cook on low heat for a long time to develop deep flavors.',
      'Don\'t add water initially - let the meat cook in its own juices.',
      'The dish tastes even better the next day as flavors develop.'
    ]
  },
  {
    title: 'Pav Bhaji',
    description: 'A popular Mumbai street food consisting of spiced mixed vegetable curry served with buttered bread rolls.',
    region: 'West India',
    prepTime: 20,
    cookTime: 45,
    difficulty: 'Medium',
    rating: 4.6,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=2070&auto=format&fit=crop',
    ingredients: [
      {
        name: 'Mixed vegetables',
        quantity: '3 cups (potato, cauliflower, peas, carrots)',
        healthBenefits: [
          'Rich in vitamins and minerals',
          'High in dietary fiber',
          'Contains antioxidants',
          'Supports immune system'
        ]
      },
      {
        name: 'Pav (bread rolls)',
        quantity: '8 pieces',
        healthBenefits: [
          'Provides carbohydrates for energy',
          'Contains B vitamins',
          'Source of dietary protein'
        ]
      },
      {
        name: 'Tomatoes',
        quantity: '3 large, chopped',
        healthBenefits: [
          'High in lycopene antioxidant',
          'Rich in vitamin C',
          'May support heart health'
        ]
      },
      {
        name: 'Pav bhaji masala',
        quantity: '3 tbsp',
        healthBenefits: [
          'Blend of digestive spices',
          'Contains anti-inflammatory compounds',
          'May aid digestion'
        ]
      },
      {
        name: 'Butter',
        quantity: '4 tbsp',
        healthBenefits: [
          'Contains vitamin A',
          'Source of healthy fats',
          'Provides flavor and richness'
        ]
      }
    ],
    instructions: [
      'Boil mixed vegetables until very soft and mash them coarsely.',
      'Heat butter in a large pan, add onions and cook until soft.',
      'Add ginger-garlic paste and cook for 2 minutes.',
      'Add tomatoes and cook until they break down completely.',
      'Add pav bhaji masala and red chili powder, cook for 2 minutes.',
      'Add mashed vegetables and mix well.',
      'Add water to adjust consistency and simmer for 15-20 minutes.',
      'Season with salt and mash further while cooking.',
      'Heat pav with butter on a griddle until crispy.',
      'Serve hot bhaji garnished with onions, cilantro, and lemon, with buttered pav.'
    ],
    healthBenefits: [
      'Rich in vegetables providing essential vitamins and minerals',
      'High fiber content supports digestive health',
      'Tomatoes provide lycopene, a powerful antioxidant',
      'Mixed vegetables offer variety of nutrients',
      'Spices aid digestion and have anti-inflammatory properties',
      'Can be made healthier by reducing butter content'
    ],
    culturalStory: 'Pav Bhaji originated in the 1850s as a quick lunch for textile mill workers in Mumbai. Street vendors created this nutritious, filling meal that could be eaten quickly. It became so popular that it\'s now synonymous with Mumbai street food culture and represents the city\'s fast-paced lifestyle.',
    tips: [
      'Mash vegetables well for the right texture.',
      'Cook bhaji on low heat for rich flavor development.',
      'Use plenty of butter for authentic taste (or oil for healthier version).',
      'Serve immediately while hot with crispy pav.'
    ]
  },
  {
    title: 'Hyderabadi Biryani',
    description: 'A royal dish of fragrant basmati rice layered with marinated mutton, cooked in the traditional dum style.',
    region: 'South India',
    prepTime: 180,
    cookTime: 120,
    difficulty: 'Hard',
    rating: 4.9,
    servings: 6,
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2a9?q=80&w=2070&auto=format&fit=crop',
    ingredients: [
      {
        name: 'Basmati rice',
        quantity: '500g',
        healthBenefits: [
          'Low glycemic index grain',
          'Good source of complex carbohydrates',
          'Contains essential amino acids',
          'Provides sustained energy'
        ]
      },
      {
        name: 'Mutton',
        quantity: '1 kg, cut into pieces',
        healthBenefits: [
          'High in protein and iron',
          'Rich in vitamin B12',
          'Contains zinc for immune function',
          'Good source of selenium'
        ]
      },
      {
        name: 'Yogurt',
        quantity: '1 cup',
        healthBenefits: [
          'Contains probiotics for gut health',
          'Rich in calcium and protein',
          'Helps tenderize meat'
        ]
      },
      {
        name: 'Saffron',
        quantity: '1/2 tsp soaked in milk',
        healthBenefits: [
          'Contains antioxidants',
          'May help improve mood',
          'Has anti-inflammatory properties'
        ]
      },
      {
        name: 'Fried onions (Birista)',
        quantity: '1 cup',
        healthBenefits: [
          'Rich in antioxidants',
          'Contains quercetin',
          'May support heart health'
        ]
      }
    ],
    instructions: [
      'Marinate mutton with yogurt, ginger-garlic paste, red chili powder, and salt for 3 hours.',
      'Soak basmati rice for 30 minutes.',
      'Cook rice in salted boiling water until 70% done. Drain.',
      'In a heavy-bottomed pot, cook marinated mutton until tender.',
      'Layer the partially cooked rice over the mutton.',
      'Sprinkle fried onions, mint leaves, and saffron milk on top.',
      'Cover with aluminum foil, then place lid tightly.',
      'Cook on high heat for 3 minutes, then on low heat for 45 minutes.',
      'Let it rest for 10 minutes before opening.',
      'Gently mix and serve with raita and shorba.'
    ],
    healthBenefits: [
      'Balanced meal with protein, carbohydrates, and healthy fats',
      'Saffron provides antioxidants and may improve mood',
      'Spices like cardamom and cinnamon have anti-inflammatory properties',
      'High protein content supports muscle development',
      'Rice provides sustained energy for active lifestyle',
      'Yogurt adds probiotics for digestive health'
    ],
    culturalStory: 'Hyderabadi Biryani is a legacy of the Nizams of Hyderabad, representing the pinnacle of Mughal cuisine in South India. This dish combines Persian culinary techniques with local ingredients and spices. The dum cooking method ensures that flavors are sealed in, creating a dish that\'s aromatic, flavorful, and truly royal.',
    tips: [
      'Use aged basmati rice for best results.',
      'Don\'t overcook the rice - it should be 70% done before layering.',
      'Seal the pot properly with dough or foil for authentic dum cooking.',
      'Let the biryani rest after cooking to allow flavors to settle.'
    ]
  },
  {
    title: 'Chole Bhature',
    description: 'A popular North Indian dish of spiced chickpea curry served with deep-fried bread.',
    region: 'North India',
    prepTime: 480,
    cookTime: 60,
    difficulty: 'Medium',
    rating: 4.7,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa7eeb?q=80&w=2070&auto=format&fit=crop',
    ingredients: [
      {
        name: 'Chickpeas (Kabuli Chana)',
        quantity: '2 cups, soaked overnight',
        healthBenefits: [
          'High in protein and fiber',
          'Rich in folate and iron',
          'May help regulate blood sugar',
          'Supports heart health'
        ]
      },
      {
        name: 'All-purpose flour',
        quantity: '2 cups',
        healthBenefits: [
          'Provides carbohydrates for energy',
          'Contains some protein',
          'Source of B vitamins'
        ]
      },
      {
        name: 'Yogurt',
        quantity: '1/4 cup',
        healthBenefits: [
          'Contains probiotics for gut health',
          'Rich in calcium and protein',
          'Helps with fermentation'
        ]
      }
    ],
    instructions: [
      'Pressure cook soaked chickpeas until tender.',
      'For bhature: Mix flour, yogurt, baking powder, and salt. Knead into soft dough.',
      'Let dough rest for 2 hours.',
      'For chole: Heat oil, add cumin seeds, onions, and cook until golden.',
      'Add ginger-garlic paste, tomatoes, and spices.',
      'Add cooked chickpeas and simmer for 30 minutes.',
      'Roll bhature and deep fry until puffed and golden.',
      'Serve hot chole with bhature, pickles, and onions.'
    ],
    healthBenefits: [
      'Chickpeas provide plant-based protein and fiber',
      'Rich in folate essential for cell division',
      'Iron content helps prevent anemia',
      'Complex carbohydrates provide sustained energy',
      'Spices offer anti-inflammatory benefits'
    ],
    culturalStory: 'Chole Bhature originated in Punjab and became a beloved breakfast and lunch dish across North India. This hearty combination represents the robust flavors of Punjabi cuisine and is often enjoyed as a weekend treat.',
    tips: [
      'Soak chickpeas overnight for better digestibility.',
      'Let bhature dough rest for proper fermentation.',
      'Serve immediately while bhature are hot and crispy.',
      'Add tea bags while cooking chickpeas for darker color.'
    ]
  },
  {
    title: 'Idli Sambar',
    description: 'Steamed rice cakes served with a tangy lentil-based vegetable stew, a classic South Indian breakfast.',
    region: 'South India',
    prepTime: 720,
    cookTime: 45,
    difficulty: 'Medium',
    rating: 4.6,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=2070&auto=format&fit=crop',
    ingredients: [
      {
        name: 'Idli rice',
        quantity: '3 cups',
        healthBenefits: [
          'Easy to digest carbohydrates',
          'Gluten-free grain',
          'Good source of energy',
          'Low in fat'
        ]
      },
      {
        name: 'Urad dal',
        quantity: '1 cup',
        healthBenefits: [
          'High in protein and fiber',
          'Rich in iron and folate',
          'Contains antioxidants',
          'Supports digestive health'
        ]
      },
      {
        name: 'Toor dal (Pigeon peas)',
        quantity: '1 cup',
        healthBenefits: [
          'High in protein',
          'Rich in folate and fiber',
          'Contains potassium',
          'Helps regulate blood sugar'
        ]
      },
      {
        name: 'Tamarind',
        quantity: '2 tbsp paste',
        healthBenefits: [
          'Rich in antioxidants',
          'Contains tartaric acid',
          'May help with digestion',
          'Source of B vitamins'
        ]
      }
    ],
    instructions: [
      'Soak rice and urad dal separately for 4-6 hours.',
      'Grind them separately to smooth paste.',
      'Mix batters, add salt, and ferment for 8-12 hours.',
      'Steam idlis in idli cooker for 10-12 minutes.',
      'For sambar: Cook toor dal until soft.',
      'Heat oil, add mustard seeds, curry leaves, and vegetables.',
      'Add sambar powder, tamarind paste, and cooked dal.',
      'Simmer until vegetables are tender.',
      'Serve hot idlis with sambar and coconut chutney.'
    ],
    healthBenefits: [
      'Fermented foods promote gut health with beneficial bacteria',
      'High in protein from lentils for muscle maintenance',
      'Steaming preserves nutrients without added oils',
      'Complex carbohydrates provide sustained energy',
      'Rich in folate essential for cell division',
      'Gluten-free and easy to digest'
    ],
    culturalStory: 'Idli Sambar is the quintessential South Indian breakfast, particularly popular in Tamil Nadu and Karnataka. The fermentation process creates probiotics, making it both nutritious and flavorful. This combination has been a staple for centuries.',
    tips: [
      'Use the right rice to dal ratio (3:1) for perfect texture.',
      'Fermentation time varies with temperature and climate.',
      'Steam on medium heat to avoid overcooking.',
      'Sambar tastes better when allowed to simmer slowly.'
    ]
  },
  {
    title: 'Goan Fish Curry',
    description: 'A coastal delicacy featuring fish cooked in coconut milk with aromatic spices and curry leaves.',
    region: 'West India',
    prepTime: 15,
    cookTime: 25,
    difficulty: 'Medium',
    rating: 4.8,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=2070&auto=format&fit=crop',
    ingredients: [
      {
        name: 'Fresh fish (Kingfish or Pomfret)',
        quantity: '500g, cut into steaks',
        healthBenefits: [
          'High in omega-3 fatty acids',
          'Rich in protein and vitamin D',
          'Contains selenium for immune function',
          'Low in saturated fat'
        ]
      },
      {
        name: 'Coconut milk',
        quantity: '400ml thick',
        healthBenefits: [
          'Rich in healthy fats',
          'Contains lauric acid',
          'Good source of potassium',
          'May boost metabolism'
        ]
      },
      {
        name: 'Kokum',
        quantity: '4-5 pieces',
        healthBenefits: [
          'Rich in antioxidants',
          'Natural coolant',
          'May aid digestion',
          'Contains hydroxycitric acid'
        ]
      },
      {
        name: 'Red chilies',
        quantity: '4-5 Kashmiri',
        healthBenefits: [
          'Rich in vitamin C and capsaicin',
          'May boost metabolism',
          'Contains antioxidants',
          'Anti-inflammatory properties'
        ]
      }
    ],
    instructions: [
      'Marinate fish with salt and turmeric for 15 minutes.',
      'Grind coconut, red chilies, coriander seeds, and cumin to paste.',
      'Heat coconut oil in a pan, add curry leaves and onions.',
      'Add the ground masala paste and cook for 5 minutes.',
      'Add kokum and simmer for 2 minutes.',
      'Add coconut milk and bring to gentle boil.',
      'Add fish pieces and cook for 8-10 minutes.',
      'Garnish with cilantro and serve with rice.'
    ],
    healthBenefits: [
      'Omega-3 fatty acids support heart and brain health',
      'Coconut milk provides healthy medium-chain fatty acids',
      'Kokum aids digestion and provides antioxidants',
      'Fish provides high-quality protein for muscle health',
      'Spices offer anti-inflammatory benefits',
      'Low in carbohydrates, suitable for various diets'
    ],
    culturalStory: 'Goan Fish Curry reflects the Portuguese influence on local cuisine, combining indigenous spices with coconut. This dish represents the coastal lifestyle of Goa where fresh seafood and coconuts are abundant.',
    tips: [
      'Use fresh fish for best flavor and texture.',
      'Don\'t let coconut milk boil vigorously to prevent curdling.',
      'Kokum adds unique tangy flavor - don\'t skip it.',
      'Serve with steamed rice or bread rolls.'
    ]
  },
  {
    title: 'Aloo Gobi',
    description: 'A classic North Indian dry curry made with potatoes and cauliflower, flavored with aromatic spices.',
    region: 'North India',
    prepTime: 15,
    cookTime: 25,
    difficulty: 'Easy',
    rating: 4.4,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=2070&auto=format&fit=crop',
    ingredients: [
      {
        name: 'Potatoes',
        quantity: '3 large, cubed',
        healthBenefits: [
          'Rich in potassium and vitamin C',
          'Good source of complex carbohydrates',
          'Contains antioxidants',
          'Provides sustained energy'
        ]
      },
      {
        name: 'Cauliflower',
        quantity: '1 large head, cut into florets',
        healthBenefits: [
          'High in vitamin C and fiber',
          'Contains antioxidants',
          'Low in calories',
          'May support heart health'
        ]
      },
      {
        name: 'Turmeric',
        quantity: '1 tsp',
        healthBenefits: [
          'Powerful anti-inflammatory properties',
          'Contains curcumin antioxidant',
          'May support brain health',
          'Helps boost immunity'
        ]
      },
      {
        name: 'Cumin seeds',
        quantity: '1 tsp',
        healthBenefits: [
          'Aids digestion',
          'Rich in iron',
          'May help regulate blood sugar',
          'Contains antioxidants'
        ]
      }
    ],
    instructions: [
      'Heat oil in a large pan, add cumin seeds.',
      'Add ginger-garlic paste and sauté for 1 minute.',
      'Add potatoes and cook for 5 minutes.',
      'Add cauliflower florets and mix well.',
      'Add turmeric, coriander powder, and salt.',
      'Cover and cook on medium heat for 15-20 minutes.',
      'Stir occasionally to prevent sticking.',
      'Garnish with fresh cilantro and serve hot.'
    ],
    healthBenefits: [
      'High in fiber supporting digestive health',
      'Rich in vitamin C boosting immune system',
      'Potassium helps regulate blood pressure',
      'Low in calories, good for weight management',
      'Antioxidants may help reduce chronic disease risk',
      'Turmeric provides anti-inflammatory benefits'
    ],
    culturalStory: 'Aloo Gobi is a beloved home-style dish across North India, representing the simplicity and comfort of Indian home cooking. This vegetarian dish became globally recognized and is often one of the first Indian dishes people try.',
    tips: [
      'Don\'t add water - let vegetables cook in their own moisture.',
      'Cut vegetables into uniform pieces for even cooking.',
      'Cook on medium heat to prevent burning.',
      'Fresh ginger and garlic make a big difference in flavor.'
    ]
  },
  {
    title: 'Vada Pav',
    description: 'Mumbai\'s iconic street food - a spiced potato fritter served in a bread bun with chutneys.',
    region: 'West India',
    prepTime: 30,
    cookTime: 20,
    difficulty: 'Easy',
    rating: 4.5,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=2070&auto=format&fit=crop',
    ingredients: [
      {
        name: 'Potatoes',
        quantity: '4 large, boiled and mashed',
        healthBenefits: [
          'Rich in potassium for heart health',
          'Good source of vitamin C',
          'Provides complex carbohydrates',
          'Contains antioxidants'
        ]
      },
      {
        name: 'Pav (bread rolls)',
        quantity: '4 pieces',
        healthBenefits: [
          'Provides carbohydrates for energy',
          'Contains some protein',
          'Source of B vitamins',
          'Quick energy source'
        ]
      },
      {
        name: 'Gram flour (Besan)',
        quantity: '1 cup',
        healthBenefits: [
          'High in protein and fiber',
          'Rich in folate',
          'Gluten-free flour',
          'May help regulate blood sugar'
        ]
      },
      {
        name: 'Green chilies',
        quantity: '3-4, chopped',
        healthBenefits: [
          'High in vitamin C',
          'Contains capsaicin',
          'May boost metabolism',
          'Anti-inflammatory properties'
        ]
      }
    ],
    instructions: [
      'Mix mashed potatoes with green chilies, ginger, and spices.',
      'Make small balls from the potato mixture.',
      'Prepare batter with gram flour, salt, and water.',
      'Dip potato balls in batter and deep fry until golden.',
      'Slit pav horizontally, spread chutneys.',
      'Place hot vada in pav with more chutney.',
      'Serve immediately with fried green chilies.'
    ],
    healthBenefits: [
      'Potatoes provide essential minerals and vitamins',
      'Gram flour adds plant-based protein',
      'Spices aid digestion and provide antioxidants',
      'Quick source of energy for active lifestyle',
      'Green chilies boost vitamin C intake'
    ],
    culturalStory: 'Vada Pav was invented in the 1960s by Ashok Vaidya near Dadar station in Mumbai. Known as the "Indian Burger," it became the quintessential Mumbai street food, representing the city\'s fast-paced life and diverse culture.',
    tips: [
      'Make sure oil is hot enough for crispy vadas.',
      'Don\'t make the batter too thick or thin.',
      'Serve immediately for best taste and texture.',
      'Green chutney and tamarind chutney are essential.'
    ]
  },
  {
    title: 'Dal Makhani',
    description: 'A rich and creamy lentil curry made with black lentils and kidney beans, slow-cooked with butter and cream.',
    region: 'North India',
    prepTime: 480,
    cookTime: 120,
    difficulty: 'Medium',
    rating: 4.8,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=2070&auto=format&fit=crop',
    ingredients: [
      {
        name: 'Black lentils (Urad dal)',
        quantity: '1 cup, soaked overnight',
        healthBenefits: [
          'High in protein and fiber',
          'Rich in iron and folate',
          'Contains antioxidants',
          'Supports heart health'
        ]
      },
      {
        name: 'Kidney beans (Rajma)',
        quantity: '1/4 cup, soaked overnight',
        healthBenefits: [
          'Excellent source of plant protein',
          'High in fiber',
          'Rich in folate and iron',
          'May help regulate blood sugar'
        ]
      },
      {
        name: 'Butter',
        quantity: '4 tbsp',
        healthBenefits: [
          'Contains vitamin A',
          'Source of healthy fats',
          'Provides flavor and richness',
          'Contains vitamin K2'
        ]
      },
      {
        name: 'Heavy cream',
        quantity: '1/2 cup',
        healthBenefits: [
          'Rich in calcium',
          'Contains vitamin A',
          'Provides healthy fats',
          'Source of riboflavin'
        ]
      }
    ],
    instructions: [
      'Pressure cook soaked lentils and kidney beans until very soft.',
      'Mash partially and simmer on low heat for 1 hour.',
      'Heat butter in a pan, add cumin seeds.',
      'Add ginger-garlic paste, cook for 2 minutes.',
      'Add tomatoes and cook until soft.',
      'Add this tempering to the cooked lentils.',
      'Simmer for 30 minutes, stirring occasionally.',
      'Add cream and simmer for 10 more minutes.',
      'Garnish with cilantro and serve with naan or rice.'
    ],
    healthBenefits: [
      'High in plant-based protein for vegetarians',
      'Rich in fiber supporting digestive health',
      'Iron content helps prevent anemia',
      'Folate essential for cell division',
      'Slow cooking makes nutrients more bioavailable',
      'Provides sustained energy from complex carbohydrates'
    ],
    culturalStory: 'Dal Makhani was created at Moti Mahal restaurant in Delhi by the same chef who invented Butter Chicken. This rich, creamy dal represents the luxury of Mughlai cuisine adapted for vegetarians.',
    tips: [
      'Cook lentils until completely soft for best texture.',
      'Slow cooking on low heat develops rich flavors.',
      'Don\'t skip the cream - it\'s essential for authentic taste.',
      'The dal tastes even better the next day.'
    ]
  },
  {
    title: 'Paneer Tikka',
    description: 'Cubes of cottage cheese marinated in yogurt and spices, grilled to perfection in a tandoor.',
    region: 'North India',
    prepTime: 120,
    cookTime: 15,
    difficulty: 'Medium',
    rating: 4.7,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=2070&auto=format&fit=crop',
    ingredients: [
      {
        name: 'Paneer (Cottage cheese)',
        quantity: '400g, cut into cubes',
        healthBenefits: [
          'High in protein and calcium',
          'Rich in phosphorus',
          'Contains vitamin B12',
          'Supports bone health'
        ]
      },
      {
        name: 'Greek yogurt',
        quantity: '1/2 cup',
        healthBenefits: [
          'Contains probiotics',
          'High in protein',
          'Rich in calcium',
          'Supports digestive health'
        ]
      },
      {
        name: 'Bell peppers',
        quantity: '2, cut into chunks',
        healthBenefits: [
          'High in vitamin C',
          'Rich in antioxidants',
          'Contains vitamin A',
          'Low in calories'
        ]
      },
      {
        name: 'Red onion',
        quantity: '1 large, cut into chunks',
        healthBenefits: [
          'Contains quercetin',
          'Rich in antioxidants',
          'May support heart health',
          'Anti-inflammatory properties'
        ]
      }
    ],
    instructions: [
      'Mix yogurt with ginger-garlic paste, red chili powder, and garam masala.',
      'Marinate paneer cubes in this mixture for 2 hours.',
      'Thread paneer, bell peppers, and onions on skewers.',
      'Preheat grill or oven to high heat.',
      'Grill for 12-15 minutes, turning occasionally.',
      'Brush with butter halfway through cooking.',
      'Serve hot with mint chutney and sliced onions.'
    ],
    healthBenefits: [
      'High in protein supporting muscle health',
      'Calcium and phosphorus strengthen bones',
      'Bell peppers provide vitamin C for immunity',
      'Grilling retains nutrients while adding smoky flavor',
      'Yogurt provides beneficial probiotics',
      'Low in carbohydrates, suitable for various diets'
    ],
    culturalStory: 'Paneer Tikka is a vegetarian adaptation of the traditional tandoori cooking style. It became popular as restaurants sought to offer vegetarian options that matched the appeal of meat tikkas.',
    tips: [
      'Don\'t over-marinate as it can make paneer soft.',
      'Use firm paneer to prevent breaking during grilling.',
      'Soak wooden skewers in water to prevent burning.',
      'Serve immediately while hot for best taste.'
    ]
  },
  {
    title: 'Medu Vada',
    description: 'Crispy South Indian donuts made from black lentil batter, traditionally served with sambar and chutney.',
    region: 'South India',
    prepTime: 480,
    cookTime: 20,
    difficulty: 'Medium',
    rating: 4.5,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=2070&auto=format&fit=crop',
    ingredients: [
      {
        name: 'Urad dal (Black lentils)',
        quantity: '2 cups, soaked for 4 hours',
        healthBenefits: [
          'High in protein and fiber',
          'Rich in iron and folate',
          'Contains antioxidants',
          'Supports digestive health'
        ]
      },
      {
        name: 'Green chilies',
        quantity: '3-4, chopped',
        healthBenefits: [
          'High in vitamin C',
          'Contains capsaicin',
          'May boost metabolism',
          'Anti-inflammatory properties'
        ]
      },
      {
        name: 'Ginger',
        quantity: '1 inch, grated',
        healthBenefits: [
          'Anti-inflammatory properties',
          'Aids digestion',
          'May help reduce nausea',
          'Contains gingerol antioxidant'
        ]
      },
      {
        name: 'Curry leaves',
        quantity: '10-12 leaves',
        healthBenefits: [
          'Rich in antioxidants',
          'May help regulate blood sugar',
          'Supports digestive health',
          'Contains vitamin A'
        ]
      }
    ],
    instructions: [
      'Drain soaked urad dal and grind to smooth, fluffy batter.',
      'Add chopped green chilies, ginger, and curry leaves.',
      'Add salt and mix well without adding water.',
      'Heat oil for deep frying.',
      'Wet hands and shape batter into donuts with holes.',
      'Deep fry until golden brown and crispy.',
      'Drain on paper towels.',
      'Serve hot with sambar and coconut chutney.'
    ],
    healthBenefits: [
      'High in plant-based protein from black lentils',
      'Rich in fiber supporting digestive health',
      'Iron content helps prevent anemia',
      'Folate essential for cell division',
      'Curry leaves provide antioxidants',
      'Fermentation aids nutrient absorption'
    ],
    culturalStory: 'Medu Vada is a traditional South Indian breakfast item, particularly popular in Tamil Nadu and Karnataka. The name comes from Tamil words "medhu" meaning soft and "vadai" meaning fritter.',
    tips: [
      'Grind dal to very smooth and fluffy consistency.',
      'Don\'t add water while grinding - use minimal if needed.',
      'Oil temperature should be medium-hot for even cooking.',
      'Shape vadas with wet hands to prevent sticking.'
    ]
  },
  {
    title: 'Tandoori Chicken',
    description: 'Succulent chicken marinated in yogurt and spices, roasted in a traditional tandoor oven.',
    region: 'North India',
    prepTime: 240,
    cookTime: 30,
    difficulty: 'Medium',
    rating: 4.8,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2070&auto=format&fit=crop',
    ingredients: [
      {
        name: 'Whole chicken',
        quantity: '1 kg, cut into pieces',
        healthBenefits: [
          'High in protein for muscle building',
          'Rich in vitamin B6',
          'Contains selenium',
          'Low in saturated fat'
        ]
      },
      {
        name: 'Greek yogurt',
        quantity: '1 cup',
        healthBenefits: [
          'Contains probiotics',
          'High in protein and calcium',
          'Helps tenderize meat',
          'Supports digestive health'
        ]
      },
      {
        name: 'Tandoori masala',
        quantity: '3 tbsp',
        healthBenefits: [
          'Blend of anti-inflammatory spices',
          'Contains antioxidants',
          'May aid digestion',
          'Provides flavor without excess sodium'
        ]
      },
      {
        name: 'Red chili powder',
        quantity: '1 tbsp',
        healthBenefits: [
          'Contains capsaicin',
          'Rich in vitamin A',
          'May boost metabolism',
          'Anti-inflammatory properties'
        ]
      }
    ],
    instructions: [
      'Make deep cuts in chicken pieces.',
      'Mix yogurt, tandoori masala, red chili powder, and garam masala.',
      'Marinate chicken in this mixture for 4 hours or overnight.',
      'Preheat oven to 450°F (230°C).',
      'Place chicken on a rack over baking tray.',
      'Roast for 25-30 minutes, turning once.',
      'Brush with melted butter halfway through.',
      'Garnish with onions, mint, and lemon wedges.'
    ],
    healthBenefits: [
      'High-quality protein supports muscle development',
      'Yogurt marinade adds probiotics',
      'Roasting reduces fat content compared to frying',
      'Spices provide antioxidants and anti-inflammatory compounds',
      'Rich in B vitamins for energy metabolism',
      'Selenium supports immune function'
    ],
    culturalStory: 'Tandoori Chicken was popularized by Kundan Lal Gujral at Moti Mahal in Delhi. The distinctive red color and smoky flavor from tandoor cooking made it internationally famous, becoming synonymous with Indian cuisine.',
    tips: [
      'Marinate overnight for best flavor penetration.',
      'Use a meat thermometer to ensure proper cooking.',
      'High heat creates the characteristic charred exterior.',
      'Serve immediately while hot and juicy.'
    ]
  },
  {
    title: 'Palak Paneer',
    description: 'A creamy spinach curry with cubes of cottage cheese, enriched with aromatic spices.',
    region: 'North India',
    prepTime: 20,
    cookTime: 30,
    difficulty: 'Medium',
    rating: 4.6,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=2070&auto=format&fit=crop',
    ingredients: [
      {
        name: 'Fresh spinach',
        quantity: '500g, blanched and pureed',
        healthBenefits: [
          'High in iron and folate',
          'Rich in vitamin K',
          'Contains antioxidants',
          'Supports eye health'
        ]
      },
      {
        name: 'Paneer',
        quantity: '250g, cubed',
        healthBenefits: [
          'High in protein and calcium',
          'Rich in phosphorus',
          'Contains vitamin B12',
          'Supports bone health'
        ]
      },
      {
        name: 'Heavy cream',
        quantity: '1/4 cup',
        healthBenefits: [
          'Rich in calcium',
          'Contains vitamin A',
          'Provides healthy fats',
          'Adds richness and flavor'
        ]
      },
      {
        name: 'Garam masala',
        quantity: '1 tsp',
        healthBenefits: [
          'Blend of digestive spices',
          'Contains anti-inflammatory compounds',
          'May aid digestion',
          'Rich in antioxidants'
        ]
      }
    ],
    instructions: [
      'Blanch spinach in boiling water for 2 minutes.',
      'Cool and blend to smooth puree.',
      'Heat oil, lightly fry paneer cubes until golden.',
      'In same pan, add cumin seeds and ginger-garlic paste.',
      'Add onions and cook until translucent.',
      'Add spinach puree and simmer for 10 minutes.',
      'Add paneer, cream, and spices.',
      'Cook for 5 more minutes and serve hot.'
    ],
    healthBenefits: [
      'Spinach provides iron essential for blood health',
      'High in folate supporting cell division',
      'Paneer adds protein and calcium',
      'Vitamin K supports bone health',
      'Antioxidants may help reduce chronic disease risk',
      'Rich in nutrients while being vegetarian'
    ],
    culturalStory: 'Palak Paneer is a beloved vegetarian dish that showcases the versatility of paneer in Indian cuisine. This dish combines the nutritional powerhouse of spinach with protein-rich paneer.',
    tips: [
      'Blanch spinach quickly to retain vibrant green color.',
      'Don\'t overcook paneer as it can become tough.',
      'Add cream at the end to prevent curdling.',
      'Balance spices to let spinach flavor shine through.'
    ]
  },
  {
    title: 'Seekh Kebab',
    description: 'Spiced ground meat shaped around skewers and grilled to perfection, a popular Mughlai dish.',
    region: 'North India',
    prepTime: 60,
    cookTime: 20,
    difficulty: 'Medium',
    rating: 4.7,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d2a9?q=80&w=2070&auto=format&fit=crop',
    ingredients: [
      {
        name: 'Ground mutton or beef',
        quantity: '500g',
        healthBenefits: [
          'High in protein and iron',
          'Rich in vitamin B12',
          'Contains zinc',
          'Supports muscle development'
        ]
      },
      {
        name: 'Ginger-garlic paste',
        quantity: '2 tbsp',
        healthBenefits: [
          'Anti-inflammatory properties',
          'Supports immune system',
          'Aids in digestion',
          'Contains antioxidants'
        ]
      },
      {
        name: 'Red chili powder',
        quantity: '1 tbsp',
        healthBenefits: [
          'Contains capsaicin',
          'Rich in vitamin A',
          'May boost metabolism',
          'Anti-inflammatory properties'
        ]
      },
      {
        name: 'Fresh mint leaves',
        quantity: '1/4 cup, chopped',
        healthBenefits: [
          'Contains antioxidants',
          'Aids digestion',
          'Fresh breath naturally',
          'May help with nausea'
        ]
      }
    ],
    instructions: [
      'Mix ground meat with ginger-garlic paste, spices, and salt.',
      'Add chopped mint and cilantro.',
      'Knead mixture well and refrigerate for 1 hour.',
      'Shape mixture around metal skewers.',
      'Preheat grill or oven to high heat.',
      'Grill for 15-20 minutes, turning frequently.',
      'Brush with ghee while cooking.',
      'Serve hot with naan and mint chutney.'
    ],
    healthBenefits: [
      'High-quality protein supports muscle growth',
      'Iron helps prevent anemia',
      'Vitamin B12 supports nervous system',
      'Grilling reduces excess fat content',
      'Herbs and spices provide antioxidants',
      'Rich in essential amino acids'
    ],
    culturalStory: 'Seekh Kebab originated in the Mughal courts and became popular across North India. The word "seekh" means skewer in Persian, reflecting the dish\'s cooking method and royal heritage.',
    tips: [
      'Use metal skewers for even cooking.',
      'Don\'t make the mixture too wet.',
      'Cook on high heat for proper searing.',
      'Turn frequently to ensure even cooking.'
    ]
  }
];

const regionsData = [
  {
    id: "north-india",
    name: "North India",
    states: ["Punjab", "Haryana", "Uttar Pradesh", "Himachal Pradesh", "Jammu and Kashmir", "Uttarakhand", "Delhi"],
    description: "North Indian cuisine is characterized by its rich, aromatic gravies, tandoor-cooked breads, and extensive use of dairy products. The food is heavily influenced by Mughal culinary traditions, with an emphasis on meat dishes, rich curries, and flatbreads.",
    famousDishes: ["Butter Chicken", "Rogan Josh", "Chole Bhature", "Tandoori Chicken", "Biryani", "Paratha"],
    keyIngredients: ["Wheat flour", "Paneer", "Ghee", "Yogurt", "Garam masala", "Cardamom", "Cloves", "Cinnamon"],
    culinaryInfluences: ["Mughal", "Persian", "Central Asian"],
    imageUrl: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=2084&auto=format&fit=crop"
  },
  {
    id: "south-india",
    name: "South India",
    states: ["Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh", "Telangana"],
    description: "South Indian cuisine is known for its extensive use of rice, coconut, and spices. The food tends to be lighter, often vegetarian, and features distinctive flavors from curry leaves, mustard seeds, and coconut. Rice-based dishes, lentil preparations, and seafood are staples.",
    famousDishes: ["Masala Dosa", "Idli Sambar", "Hyderabadi Biryani", "Appam", "Rasam", "Pongal"],
    keyIngredients: ["Rice", "Coconut", "Tamarind", "Curry leaves", "Mustard seeds", "Red chilies", "Asafoetida"],
    culinaryInfluences: ["Temple cuisine", "Portuguese", "Arab"],
    imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "east-india",
    name: "East India",
    states: ["West Bengal", "Odisha", "Jharkhand", "Bihar", "Assam", "Tripura", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Arunachal Pradesh", "Sikkim"],
    description: "East Indian cuisine is renowned for its fish and rice dishes, sweets, and subtle flavors. Bengali cuisine dominates this region with its emphasis on fish, vegetables, and dairy products. The cuisine features minimal use of spices, allowing the natural flavors of ingredients to shine through.",
    famousDishes: ["Fish Curry", "Rasgulla", "Sandesh", "Luchi", "Shukto", "Mishti Doi"],
    keyIngredients: ["Fish", "Rice", "Mustard oil", "Panch phoron", "Poppy seeds", "Mustard seeds", "Coconut", "Jaggery"],
    culinaryInfluences: ["British colonial", "Portuguese", "Chinese"],
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "west-india",
    name: "West India",
    states: ["Maharashtra", "Gujarat", "Rajasthan", "Goa", "Madhya Pradesh", "Chhattisgarh"],
    description: "West Indian cuisine is incredibly diverse, ranging from the vegetarian thali traditions of Gujarat and Rajasthan to the seafood of the coastal areas and the street food culture of Mumbai. The cuisine emphasizes balance between sweet, sour, salty, and spicy flavors.",
    famousDishes: ["Pav Bhaji", "Dhokla", "Dal Baati Churma", "Vada Pav", "Laal Maas", "Vindaloo"],
    keyIngredients: ["Gram flour", "Jaggery", "Coconut", "Kokum", "Tamarind", "Pav bread", "Ghee", "Bajra"],
    culinaryInfluences: ["Maratha", "Portuguese", "Gujarati Jain", "Rajput"],
    imageUrl: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=2070&auto=format&fit=crop"
  }
];

async function main() {
  console.log('Starting database seed...');

  // Create a default admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@rasayatra.com' },
    update: {},
    create: {
      email: 'admin@rasayatra.com',
      name: 'Admin User',
      password: hashedPassword,
    },
  });

  console.log('Created admin user:', adminUser.email);

  // Create recipes
  for (const recipeData of recipesData) {
    try {
      const recipe = await prisma.recipe.create({
        data: {
          ...recipeData,
          authorId: adminUser.id,
        },
      });
      console.log('Created recipe:', recipe.title);
    } catch (error) {
      if (error.code === 'P2002') {
        console.log('Recipe already exists:', recipeData.title);
      } else {
        console.error('Error creating recipe:', recipeData.title, error);
      }
    }
  }

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
