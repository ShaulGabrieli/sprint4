

import { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
// import { gigService } from '../services/gig.service.js'
import { gigService } from '../services/gig.service.local.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { ReviewPreview } from '../cmps/review-preview.jsx'


import "../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { PaymentTabs } from '../cmps/payment-tabs.jsx'


export function GigDetails() {
    const [gig, setGig] = useState(null)
    const params = useParams()
    const { id } = params
    const navigate = useNavigate()


    useEffect(() => {
        loadGig()
    }, [id])

    async function loadGig() {
        try {
            const loadGig = await gigService.getById(id)
            setGig(loadGig)
        } catch (err) {
            console.log('GigDetails: err in loadGig', err)
            showErrorMsg('Gig not found')
            navigate('/gig')
        }
    }

    if (!gig) return <div>Loading...</div>
    return (

        <section className="gig-details-page">
            <div className="gig-details">
                <div className="gig-overview">
                    <div className="gig-breadcrumbs">breadcrumbs</div>
                    <h1> {gig.title}</h1>
                    <div className="seller-overview">{gig.owner.fullname} + top rated seller {'⭐'.repeat(gig.owner.rate)} + amount of raters</div>
                </div>
                <div className="gig-gallery">
                    <Carousel showIndicators={false}  >
                        <div>
                            <img src={require(`../assets/img/details/demo-details2.jpg`)} />
                            <p className="legend">to add review</p>
                        </div>
                        <div>
                            <img src={require(`../assets/img/details/demo-details1.jpg`)} />
                            <p className="legend">to add review and style</p>
                        </div>
                        <div>
                            <img src={require(`../assets/img/details/demo-details4.jpg`)} />
                            <p className="legend">to add review and style</p>
                        </div>
                    </Carousel >
                </div>
                <div className="reviews-snippet">
                    <header>
                        <h2>what people love about the seller</h2>
                        <button>see all reviews</button>
                    </header>
                    <div className="reviews-carusel">

                        <Carousel showIndicators={false} showThumbs={false}>
                            {gig.reviews.map(review => {
                                return (
                                    <div>
                                        {/* <img src={require(`../assets/img/details/demo-details2.jpg`)} /> */}
                                        {/* <p className="review-preview">{review.txt}</p> */}
                                        <ReviewPreview review={review} />

                        </div>
                    )
                })}
            </Carousel>
                        {/* reviews-carousel-wrapper" */}

                    </div>
                </div>
                <div className="gig-description">
                    <header>
                        <h2 className="section-title">About this gig</h2>
                    </header>

                    <div className="description-wrapper">
                        {/* check if description-wrapper is needed */}
                        <div className="description-content">
                            {gig.description}
                            {/* check for only SM screen buttons class="collapse-button" */}
                        </div>
                        {/* check if metadata is needed here */}
                    </div>
                </div>
                <h2 className="about-the-seller"><span>About the seller</span></h2>
                <div className="profile-card">
                    <div className="seller-card">
                        <div className="profile-info flex">
                            <div className="profile-img">
                                <img src={require(`../assets/img/details/user-demo.jpg`)} />

                            </div>
                            <div className="about-user-info">
                                <div className="about-user-name">{gig.owner.fullname}</div>
                                <div className="about-seller-rate">{'⭐'.repeat(gig.owner.rate)} + amount of raters</div>
                                <div className="contact-me-btn">Contact Me</div>

                            </div>
                        </div>
                        <div className="stats-desc">
                            {/* check if needed */}
                        </div>
                    </div>
                </div>
                {/* stopped at compare packages */}
            </div>




            <div className="gig-main-payment flex column">
                {/* <div className="payment-area">
                    <div className="basic"></div>
                </div> */}
                <div className="main-package-container  ">
                    {/* <div className="package-container flex column"> */}

                    <PaymentTabs gig={gig} />

                </div>
                <div className="contact-seller flex column">
                    <div className="contact-seller-wrapper">
                        <div className="contact-seller-btn"> Contact Seller</div>
                    </div>
                </div>
                <div className="highly-responsive">
                    <div className="responsive-wrapper">
                        <span className="lightning">⚡</span>
                        <div>
                            <div className="responsive-header">
                                <b>Highly responsive!</b>
                            </div>
                            <span className="responsive-text">
                                Known for exceptionally quick replies
                            </span>

                        </div>
                    </div>
                </div>

            </div>

        </section>
    )
}