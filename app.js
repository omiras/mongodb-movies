const express = require('express');
const logger = require('morgan');

// importamos dos objetos de la biblioteca mongodb
const { MongoClient, ServerApiVersion } = require('mongodb');

// Connection string: el string donde especificámos usuario:contraseña y URL de conexión 
// Unique Resource Identifier
// PONED VUESTRA CONNECTION STRING
const uri = "mongodb+srv://oscar:oscar@cluster0.c8tq0vp.mongodb.net/";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);

// variable global para gestionar nuestra base de datos
let database;


const app = express();
app.use(logger("dev"));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {

    // 1. Tenemos que hacer una consulta a la base de datos de MongoDB y traernos 10 películas cualesquiera. Tenemos que ordenarlas por fecha de lanzamiento de forma decreciente. (mirad el ejemplo de clase que generó chatgpt) mongodb\mongodb-driver\app-chatgpt.js 20.52 . Usad un console.log para ver si realmente estais recuperando correctamente los documentos.
    const movies = database.collection('movies');

    // Iteración 2:
    // 2.1 - Tenemos que obtener la querystring. De momento solamente el parámetro 'title'
    const { title } = req.query;
    console.log("🚀 ~ file: app.js:38 ~ app.get ~ title:", title)
    // 2.2 - Si la query string me trae valor en el parámetro title, entonces tengo que actualizar el objeto query con este filtro

    // definir un objeto que va a contener la query a la base de datos
    let query = {};

    // Si el usuario quiere buscar por título, le añado esta información a la query
    // Si el campo title está informado (tiene valor), entonces tengo que añadir este filtro a la query -> query = { title: title}
    if (title) {
        query = {
            ...query, // los mismos campos que tenías hasta ahora
            title : new RegExp(title)
        }
    }

    console.log("aspecto de la query hasta el momento: ", query);

    // definit las opciones. 
    const options = { sort: { year: -1 }, limit: 10 }

    // recuperar todas las películas con esta query y estas opciones
    const documents = await movies.find(query, options).toArray();

    // 2. Tenemos que pasar a la vista todos los documentos que hemos recuperado

    // 3. En el EJS tenemos que iterar por cada uno de los documentos, y para cada documento, mostrar titulo, imagen y año de lanzamiento (ver practica fototeca). Corregir a las 21.18

    res.render('index', {
        documents
    });
});

app.listen(process.env.PORT || 3000, async () => {
    console.log('Server up.');

    // cuando levantamos el servidor nos conectamos a MongoDB
    try {
        await client.connect();

        // seleccionamos la base de datos
        database = client.db("sample_mflix");

        // Mensaje de confirmación de que nos hemos conectado a la base de datos
        console.log("Conexión a la base de datos OK.")

    } catch (err) {
        console.error(err);
    }
});

