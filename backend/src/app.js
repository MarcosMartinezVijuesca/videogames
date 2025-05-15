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

const dbUser = knex ({
    client: 'sqlite3',
    connection: {
        filename: 'users.db'                    
    },
    useNullAsDefault: true
});

//CRUD
//Mostrar todos los videojuegos disponibles
app.get('/videogames', async(req, res) => {
    const videogames = await db('videogames').select('*');
    res.status(200).json(videogames);
});

//Mostrar videojuego determinado por nombre
app.get('/videogames/:videogame', async (req, res) => {
    const result = await db('videogames').select('*').where({name: req.params.videogame}).first();
    
    if (result === undefined){
        res.status(404).json({
            status: 'not-found',
            message: 'Videogame not found'
        });
        return;
    }

    res.status(200).json(result);
});

//Mostrar videojuego por id en la URL
app.get('/videogames/:videogameId', async(req, res) => {
    const videogame = await db('videogames').select('*').where({ id: req.params.videogameId }).first();
    res.status(200).json(videogame); // ---> Se da el OK de la conexión a la BBDD
});

//Añadir un nuevo videojuego
app.post('/videogames', async (req, res) => {

    if (req.body.name === undefined || req.body.name === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'Name of videogame is obligatory'
        });
        return;
    }

    if (req.body.type === undefined || req.body.type === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'Type is necessary'
        });
        return;
    }

     if (req.body.year <= 0) {
        res.status(400).json({
            status: 'bad-request',
            message: 'Year is necessary'
        });
        return;
    }


   const id = await db('videogames').insert({
        name: req.body.name,
        type:  req.body.type, // ---> todo esto mete los datos en la BBDD
        year:  req.body.year
    });

    const newVideogame = await db('videogames').where({ id }).first();

    res.status(201).json(newVideogame);  // ---> Aquí damos el OK al registrar el nuevo juego. No devuelve nada
});



 //modificar un videojuego existente por ID
 app.put('/videogames/:videogameId', async (req, res) => {
    const updated = await db('videogames').update({
        name: req.body.name,
        type: req.body.type,
        year: req.body.year
    }).where({id: req.params.videogameId});
    if (updated) {
        const updatedGame = await db('videogames').where({ id }).first();
        res.status(200).json(updatedGame);
    } else {
        res.status(404).json({ error: 'Videogame not found' });
    }
});



//borrar videojuego que existe
app.delete('/videogames/:videogameId', async(req, res) => {
    const deleted = await db('videogames').del().where({ id: req.params.videogameId });
    if (deleted) {
            res.status(200).json({ message: 'Videogame deleted' });
        } else {
            res.status(404).json({ error: 'Videogame not found' });
        }
});



//-----------------------------------------------------------------------------//



//Mostrar todos los usuarios disponibles
app.get('/users', async(req, res) => {
    const users = await dbUser('users').select('*');
    res.status(200).json(users);
});


//TODO Mostrar usuario por ID En URL
app.get('/users/:userId', async(req, res) => {
    const user = await dbUser('users').select('*').where({ id: req.params.userId }).first();
    res.status(200).json(user); // ---> Se da el OK de la conexión a la BBDD
});

//Añadir un nuevo usuario
app.post('/users', async (req, res) => {
    await dbUser('users').insert({
        name: req.body.name,    
        password: req.body.password
    });

    res.status(201).json({}); // ---> Aquí damos el OK al registrar el nuevo juego. No devuelve nada
});

//Modificar un user existente por ID
app.put('/users/:userId', async (req, res) => {
    await dbUser('users').update({
        name: req.body.name,
        password: req.body.password
    }).where({id: req.params.userId});

    res.status(204).json({});
});

app.delete('/users/:userId', async(req,res) =>{
    await dbUser('users').del().where({ id: req.params.userId });

    res.status(204).json({});
});


app.listen(8080, () => {
    console.log("El backend ha iniciado correctamente en el puerto 8080");
});

module.exports = { app };