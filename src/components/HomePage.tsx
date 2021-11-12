import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import './HomePage.css';
import Hamster from "../modules/hamsterInterface"

type Error = boolean

const HomePage = () => {
    const [hamsters, setHamsters] = useState<Hamster[] | null>(null)
    const [errorMes, setErrorMes] = useState<Error | true>(true)

    useEffect(() => {
        getCutest()
    }, [])

    const getCutest = () => {
        setErrorMes(true)

        fetch('/hamsters/cutest')
            .then(response => {
                return response.json()
            })
            .then(data => {
                const randomCutest = [data[Math.floor(Math.random() * data.length)]];
                setHamsters(randomCutest)
            })
            .catch(err => {
                console.log(err.message)
                setErrorMes(false)
            })

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
                <h3 className="explainText-h3">Klicka på Tävla knappen om du vill spela eller klicka på Galleri för att se vilka hamstrar som finns i spelet.</h3>
                <section className="winnerHamster">
                    {hamsters
                        ? hamsters.map(object => (
                            <section className="hamster-card" key={object.id}>
                                <img src={'/images/' + object.imgName} alt="hamster" className="card-img"></img>
                                <article className="card-text">
                                    <p className="card-name">{"Namn: " + object.name}</p>
                                    <p className="card-age">{"Ålder: " + object.age + " år"}</p>
                                    <p className="card-favFood">{"Favoritmat: " + object.favFood}</p>
                                </article>

                            </section>
                        ))
                        : 'Loading...'}
                </section>
                <section className={errorMes ? "validE" : "invalidE"}>
                    <p >Ojdå något gick visst fel med att hitta hamstern prova att ladda om sidan och prova igen.</p>
                    <button className="getCuteBtn" onClick={getCutest}>Se vinnaren</button>
                </section>
            </main>
        </div>
    )
}

export default HomePage;