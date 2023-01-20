import { PaymentTabs } from '../cmps/payment-tabs.jsx'
// import {  } from '../store/order.actions.js'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { loadOrder } from '../store/order.actions.js'

import { useParams } from 'react-router-dom'




export function GigPayment() {
    const order = useSelector(storeState => storeState.orderModule.order)
    const [vat, setVat] = useState(0)
    const [total, setTotal] = useState(0)
    
    const { id } = useParams()

    useEffect(() => {
        loadOrder(id)
        setVat(getVat())
        setTotal(totalPay())
    }, [])

    function getVat() {
        const vat = order.gig.price * 0.17
        return vat
    }

    function totalPay() {
        console.log(' order.gig.price', order.gig.price)
        const total = order.gig.price + getVat() + 3
        return total
    }

    return ( <div>{!order && <div>Loading...</div> ||
        <div className="main-payment-area flex space-between">

            <div className="payment-area">payment options</div>


            <div className="order-details-container">

                {/* <PaymentTabs /> */}





                <div className="payment-summery">
                    <div className="summery-title flex">
                        <img src={order.gig.imgUrl} className="order-img-thumbnail"/>
                        <span className="summery-title-text">{order.gig.title}</span>
                    </div>
                    <div className="summery-plan">
                        <span className="summery-plan-text">{order.plan.title}</span>
                        <span className="summery-plan-price">${order.gig.price}.00</span>
                        </div>
                    <div className="summery-plan-details">
                    {order.plan?.features?.map((item) => {
                        return <div className="features">
                            <div className="features-desc">
                                <span className="feature-icon">✔</span>
                                {item}
                            </div></div>
                    })}
                        </div>
                    <div className="summery-table">
                        <div className="summery-fee">
                            <span className="service-fee">Service Fee❔</span>
                            <span className="service-fee-price">$ 3.00</span>
                        </div>
                    </div>
                    <div className="summery-vat">
                        <span className="service-fee">VAT ❔</span>
                        <span className="service-fee-price">{vat}</span>
                    </div>
                    <div className="summery-total">
                        <span className="service-fee">Total $ </span>
                        <span className="service-fee-price"> {total} </span>
                    </div>

                    <div className="summery-tota-delivery">
                        <span className="delivery-time">Total delivery time </span>
                        <span className="service-fee-price">{order.plan.delivery}</span>
                    </div>
                    <div className="payment flex ">
                <div className="continue-btn flex"><span className="space-holder"> </span>
                    <span className="continue-word">Pay</span>
                    <span className="continue-arrow">➜</span>
                </div>

            </div>
                </div>
                

            </div>
        </div >}</div>
    )

}