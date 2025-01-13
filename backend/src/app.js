//Se cargan las librerias
const express = require('express');
const cors = require('cors');
const knex = require('knex');

//Iniciamos la aplicación (Backend)
const app = express();
app.use(cors());
app.use(express.json());

//Iniciar la BBDD
const db = knex ({
    client: 'sqlite3',
    connection: {
        filename: 'videogames.db'
    },
    useNullAsDefault: true
});


//CRUD
//Mostrar todos los videojuegos disponibles
app.get('/videogames', async(req, res) => {
    const videogames = await db('videogames').select('*');
    res.status(200).json(videogames);
});

//Mostrar videojuego por id en la URL
app.get('/videogames/:videogameId', async(req, res) => {
    const videogame = await db('videogames').select('*').where({ id: req.params.videogameId }).first();
    res.status(200).json(videogame); // ---> Se da el OK de la conexión a la BBDD
});

//Añadir un nuevo videojuego
app.post('/videogames', async (req, res) => {
    await db('videogames').insert({
        name: req.body.name,
        type:  req.body.type, // ---> todo esto mete los datos en la BBDD
        year:  req.body.year
    });

    res.status(201).json({}); // ---> Aquí damos el OK al registrar el nuevo juego. No devuelve nada
});

 //modificar un videojuego existente por ID
app.put('/videogames/:videogameId', async(req, res) => {
   await db('videogames').where({ id: req.params.videogameId }).update({
    name: req.body.name,
    type: req.body.type,
    year: req.body.year

   });

   res.status(204).json({});
});

//borrar videojuego que existe
app.delete('/videogames/:videogameId', async(req, res) => {
    await db('videogames').del().where({ id: req.params.videogameId });

    res.status(204).json({});
});


app.listen(8080, () => {
    console.log("El backend ha iniciado correctamente en el puerto 8080");
});