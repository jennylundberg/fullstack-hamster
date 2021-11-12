import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import './GalleryPage.css';
import AddForm from "../components/AddForm";
import GalleryHamsters from "../components/GalleryHamsters";
import Hamster from "../modules/hamsterInterface"

const GalleryPage = () => {

    const [allHamsters, setAllHamsters] = useState<Hamster[] | null>(null)

    useEffect(() => {
        getAll()
    }, [])

    const getAll = async () => {
        const response = await fetch('/hamsters');
        const data = await response.json();
        setAllHamsters(data)
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
                <AddForm click={getAll} />
                <section className="allHamsterCards">
                    {allHamsters
                        ? allHamsters.map(hamster => (
                            <GalleryHamsters click={getAll} key={hamster.id} hamster={hamster}/>
                        ))
                        : ""}
                </section>

            </main>
        </div>
    )
}

export default GalleryPage;

