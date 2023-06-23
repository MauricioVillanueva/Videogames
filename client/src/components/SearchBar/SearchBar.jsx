import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameVideogames } from '../../actions';
import style from './SearchBar.module.css'


export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    

    function handleInputChange(event){
        event.preventDefault();
        setName(event.target.value);
        console.log(name);
    }

    function handleSubmit(event){
        event.preventDefault();
        dispatch(getNameVideogames(name))
        setName('');
    }

    return(
        <div className={style.divSearchBar}>
            <input
                type='text'
                placeholder='Search games...'
                onChange={(event) => handleInputChange(event)}
                className={style.inputCss}
            />
            <button type='submit' onClick={(event) => handleSubmit(event)} className={style.searchButton}>Search</button>
        </div>
    )
}