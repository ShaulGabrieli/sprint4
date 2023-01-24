import { Link } from 'react-router-dom'
import { FavSvg } from './git-preview-svgs/fav-svg'
import { StarSvg } from './git-preview-svgs/star-svg'

export function GigPreview({ gig}) {
    return (
        <Link to={`/gig/${gig._id}`}>
            {' '}
            <li className='gig-preview flex' key={gig._id}>
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
                <hr />

                <section className='gig-preview-footer flex space-between'>
                    <div className='preview-footer-fav'>
                        <FavSvg />
                    </div>
                    <div className='price-container flex'>
                        <span className='price-preview'>STARTING AT</span>
                        <span className='price-tag'>
                            {' '}
                            ${gig.price}
                            <sup className='sup-price-end'>00</sup>
                        </span>
                    </div>
                </section>
            </li>
        </Link>
    )
}
