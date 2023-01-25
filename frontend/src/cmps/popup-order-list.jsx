import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loadOrders } from '../store/order.actions.js'
import { OrderStatus } from './order-status.jsx'

export function PopupOrderList() {

    const orders = useSelector(storeState => storeState.orderModule.userOrders)

    const navigate = useNavigate()
    console.log('oreders from popup', orders);
    useEffect(() => {
        loadOrders()
    }, [])


    if (orders?.length === 0) return (<div> <h1>No Orders Yet!</h1> </div>)
    return (
        <div className="popup-gig-container flex column">

            {orders?.map((order) => (
                <section className='flex column'>
                    <div className="subsub flex row">
                        <div> <img className="popup-gig-img" id="order-img-list" src={order.gig.imgUrls[0]} alt="" /></div>
                        <div className="popup-gig-subcontainer flex column space-between">
                            <div className="popup-gig-title">{order.gig.title}</div>
                            <div className="popup-status-seller-container flex row space-between">
                                <div className="order-gig-byseller">by {order.seller.fullname}</div>
                                <OrderStatus status={order.status} />
                            </div>
                        </div>
                    </div>
                    <hr className='pop-up-hr' />
                </section>
            )).slice(0, 3)}
            <button onClick={() => navigate('/orders')}>More</button>
        </div>
    )
}