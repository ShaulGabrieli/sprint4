import { PaymentTabs } from '../cmps/payment-tabs.jsx'

export function GigPayment() {

    return (
        <div className="main-payment-area flex space-between">

            <div className="payment-area">payment options</div>


            <div className="order-details-container">order area

                {/* <PaymentTabs /> */}





                <div className="payment-summery">

                    <div className="summery-table">
                        <div className="summery-fee">
                            <span className="service-fee">Service Fee❔</span>
                            <span className="service-fee-price">$ 0.00</span>
                        </div>
                    </div>
                    <div className="summery-vat">
                        <span className="service-fee">VAT ❔</span>
                        <span className="service-fee-price">$ 0.00</span>
                    </div>
                    <div className="summery-total">
                        <span className="service-fee">Total</span>
                        <span className="service-fee-price">$ 0.00</span>
                    </div>

                    <div className="summery-tota-delivery">
                        <span className="delivery-time">Total delivery time</span>
                        <span className="service-fee-price">0 days</span>
                    </div>

                </div>


            </div>
        </div >
    )

}