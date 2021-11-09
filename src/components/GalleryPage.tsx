import { Link } from "react-router-dom";
import { useState } from "react";
import './GalleryPage.css';
import AddForm from "../components/AddForm";

type Hamster = any

const GalleryPage = () => {

    const baseUrl = 'http://localhost:1337';

    const [allHamsters, setAllHamsters] = useState<Hamster[] | null>(null)

    const getAll = async () => {
        const response = await fetch(baseUrl + '/hamsters');
        const data = await response.json();
        setAllHamsters(data)
    }

    const deleteOneHamster = async (hamster: string) => {
        await fetch('/hamsters/' + hamster, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            }
        })
        getAll()
    }

    const [show, setShow] = useState(false)

    const handleClick = (hamster: string) => { 
        setShow(true)
    }

    return (
        <div>
            
            <header className="header">
                <h1 className="header-h1">Hamster Wars !</h1>
                <nav className="nav-links">
                    <Link className="link-homepage" to='/'><p>Startsida</p></Link>
                    <Link className="link-game" to='/game'><p>Tävla</p></Link>
                </nav>
            </header>

            <main className="mainSec">
                <h3 className="welcomeText-h3">Välkommen till galleriet över alla hamstrar.</h3>
                <h3 className="explainText-h3">Här ser du alla hamstrar som finns med i spelet, du kan välja att ta bort en hamster eller lägga till en ny.</h3>
                <AddForm />
                <section className="allHamsterCards">
                    {allHamsters
                        ? allHamsters.map(object => (
                            <section className="hamster-cards" key={object.id}>
                                <img src={baseUrl + '/images/' + object.imgName} alt="hamster" className="card-imgs"></img>
                                <article className="card-texts">
                                    <p className="card-name">{"Namn: " + object.name}</p>
                                    <aside className={show ? 'card-aside' : 'hide'}>
                                        <p className="card-age">{"Ålder: " + object.age + " år"}</p>
                                        <p className="card-favFood">{"Favoritmat: " + object.favFood}</p>
                                    </aside>
                                    <button onClick={() => handleClick(object.id)}>Mer info</button>
                                </article>
                                <button onClick={() => deleteOneHamster(object.id)}>🗑</button >
                            </section>
                        ))
                        : 'Loading...'}
                </section>

                <section className="allSection">
                    <button className="getAllBtn" onClick={getAll}>Se alla hamstrar</button>
                </section>

            </main>
        </div>
    )
}

export default GalleryPage;