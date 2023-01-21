

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate , useParams } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { gigService } from "../services/gig.service.js"
import { addGig } from "../store/gig.actions.js"


export function GigEdit() {
    const gigs = useSelector((storeState) => storeState.gigModule.gigs)
    const [gigToEdit, setGigToEdit] = useState(gigService.getEmptyGig())
    const { gigId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!gigId) return
        gigService.getById(gigId)
            .then(setGigToEdit)
    }, [])

    function handleChange({target}) {
        let { value, type, name: field } = target
        // let { value, type, name: field } = target
        if(type === 'checkbox'){
          if(value === 'on') return value = true
          else  return value =  false
        }
        value = (type === 'number') ? +value : value
        setGigToEdit(prevBug => ({ ...prevBug, [field]: value }))
    }

    function onAddGig(ev) {
        console.log('gigToEdit', gigToEdit);
        ev.preventDefault()
        addGig(gigToEdit)
            .then((savedGig) => {
                showSuccessMsg(`Gig added (id: ${savedGig._id})`)
                navigate('/gig')
            })
            .catch((err) => {
                showErrorMsg('Cannot add gig')
            })
    }
    return <div className={"modal "}>

        <form onSubmit={onAddGig}>

            <input type="text"
                name="name"
                id="name"
                placeholder="Enter gig name..."
                value={gigToEdit.name}
                onChange={handleChange}
                 />
                 <input type="number"
                name="price"
                id="price"
                placeholder="Enter gig price..."
                value={gigToEdit.price}
                onChange={handleChange}
                 />
                 <label htmlFor="stock">Check the box if the item in stock</label>
                 <input type="checkbox"
                name="inStock"
                id="stock"
                onChange={handleChange}
                 />

            <button>Submit</button>


        </form>

        {/* <Validation onAddGig={onAddGig} handleChange={handleChange}/> */}
    </div>
}