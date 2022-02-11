import React from "react";
import styles from "../Styles/Card.module.css"

export default function Card({ image, name, genres }) {
    return (
        <div className={styles.conteiner}>
            <img src={image} alt="" className={styles.image} />
            <h3>{name}</h3>
            <h5>{genres}</h5>
        </div>
    )
}