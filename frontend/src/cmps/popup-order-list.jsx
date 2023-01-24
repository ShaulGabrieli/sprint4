import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadOrders } from '../store/order.actions.js'


export function PopupOrderList() {

    const orders = useSelector(storeState => storeState.orderModule.userOrders)
    useEffect(() => {
        loadOrders()
    }, [])



    return (

        <div>
            {orders.map((order, idx) => (
                <div className="popup-gig-container flex column">
                    <div className="popup-gig-img"> <img src={order.gig.imgUrls[0]} alt="" /></div>

                    <div className="popup-gig-subcontainer">
                        {/* <div className="popup-gig-title"> {order.gig.title} </div> */}
                        <div className="popup-status-seller-container flex row">
                            <div className="order-gig-byseller">by seller</div>
                            <div className="order-gig-status">gig status</div>
                        </div>
                    </div>
                </div>))}
        </div>
    )

}