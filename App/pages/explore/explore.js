document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.querySelector(".form-control.form-input");
    const searchButton = document.querySelector(".search-button");
    const recipeContainer = document.querySelector(".recipe-container");
    const resultsContainer = document.querySelector(".resultsContainer");
    const selectedIngredientsList = document.querySelector(".selectedIngredientsList");

    let ingredients = [];
    let selectedIngredients = [];
    let currentFilteredIngredients = []; // Track currently filtered ingredients

    // Fetching initial ingredients data
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
        .then(response => response.json())
        .then(data => {
            ingredients = data.meals.map(meal => meal.strIngredient);
            ingredients.forEach(addResult);
        });
    
    function addResult(entryObject) {
        const ingredientElement = document.createElement("div");
        ingredientElement.textContent = entryObject;
        ingredientElement.addEventListener("click", () => {
            if (!selectedIngredients.includes(entryObject)) {
                selectedIngredients.push(entryObject);
                updateSelectedIngredientsDisplay();
                fetchRecipes();
            }
        });
    }

    function displayRecipes(recipes) {
        recipeContainer.innerHTML = "";
        if (recipes && recipes.length) {
            recipes.forEach(meal => {
                const mealElement = document.createElement('div');
                mealElement.innerHTML = `
                    <h3>${meal.strMeal}</h3>
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <button class="btn btn-primary make-button">Make!</button>`;
                recipeContainer.appendChild(mealElement);

                const makeButton = mealElement.querySelector(".make-button");
                makeButton.addEventListener("click", function () {
                    renderRecipe(meal.strMeal);
                })
            });
        } else {
            recipeContainer.innerHTML = '<p>No recipes found.</p>';
        }
    }

    function renderRecipe(mealName) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
            .then(response => response.json())
            .then(data => {
                const meal = data.meals[0];
                recipeContainer.innerHTML = `
                    <div class="recipe-details-container">
                        <button class="back-button">Back</button>
                        <div class="recipe-details">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                            <h2>${meal.strMeal}</h2>
                            <h3>Ingredients</h3>
                            <ul>
                                ${Object.keys(meal)
                                    .filter(key => key.startsWith("strIngredient") && meal[key])
                                    .map(key => `<li>${meal[key]}</li>`)
                                    .join('')}
                            </ul>
                            <p>${meal.strInstructions}</p>
                            <iframe width="560" height="315" src="${meal.strYoutube.replace("watch?v=", "embed/")}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        </div>
                    </div>`;

                const backButton = document.querySelector(".back-button");
                backButton.addEventListener("click", () => {
                    fetchRecipes();
                })
            })
    }
    function fetchRecipes() {
        if (selectedIngredients.length > 0) {
            const ingredientQuery = selectedIngredients.join(",");
            fetch(`https://www.themealdb.com/api/json/v2/1/filter.php?i=${ingredientQuery}`)
                .then(response => response.json())
                .then(data => {
                    displayRecipes(data.meals || []);
                });
        } else {
            displayRecipes([]);
        }
    }

    function updateSelectedIngredientsDisplay() {
        selectedIngredientsList.innerHTML = '';
        selectedIngredients.forEach(ingredient => {
            const listItem = document.createElement("li");
            listItem.textContent = ingredient;
            listItem.onclick = () => {
                selectedIngredients = selectedIngredients.filter(item => item !== ingredient);
                updateSelectedIngredientsDisplay();
                fetchRecipes();
            };
            selectedIngredientsList.appendChild(listItem);
        });
    }

    resultsContainer.addEventListener("click", function(event) {
        if (event.target.tagName === 'DIV') {
            const ingredient = event.target.textContent.trim();
            if (!selectedIngredients.includes(ingredient)) {
                selectedIngredients.push(ingredient);
                updateSelectedIngredientsDisplay();
                fetchRecipes();
            }
        }
    });

    searchInput.addEventListener("input", function(event) {
        const searchTerm = event.target.value.toLowerCase();
        currentFilteredIngredients = ingredients.filter(ingredient => ingredient.toLowerCase().includes(searchTerm));
        resultsContainer.innerHTML = "";

        currentFilteredIngredients.forEach(ingredient => {
            const ingredientElement = document.createElement("div");
            ingredientElement.textContent = ingredient;
            resultsContainer.appendChild(ingredientElement);
        });
    });

    searchButton.addEventListener("click", function() {
        const searchTerm = searchInput.value.trim();
        if (currentFilteredIngredients.includes(searchTerm) && !selectedIngredients.includes(searchTerm)) {
            selectedIngredients.push(searchTerm);
            updateSelectedIngredientsDisplay();
            fetchRecipes();
        }
    });
});
