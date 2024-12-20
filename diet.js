const mealPlans = {
    breakfast: {
        title: "Breakfast Options",
        meals: [
            {
                name: "Protein Oatmeal Bowl",
                calories: 350,
                ingredients: [
                    "1 cup rolled oats",
                    "1 scoop protein powder",
                    "1 banana",
                    "1 tbsp honey",
                    "1/4 cup almonds",
                    "Cinnamon to taste"
                ],
                instructions: [
                    "Cook oats with water according to package instructions",
                    "Stir in protein powder while oats are hot",
                    "Top with sliced banana, almonds, and honey",
                    "Sprinkle with cinnamon"
                ],
                nutrition: {
                    protein: "24g",
                    carbs: "52g",
                    fats: "12g",
                    fiber: "8g"
                }
            },
            {
                name: "Greek Yogurt Parfait",
                calories: 320,
                ingredients: [
                    "1 cup Greek yogurt",
                    "1/2 cup mixed berries",
                    "1/4 cup granola",
                    "1 tbsp honey",
                    "Chia seeds"
                ],
                instructions: [
                    "Layer Greek yogurt in a bowl",
                    "Add mixed berries",
                    "Top with granola and chia seeds",
                    "Drizzle with honey"
                ],
                nutrition: {
                    protein: "22g",
                    carbs: "45g",
                    fats: "8g",
                    fiber: "6g"
                }
            },
            // Add more breakfast options...
        ]
    },
    lunch: {
        title: "Lunch Options",
        meals: [
            {
                name: "Chicken Quinoa Bowl",
                calories: 450,
                ingredients: [
                    "5 oz grilled chicken breast",
                    "1 cup cooked quinoa",
                    "1 cup mixed vegetables",
                    "1 tbsp olive oil",
                    "Lemon juice",
                    "Herbs and spices"
                ],
                instructions: [
                    "Cook quinoa according to package instructions",
                    "Grill chicken breast with seasonings",
                    "Sauté mixed vegetables",
                    "Combine all ingredients in a bowl",
                    "Drizzle with olive oil and lemon juice"
                ],
                nutrition: {
                    protein: "40g",
                    carbs: "45g",
                    fats: "15g",
                    fiber: "7g"
                }
            },
            // Add more lunch options...
        ]
    },
    // Add dinner and snacks sections similarly...
};

function showMealOptions(category) {
    const modal = document.getElementById('mealOptionsModal');
    const title = document.getElementById('mealCategoryTitle');
    const optionsList = document.getElementById('mealOptionsList');
    
    title.textContent = mealPlans[category].title;
    optionsList.innerHTML = '';
    
    mealPlans[category].meals.forEach(meal => {
        optionsList.innerHTML += `
            <div class="meal-option" onclick="showRecipe('${category}', '${meal.name}')">
                <h3>${meal.name}</h3>
                <p>${meal.calories} calories</p>
                <span class="view-recipe">View Recipe →</span>
            </div>
        `;
    });
    
    modal.style.display = 'block';
}

function showRecipe(category, mealName) {
    const meal = mealPlans[category].meals.find(m => m.name === mealName);
    const recipeModal = document.getElementById('recipeModal');
    const recipeName = document.getElementById('recipeName');
    const ingredients = document.getElementById('recipeIngredients');
    const instructions = document.getElementById('recipeInstructions');
    const nutrition = document.getElementById('nutritionInfo');
    
    recipeName.textContent = meal.name;
    
    ingredients.innerHTML = `
        <h3>Ingredients</h3>
        <ul>${meal.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
    `;
    
    instructions.innerHTML = `
        <h3>Instructions</h3>
        <ol>${meal.instructions.map(i => `<li>${i}</li>`).join('')}</ol>
    `;
    
    nutrition.innerHTML = `
        <h3>Nutrition Facts</h3>
        <p>Calories: ${meal.calories}</p>
        <p>Protein: ${meal.nutrition.protein}</p>
        <p>Carbs: ${meal.nutrition.carbs}</p>
        <p>Fats: ${meal.nutrition.fats}</p>
        <p>Fiber: ${meal.nutrition.fiber}</p>
    `;
    
    document.getElementById('mealOptionsModal').style.display = 'none';
    recipeModal.style.display = 'block';
}

// Close modal handlers
document.querySelectorAll('.close-modal').forEach(button => {
    button.onclick = function() {
        document.getElementById('mealOptionsModal').style.display = 'none';
        document.getElementById('recipeModal').style.display = 'none';
    }
});

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
} 