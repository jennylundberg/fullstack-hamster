import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import './GamePage.css';
import Hamster from "../modules/hamsterInterface"

const GamePage = () => {

    const [hamster1, setHamster1] = useState<Hamster[] | null>(null)
    const [hamster2, setHamster2] = useState<Hamster[] | null>(null)
    
    const [show, setShow] = useState(false)

    useEffect(() => {
        getHamsters()
    }, [])

    const getHamsters = async () => {
        const response = await fetch('/hamsters');
        const data = await response.json();

        // slumpar första hamstern och tar bort ifrån listan för att undvika att det blir en dubblett som kör ett game
        const num = Math.floor(Math.random() * data.length)
        const randomHamster1 = [data[num]];
        data.splice(num, 1)

        //slumpar andra hamstern
        const randomHamster2 = [data[Math.floor(Math.random() * data.length)]];

        setHamster1(randomHamster1)
        setHamster2(randomHamster2)

        setShow(false)
    }

    const handleGame = (win: any, lose: any, chosen: number) => {
        win[0].wins++
        win[0].games++
        lose[0].defeats++
        lose[0].games++

        if (chosen === 1) {
            setHamster1([win[0]])
            setHamster2([lose[0]])
        } else {
            setHamster1([lose[0]])
            setHamster2([win[0]])
        }

        setShow(true)

        fetch('/hamsters/' + lose[0].id, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                games: lose[0].games,
                defeats: lose[0].defeats
            })
        })

        fetch('/hamsters/' + win[0].id, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                games: win[0].games,
                wins: win[0].wins
            })
        })
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
                <section className="battleHamsters">
                    {hamster1
                        ? hamster1.map(object => (
                            <section className="hamster-card" key={object.id}>
                                <img src={'/images/' + object.imgName} alt="hamster" className="card-img"></img>
                                <article className="card-text">
                                    <p className="card-name">{"Namn: " + object.name}</p>
                                    <aside className={show ? 'card-aside' : 'hide'}>
                                        <p className="card-wins">{"Vinster: " + object.wins}</p>
                                        <p className="card-deafeats">{"Förluster: " + object.defeats}</p>
                                        <p className="card-games">{"Matcher: " + object.games}</p>
                                    </aside>
                                    <button className={show ? 'hide' : undefined} onClick={() => handleGame(hamster1, hamster2, 1)}>Rösta</button>
                                </article>
                            </section>
                        ))
                        : ''}
                    {hamster2
                        ? hamster2.map(object => (
                            <section className="hamster-card" key={object.id}>
                                <img src={'/images/' + object.imgName} alt="hamster" className="card-img"></img>
                                <article className="card-text">
                                    <p className="card-name">{"Namn: " + object.name}</p>
                                    <aside className={show ? 'card-aside' : 'hide'}>
                                        <p className="card-wins">{"Vinster: " + object.wins}</p>
                                        <p className="card-deafeats">{"Förluster: " + object.defeats}</p>
                                        <p className="card-games">{"Matcher: " + object.games}</p>
                                    </aside>
                                    <button className={show ? 'hide' : undefined} onClick={() => handleGame(hamster2, hamster1, 2)}>Rösta</button>
                                </article>
                            </section>
                        ))
                        : ''}
                </section>
                <section>
                    <button className={show ? undefined : 'hide'} onClick={() => getHamsters()}>Nästa spel</button>
                </section>
            </main>
        </div>
    )
}

export default GamePage