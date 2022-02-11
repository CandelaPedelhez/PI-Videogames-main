import React from 'react';
import styles from "../Styles/Paginado.module.css"

export default function Paginado({videogamesPerPage, videogames, paginado, handlePrevNext}){
    const pageNumbers = []

    for( let i=1; i<=Math.ceil(videogames/videogamesPerPage); i++){
        pageNumbers.push(i);
    }

    return(
        <nav className={styles.paginado}>
            <button name= "prev" onClick={e => handlePrevNext(e)}>{'<'}</button>
            <ul>
                {
                    pageNumbers && pageNumbers.map(number => {
                        return(
                            <li key={number}>
                                <button onClick={() => paginado(number)} key={number} className='button'>{number}</button>
                            </li>
                        )
                    })
                }
            </ul>
            <button name= "next" onClick={e => handlePrevNext(e)}>{'>'}</button>
        </nav>
    )
}
