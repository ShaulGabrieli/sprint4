import { Link } from 'react-router-dom'

export function GigPreview({ gig, onRemoveGig, onUpdateGig, onAddGigMsg, onAddToGigt }) {
    return (
        <Link to={`/gig/${gig._id}`}>
            {' '}
            <li className='gig-preview flex' key={gig._id}>
                <img src={require('../assets/img/gig-preview/preview-img.jpg')}></img>
                <div className='seller-info'>
                <span class='material-symbols-outlined seller-icon'>account_circle</span>
                <h4>{gig.owner.fullname}</h4>
                </div>
                <p>
                   {gig.description.substring(0, 50) + '...'}
                </p>
                <div className='likes flex'>        
                {/* <span class="material-symbols-outlined  gig-preview-star">
star
</span>    */}
{/* <!-- License: MIT. Made by feathericon: https://github.com/feathericon/feathericon --> */}
<svg className='star-box' width="15px" height="15px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
    
    <title>star</title>
    <desc>Created with sketchtool.</desc>
    <g id="shape" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g className="gig-preview-star" fill-rule="nonzero">
            <polygon id="Shape" points="12.5 17.9252329 6.62867711 21 7.75 14.4875388 3 9.8753882 9.56433855 8.92523292 12.5 3 15.4356614 8.92523292 22 9.8753882 17.25 14.4875388 18.3713229 21"></polygon>
        </g>
    </g>
</svg>
                <span className='rate'> {gig.owner.rate}</span>
<span className='total-likes'>{`(${gig.totalLikes})`}</span>
</div>
<hr />

<div></div>
{/* <!-- License: Apache. Made by grommet: https://github.com/grommet/grommet-icons --> */}
<svg width="16px" height="16px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path fill="none" stroke="#000" stroke-width="2" d="M2,19 L22,19 M2,5 L22,5 M2,12 L22,12"/>
</svg>

{/* <!-- License: PD. Made by Leonid Tsvetkov: https://dribbble.com/Lets --> */}
<svg width="16px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.381 6.06759C18.1553 3.19885 13.7697 3.5573 12 6.62866C10.2303 3.55729 5.84473 3.19885 3.61898 6.06759L3.30962 6.46632C1.42724 8.8925 1.69903 12.3524 3.93717 14.4548L10.9074 21.0026C11.0115 21.1005 11.1254 21.2075 11.2327 21.2902C11.3562 21.3853 11.5288 21.4954 11.7593 21.5406C11.9182 21.5718 12.0818 21.5718 12.2407 21.5406C12.4712 21.4954 12.6438 21.3853 12.7673 21.2902C12.8747 21.2075 12.9885 21.1005 13.0927 21.0026L20.0628 14.4548C22.301 12.3524 22.5728 8.89249 20.6904 6.46631L20.381 6.06759Z" fill="black"/>
</svg>

                
                {/* <div>
                    <button
                        onClick={() => {
                            onRemoveGig(gig._id)
                        }}
                    >
                        x
                    </button>
                    <button
                        onClick={() => {
                            onUpdateGig(gig)
                        }}
                    >
                        Edit
                    </button>
                </div>

                <button
                    onClick={() => {
                        onAddGigMsg(gig)
                    }}
                >
                    Add gig msg
                </button>
                <button
                    className='buy'
                    onClick={() => {
                        onAddToGigt(gig)
                    }}
                >
                    Add to gigt
                </button> */}
            </li>
        </Link>
    )
}
