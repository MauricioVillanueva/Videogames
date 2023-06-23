import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {filterCreated, filterByGenres, getVideogames, getGenres, orderByName, orderByRating } from '../../actions';
import {Link} from 'react-router-dom';
import Card from '../Card/Card'
import Paginated from '../Paginated/Paginated';
import SearchBar from '../SearchBar/SearchBar';
import style from './Home.module.css';



export default function Home (){

const dispatch = useDispatch();
const allVideogames = useSelector((state) => state.videogames);
const allGenres = useSelector((state) => state.genres);
const [order, setOrder] = useState('');
const [currentPage, setCurrentPage] = useState(1);
const [orderRating, setOrderRating] = useState("");
const [videogamesPerPage, setVideogamesPerPage] = useState(15);
const indexOfLastVideogame = currentPage * videogamesPerPage;
const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame);

//!  Example Games

// const [games, setGames] = useState([
//     {
//         id: 3498,
//         name: "Grand Theft Auto V",
//         background_image: "https://img.redbull.com/images/c_fill,w_1200,h_600,g_auto,f_auto,q_auto/redbullcom/2015/02/15/1331705372408_2/dota-2",
//         genres: ["MOBA", "MORPG", "Action"]
//     },
//     {
//         id: 2,
//         name: "Valorant",
//         background_image: "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2020/03/30/15855893593327.jpg",
//         genres: ["Genre 3", "Genre 4"]
//     },
//     {
//         id: 3,
//         name: "Pokemon Unite",
//         background_image: "https://unite.pokemon.com/images/share-fb.jpg",
//         genres: ["Genre 3", "Genre 4"]
//     },
//     {
//         id: 4,
//         name: "Pokemon Unite",
//         background_image: "https://unite.pokemon.com/images/share-fb.jpg",
//         genres: ["Genre 3", "Genre 4"]
//     },
//     {
//         id: 5,
//         name: "Dota 2",
//         background_image: "https://img.redbull.com/images/c_fill,w_1200,h_600,g_auto,f_auto,q_auto/redbullcom/2015/02/15/1331705372408_2/dota-2",
//         genres: ["Genre 1", "Genre 2"]
//       },
//       {
//         id: 6,
//         name: "Valorant",
//         background_image: "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2020/03/30/15855893593327.jpg",
//         genres: ["Genre 3", "Genre 4"]
//       },
//       {
//         id: 7,
//         name: "Pokemon Unite",
//         background_image: "https://unite.pokemon.com/images/share-fb.jpg",
//         genres: ["Genre 3", "Genre 4"]
//       },
//       {
//         id: 8,
//         name: "Pokemon Unite",
//         background_image: "https://unite.pokemon.com/images/share-fb.jpg",
//         genres: ["Genre 3", "Genre 4"]
//       },
//       {
//         id: 9,
//         name: "Dota 2",
//         background_image: "https://img.redbull.com/images/c_fill,w_1200,h_600,g_auto,f_auto,q_auto/redbullcom/2015/02/15/1331705372408_2/dota-2",
//         genres: ["Genre 1", "Genre 2"]
//       },
//       {
//         id: 10,
//         name: "Valorant",
//         background_image: "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2020/03/30/15855893593327.jpg",
//         genres: ["Genre 3", "Genre 4"]
//       },
//       {
//           id: 11,
//           name: "Pokemon Unite",
//           background_image: "https://unite.pokemon.com/images/share-fb.jpg",
//           genres: ["Genre 3", "Genre 4"]
//       },
//       {
//           id: 12,
//           name: "Pokemon Unite",
//           background_image: "https://unite.pokemon.com/images/share-fb.jpg",
//           genres: ["Genre 3", "Genre 4"]
//       },
//       {
//         id: 13,
//         name: "Dota 2",
//         background_image: "https://img.redbull.com/images/c_fill,w_1200,h_600,g_auto,f_auto,q_auto/redbullcom/2015/02/15/1331705372408_2/dota-2",
//         genres: ["Genre 1", "Genre 2"]
//       },
//       {
//         id: 14,
//         name: "Valorant",
//         background_image: "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2020/03/30/15855893593327.jpg",
//         genres: ["Genre 3", "Genre 4"]
//       },
//       {
//           id: 15,
//           name: "Pokemon Unite",
//           background_image: "https://unite.pokemon.com/images/share-fb.jpg",
//           genres: ["Genre 3", "Genre 4"]
//       },
//       {
//           id: 16,
//           name: "Pokemon Unite",
//           background_image: "https://unite.pokemon.com/images/share-fb.jpg",
//           genres: ["Genre 3", "Genre 4"]
//       },
      
