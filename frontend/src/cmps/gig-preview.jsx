import { Link } from 'react-router-dom'
import { FavSvg } from './git-preview-svgs/fav-svg'
import { StarSvg } from './git-preview-svgs/star-svg'
import { OrderStatus } from './order-status'
import { addToWishlist,removeFromWishlist } from '../store/user.actions'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { userReducer } from '../store/user.reducer'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
export function GigPreview({ gig, orderPagePreview, status }) {
    const wishlist = useSelector(storeState => storeState.userModule.user?.wishlist || [])
    const [isFavClicked,setIsFavClicked] = useState(false)
    
    useEffect(()=>{
        changeFavColor(gig._id)
    },[])

    async function OnAddToWishlist() {
        if (isFavClicked) {
            setIsFavClicked(!isFavClicked)
            return removeFromWishlist(gig._id)
        }
        try {
            await addToWishlist(gig)
            showSuccessMsg('Gig added to wishlist')
            setIsFavClicked(!isFavClicked)
        } catch (err) {
            showErrorMsg('Cannot add gig to wishlist')
        }
    }

    function handleClick() {
        window.scrollTo(0, 0)
    }

function changeFavColor(id){
    const wish =  wishlist.find(wish=> wish._id === id)
    wish ? setIsFavClicked(true): setIsFavClicked(false)
}

    return (
        <li className='gig-preview flex' key={gig._id}>
            <div className='preview-main-container flex column'>
                <section className='top-gig-section'>
                    <Link to={`/gig/${gig._id}`} onClick={handleClick}>
                    <div className='preview-img-container'>
                        <img className='preview-img' src={`${gig.imgUrls[0]}`} />
                        </div>
                        <div className='middle-gig-section flex column'>
                            <div className='owner-info'>
                                <div className='owner-icon-container'>
                                    <img className='owner-icon' src={`${gig.owner.imgUrl}`} />
                                </div>
                                <h4>{gig.owner.fullname}</h4>
                            </div>
                            {/* <p>{gig.title.substring(0, 65) + '...'}</p>*/}
                            <p>{gig.title}</p> 
                            <div className='likes flex'>
                                <StarSvg />
                                <span className='rate'> {gig.owner.rate || 0}</span>
                                <span className='total-likes'>{`(${gig.reviews?.length || 0})`}</span>
                            </div>
                        </div>
                    </Link>
                </section>

                <hr />
                <section className='gig-preview-footer flex space-between'>
                    <div className='preview-footer-fav'>
                        {!orderPagePreview && <FavSvg OnAddToWishlist={OnAddToWishlist} isFavClicked={isFavClicked}/>}
                        {orderPagePreview && <OrderStatus status={status} />}
                    </div>
                    <div className='price-container flex row'>
                        {(orderPagePreview && <span className='price-preview'>PRICE</span>) || 
                        <span className='price-preview'>STARTING AT</span>}
                        <span className='price-tag'>
                            {' '}
                            ${gig.price}
                            {!orderPagePreview && <sup className='sup-price-end'>00</sup>}
                        </span>
                    </div>
                </section>
            </div>
        </li>
    )
}
