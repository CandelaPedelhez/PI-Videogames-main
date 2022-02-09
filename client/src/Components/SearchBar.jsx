import React from "react";
import { useState } from "react";
import {useDispatch} from "react-redux";
import { getVideogamesByName } from "../Actions";
import styles from "../Styles/SearchBar.module.css"

export default function SearchBar(){
    const dispatch = useDispatch()
    const [videogame, setVideogame] = useState("")

    function handleInputChange(e){
        e.preventDefault()
        setVideogame(e.target.value) /* el e.target.value es lo que hay en el input */
    }
    function handleSubtmit(e){
        e.preventDefault()
        dispatch(getVideogamesByName(videogame))
    }

    return(
        <div className={styles.div}>
            <input className={styles.input} type= "text" placeholder="Search..." onChange={(e) => handleInputChange(e)}/>
            <button className={styles.button} type="submit" onClick={(e) => handleSubtmit(e)}>Search</button>
        </div>
    )
}