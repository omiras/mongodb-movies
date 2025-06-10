// Iteración 0 -> Conectarse a vuestra instancia de MongoDB y levantar un servidor Express. 

// importar el módulo
const { MongoClient } = require('mongodb');

// importar express y crear una nueva instancia
const express = require("express");
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Crear una instancia de MongoDB Client para conectarnos más tarde. ¡Si me copias esta línea usa tu connection string!
const client = new MongoClient("mongodb+srv://oscar:oscar@cluster0.c8tq0vp.mongodb.net/");

// Añadir el documento al a base de datos
app.post("/movies/add-form", async (req, res)=> {
    // TODO
    console.log("req.body: ", req.body);
    // 1. Obtener cada uno de los campos de req.body
    const newMovie = {
        title: req.body.title,
        poster: req.body.urlImage
    }

    // 2. Insertar el documento en la base de datos de MongoDB (insertOne)
    const db = client.db("sample_mflix");
    const movies = db.collection('movies');

    await movies.insertOne(newMovie);

    // 3. Devolver algun mensaje al usuario indicando que hemos insertado la película en la base de datos
    res.send('<p>Película insertada correctamente. Volver a <a href="/">HOME</a></p>')

    // Coregir: 21.55
});

// Renderizar el formulario de añadir película
app.get("/movies/add-form", (req, res)=> {
    res.render("form.ejs");
});

// Definir el endpoint (no ejecutas nada de entrada)
app.get("/", async (req, res)=>{

    // mostrar query string


    console.log("query actual", req.query);

    // variable para almacenar el filtro de búsqueda
    const filter = {};

    if (req.query.type) {
        // Si el usuario tiene intención de filtrar por tipo de film (serie o película); tenemos que conformar una objeto de búsqueda
        filter.type = req.query.type;
    }
    if (req.query.genres) {
        filter.genres = req.query.genres;
    }

    if (req.query.year) {
        filter.year = { $gte : Number(req.query.year)};
    }

    if (req.query.title) {
        filter.title = { $regex: new RegExp(req.query.title, "i") }
    }


    console.log("Filtro: ", filter);

    // Acceder a la base de datos sample_mflix
    const db = client.db("sample_mflix");

    // Acceder a la colección 'movies'
    const movies = db.collection("movies");

    // Usar find para obtener 10 documentos de la colección y mostrarlos por consola
    const result = await movies.find(filter).sort({ year: -1}).limit(10).toArray();

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

