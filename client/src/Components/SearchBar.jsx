import React from "react";
import { useState } from "react";
import {useDispatch} from "react-redux";
import { getVideogamesByName } from "../Actions";

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
        <div className="search_intro">
            <input type= "text" placeholder="Search..." onChange={(e) => handleInputChange(e)}/>
            <button className="search_button" type="submit" onClick={(e) => handleSubtmit(e)}>Search</button>
        </div>
    )
}