const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
require("dotenv").config();
const { API_KEY } = process.env;
const { getAllVideogames, searchByIdApi, searchByIdAtDB , getApiVideogamesbyName, getDbVideogames } = require('./controllers');
const { Videogame, Genres } = require('../db');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/videogames", async (req, res) => {
    let name = req.query.name;
    try{
        const videogamesByNameApi = await getApiVideogamesbyName();
        const allDbVideogames = await getDbVideogames();
        const paginadoVideogames = await getAllVideogames()
        if(name){
            name = name.toLowerCase()
            const videogamesByNameDb = allDbVideogames.filter(e => e.name.toLowerCase().includes(name))
            const allVideogamesbyName = videogamesByNameDb.concat(videogamesByNameApi)
            allVideogamesbyName ?
            res.status(200).send(allVideogamesbyName)
            : res.status(400).send("we couldn't find the videogame that you are looking for")
        }
        else {
            res.status(200).send(paginadoVideogames);
        }
    } catch (err) {
        console.log(err);
    }
})

router.get('/videogame/:id', async (req, res) => {
    const id = req.params.id
    const idString = id.toString()
    if (idString.length < 7) {
        const detailApibyId = await searchByIdApi(id)
        if (detailApibyId) return res.status(200).send(detailApibyId)
    }
    else {
        const detailDbbyId = await searchByIdAtDB(id)
        if (detailDbbyId) return res.status(200).send(detailDbbyId)
        else {
            return res.status(404).send("The videogame doesn't exist")
        }
    }
}),

router.get("/genres", async (req, res) => {
    const getGenresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    const genresApi = getGenresApi.data.results.map(e => e.name)
    genresApi.forEach(e => {
        Genres.findOrCreate({
            where: { name: e }
        })
    })
    const allGenres = await Genres.findAll();
    res.send(allGenres);
})

router.post("/videogame", async (req, res) => {
    let { name, description, released, rating, platforms, image, createdInDb, genres } = req.body;
    let videogameCreated = await Videogame.create({ name, description, released, rating, platforms, image, createdInDb });
    let genresDb = await Genres.findAll({
        where: { name: genres }
    })
    videogameCreated.addGenres(genresDb)
    res.send('Your videogame was successfully created')
})


module.exports = router;