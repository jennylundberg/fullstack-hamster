import { Link } from "react-router-dom";
import { useState } from "react";
import './GamePage.css';

type Hamster = any

const GamePage = () => {
    const baseUrl = 'http://localhost:1337';

    const [hamster1, setHamster1] = useState<Hamster[] | null>(null)
    const [hamster2, setHamster2] = useState<Hamster[] | null>(null)

    const getHamsters = async () => {
        const response = await fetch(baseUrl + '/hamsters');
        const data = await response.json();

        // slumpar första hamstern och tar bort ifrån listan för att undvika att det blir en dubblett som kör ett game
        const num = Math.floor(Math.random() * data.length)
        const randomHamster1 = [data[num]];
        data.splice(num, 1)

        //slumpar andra hamstern
        const randomHamster2 = [data[Math.floor(Math.random() * data.length)]];

        setHamster1(randomHamster1)
        setHamster2(randomHamster2)
    }

    const handleGame = (win: any, lose: any, chosen: number) => {
        

    }

    return (
        <div>
            <header className="header">
                <h1 className="header-h1">Hamster Wars !</h1>
                <nav className="nav-links">
                    <Link className="link-homepage" to='/'><p>Startsida</p></Link>
                    <Link className="link-gallery" to='/gallery'><p>Galleri</p></Link>
                </nav>

            </header>
            <main className="mainSect">
                <h2>Welcome to the battlefield!</h2>
                <section className="RandomSection">
                    <button className="getRandomBtn" onClick={getHamsters}>Starta spel</button>
                </section>
                <section className="battleHamsters">
                    {hamster1
                        ? hamster1.map(object => (
                            <section className="hamster-card" key={object.id}>
                                <img src={'/images/' + object.imgName} alt="hamster" className="card-img"></img>
                                <article className="card-text">
                                    <p className="card-name">{"Namn: " + object.name}</p>
                                    <p className="card-wins">{"Vinster: " + object.wins}</p>
                                    <p className="card-deafeats">{"Förluster: " + object.defeats}</p>
                                    <p className="card-games">{"Matcher: " + object.games}</p>
                                    <button onClick={() => handleGame(hamster1, hamster2, 1)}>Rösta</button>
                                </article>
                            </section>
                        ))
                        : 'Loading...'}
                    {hamster2
                        ? hamster2.map(object => (
                            <section className="hamster-card" key={object.id}>
                                <img src={'/images/' + object.imgName} alt="hamster" className="card-img"></img>
                                <article className="card-text">
                                    <p className="card-name">{"Namn: " + object.name}</p>
                                    <p className="card-wins">{"Vinster: " + object.wins}</p>
                                    <p className="card-deafeats">{"Förluster: " + object.defeats}</p>
                                    <p className="card-games">{"Matcher: " + object.games}</p>
                                    <button onClick={() => handleGame(hamster2, hamster1, 2)}>Rösta</button>
                                </article>
                            </section>
                        ))
                        : 'Loading...'}
                </section>
            </main>
        </div>
    )
}

export default GamePage