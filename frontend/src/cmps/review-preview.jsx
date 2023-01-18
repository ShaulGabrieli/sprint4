import { utilService } from "../services/util.service";

export function ReviewPreview({review}){

    return (
        
        <div className="review-preview">
            <div className="reviewer">
            <div className="reviewer-img">{review.img}</div>
            <div className="reviewer-name">{review.by.fullname}</div>
            <div className="reviewer-location">from?</div>
            <div className="reviewer-rate">{'⭐'.repeat(review.rate)}</div>
            </div>
            <div className="review-msg">
            <p>{review.txt}</p>
            <div className="date">{utilService.formatDate(review.createdAt)}</div>
            </div>
        </div>
    )
}