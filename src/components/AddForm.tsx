import { useState } from 'react'
import "./AddForm.css"

const AddForm = () => {
    const [name, setName] = useState('')
    const [age, setAge] = useState(0)
    const [food, setFood] = useState('')
    const [loves, setLoves] = useState('')

    const nameIsValid = isValidName(name)
    const ageIsValid = isValidAge(age)
    const foodIsValid = isValidFood(food)
    const lovesIsValid = isValidLoves(loves)

    const formIsValid = nameIsValid && ageIsValid && foodIsValid && lovesIsValid

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
                    <input className={foodIsValid ? 'valid' : 'invalid'} onChange={e => setFood(e.target.value)} type="text" placeholder="Favoritmat" />

                    <p>Skriv vad hamstern gillar att göra</p>
                    <input className={lovesIsValid ? 'valid' : 'invalid'} onChange={e => setLoves(e.target.value)} type="text" placeholder="Älskar att" />

                    <button className="addButton" disabled={!formIsValid}>Lägg till hamster</button>
                </article>
            </section>
        </div>
    )
}

function isValidName(name: string): boolean {
    return name.length >= 2
}

function isValidAge(age: number): boolean {
    if( isNaN(age) ) return false
    if( age < 0 ) return false
    let ageString = String(age)
    if( ageString.includes(',') || ageString.includes('.') ) return false

    return true
}

function isValidFood(food: string): boolean {
    return food.length >= 2
}

function isValidLoves(loves: string): boolean {
    return loves.length >= 2
}

export default AddForm