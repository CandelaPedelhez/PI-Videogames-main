import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../Actions/index";
import { useEffect } from "react";
import styles from "../Styles/Details.module.css"

export default function Details() {
    const dispatch = useDispatch();
    const videogameId = useParams(); /* Use params me trae el :PARAMETRO de la ruta (en este caso :id) */
    const myVideogame = useSelector((state) => state.details);

    useEffect(() => {
        dispatch(getDetails(videogameId.id));
    }, [dispatch]) /* así accedemos al id del videogame que accedemos  */


    return (
        <div className={styles.background}>
            <div className={styles.words}>
                {
                    (myVideogame.length === 0) ?
                        <div >
                            <p >Loading ...</p>
                        </div>
                        :
                        <div>
                            <h1 className={styles.h1}>{myVideogame.name}</h1>
                            <img src={myVideogame.image} alt="" className={styles.img} />
                            <div className={styles.segundoB}>
                                <div className={styles.p}>
                                    <h3 className={styles.h3}>Description</h3>
                                    <p >{myVideogame.description}</p>
                                </div>
                                <div className={styles.div}>
                                    <div>

                                        <div>
                                            <h3>Released</h3>
                                            <p >{myVideogame.released}</p>
                                            <div className={styles.div1}>
                                                <h3>Genres</h3>
                                                {myVideogame.createdInDb ?
                                                    myVideogame.genres.map(e => (<li>{e.name}</li>)) :
                                                    myVideogame.genres.map(e => (<li>{e}</li>))}
                                            </div>
                                        </div>

                                    </div>
                                    <div>
                                        <div>
                                            <h3>Rating</h3>
                                            <p>{myVideogame.rating}</p>
                                        </div>

                                        <div className={styles.div1} >
                                            <h3>Platforms</h3>
                                            {myVideogame.platforms.map(e => (<li>{e}</li>))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </div>
            <div className={styles.div2}>
                <Link to="/home">
                    <button className={styles.button}>Go back!</button>
                </Link>
            </div>
        </div>
    )
}