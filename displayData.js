import { fetchRecipes } from "./fetchData.js";
import { attachGetRecipeEvent } from "./eventCreation.js";//Add another function to fetch and display on page load
import { form, recipesGrid } from "./elements.js";

function displayRecipes(recipes) {
    console.log("Creating html");
    //if no recipes to match query?
    if (recipes.length === 0 ) {
        recipesGrid.innerHTML = '<p> No Recipes Found'
        return;
    }

    //use map to create the html for the recipes
    //store data for modal in data-* attributes
    const html = recipes.map((recipe) =>
    //console.log(recipe)
    `<div class="recipe" 
    data-id="${recipe.id}" 
    data-ingredients="${recipe.ingredients}" 
    data-calories="${recipe.caloriesPerServing}" 
    data-instructions="${recipe.instructions}">
    <h2>${recipe.name}</h2>
    ${recipe.image && `<img src="${recipe.image}" alt="${recipe.name}">`}
    <button class="getRecipeBtn"> Get Recipe </button>
    </div>`
    );
    
    recipesGrid.innerHTML =html.join("");
     // Attach event listeners to new buttons
     attachGetRecipeEvent();
}


export async function fetchAndDisplay(query, mealType) {
    //turn form off
    form.submit.disabled = true;
    //submit the search
    const recipes = await fetchRecipes(query, mealType);
    console.log(recipes);
    form.submit.disabled = false;

    if(recipes) {
        displayRecipes(recipes);
    } else {
        console.error("No recipes retrieved")
    }
    }