import React from 'react';
import style from './Card.module.css'

export default function Card({ name, background_image, genres }) {
    return (
        <div className={style.cardContainer}>
            <img src={background_image} alt='img not found' className={style.imageCard}/>
            <div className={style.fotterContainer}>
                <h3 className={style.nameCard}>{name}</h3>
                <div className={style.genreDiv}>
                    {genres.map((genre)=>{
                        return(
                            <h5 className={style.genreCard}>{genre}</h5>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}