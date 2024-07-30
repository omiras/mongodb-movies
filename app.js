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

app.get('/', (req, res) => {
    
    // 1. Tenemos que hacer una consulta a la base de datos de MongoDB y traernos 10 películas cualesquiera. Tenemos que ordenarlas por fecha de lanzamiento de forma decreciente. (mirad el ejemplo de clase que generó chatgpt) mongodb\mongodb-driver\app-chatgpt.js 20.52 . Usad un console.log para ver si realmente estais recuperando correctamente los documentos.

    // 2. Tenemos que pasar a la vista todos los documentos que hemos recuperado

    // 3. En el EJS tenemos que iterar por cada uno de los documentos, y para cada documento, mostrar titulo, imagen y año de lanzamiento (ver practica fototeca) 

    res.render('index');
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

