

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { gigService } from '../services/gig.service.js'


export function GigDetails() {

    const params = useParams()
    return (
        <div>
            <h3>Gig Details</h3>
            </div>
    )
}