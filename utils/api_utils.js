const axios = require("axios");

const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";

async function searchCocktailByName(cocktailName) {
    const response = await axios.get(`${BASE_URL}/search.php?s=${cocktailName}`);

    if (response.status === 200) {
        if (response.data && response.data.drinks) {
            return response.data.drinks.map(drink => mapCocktailResponseObject(drink));
        }

        return [];
    }

    return null;
}

async function getCocktailDetailsFromId(cocktailId) {
    const response = await axios.get(`${BASE_URL}/lookup.php?i=${cocktailId}`); 

    if (response.data && response.data.drinks && response.data.drinks.length > 0) {
        return mapCocktailResponseObject(response.data.drinks[0]);
    }

    return null;
}

function mapCocktailResponseObject(obj) {
    const ingredients = [];
    let ingredientNum = 1;

    while (obj["strIngredient" + ingredientNum.toString()]) {
        ingredients.push(
            (obj["strMeasure" + ingredientNum.toString()] || "").trim() + " " + obj["strIngredient" + ingredientNum.toString()].trim()
        );

        ingredientNum++;
    }

    return {
        id: obj.idDrink,
        name: obj.strDrink,
        tags: obj.strTags?.split(",").map(t => t.trim()),
        videoLink: obj.strVideo,
        category: obj.strCategory,
        iba: obj.strIBA,
        alcoholic: obj.strAlcoholic,
        glass: obj.strGlass,
        instructions: obj.strInstructions,
        thumbnail: obj.strDrinkThumb,
        ingredients: ingredients
    }
}

module.exports = {searchCocktailByName, getCocktailDetailsFromId}