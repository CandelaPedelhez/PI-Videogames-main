import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../Actions/index";
import { useEffect } from "react";


export default function Details() {
    const dispatch = useDispatch();
    const videogameId = useParams(); /* Use params me trae el :PARAMETRO de la ruta (en este caso :id) */
    const myVideogame = useSelector((state) => state.details);

    useEffect(() => {
        dispatch(getDetails(videogameId.id));
    }, [dispatch]) /* así accedemos al id del videogame que accedemos  */


    return (
        <div >
            <div>
                {
                    (myVideogame.length === 0) ?
                        <div >
                            <p >Loading ...</p>
                        </div>
                        :
                        <div>
                            <h1 >{myVideogame.name}</h1>
                            <img src={myVideogame.image} alt="" />
                            <h3>Description</h3>
                            <p >{myVideogame.description}</p>
                            <h3>Genres</h3>
                            <p >{ myVideogame.createdInDb ?
                            myVideogame.genres.map(e => (<li>{e.name}</li>)) :
                            myVideogame.genres.map(e => (<li>{e}</li>))}
                            </p>
                            <h3>Released</h3>
                            <p >{myVideogame.released}</p>
                            <h3 >Rating</h3>
                            <p>{myVideogame.rating}</p>
                            <h3 >Platforms</h3>
                            {myVideogame.platforms.map(e => (<li>{e}</li>))}

                        </div>
                }
            </div>
            <div>
                <Link to="/home">
                    <button>Go back!</button>
                </Link>
            </div>
        </div>
    )
}