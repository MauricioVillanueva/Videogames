import axios from 'axios';

export function getVideogames(){
    return async function(dispatch){
        var json = await axios ('http://localhost:3001/videogames');
        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: json.data
        })
    }
}

export function getGenres(){
    return async function(dispatch){
        var json = await axios ('http://localhost:3001/genres');
        return dispatch({
            type:'GET_GENRES',
            payload: json.data
        })
    }
}

export function getAllPlatforms() {
    return async function (dispatch) {
        var json = await axios ('http://localhost:3001/platforms');
        return dispatch({
            type: 'GET_ALL_PLATFORMS',
            payload: json.data
        })
    };
  };

export function getNameVideogames(name){
    return async function(dispatch){
        try {
            var json = await axios (`http://localhost:3001/videogames?name=${name}`);
            return dispatch({
                type: 'GET_NAME_VIDEOGAMES',
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function getDetail(id){
    return async function(dispatch){
        try {
            var json= await axios.get(`http://localhost:3001/videogames/${id}`)
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function postVideogame(payload){
    return async function(){
        console.log(payload);
        const response = await axios.post('http://localhost:3001/videogames', payload);
        return response;
    }
}
export const orderByRating = (order) => {
    return function (dispatch) {
      return dispatch({ type: 'ORDER_BY_RATING', payload: order });
    };
  };

export function filterByGenres  (payload) {
    return ({
     type: 'FILTER_BY_GENRES',
     payload
  });
}

export function filterCreated(payload){
    return{
        type: 'FILTER_CREATED',
        payload
    }
}

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}

