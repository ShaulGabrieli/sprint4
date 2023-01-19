import { utilService } from "../services/util.service";
// import { ReactComponent as star } from '../assets/img/details/star.svg'
export function ReviewPreview({review}){

    
    

    return (
        
        <div className="review-preview">
            <div className="reviewer flex">
            <div className="reviewer-img reviewer-item">{review.img}</div>
            <div className="reviewer-name reviewer-item">{review.by.fullname}</div>
            <div className="reviewer-location reviewer-item">🏳️‍⚧️ Usa </div>
            <div className="reviewer-rate reviewer-item">{'⭐'.repeat(review.rate)} {review.rate}</div>
            </div>
            <hr></hr>
            <div className="reviewer-content flex ">
            <div className="review-msg">
            <div>{review.txt}</div>
            <div className="review-date">{utilService.formatDate(review.createdAt)}</div>
            </div>
            </div>
        </div>
    )
}