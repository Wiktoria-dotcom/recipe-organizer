const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Połączenie z MongoDB (możesz użyć np. MongoDB Atlas albo lokalnie)
mongoose.connect('mongodb://127.0.0.1:27017/recipes', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
    console.log('Połączono z MongoDB');
    seedRecipes(); // dodaj domyślne przepisy
});

// Model przepisu
const RecipeSchema = new mongoose.Schema({
    name: String,
    ingredients: [String],
    instructions: String,
    category: String,
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

const seedRecipes = async () => {
    const count = await Recipe.countDocuments();
    if (count === 0) {
        const defaultRecipes = [
            // ŚNIADANIE
            {
                name: 'Jajecznica z masłem',
                ingredients: ['3 jajka', 'masło', 'sól', 'pieprz'],
                instructions: 'Rozgrzej masło na patelni, wbij jajka, mieszaj aż się zetną.',
                category: 'śniadanie',
            },
            {
                name: 'Owsianka z owocami',
                ingredients: ['płatki owsiane', 'mleko', 'banan', 'truskawki'],
                instructions: 'Gotuj płatki w mleku, dodaj owoce.',
                category: 'śniadanie',
            },
            {
                name: 'Tosty francuskie',
                ingredients: ['chleb', 'jajko', 'mleko', 'cukier'],
                instructions: 'Mocz chleb w jajku z mlekiem, smaż na złoto.',
                category: 'śniadanie',
            },
            {
                name: 'Omlet z warzywami',
                ingredients: ['jajka', 'papryka', 'cebula', 'szpinak'],
                instructions: 'Roztrzep jajka, dodaj warzywa, smaż.',
                category: 'śniadanie',
            },
            {
                name: 'Smoothie bananowe',
                ingredients: ['banan', 'mleko', 'miód'],
                instructions: 'Zblenduj wszystkie składniki.',
                category: 'śniadanie',
            },
            {
                name: 'Kanapka z awokado',
                ingredients: ['chleb', 'awokado', 'sól', 'pieprz'],
                instructions: 'Rozgnieć awokado i posmaruj chleb.',
                category: 'śniadanie',
            },
            {
                name: 'Jogurt z granolą',
                ingredients: ['jogurt', 'granola', 'owoce'],
                instructions: 'Wymieszaj jogurt z granolą i owocami.',
                category: 'śniadanie',
            },
            {
                name: 'Placki bananowe',
                ingredients: ['banan', 'jajko', 'mąka'],
                instructions: 'Zblenduj składniki, smaż placuszki.',
                category: 'śniadanie',
            },
            {
                name: 'Jajka na twardo',
                ingredients: ['jajka', 'woda', 'sól'],
                instructions: 'Gotuj jajka przez 10 minut.',
                category: 'śniadanie',
            },
            {
                name: 'Pasta jajeczna',
                ingredients: ['jajka', 'majonez', 'szczypiorek'],
                instructions: 'Posiekaj jajka, wymieszaj z majonezem i szczypiorkiem.',
                category: 'śniadanie',
            },

            // OBIAD
            {
                name: 'Spaghetti Bolognese',
                ingredients: ['makaron', 'mięso mielone', 'sos pomidorowy', 'czosnek'],
                instructions: 'Ugotuj makaron, przygotuj sos z mięsem.',
                category: 'obiad',
            },
            {
                name: 'Kurczak z ryżem',
                ingredients: ['kurczak', 'ryż', 'warzywa', 'przyprawy'],
                instructions: 'Usmaż kurczaka, ugotuj ryż, wymieszaj z warzywami.',
                category: 'obiad',
            },
            {
                name: 'Zupa pomidorowa',
                ingredients: ['pomidory', 'bulion', 'makaron', 'śmietana'],
                instructions: 'Gotuj pomidory z bulionem, dodaj makaron i śmietanę.',
                category: 'obiad',
            },
            {
                name: 'Schabowy z ziemniakami',
                ingredients: ['schab', 'bułka tarta', 'jajko', 'ziemniaki'],
                instructions: 'Panieruj schab, smaż, podaj z ziemniakami.',
                category: 'obiad',
            },
            {
                name: 'Sałatka grecka',
                ingredients: ['ogórek', 'pomidor', 'feta', 'oliwki'],
                instructions: 'Pokrój składniki, skrop oliwą.',
                category: 'obiad',
            },
            {
                name: 'Gulasz wołowy',
                ingredients: ['wołowina', 'cebula', 'marchew', 'przyprawy'],
                instructions: 'Duś mięso z warzywami.',
                category: 'obiad',
            },
            {
                name: 'Pizza domowa',
                ingredients: ['ciasto', 'sos pomidorowy', 'ser', 'dodatki'],
                instructions: 'Rozwałkuj ciasto, dodaj składniki, piecz.',
                category: 'obiad',
            },
            {
                name: 'Pierogi ruskie',
                ingredients: ['ciasto pierogowe', 'ser', 'ziemniaki', 'cebula'],
                instructions: 'Zrób farsz, lep pierogi, gotuj.',
                category: 'obiad',
            },
            {
                name: 'Lazania',
                ingredients: ['makaron lasagna', 'mięso mielone', 'sos beszamelowy'],
                instructions: 'Układaj warstwy i piecz.',
                category: 'obiad',
            },
            {
                name: 'Kotlety mielone',
                ingredients: ['mięso mielone', 'jajko', 'bułka tarta', 'cebula'],
                instructions: 'Formuj kotlety, smaż na złoto.',
                category: 'obiad',
            },

            // KOLACJA
            {
                name: 'Grzanki z czosnkiem',
                ingredients: ['chleb', 'czosnek', 'masło'],
                instructions: 'Posmaruj chleb masłem i czosnkiem, zapiecz.',
                category: 'kolacja',
            },
            {
                name: 'Sałatka z tuńczykiem',
                ingredients: ['sałata', 'tuńczyk', 'jajko', 'pomidor'],
                instructions: 'Wymieszaj składniki, podaj na zimno.',
                category: 'kolacja',
            },
            {
                name: 'Naleśniki z serem',
                ingredients: ['ciasto naleśnikowe', 'twarożek', 'cukier'],
                instructions: 'Usmaż naleśniki, nadziej serem.',
                category: 'kolacja',
            },
            {
                name: 'Tortilla z kurczakiem',
                ingredients: ['tortilla', 'kurczak', 'warzywa', 'sos'],
                instructions: 'Podsmaż kurczaka, zawijaj w tortillę.',
                category: 'kolacja',
            },
            {
                name: 'Zupa krem z dyni',
                ingredients: ['dynia', 'bulion', 'śmietana', 'przyprawy'],
                instructions: 'Gotuj dynię, zmiksuj, dodaj śmietanę.',
                category: 'kolacja',
            },
            {
                name: 'Jajka sadzone',
                ingredients: ['jajka', 'masło', 'sól'],
                instructions: 'Usmaż jajka na maśle.',
                category: 'kolacja',
            },
            {
                name: 'Tosty z serem',
                ingredients: ['chleb tostowy', 'ser', 'szynka'],
                instructions: 'Złóż kanapkę, zapiecz w tosterze.',
                category: 'kolacja',
            },
            {
                name: 'Pasta z tuńczyka',
                ingredients: ['tuńczyk', 'majonez', 'cebula'],
                instructions: 'Wymieszaj składniki na pastę.',
                category: 'kolacja',
            },
            {
                name: 'Kasza z warzywami',
                ingredients: ['kasza', 'cukinia', 'papryka', 'przyprawy'],
                instructions: 'Ugotuj kaszę, podsmaż warzywa, wymieszaj.',
                category: 'kolacja',
            },
            {
                name: 'Zupa cebulowa',
                ingredients: ['cebula', 'bulion', 'chleb', 'ser'],
                instructions: 'Podsmaż cebulę, gotuj w bulionie, zapiecz z grzanką.',
                category: 'kolacja',
            },
        ];


        await Recipe.insertMany(defaultRecipes);
        console.log('Dodano domyślne przepisy!');
    }
};



// Endpointy API

// Pobierz wszystkie przepisy
app.get('/recipes', async (req, res) => {
    const recipes = await Recipe.find();
    res.json(recipes);
});

// Pobierz przepisy wg kategorii
app.get('/recipes/:category', async (req, res) => {
    const recipes = await Recipe.find({ category: req.params.category });
    res.json(recipes);
});

// Dodaj przepis
app.post('/recipes', async (req, res) => {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.json(recipe);
});

// Edytuj przepis
app.put('/recipes/:id', async (req, res) => {
    const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

// Usuń przepis
app.delete('/recipes/:id', async (req, res) => {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: 'Przepis usunięty' });
});

// Start serwera
app.listen(5000, () => {
    console.log('Backend działa na http://localhost:5000');
});


