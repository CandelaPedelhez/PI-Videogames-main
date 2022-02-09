const { Router } = require('express');
const axios = require('axios');
require("dotenv").config();
const { Videogame, Genres } = require('../db');
const { API_KEY } = process.env;



const getApi100Videogames = async () => {
    const apiURL1 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=40`)
    const apiURL2 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2&page_size=40`)
    const apiURL3 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3&page_size=20`)
    const apiURLS = apiURL1.data.results.concat(apiURL2.data.results, apiURL3.data.results)
    const apiInfo = apiURLS.map(e => {
        return {
            id: e.id,
            name: e.name,
            released: e.released,
            rating: e.rating,
            image: e.background_image,
            platforms: e.platforms.map(e => e.platform.name),
            genres: e.genres.map(e => e.name)
        }
    })
    /* console.log(apiInfo)  ME TRAE BIEN ACÁ */
    return apiInfo; /* para mostrar en el paginado */
}

const getApiVideogamesbyName = async (name) => {
    const apiURL = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
    const apiInfo = apiURL.data.results.map(e => {
        return {
            id: e.id,
            name: e.name,
            released: e.released,
            rating: e.rating,
            image: e.background_image,
            platforms: e.platforms.map(e => e.platform.name),
            genres: e.genres.map(e => e.name)
        }
    })
    return apiInfo; /* para buscar por nombre TODAS */
}

const getDbVideogames = async () => {
    return await Videogame.findAll({
        include: {
            model: Genres,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    })
}

const getAllVideogames = async () => {
    const apiInfo = await getApi100Videogames();
    const dbInfo = await getDbVideogames();
    const infoTotal = apiInfo.concat(dbInfo);
    /* console.log(infoTotal) ME TRAE BIEN ACÁ */
    return infoTotal /* Para mostrar en el paginado */
}

const searchByIdApi = async (id) => {
    const videogame = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    const infoId = {
        name: videogame.data.name,
        released: videogame.data.released,
        rating: videogame.data.rating,
        image: videogame.data.background_image,
        description: videogame.data.description_raw,
        platforms: videogame.data.platforms.map(e => e.platform.name),
        genres: videogame.data.genres.map(e => e.name)
    }
    return infoId;
}

const searchByIdAtDB = async (id) => {
    const videogame = await Videogame.findByPk(id, {
        include: {
            model: Genres,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    })
    return videogame
}

module.exports = { getAllVideogames, searchByIdApi, searchByIdAtDB, getApiVideogamesbyName, getDbVideogames }