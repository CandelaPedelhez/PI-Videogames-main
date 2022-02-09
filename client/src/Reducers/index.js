const initialState = {
    allVideogames: [],
    videogames: [],
    genres: [],
    details: [],
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_ALL_VIDEOGAMES":
            return {
                ...state,
                videogames: action.payload, /* este para ir poniendole los filtros */
                allVideogames: action.payload,
                details: []
            }
        case "GET_VIDEOGAMES_BY_NAME":
            return {
                ...state,
                videogames: action.payload
            }
        case "GET_GENRES":
            return {
                ...state,
                genres: action.payload
            }
        case "POST VIDEOGAME":
            return {
                ...state
            }
        case "GET_DETAILS":
            return {
                ...state,
                details: action.payload
            }
        case "FILTER_BY_GENRE":
            const videogames = state.videogames
            const genrefiltered = []
            videogames.forEach(e => {
                if (e.genres.includes(action.payload)) {
                    genrefiltered.push(e)
                }
            });
            if (genrefiltered.length > 0) {
                return {
                    ...state,
                    videogames: genrefiltered,
                }
            } break;

        case "FILTER_BY_DB_OR_API":
            const allVideogames = state.allVideogames
            if (action.payload === "created") {
                let created = []
                videogames.forEach(e => {
                    if (videogames.hasOwnProperty("createdInDb")) {
                        created.push(e)
                        return {
                            ...state,
                            videogames: created
                        }
                    }
                })
            }
            if (action.payload === "existant") {
                let existant = []
                videogames.forEach(e => {
                    if (!videogames.hasOwnProperty("createdInDb")) {
                        existant.push(e)
                        return {
                            ...state,
                            videogames: existant
                        }
                    }
                })
            }
            else {
                return {
                    ...state,
                    allVideogames
                }
            } break;
            
        case "ORDER_BY_NAME":
            if (action.payload === "asc") {
                state.videogames.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1
                    }
                    return 0
                })
                return{
                    ...state,
                    videogames
                }
            }
            if (action.payload === "desc") {
                state.videogames.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1
                    }
                    return 0
                })
                return{
                    ...state,
                    videogames
                }
            }
            else{
                return{
                    ...state,
                    allVideogames
                }
            }
        case "ORDER_BY_RATING":
            if(action.payload === "higher rating"){
                state.videogames.sort(function (a, b) {
                    if (a.rating < b.rating) {
                        return 1
                    }
                    if (b.rating < a.rating) {
                        return -1
                    }
                    return 0
                })
                return{
                    ...state,
                    videogames
                }
            }
            if(action.payload === "lower rating"){
                state.videogames.sort(function (a, b) {
                    if (a.rating < b.rating) {
                        return -1
                    }
                    if (b.rating < a.rating) {
                        return 1
                    }
                    return 0
                })
                return{
                    ...state,
                    videogames
                }
            }
            else{
                return{
                    ...state,
                    allVideogames
                }
            }
        default:
            return state
    }
}
export default rootReducer