import React from "react";
import { useState, useEffect } from "react";
import { postVideogame, getGenres } from "../Actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Styles/CreateVideogame.module.css"

function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = "A name is required"
    }
    if (!input.description) {
        errors.description = "A description is required"
    }
    if (input.rating > 5) {
        errors.rating = "The rating is up to 5"
    }
    return errors
}

export default function CreateVideogame() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const genres = useSelector((state) => state.genres);
    const platforms = useSelector((state) => state.platforms)
    const [errors, setErrors] = useState({});
    const [isChecked, setIsChecked] = useState(platforms.fill(false))

    let allPlatforms = [
        "PC",
        "Playstation 5",
        "Playstation 4",
        "Xbox One",
        "Xbox Series S/X",
        "Nintendo Switch",
        "iOS",
        "Android",
        "Nintendo 3DS",
        "Nintendo DS",
        "Nintendo DSi",
        "macOS",
        "Linux",
        "Xbox 360",
        "Xbox",
        "PlayStation 3",
        "PlayStation 2",
        "PlayStation",
        "PS Vita",
        "PSP",
        "Wii U",
        "Wii",
        "GameCube",
        "Nintendo 64",
        "GameBoy Advance",
        "Game Boy Color",
        "Game Boy",
        "SNES",
        "NES",
        "Classic Macintosh",
        "Apple II",
        "Commodore / Amiga",
        "Atari 7800",
        "Atari 5200",
        "Atari 2600",
        "Atari Flashback",
        "Atari 8-bit",
        "Atari ST",
        "Atari Lynx",
        "Atari XEGS",
        "Genesis",
        "SEGA Saturn",
        "SEGA CD",
        "SEGA 32X",
        "SEGA Master System",
        "Dreamcast",
        "3DO",
        "Jaguar",
        "Game Gear",
        "Neo Geo",
    ];

    const [input, setInput] = useState({ /* input = estado local */
        name: "",
        description: "",
        image: "https://media.gcflearnfree.org/content/5ccc48c7e5c6c4116cbd9df7_05_03_2019/consolasjuegos-01_xl.png",
        released: "",
        rating: 0,
        genres: [],
        platforms: [],
    })

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }


    function handleSelect(e) {
        setInput((input) => {
            if (!input.genres.includes(e.target.value)) {
                return {
                    ...input,
                    genres: [...input.genres, e.target.value]
                }
            }
            else {
                return {
                    ...input
                }
            }
        })
    }

    function handleDelete(e, d) {
        e.preventDefault();
        setInput({
            ...input,
            genres: input.genres.filter(genre => genre !== d),
        });
    }


    function handleSubmit(e) {
        if (input.name && input.description && input.rating <= 5) {
            e.preventDefault();
            dispatch(postVideogame(input));
            alert("Videogame created");
            setInput({
                name: "",
                description: "",
                image: "https://media.gcflearnfree.org/content/5ccc48c7e5c6c4116cbd9df7_05_03_2019/consolasjuegos-01_xl.png",
                released: "",
                rating: 0,
                genres: [],
                platforms: [],
            });
            console.log(input)
            navigate("/home");
        } else {
            e.preventDefault();
            alert("You should check name, description and rating fields!");
        }
    }

    function handleCheckbox(e) {
        const index = e.target.id
        setIsChecked(!isChecked[index]);
        if(e.target.checked === true){
            if(!input.platforms.includes(e.target.value)){
                setInput({
                    ...input,
                    platforms: [...input.platforms, e.target.value]
                })
            }
        }
        if(e.target.checked === false){
            let platforms = input.platforms.filter(d => d !== e.target.value);
            setInput({
                ...input,
                platforms
            })
        }
    }

    return (
        <div className={styles.background}>
            <Link to='/home'><button className={styles.button1}>Back</button></Link>
            <h1>Create your own videogame</h1>
            <div>
                <h5><b>Those with * are obligatory</b></h5>
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.div}>
                    <div className={styles.div2}>
                        <label>Name *</label>
                        <input type="text" value={input.name} name="name" onChange={(e) => handleChange(e)} />
                        {errors.name && (
                            <p>{errors.name}</p>
                        )}
                    </div>
                    <div className={styles.div2}>
                        <label>Description *</label>
                        <textarea rows={5} type="text" value={input.description} name="description" onChange={(e) => handleChange(e)} />
                        {errors.description && (
                            <p>{errors.description}</p>
                        )}
                    </div>
                    <div className={styles.div2}>
                        <label>Rating</label>
                        <input type="number" value={input.rating} name="rating" onChange={(e) => handleChange(e)} />
                        {errors.rating && (
                            <p>{errors.rating}</p>
                        )}
                    </div>
                    <div className={styles.div2}>
                        <label>Released</label>
                        <input type="text" value={input.released} name="released" onChange={(e) => handleChange(e)} />
                    </div>
                </div>
                <div>
                    <label>Platforms</label>
                    <div className={styles.platforms}>
                        {
                            allPlatforms.map((platform, index) => {
                                return (
                                    <div key={index}>
                                        <input
                                        id={`${index}`}
                                            checked= {isChecked[index]}
                                            type="checkbox"
                                            name={platform}
                                            value={platform}
                                            onChange={(e) => handleCheckbox(e)}
                                        />
                                        <span>{platform}</span>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <div >
                    <label>Genres</label>
                    <select className={styles.select} onChange={(e) => handleSelect(e)}>
                        {genres.map((genres) => {
                            return <option value={genres.name}>{genres.name}</option>
                        })}
                    </select>
                    <div >
                        {
                            input.genres.map(d =>
                                <div>
                                    <p>{d}</p>
                                    <button onClick={(e) => handleDelete(e, d)}>X</button>
                                </div>)
                        }
                    </div>
                </div>
                <button className={styles.button2} type="submit">Create recipe</button>
            </form>
            <div className={styles.vacio}></div>
        </div>
    )
}