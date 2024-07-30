const express = require('express');
const logger = require('morgan');
const { MongoClient } = require('mongodb');

// Base de datos
const uri = "mongodb+srv://oscar:oscar@cluster0.c8tq0vp.mongodb.net/";
const client = new MongoClient(uri);
let database;

const app = express();

app.use(logger("dev"));

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

