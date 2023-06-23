import React from 'react';
import {Link} from 'react-router-dom';
import style from './LandingPage.module.css'

export default function LandingPage(){
    return (
        <div className={style.container}>
        <div className={style.textContainer}>
            <div className={style.neonText}>Gamers </div>
            <div className={style.fluxText}>Club </div>
        </div>
            <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/02f51f108662087.5fc2c9c080fe3.gif" alt='Gaming House' className={style.roomImg}/>
            <Link to='/home' className={style.buttonContainer}>
                <button className={style.button}>Get Started</button>       
            </Link>
        </div>
    )
}