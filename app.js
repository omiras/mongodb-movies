// Iteración 0 -> Conectarse a vuestra instancia de MongoDB y levantar un servidor Express. 

// importar el módulo
const { MongoClient } = require('mongodb');

// importar express y crear una nueva instancia
const express = require("express");
const app = express();

// Crear una instancia de MongoDB Client para conectarnos más tarde. ¡Si me copias esta línea usa tu connection string!
const client = new MongoClient("mongodb+srv://oscar:oscar@cluster0.c8tq0vp.mongodb.net/");

// Definir el endpoint (no ejecutas nada de entrada)
app.get("/", async (req, res)=>{
    // Acceder a la base de datos sample_mflix
    const db = client.db("sample_mflix");

    // Acceder a la colección 'movies'
    const movies = db.collection("movies");

    // Usar find para obtener 10 documentos de la colección y mostrarlos por consola
    const result = await movies.find().sort({ year: -1}).limit(10).toArray();

    // Corregir Iteración 1 a las 21h
    res.render("index.ejs", {
        movies: result
    })
});


async function start() {
    // conectarse a la base de datos
    try {
        await client.connect();

        console.log("Conectado a la base de datos de forma satifactoria");

        // levantar el servidor Express
        app.listen(3000, ()=> {
            console.log("Escuchando peticiones en  http://localhost:3000");
        });
        

    } catch (err) {
        console.log(err.message);
    }

}

start();

