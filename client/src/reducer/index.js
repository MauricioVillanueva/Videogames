
const initialState = {
    videogames : [],
    allVideogames: [],
    genres:[],
    platforms:[],
    detail:[]
}

function rootReducer (state = initialState, action){
    switch(action.type){
        case 'GET_VIDEOGAMES':
            return{
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            }
        case 'GET_GENRES':
            return{
                ...state,
                genres: action.payload
            }
        case 'GET_ALL_PLATFORMS':
            return {
                ...state,
                platforms: action.payload
            };
        case 'GET_NAME_VIDEOGAMES':
            return{
                ...state,
                videogames: action.payload
            }
        case 'GET_DETAILS':
            return {
                ...state,
                detail: action.payload
            }
        case 'POST_VIDEOGAME':
            return{
                ...state,
            }
        case 'CLEAR_DETAIL':
            return {
                ...state,
                detail: []
            };
        case 'FILTER_BY_GENRES':
            const filterGenresVideogames = state.allVideogames;
            const genreFilter = action.payload === 'All' ? state.allVideogames : filterGenresVideogames.filter(videogame => videogame.genres.includes(action.payload));
            return{
                ...state,
                videogames: genreFilter
            };
        case 'FILTER_CREATED':
            const allVideogamesByCreated = state.allVideogames
            const createdFilter = action.payload === 'database' ? allVideogamesByCreated.filter(el => el.createdInDb) : allVideogamesByCreated.filter(el => !el.createdInDb);
            return{
                ...state,
                videogames:action.payload === 'All' ? state.allVideogames : createdFilter,
            }
        case 'ORDER_BY_NAME':
            let sortedArr = action.payload === 'asc' ?
                state.videogames.sort(function(a, b){
                    if(a.name > b.name){
                        return 1;
                    }
                    if(b.name > a.name){
                        return -1;
                    }
                    return 0;
                }) :
                state.videogames.sort(function(a, b){
                    if(a.name > b.name){
                        return -1;
                    }
                    if(b.name > a.name){
                        return 1;
                    }
                    return 0;
                })
        return {
            ...state,
            videogames: sortedArr
        }
        case 'ORDER_BY_RATING':
            const orderRatingVideogames = state.allVideogames.sort((gameA, gameB) => {
                if (action.payload === "up") {
                return gameB.rating - gameA.rating;
                }
                return gameA.rating - gameB.rating;
            });
            return {
                ...state,
                videogamesAux: orderRatingVideogames,
            };
        default:
            return state;
    }
};

export default rootReducer;