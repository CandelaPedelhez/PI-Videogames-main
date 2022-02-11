import axios from "axios";

export function getAllVideogames(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/videogames")
        return dispatch({
            type: "GET_ALL_VIDEOGAMES",
            payload: json.data 
        })
    }
}
export function getVideogamesByName(payload){
    return async function(dispatch){
        try{
            var json = await axios.get("http://localhost:3001/videogames?name=" + payload)
            return dispatch({
                type: "GET_VIDEOGAMES_BY_NAME",
                payload: json.data
            })
        } catch(e){
            console.log(e)
        }
    }
}

export function getGenres(payload){
    return async function(dispatch){
        try{
            var json = await axios.get("http://localhost:3001/genres")
            return dispatch({
                type: "GET_GENRES",
                payload: json.data
            })
        } catch(e){
            console.log(e)
        }
    }
}


export function postVideogame(payload){
    return async function(){
        try{
            var json = await axios.post("http://localhost:3001/videogame", payload)
            return {
                type: "POST_VIDEOGAME",
                json
            }
        } catch(e){
            console.log(e)
        }
    }
}

export function getDetails(payload){
    return async function(dispatch){
        try{
            var json = await axios.get("http://localhost:3001/videogame/" + payload)
            return dispatch({
                type: "GET_DETAILS",
                payload: json.data
            })
        } catch(e){
            console.log(e)
        }
    }
}

export function filterByGenre(payload){
    return{
        type: "FILTER_BY_GENRE",
        payload
    }
}

export function filterByDborApi(payload){
    return{
        type: "FILTER_BY_DB_OR_API",
        payload
    }
}

export function orderByName(payload){
    return{
        type: "ORDER_BY_NAME",
        payload
    }
}

export function orderByRating(payload){
    return{
        type: "ORDER_BY_RATING",
        payload
    }
}