import { utilService } from "../services/util.service";
import { ReactComponent as Star } from '../assets/img/details/star.svg'
import { StarsRating } from './stars-rating.jsx'
export function ReviewPreview({ review, detailsReviews }) {
 
    function getStars(rate) {
        let stars = []
        for (let i = 0; i < rate; i++) {
            stars.push(<Star key={i} />)
        }
        return stars
    }


    return (
        <div className= {detailsReviews? "review-preview-details":"review-preview"}>
            <div className="reviewer flex">
                <div className="reviewer-img reviewer-item "><img src={require("../assets/img/details/user-demo.jpg")}/></div>
                {/* <div className="reviewer-name reviewer-item">{review.by.name}</div> */}
                <div className="reviewer-name reviewer-item">{review.name}</div>
                {/* <div className="reviewer-location reviewer-item">🏳️‍⚧️ Usa </div> */}
                <div className="reviewer-location reviewer-item"><img src={review.flag}/> 
                <span className=" reviewer-location-country"> {review.country}</span> </div>
                {/* <div className="reviewer-rate reviewer-item"><StarsRating rate={review.rate}/></div> */}
            </div>
            {/* <hr></hr> */ }
    <div className="reviewer-content flex ">
        <div className="review-msg">
        <div>{review.review}</div>
            {/* <div>{review.txt}</div> */}
            <div className="review-date">{review.reviewedAt}</div>
            {/* <div className="review-date">{utilService.formatDate(review.createdAt)}</div> */}
        </div>
    </div>
            
        </div > 
        
    )
}