import { useState } from 'react'
import { setTimeout } from 'timers'
import "./AddForm.css"

type Props = {
    click: Function
}

const AddForm = (props: Props) => {
    const [name, setName] = useState('')
    const [age, setAge] = useState(0)
    const [favFood, setfavFood] = useState('')
    const [loves, setLoves] = useState('')

    const nameIsValid = isValidName(name)
    const ageIsValid = isValidAge(age)
    const foodIsValid = isValidFood(favFood)
    const lovesIsValid = isValidLoves(loves)

    const formIsValid = nameIsValid && ageIsValid && foodIsValid && lovesIsValid
    
    const addHamster = (name: string, age: number, favFood: string, loves: string) => {
        fetch('/hamsters', {
            method: 'POST',
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                name: name,
                age: age,
                favFood: favFood,
                loves: loves,
                games: 0,
                imgName: "hamster-9.jpg",
                defeats: 0,
                wins: 0
            })
        })
        
        setTimeout(() => {
            props.click()
        }, 1000);
    }

    return (
        <div>
            <section className="addSection">
                <article className="addArticle">
                    <h1>Lägg till ny hamster</h1>
                    <p>Skriv hamsterns namn</p>
                    <input className={nameIsValid ? 'valid' : 'invalid'} onChange={e => setName(e.target.value)} type="text" placeholder="Namn" />

                    <p>Skriv hamsterns ålder</p>
                    <input className={ageIsValid ? 'valid' : 'invalid'} onChange={e => setAge(Number(e.target.value))} type="text" placeholder="Ålder i år" />

                    <p>Skriv hamsterns favoritmat</p>
                    <input className={foodIsValid ? 'valid' : 'invalid'} onChange={e => setfavFood(e.target.value)} type="text" placeholder="Favoritmat" />

                    <p>Skriv vad hamstern gillar att göra</p>
                    <input className={lovesIsValid ? 'valid' : 'invalid'} onChange={e => setLoves(e.target.value)} type="text" placeholder="Älskar att" />

                    <button className="addButton" disabled={!formIsValid} onClick={() => addHamster(name, age, favFood, loves)}>Lägg till hamster</button>
                </article>
            </section>
        </div>
    )
}

function isValidName(name: string): boolean {
    return name.length >= 2
}

function isValidAge(age: number): boolean {
    if (isNaN(age)) return false
    if (age < 0) return false
    let ageString = String(age)
    if (ageString.includes(',') || ageString.includes('.')) return false 

    return true
}

function isValidFood(favFood: string): boolean {
    return favFood.length >= 2
}

function isValidLoves(loves: string): boolean {
    return loves.length >= 2
}


export default AddForm