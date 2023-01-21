import { PaymentTabs } from '../cmps/payment-tabs.jsx'
// import {  } from '../store/order.actions.js'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { loadOrder } from '../store/order.actions.js'

import { useParams } from 'react-router-dom'
import { CreditCardForm } from '../cmps/credit-card-form.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'




export function GigPayment() {
    const order = useSelector(storeState => storeState.orderModule.order)
    const [vat, setVat] = useState(0)
    const [total, setTotal] = useState(0)
    const [creditTransaction, setCreditTransaction] = useState(false)
    
    const { id } = useParams()

    useEffect(() => {
        loadOrder(id)
        setVat(getVat())
        setTotal(totalPay())
    }, [])

    function getVat() {
        const vat = +(order.gig.price * 0.17)
        return vat.toFixed(2)
    }

    function totalPay() {
        console.log(' order.gig.price', order.gig.price)
        const total = +getGigPrice() + +getVat() + 3
        return total.toFixed(2)
    }

    function getGigPrice() {
        switch (order.plan.title) {
            case 'Basic':
                return +(order.gig.price).toFixed(2)
            case 'Standard':
                return +(order.gig.price * 1.5).toFixed(2)
            case 'Premium':
                return +(order.gig.price * 2).toFixed(2)
    }
}


    function triggerSubmit() {
        if(!document.getElementById('submit-credit').disabled){
            document.getElementById('submit-credit').click()
        }
        else
        {
            showErrorMsg("Please fill all the fields")
        }
    }

    return ( <div>{!order && <div>Loading...</div> ||
        <div className="main-payment-area flex space-between">


            <CreditCardForm className="payment-area" type="submit" gig={order.gig} setCreditTransaction={setCreditTransaction} triggerSubmit={triggerSubmit}/>

            <div className="order-details-container">

          
                <div className="payment-summery">
                    

                     <div className="top-payment-summery">
                    <div className="summery-title flex">
                        <img src={order.gig.imgUrl} className="order-img-thumbnail"/>
                        <span className="summery-title-text">{order.gig.title}</span>
                    </div>
                    <div className="summery-plan flex space-between">
                        <span className="summery-plan-text">{order.plan.title}</span>
                        <span className="summery-plan-price">${getGigPrice()}</span>
                        </div>
                    <div className="summery-plan-details">
                    {order.plan?.features?.map((item) => {
                        return <div className="payment-plan-features">
                            <div className="features-desc-plan">
                                <span className="feature-icon">✔</span>
                                {item}
                            </div></div>
                    })}
                        </div>
                        </div>
                        
                    <div className="summery-table ">
                        <div className="summery-fee flex  space-between">
                            <span className="service-fee">Service Fee❔</span>
                            <span className="service-fee-price">$ 3.00</span>
                        </div>
                    
                    <div className="summery-vat  flex  space-between">
                        <span className="service-fee">VAT ❔</span>
                        <span className="service-fee-price">{vat}</span>
                    </div>
                    
                    <hr className="summery-line"/>
                    <div className="summery-total flex space-between">
                        <span className="service-fee">Total  </span>
                        <span className="service-fee-price">${total} </span>
                    </div>

                    <div className="summery-tota-delivery  flex space-between">
                        <span className="delivery-time">Total delivery time </span>
                        <span className="service-fee-price">{order.plan.delivery}</span>
                    </div>
                    </div>
                    <div className="payment-plan-btn flex ">
                <div className="pay-btn flex" onClick={triggerSubmit}>
                    <span className="pay-btn-txt"  >Confirm & Pay</span>
                    {/* <span className="continue-arrow">➜</span> */}
                </div>

            </div>
                </div>
                

            </div>
        </div >}</div>
    )

}