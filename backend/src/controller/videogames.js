const { findVideogames, findVideogameByName, registerVideogame, findVideogameById, modifyVideogame, removeVideogame } = require("../service/videogames");

const getVideogames = async (req, res) => {
   const videogames = await findVideogames();
   res.status(200).json(videogames);
};

const getVideogameByName = async (req, res) => {
    const videogame = await findVideogameByName(req.params.videogame);

    if (videogame === undefined){
        res.status(404).json({
            status: 'not-found',
            message: 'Videogame not found'
        });
        return;
    }

    res.status(200).json(videogame);
};

 const postVideogame = async (req, res) => {
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

     if (req.body.year <= 0 || req.body.year === '') {
        res.status(400).json({
            status: 'bad-request',
            message: 'Year is necessary'
        });
        return;
    }
  const newVideogame = await registerVideogame(req.body.name, req.body.type, req.body.year);
    res.status(201).json(newVideogame);
};

const putVideogame = async (req, res) => {
    const updated = await modifyVideogame(
        req.params.videogameId, // <-- PASA EL ID AQUÍ
        req.body.name,
        req.body.type,
        req.body.year
    );
    if (updated) {
        // Busca el videojuego actualizado por id
        const updatedGame = await findVideogameById(req.params.videogameId);
        res.status(200).json(updatedGame);
    } else {
        res.status(404).json({ error: 'Videogame not found' });
    }
};

const deleteVideogame = async (req, res) => {
    const deleted = await removeVideogame(req.params.videogameId);
   if (deleted) {
            res.status(200).json({ message: 'Videogame deleted' });
        } else {
            res.status(404).json({ error: 'Videogame not found' });
        }
};

module.exports = {
    getVideogames,
    getVideogameByName,
    postVideogame,
    putVideogame,
    deleteVideogame
};