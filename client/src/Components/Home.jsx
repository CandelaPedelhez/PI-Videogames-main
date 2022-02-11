import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideogames , filterByDborApi , filterByGenre , orderByName, orderByRating } from "../Actions";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar"
import Paginado from "./Paginado";
import Card from "./Card";
import styles from "../Styles/Home.module.css"

export default function Home() {
    const dispatch = useDispatch();
    const videogames = useSelector(state => state.videogames);
    const [currentPage, setCurrentPage] = useState(1); /* seteamos la pagina actual */
    const [videogamesPerPage, setVideogamesPerPage] = useState(15); /* guardamos cuántos personajes por página */
    const indexOfLastVideogame = currentPage * videogamesPerPage; /* última receta de la página */
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage /* acá nos da la primer receta de cada pag */
    const currentVideogames = videogames.slice(indexOfFirstVideogame, indexOfLastVideogame);/* acá nos muestra todas las recetas de la página actual */
    const [order, setOrder] = useState("");
    const lastPage = Math.ceil(videogames.length / 15)


    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getAllVideogames())
    }, [dispatch]) /* el [] es la dependencia, para que no se llame en loop */


    const handlePrevNext = e => {
        e.preventDefault();
        switch (e.target.name) {
            case "prev":
                if (currentPage - 1 !== 0) {
                    paginado(currentPage - 1);
                };
                break;

            case "next":
                if (currentPage + 1 <= lastPage) {
                    paginado(currentPage + 1);
                }
                break;

            default:
                break;

        }
    }

    function handleClick(e) {
        e.preventDefault();
        dispatch(getAllVideogames());
    }
/* 
    function handleSortName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(`Order ${e.target.value}`)
        console.log("HOLAAAAAAAA", e.target.value)
    }

    function handleSortRating(e){
        e.preventDefault();
        dispatch(orderByRating(e.target.value));
        setCurrentPage(1);
        setOrder(`Order ${e.target.value}`)
    }

    function handleFilterGenres(e){
        e.preventDefault();
        dispatch(filterByGenre(e.target.value));
    }

    function handleFilterDbApi(e){
        e.preventDefault();
        dispatch(filterByDborApi(e.target.value));
    } */

    return (
        <div>
            <div className={styles.blur}>
                <h1>Let's play</h1>
                <div  className={styles.link}>
                <Link to="/videogame">Create your own Videogame!</Link>
                </div>
                <div>
                    <SearchBar />
                </div>
                <div className={styles.div}>
                    <select className={styles.select} /* onChange={e => handleSortName(e)} */>
                        <option value="">Order by name</option>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                    <select className={styles.select} /* onChange={e => handleSortRating(e)} */>
                        <option value="">Order by Score</option>
                        <option value="higher rating">Higher Rating</option>
                        <option value="lower rating">Lower Rating</option>
                    </select>
                    {
                        <select className={styles.select} /* onChange={e => handleFilterGenres(e)} */>
                            <option value="">Choose a genre</option>
                            <option value="Strategy">Strategy</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Indie">Indie</option>
                            <option value="RPG">RPG</option>
                            <option value="Action">Action</option>
                            <option value="Shooter">Shooter</option>
                            <option value="Casual">Casual</option>
                            <option value="Simulation">Simulation</option>
                            <option value="Puzzle">Puzzle</option>
                            <option value="Arcade">Arcade</option>
                            <option value="Platformer">Platformer</option>
                            <option value="Racing">Racing</option>
                            <option value="Massively Multiplayer">Massively Multiplayer</option>
                            <option value="Sports">Sports</option>
                            <option value="Fighting">Fighting</option>
                            <option value="Family">Family</option>
                            <option value="Board Games">Board Games</option>
                            <option value="Educational">Educational</option>
                            <option value="Card">Card</option>
                        </select>
                    }
                    <select className={styles.select} /* onChange={e => handleFilterDbApi(e)} */>
                        <option value="">Filter by origin</option>
                        <option value="created">Created</option>
                        <option value="existant">Existant</option>
                    </select>
                    <div>
                        <button className={styles.button} onClick={e => handleClick(e)}>Re-Load All videogames</button>
                    </div>
                </div>
                <div>
                    <Paginado
                        videogamesPerPage={videogamesPerPage}
                        videogames={videogames.length}
                        paginado={paginado}
                        handlePrevNext={handlePrevNext}
                    />
                    <div className={styles.conteiner}>
                        {
                            (currentVideogames) ? currentVideogames.map((e, index) => (
                                <div key={index}>
                                    <Link to={"/videogame/" + e.id}>
                                        <Card
                                            name={e.name}
                                            image={e.image}
                                            genres={e.createdInDb ?
                                                e.genres.map((s, index) => (<li key={index}>{s.name}</li>)) :
                                                e.genres.map((s, index) => (<li key={index}>{s}</li>))} />
                                    </Link>
                                </div>

                            )) : <p >Loading ...</p>
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}