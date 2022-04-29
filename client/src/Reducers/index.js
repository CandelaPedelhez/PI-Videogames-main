const initialState = {
    allVideogames: [],
    videogames: [],
    genres: [],
    details: [],
    platforms: [],
    searchByName: [],
    filteredByGenre: [],
    filteredByDb: [],
    twoFilters: [],
}

let filtroByGenre = false;
let filtroByDbApi = false;
let doubleFilters = false;

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_ALL_VIDEOGAMES":
            filtroByDbApi = false
            filtroByGenre = false
            doubleFilters = false
            return {
                ...state,
                videogames: action.payload, /* este para ir poniendole los filtros */
                allVideogames: action.payload, /* FUNCIONA */
                details: []
            }
        case "GET_VIDEOGAMES_BY_NAME":
            return {
                ...state,
                videogames: action.payload, /* FUNCIONA */
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
                details: action.payload,
                videogames: []
            }
        case "FILTER_BY_GENRE": /* FUNCIONA */
            const videogames = state.videogames
            const genrefiltered = []
            filtroByGenre = true
            if (filtroByDbApi === true) {
                const filteredByDb = state.filteredByDb
                filteredByDb.forEach(e => {
                    if (e.genres.includes(action.payload)) {
                        genrefiltered.push(e)
                    }
                });
                if (genrefiltered.length > 0) {
                    doubleFilters = true
                    return {
                        ...state,
                        twoFilters: genrefiltered,
                        videogames: genrefiltered
                    }
                } else {
                    return {
                        ...state,
                        videogames: filteredByDb
                    }
                };
            } else {
                videogames.forEach(e => {
                    if (e.genres.includes(action.payload)) {
                        genrefiltered.push(e)
                    }
                });
                if (genrefiltered.length > 0) {
                    return {
                        ...state,
                        filteredByGenre: genrefiltered,
                        videogames: genrefiltered
                    }
                } else {
                    return {
                        ...state,
                        videogames
                    }
                };
            }

        case "FILTER_BY_DB_OR_API":
            filtroByDbApi = true
            if (filtroByGenre === true) {
                const filteredByGenre = state.filteredByGenre
                if (action.payload === "") {
                    return {
                        ...state,
                        videogames: filteredByGenre
                    }
                } else {
                    const allFiltered = state.filteredByGenre
                    const videogamesfiltered = action.payload === "created" ? allFiltered.filter(e => e.createdInDb) : allFiltered.filter(e => !e.createdInDb)
                    doubleFilters = true
                    return {
                        ...state,
                        twoFilters: videogamesfiltered,
                        videogames: videogamesfiltered
                    }
                }
            } else {
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
                        filteredByDb: videogamesfiltered,
                        videogames: videogamesfiltered
                    }
                }
            }

        case "ORDER_BY_NAME": /* FUNCIONA */
            if (filtroByDbApi === true && doubleFilters === false) {
                const filteredByDb = state.filteredByDb
                if (action.payload === "") {
                    return {
                        ...state,
                        videogames: filteredByDb
                    }
                } else {
                    const sortVideogameByName = action.payload === "asc" ?
                        state.filteredByDb.sort(function (a, b) {
                            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                                return 1
                            }
                            if (b.name.toLowerCase() > a.name.toLowerCase()) {
                                return -1
                            }
                            return 0
                        }) : state.filteredByDb.sort(function (a, b) {
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
                        filteredByDb: sortVideogameByName,
                        videogames: filteredByDb
                    }
                }
            }
            if (filtroByGenre === true && doubleFilters === false) {
                const filteredByGenre = state.filteredByGenre
                if (action.payload === "") {
                    return {
                        ...state,
                        videogames: filteredByGenre
                    }
                } else {
                    const sortVideogameByName = action.payload === "asc" ?
                        state.filteredByGenre.sort(function (a, b) {
                            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                                return 1
                            }
                            if (b.name.toLowerCase() > a.name.toLowerCase()) {
                                return -1
                            }
                            return 0
                        }) : state.filteredByGenre.sort(function (a, b) {
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
                        filteredByGenre: sortVideogameByName,
                        videogames: filteredByGenre
                    }
                }
            }
            if (doubleFilters === true) {
                const twoFilters = state.twoFilters
                if (action.payload === "") {
                    return {
                        ...state,
                        videogames: twoFilters
                    }
                } else {
                    const sortVideogameByName = action.payload === "asc" ?
                        state.twoFilters.sort(function (a, b) {
                            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                                return 1
                            }
                            if (b.name.toLowerCase() > a.name.toLowerCase()) {
                                return -1
                            }
                            return 0
                        }) : state.twoFilters.sort(function (a, b) {
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
                        twoFilters: sortVideogameByName,
                        videogames: twoFilters,
                    }
                }
            }
            else {
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
            }
        case "ORDER_BY_RATING":
            if (filtroByDbApi === true && doubleFilters === false) {
                const filteredByDb = state.filteredByDb
                if (action.payload === "") {
                    return {
                        ...state,
                        videogames: filteredByDb
                    }
                } else {
                    const sortByRating = action.payload === "higher rating" ?
                        state.filteredByDb.sort(function (a, b) {
                            if (a.rating < b.rating) {
                                return 1
                            }
                            if (b.rating < a.rating) {
                                return -1
                            }
                            return 0
                        }) : state.filteredByDb.sort(function (a, b) {
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
                        filteredByDb: sortByRating,
                        videogames: filteredByDb
                    }
                }
            }
            if (filtroByGenre === true && doubleFilters === false) {
                const filteredByGenre = state.filteredByGenre
                if (action.payload === "") {
                    return {
                        ...state,
                        videogames: filteredByGenre
                    }
                } else {
                    const sortByRating = action.payload === "higher rating" ?
                        state.filteredByGenre.sort(function (a, b) {
                            if (a.rating < b.rating) {
                                return 1
                            }
                            if (b.rating < a.rating) {
                                return -1
                            }
                            return 0
                        }) : state.filteredByGenre.sort(function (a, b) {
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
                        filteredByGenre: sortByRating,
                        videogames: filteredByGenre
                    }
                }
            }
            if (doubleFilters === true) {
                const twoFilters = state.twoFilters
                if (action.payload === "") {
                    return {
                        ...state,
                        videogames: twoFilters
                    }
                } else {
                    const sortByRating = action.payload === "higher rating" ?
                        state.twoFilters.sort(function (a, b) {
                            if (a.rating < b.rating) {
                                return 1
                            }
                            if (b.rating < a.rating) {
                                return -1
                            }
                            return 0
                        }) : state.twoFilters.sort(function (a, b) {
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
                        twoFilters: sortByRating,
                        videogames: twoFilters
                    }
                }
            } else {
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
            }

        default:
            return state
    }
}
export default rootReducer