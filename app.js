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
    // 2.1 - Tenemos que obtener la querystring. De momento solamente el parámetro 'keyword'
    console.log("querystring: ", req.query);
    const { keyword, type, fromYear } = req.query;
    console.log("🚀 ~ file: app.js:38 ~ app.get ~ keyword:", keyword)
    // 2.2 - Si la query string me trae valor en el parámetro title, entonces tengo que actualizar el objeto query con este filtro

    // definir un objeto que va a contener la query a la base de datos
    let query = {};

    // Si el usuario quiere buscar por título, le añado esta información a la query
    // Si el campo title está informado (tiene valor), entonces tengo que añadir este filtro a la query -> query = { title: title}

    // TODO 1: Ahora la palabra clave también tenemos que buscarla en el campo 'plot' y en el campo 'fullPlot' de los documentos
    if (keyword) {
        query.title = new RegExp(keyword, 'i'); // 'i' para que sea insensible a mayúsculas
    }

    // TODO 2: Si el parámetro 'type' está informado (tiene valor), entonces tenemos que crear una nueva propiedad en la query (query.type) y asignarle el valor adecuado para buscar las películas también por tipo de filmación
    if (type) {
        query.type = type;
    }

    // TODO 3: Si el parámetor fromYear está informado....
    if (fromYear) {
        // TODO: añadir criterio de búsqueda para que filtre a partir de las películas filmadas en el año formYear
        query.year = { $gte: Number(fromYear) }
    }

    // TODO 4: Si el parámetro toYear está informado....

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

