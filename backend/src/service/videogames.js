const knex = require('knex');

const db = knex ({
    client: 'sqlite3',
    connection: {
        filename: 'videogames.db'                    
    },
    useNullAsDefault: true
});


const findVideogames = (async () => {
    const videogames = await db('videogames').select('*');

    return videogames;
});

const findVideogameByName = (async (name) => {
  const result = await db('videogames').select('*').where({name: name}).first();

  return result;
});

const findVideogameById = (async (id) => {
   const videogame = await db('videogames').select('*').where({ id }).first();
   return videogame;
});

const registerVideogame = (async (name, type, year) => { 
   const [id] = await db('videogames').insert({ name, type, year });
    return await db('videogames').where({ id }).first();
});

const modifyVideogame = async (id, name, type, year) => {
    const updated = await db('videogames').where({ id }).update({ name, type, year });
    return updated;
};

const removeVideogame = async (id) => {
    const deleted = await db('videogames').where({ id }).del();
    return deleted;
};


module.exports = {
    findVideogames,
    findVideogameByName,
    findVideogameById,
    registerVideogame,
    modifyVideogame,
    removeVideogame
};