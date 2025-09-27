const { searchCocktailByName, getCocktailDetailsFromId } = require("./utils/api_utils.js");
const express = require("express");

const PORT = 80;

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get('/search', async (req, res) => {
    if (req.body && req.body.searchTerm) {
        const results = await searchCocktailByName(req.body.searchTerm);
        return res.send({cocktails: results});
    }

    return res.status(400);
});

app.get('/details', async (req, res) => {
    if (req.body && req.body.id) {
        const result = await getCocktailDetailsFromId(req.body.id);

        if (result) {
            return res.send({cocktail: result});
        }

        return res.status(404);
    }

    return res.status(400);
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Listening on port ${PORT}`);
});