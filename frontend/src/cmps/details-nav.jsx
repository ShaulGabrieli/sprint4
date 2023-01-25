import { Link } from 'react-router-dom'
import { useState } from 'react'

import { ReactComponent as AddToList } from '../assets/img/details/addToList.svg'
import { ReactComponent as LikeGig } from '../assets/img/details/heart.svg'
import { ReactComponent as ReportGig } from '../assets/img/details/flag.svg'
import { ReactComponent as ShareGig } from '../assets/img/details/share.svg'
import { ReactComponent as LikeGigFull } from '../assets/img/details/heart-liked.svg'


export function DetailsNav({ gig }) {
    const [selectedTab, setSelectedTab] = useState(null)
    const [likedGig, setLikedGig] = useState(false)

    function onScroll(location) {
        setSelectedTab(location)
        const el = document.getElementById(location)
        if (!el) return
        el.scrollIntoView({ behavior: 'smooth' })
    }

    function saveGig() {
        console.log('save gig', gig)
    }

    function onLikeGig() {
        saveGig()
        setLikedGig(!likedGig)
    }


    const tabs = [
        { 'k': 'overview', 'v': 'Overview' },
        { 'k': 'description', 'v': 'Description' },
        { 'k': 'aboutSeller', 'v': 'About the seller' },
        { 'k': 'reviews', 'v': 'Reviews' }
    ]

    return (
        <div className="details-actions flex space-between ">

            <div className="left-container flex ">

                <ul className="details-nav clean-list main-nav flex   ">
                    {tabs.map((tab) => {
                        return <li key={tab.k}>
                            <Link className={selectedTab === tab.k ? 'top-nav-details-item top-nav-details-selected' : 'top-nav-details-item'} to={`#${tab.k}`} onClick={() => onScroll(tab.k)} >{tab.v}</Link>
                        </li>
                    })
                    }
                    {/* <li>    <Link className={selectedTab === "overview" ? 'top-nav-details-item top-nav-details-selected' : 'top-nav-details-item'} to="#overview" onClick={() => onScroll('overview')} >Overview</Link></li>
                    <li>  <Link className={selectedTab === "description" ? 'top-nav-details-item top-nav-details-selected' : 'top-nav-details-item'} to="#description" onClick={() => onScroll('description')}>Description</Link></li>
                    <li> <Link className={selectedTab === "aboutSeller" ? 'top-nav-details-item top-nav-details-selected' : 'top-nav-details-item'} to="#aboutSeller" onClick={() => onScroll('aboutSeller')}>About the seller</Link></li>
                    <li> <Link className={selectedTab === "reviews" ? 'top-nav-details-item top-nav-details-selected' : 'top-nav-details-item'} to="#reviews" onClick={() => onScroll('reviews')}>Reviews</Link></li> */}
                    {/* <div className="details-actions ">
                </div> */}

                </ul>
            </div>

            <div className="right-container flex row ">
                {/* <div className="add-to-lists-gig"><AddToList /></div> */}
                <div className="liked-gig">{likedGig ? <LikeGigFull onClick={onLikeGig} /> : <LikeGig onClick={onLikeGig} />} </div>
                {/* <div className="report-gig"> <ReportGig />   </div> */}
                <div className="share-gig"><ShareGig /></div>
            </div>

            {/* <div className="collect"></div> */}
            {/* </div> */}

        </div>

    )
}