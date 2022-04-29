import {React} from 'react';
import {Link} from 'react-router-dom';
import styles from '../Styles/Landing.module.css'
import { useDispatch } from "react-redux";
import { getAllVideogames } from "../Actions";
import { useEffect } from "react";

export default function Landing(){

 const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllVideogames())
    }, [dispatch])

    /* function handleClick(e) {
        e.preventDefault();
        dispatch(getAllVideogames());
        setCurrentPage(1);
    } */
    return(
        <div className={styles.background}>
            <div  className={styles.title}>
            <h1>Welcome</h1>
            </div>
        <Link to= "/home">
            <button className={styles.button}>Enter</button>
        </Link>
        </div>
    )
}