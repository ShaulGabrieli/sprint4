import { Link } from 'react-router-dom'
import { FavSvg } from './git-preview-svgs/fav-svg'
import { StarSvg } from './git-preview-svgs/star-svg'
import { OrderStatus } from './order-status'
import { addToWishlist } from '../store/user.actions'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'

export function GigPreview({ gig, orderPagePreview, status }) {


export function GigPreview({ gig, orderPagePreview, status}) {

  

    return (
        <li className='gig-preview flex' key={gig._id}>
            <Link to={`/gig/${gig._id}`}>
                <section className='top-gig-section'>
                    <img className='preview-img' src={`${gig.imgUrls[0]}`} />
                    <div className='owner-info'>
                        <div className='owner-icon-container'>
                            <img className='owner-icon' src={`${gig.owner.imgUrl}`} />
                        </div>
                        <h4>{gig.owner.fullname}</h4>
                    </div>
                    <p>{gig.description.substring(0, 65) + '...'}</p>
                    <div className='likes flex'>
                        <StarSvg />
                        <span className='rate'> {gig.owner.rate}</span>
                        <span className='total-likes'>{`(${gig.totalLikes})`}</span>
                    </div>
                </section>
            </Link>
            <hr />
            <section className='gig-preview-footer flex space-between'>
                <div className='preview-footer-fav'>
                    <FavSvg OnAddToWishlist={OnAddToWishlist}/>
                    {orderPagePreview && <OrderStatus status={status} />}
                </div>
                <div className='price-container flex'>
                    {(orderPagePreview && <span className='price-preview'>PRICE</span>) || <span className='price-preview'>STARTING AT</span>}
                    <span className='price-tag'>
                        {' '}
                        ${gig.price} {!orderPagePreview && <sup className='sup-price-end'>00</sup>}
                    </span>
                </div>
            </section>
        </li>
    )
}
