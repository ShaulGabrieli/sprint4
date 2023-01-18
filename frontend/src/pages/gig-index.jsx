import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadGigs, addGig, updateGig, removeGig, addToGigt } from '../store/gig.actions.js'
import {Link} from 'react-router-dom'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { gigService } from '../services/gig.service.js'
import { GigPreview } from '../cmps/gig-preview.jsx'

export function GigIndex() {

    const gigs = useSelector(storeState => storeState.gigModule.gigs)

    useEffect(() => {
        loadGigs()
    }, [])

    async function onRemoveGig(gigId) {
        try {
            await removeGig(gigId)
            showSuccessMsg('Gig removed')            
        } catch (err) {
            showErrorMsg('Cannot remove gig')
        }
    }

    async function onAddGig() {
        const gig = gigService.getEmptyGig()
        gig.vendor = prompt('Vendor?')
        try {
            const savedGig = await addGig(gig)
            showSuccessMsg(`Gig added (id: ${savedGig._id})`)
        } catch (err) {
            showErrorMsg('Cannot add gig')
        }        
    }

    async function onUpdateGig(gig) {
        const price = +prompt('New price?')
        const gigToSave = { ...gig, price }
        try {
            const savedGig = await updateGig(gigToSave)
            showSuccessMsg(`Gig updated, new price: ${savedGig.price}`)
        } catch (err) {
            showErrorMsg('Cannot update gig')
        }        
    }

    function onAddToGigt(gig){
        console.log(`Adding ${gig.vendor} to Gigt`)
        addToGigt(gig)
        showSuccessMsg('Added to Gigt')
    }

    function onAddGigMsg(gig) {
        console.log(`TODO Adding msg to gig`)
    }

    return (
        <div>
            <h3>Gigs App</h3>
            <main>
                <button onClick={onAddGig}>Add Gig ⛐</button>
                <ul className="gig-list">
                    {gigs.map((gig , idx) =>
                       <GigPreview id={idx} gig={gig} onRemoveGig={onRemoveGig} onUpdateGig={onUpdateGig} onAddGigMsg={onAddGigMsg} onAddToGigt={onAddToGigt}/>)
                    }
                </ul>
            </main>
        </div>
    )
}