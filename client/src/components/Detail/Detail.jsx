import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../actions/index';
import { useEffect } from 'react';
import style from './Detail.module.css'

export function Detail(props){
    console.log(props);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id))
        return () => {
            dispatch({ type: 'CLEAR_DETAIL' }); 
        }
    },[dispatch, props.match.params.id])

const myVideogame = useSelector((state) => state.detail)

    return(
        <div>
            {
                myVideogame.length > 0 && typeof myVideogame[0] === 'object' ?
                <div className={style.container}>
                    <div className={style.divButton}>
                        <div className={style.buttonContainer}>
                            <Link to='/home' style={{ textDecoration: 'none' }}>
                                <button className={style.rgbButton}>Go Back</button>
                            </Link>
                        </div>
                    </div>
                    <div className={style.wrapContainer}>
                        <div className={style.wrapContent}>
                            <div className={style.cardContainer}>
                                <img src={myVideogame[0].background_image} alt={myVideogame[0].name} className={style.imageCard}/>
                                <div className={style.fotterContainer}>
                                    <h1 className={style.nameCard}>{myVideogame[0].name}</h1>
                                </div>
                            </div>
                            <div className={style.dataCss}>
                                <div className={style.idContainer}>
                                    <div className={style.idDiv}>
                                        <h3 className={style.idNumber}>{myVideogame[0].id}</h3>
                                    </div>
                                </div>
                                <div className={style.dateRatingContainer}>
                                    <div className={style.dateDiv}>
                                        <h4 className={style.titleCss}>Released date:</h4>
                                        <h3 className={style.detailCss}>{myVideogame[0].released}</h3>
                                    </div>
                                    <div className={style.ratingDiv}>
                                        <h4 className={style.titleCss}>Rating:</h4>
                                        <h3 className={style.detailCss}>{myVideogame[0].rating}</h3>
                                    </div>
                                </div>
                                <div className={style.platformCss}>
                                    <h4 className={style.titleCss}>Platforms</h4>
                                    <div className={style.platformsContainer}>{myVideogame[0].platforms.map((plat)=>{
                                        return (
                                            <h3 className={style.detailCss}>{plat}</h3>
                                        )
                                    })}</div>
                                </div>
                                <div className={style.genresCss}>
                                    <h4 className={style.titleCss}>Genres</h4>
                                    <div className={style.genreDiv}>
                                        {myVideogame[0].genres.map((genre) => {
                                            return (
                                                    <h5 className={style.detailCss}>{genre}</h5>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div> 
                        <div className={style.wrapDescription}>
                            <h4 className={style.desTitle}>About the game:</h4>
                            <h4 className={style.detailDes}>{myVideogame[0].description}</h4>
                        </div>
                    </div> 
                </div>
                : <p className={style.whiteColor}>Loading...</p>
            }
        </div>
    )
}