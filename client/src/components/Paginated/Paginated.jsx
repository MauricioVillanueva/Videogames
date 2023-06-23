import React from 'react';
import style from './Paginated.module.css'

export default function Paginated({videogamesPerPage, allVideogames, paginado}){
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allVideogames/videogamesPerPage); i++){
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className={style.paginatedContainer}>
                {pageNumbers?.map(number => (
                    <li className={style.numberButton} key={number} onClick={() => paginado(number)}>
                        {number}
                    </li>
                ))}
            </ul>
        </nav>
    )
}