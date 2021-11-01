import { Link } from "react-router-dom";
import { useState } from "react";
import './HomePage.css';

type Hamster = any

const HomePage = () => {
    const baseUrl = 'http://localhost:1337';
    const [hamsters, setHamsters] = useState<Hamster[] | null>(null)

    const getCutest = async () => {
        const response = await fetch(baseUrl + '/hamsters/cutest');
        const data = await response.json();
        let randomCutest = [data[Math.floor(Math.random() * data.length)]];
        setHamsters(randomCutest)
        console.log(randomCutest)
    }

    return (
        <div>
            <header className="header">
                <h1 className="header-h1">Hamster Wars !</h1>
                <nav className="nav-links">
                    <Link className="link-game" to='/game'><p>Tävla</p></Link>
                    <Link className="link-gallery" to='/gallery'><p>Galleri</p></Link>
                </nav>
            </header>
            <main className="main">
                <h3 className="welcomeText-h3">Välkommen till Hamster Wars! Detta är ett spel där du ska rösta på den hamster du tycker är sötast och sen kan du se vem som blir vinnaren.</h3>
                <h3 className="explainText-h3">Klicka på Tävla knappen om du vill spela.</h3>
                <h2 className="main-h2">Klicka på knappen 'se vinnaren' för att se hamstern som har vunnit flest röster hittils.</h2>
                <section className="cuteSection">
                    <button className="getCuteBtn" onClick={getCutest}>Se vinnaren</button>
                </section>
                {hamsters
                    ? hamsters.map(obj => (
                        <section className="hamster-card">
                            <img src={baseUrl + 'images/' + obj.imgName} alt="hamster" className="card-img"></img>
                            <article className="card-text">
                                <p className="card-name">{"Namn: " + obj.name}</p>
                                <p className="card-age">{"Ålder: " + obj.age + " år"}</p>
                                <p className="card-favFood">{"Favoritmat: " + obj.favFood}</p>
                            </article>
                        </section>
                    ))
                    : 'Loading...'}



            </main>
        </div>
    )
}

export default HomePage;