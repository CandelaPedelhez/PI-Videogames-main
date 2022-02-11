const initialState = {
    allVideogames: [],
    videogames: [],
    genres: [],
    details: [],
    platforms: [],
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_ALL_VIDEOGAMES":
            return {
                ...state,
                videogames: action.payload, /* este para ir poniendole los filtros */
                allVideogames: action.payload, /* FUNCIONA */
            }
        case "GET_VIDEOGAMES_BY_NAME":
            return {
                ...state,
                videogames: action.payload /* FUNCIONA */
            }
        case "GET_GENRES":
            return {
                ...state, /* FUNCIONA */
                genres: action.payload
            }
        case "POST_VIDEOGAME":
            return {
                ...state /* FUNCIONA */
            }
        case "GET_DETAILS":
            return {
                ...state, /* FUNCIONA */
                details: action.payload
            }
        case "FILTER_BY_GENRE": /* FUNCIONA */
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
            if (action.payload === "") {
                return {
                    ...state,
                    videogames
                }
            } else {
                const allVideogames = state.allVideogames
                const videogamesfiltered = action.payload === "created" ? allVideogames.filter(e => e.createdInDb) : allVideogames.filter(e => !e.createdInDb)
                return {
                    ...state,
                    videogames: videogamesfiltered
                }
            }
        case "ORDER_BY_NAME": /* FUNCIONA */
            if (action.payload === "") {
                return {
                    ...state,
                    videogames
                }
            } else {
                const sortVideogameByName = action.payload === "asc" ?
                    state.videogames.sort(function (a, b) {
                        if (a.name.toLowerCase() > b.name.toLowerCase()) {
                            return 1
                        }
                        if (b.name.toLowerCase() > a.name.toLowerCase()) {
                            return -1
                        }
                        return 0
                    }) : state.videogames.sort(function (a, b) {
                        if (a.name.toLowerCase() > b.name.toLowerCase()) {
                            return -1
                        }
                        if (b.name.toLowerCase() > a.name.toLowerCase()) {
                            return 1
                        }
                        return 0
                    })
                return {
                    ...state,
                    videogames: sortVideogameByName
                }
            }
        case "ORDER_BY_RATING":
            if (action.payload === "") {
                return {
                    ...state,
                    videogames
                }
            } else {
                const sortByRating = action.payload === "higher rating" ?
                    state.videogames.sort(function (a, b) {
                        if (a.rating < b.rating) {
                            return 1
                        }
                        if (b.rating < a.rating) {
                            return -1
                        }
                        return 0
                    }) : state.videogames.sort(function (a, b) {
                        if (a.rating < b.rating) {
                            return -1
                        }
                        if (b.rating < a.rating) {
                            return 1
                        }
                        return 0
                    })
                return {
                    ...state,
                    videogames: sortByRating
                }
            }

        default:
            return state
    }
}
export default rootReducer