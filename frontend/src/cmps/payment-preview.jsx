import { useEffect, useState } from "react";

export function PaymentPreview({paymentPlan, gig}){

    function getGigPrice(){
        switch(paymentPlan.title){
            case 'Basic':
                return gig.price
            case 'Standard':
                return gig.price * 1.5
            case 'Premium':
                return gig.price * 2
            
    }
    }

    return(
        <div className="payment-area">
            <div className="price-basic-container flex row space-between ">
                        <h4> {paymentPlan.title}</h4>
                        <div className="price-wrapper">
                            <h4 className="price">$ {getGigPrice() }.00  </h4>
                        </div>
                    </div>
                    <article>
                    <div className="additional-info flex ">
                        <div className="additional-info-wrapper flex row">
                            <div className="delivery-wrapper">
                                <span className="delivery-icon">🕒</span>
                                <b className="delivery">{paymentPlan?.delivery}</b>
                            </div>
                            <div className="revisions-wrapper">
                                <span className="revisions-icon">🔁</span>
                                <b className="revisions">{paymentPlan?.revisions}</b>
                            </div>
                        </div>
                            {paymentPlan?.features?.map( (item) => {
                            return <div className="features">
                            <div className="features-desc">
                                <span className="feature-icon">✔</span>
                               {item}
                            </div></div>})}
                       
                        </div>

                    </article>
                    {/* </div> */}
                    <div className="payment flex ">
                        <div className="continue-btn flex"><span className="space-holder"> </span><span className="continue-word">Continue</span>
                            <span className="continue-arrow">➜</span>
                        </div>
                        {/* <button className="compare-packages">compare-packages</button> */}
                    </div>
        </div>
    )
}