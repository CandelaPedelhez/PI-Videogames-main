import React from "react";

export default function Card({image, name, genres}){
    return(
        <div>
            <img src={image} alt=""/>
            <h3>{name}</h3>
            <h5>{genres}</h5>
        </div>
    )
}