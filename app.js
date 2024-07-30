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

