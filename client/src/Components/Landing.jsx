import {React} from 'react';
import {Link} from 'react-router-dom';
import styles from '../Styles/Landing.module.css'

export default function Landing(){
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