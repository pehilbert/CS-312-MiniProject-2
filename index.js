/* Imports */
const { searchCocktailByName, getCocktailDetailsFromId } = require("./utils/api_utils.js");
const express = require("express");

/* Globals */
const PORT = 80;

/* Express app and middleware */
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

/* Routes */

// Index/cocktail search page
app.get('/', async (req, res) => {
    if (req.query && req.query.searchTerm) {
        const results = await searchCocktailByName(req.query.searchTerm);
        return res.render("index", {searchTerm: req.query.searchTerm, cocktails: results});
    }

    return res.render("index", {cocktails: null});
});

// Cocktail details page
app.get('/details', async (req, res) => {
    if (req.query && req.query.id) {
        const result = await getCocktailDetailsFromId(req.query.id);

        if (result) {
            return res.render("details", {cocktail: result});
        }

        return res.status(404);
    }

    return res.status(400);
});

/* Start app */
app.listen(PORT, "0.0.0.0", () => {
    console.log(`App running at http://localhost:${PORT}`);
});