//   ]);
//   const currentVideogamesAux = games.slice(indexOfFirstVideogame, indexOfLastVideogame);



const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
}

useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
},[dispatch]);


function handleClick(event){
    event.preventDefault();
    dispatch(getVideogames());
}

function handleFilterGenre(event){
    dispatch(filterByGenres(event.target.value))
}

function handleFilterCreated(event){
    dispatch(filterCreated(event.target.value))
}

function handleSort(event){
    event.preventDefault();
    dispatch(orderByName(event.target.value))
    setCurrentPage(1);
    setOrder(`Sorted ${event.target.value}`)
}
const handleOrderRating = (value) => {
    setOrderRating(value);
    dispatch(orderByRating(value));
  };

    return(
        <div className={style.container}>
            <div className={style.divButton}>
                <div className={style.buttonContainer}>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <button className={style.rgbButton}>Go Back</button>
                    </Link>
                </div>
                <div className={style.buttonContainer}>
                    <Link to='/videogames' style={{ textDecoration: 'none' }}>
                        <button className={style.rgbButton}>Create Videogame</button>
                    </Link>
                </div>
            </div>
            <div className={style.wrapContainer}>
                <div className={style.wrapFilters}>
                    <div className={style.filtersDiv}>
                        <SearchBar/>
                        <div>
                        <h2 className={style.titleCss}>Sort</h2>
                        <h4 className={style.titleInfo}>By name:</h4>
                            <select onChange={event => {handleSort(event)}} className={style.selectCss}>
                                <option hidden value="visualize">Name Order</option>
                                <option value='asc'>A - Z</option>
                                <option value='desc'>Z - A</option>
                            </select>
                        </div>
                        <div>
                            <h4 className={style.titleInfo}>By rating:</h4>
                            <select
                                id="orderRating"
                                name="orderRating"
                                value={orderRating}
                                onChange={(event) => handleOrderRating(event.target.value)}
                                className={style.selectCss}
                                >
                                <option hidden value="visualize">Rating Order</option>
                                <option value="up" id="up" name="orderRating">
                                    Higher Rating
                                </option>
                                <option value="down" id="down" name="orderRating">
                                    Lower Rating
                                </option>
                            </select>
                        </div>
                        <div>
                            <h2 className={style.titleCss}>Filter</h2>
                            <h4 className={style.titleInfo}>By genre:</h4>
                            <select onChange={event => {handleFilterGenre(event)}} className={style.selectCss}>
                            <option hidden value="visualize">Genres</option>
                                <option value='All'>All Genres</option>
                            {allGenres?.map((el) => {
                                    return(
                                    <option value={el.name}>{el.name}</option>
                                    )
                                })
                            }
                            </select>
                        </div>
                        <div>
                            <h4 className={style.titleInfo}>By source:</h4>       
                            <select onChange={event => {handleFilterCreated(event)}} className={style.selectCss}>
                                <option hidden value="visualize">Sources</option>
                                <option value='All'>Todos</option>
                                <option value='api'>API</option>
                                <option value='database'>DataBase</option>
                            </select>
                        </div>
                        <div className={style.centerButton}>
                            <button onClick={event => {handleClick(event)}} className={style.allButton}>
                                All Videogames
                            </button>
                        </div>
                    </div>   
                </div>
                <div className={style.wrapCards}>
                        <Paginated
                            videogamesPerPage={videogamesPerPage}
                            allVideogames={allVideogames.length}
                            paginado={paginado}
                        />
                        <div className={style.gridContainer}>
                            <div className={style.gamesContainer}>
                            {currentVideogames?.map((el) => {
                                    return (
                                        <div>
                                        <Link to={'/home/' + el.id}>
                                            <Card name={el.name} background_image={el.background_image} genres={el.genres}/>
                                        </Link>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}