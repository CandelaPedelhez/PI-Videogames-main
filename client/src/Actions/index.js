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