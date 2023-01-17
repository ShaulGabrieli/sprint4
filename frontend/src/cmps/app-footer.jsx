
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import { removeFromGigt, checkout } from '../store/gig.actions'
import { UserMsg } from './user-msg.jsx'

export function AppFooter() {
    const [isGigtShown, setIsGigtShown] = useState(false)
    const gigt = useSelector(storeState => storeState.gigModule.gigt)
    const count = useSelector(storeState => storeState.userModule.count)
    const gigtTotal = gigt.reduce((acc, gig) => acc + gig.price, 0)

    async function onCheckout() {
        try {
            const score = await checkout(gigtTotal)
            showSuccessMsg(`Charged, your new score: ${score.toLocaleString()}`)
        } catch(err) {
            showErrorMsg('Cannot checkout')
        }
    }

    return (
        <footer className="app-footer">
            <p>
                coffeerights - count: {count}
            </p>
            {gigt.length > 0 &&
                <h5>
                    <span>{gigt.length}</span> Products in your Gigt
                    <button className="btn-link" onClick={(ev) => {
                        ev.preventDefault();
                        setIsGigtShown(!isGigtShown)
                    }}>
                        ({(isGigtShown) ? 'hide' : 'show'})
                    </button>
                </h5>
            }

            {isGigtShown && gigt.length > 0 && <section className="gigt" >
                <h5>Your Gigt</h5>
                <ul>
                    {
                        gigt.map((gig, idx) => <li key={idx}>
                            <button onClick={() => {
                                removeFromGigt(gig._id)
                            }}>x</button>
                            {gig.vendor}
                        </li>)
                    }
                </ul>
                <p>Total: ${gigtTotal.toLocaleString()} </p>
                <button onClick={onCheckout}>Checkout</button>
            </section>}
            <UserMsg />
        </footer>
    )
}