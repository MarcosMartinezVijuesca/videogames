const express = require('express');
const { getVideogames, getVideogameByName, postVideogame, putVideogame, deleteVideogame } = require('../controller/videogames');
const router = express.Router();

router.get('/videogames', getVideogames);
router.get('/videogames/:videogame', getVideogameByName);
router.post('/videogames', postVideogame);
router.put('/videogames/:videogameId', putVideogame);
router.delete('/videogames/:videogameId', deleteVideogame);

module.exports = router;