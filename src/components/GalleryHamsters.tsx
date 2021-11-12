import { useState } from "react";
import "./GalleryHamsters.css";
import Hamster from "../modules/hamsterInterface";

type Props = {
    click: Function,
    key: string,
    hamster: Hamster
}

const GalleryHamsters = (props: Props) => {

    const [show, setShow] = useState(false)
    
    const handleClick = () => {
        if(show === false) {
            setShow(true)
        } else {
            setShow(false)
        }
    }

    const deleteOneHamster = async (hamster: string) => {
        await fetch('/hamsters/' + hamster, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            }
        })
        props.click()
    }

    return (
        <div>
            <section className="hamster-cards" key={props.hamster.id}>
                <img src={'/images/' + props.hamster.imgName} alt="hamster" className="card-imgs"></img>
                <article className="card-texts">
                    <p className="card-name">{"Namn: " + props.hamster.name}</p>
                    <aside className={show ? 'show' : 'hide'}>
                        <p className="card-age">{"Ålder: " + props.hamster.age + " år"}</p>
                        <p className="card-favFood">{"Favoritmat: " + props.hamster.favFood}</p>
                    </aside>
                    <button onClick={() => handleClick()}>Mer info</button>
                </article>
                <button onClick={() => deleteOneHamster(props.hamster.id)}>🗑</button >
            </section>
        </div>
    )
}

export default GalleryHamsters