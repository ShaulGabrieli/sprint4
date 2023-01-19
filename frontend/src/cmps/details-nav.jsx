import { Link } from 'react-router-dom'
import { useState } from 'react'




export function DetailsNav() {
    const [selectedTab, setSelectedTab] = useState(null)

    function onScroll(location) {
        setSelectedTab(location)
        const el = document.getElementById(location)
        if (!el) return
        el.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        // <div >
        <ul className="details-nav flex">
            <li>    <Link className={selectedTab==="overview"? 'top-nav-details-item top-nav-details-selected' : 'top-nav-details-item' } to="#overview" onClick={() => onScroll('overview')} >Overview</Link></li>
            <li>  <Link className={selectedTab==="description"? 'top-nav-details-item top-nav-details-selected' : 'top-nav-details-item' } to="#description" onClick={() => onScroll('description')}>Description</Link></li>
            <li> <Link className={selectedTab==="aboutSeller"? 'top-nav-details-item top-nav-details-selected' : 'top-nav-details-item' } to="#aboutSeller" onClick={() => onScroll('aboutSeller')}>About the seller</Link></li>
            <li> <Link className={selectedTab==="reviews"? 'top-nav-details-item top-nav-details-selected' : 'top-nav-details-item' } to="#reviews" onClick={() => onScroll('reviews')}>Reviews</Link></li>
        </ul>
        // </div>
    )
}