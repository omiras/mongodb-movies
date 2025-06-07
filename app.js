const express = require('express');
const logger = require('morgan');
const { MongoClient } = require('mongodb');

// Base de datos
const uri = "mongodb+srv://oscar:oscar@cluster0.c8tq0vp.mongodb.net/";
const client = new MongoClient(uri);
let database;

const app = express();

app.use(logger("dev"));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {

    // seleccionar colección movies
    const movies = database.collection('movies');

    const documents = await movies.find({}, { sort: { year: -1 } }).limit(10).toArray();
    console.log("🚀 ~ file: app.js:21 ~ app.get ~ documents:", documents)

    res.render('index', {
        documents
    });
});

app.get('/movies/add-form', (req, res) => {
    res.render('add-form');
})

app.get('/recommendation/:genre', async (req, res) => {
    const { genre } = req.params;
    const movies = database.collection('movies');
    let match = {};
    if (genre !== 'any') {
        match.genres = { $regex: new RegExp(genre, 'i') };
    }
    // Usar pipeline para obtener una película aleatoria
    const pipeline = [
        { $match: match },
        { $sample: { size: 1 } }
    ];
    const [recommendation] = await movies.aggregate(pipeline).toArray();
    res.render('recommendation', { recommendation });
});

app.listen(process.env.PORT || 3000, async () => {
    console.log(`Server is up.`);
    try {
        await client.connect();
        database = client.db("sample_mflix");
        console.log('Conexión a la base de datos correcta.')
    } catch (err) {
        console.error("-------------Ha ocurrido un error!!----------");
        console.error(err);
    }
});

