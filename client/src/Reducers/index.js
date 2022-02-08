const initialState = {
    allVideogames : [],
    videogames: [],

}

function rootReducer(state = initialState, action) {
    switch(action.type){
        case "GET_ALL_VIDEOGAMES":
            return{
                ...state,
                videogames: action.payload, /* este para ir poniendole los filtros */
                allVideogames: action.payload,
            }
        case "GET_VIDEOGAMES_BY_NAME":
            return{
                ...state,
                videogames: action.payload
            }
        default:
            return state
    }
}
export default rootReducer