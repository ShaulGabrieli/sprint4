import { useEffect, useState } from 'react'
import { loadOrders } from '../store/order.actions.js'
import { getWishlist } from '../store/user.actions.js'
import { useSelector } from 'react-redux'
import { GigPreview } from '../cmps/gig-preview.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
import { Loading } from './loading.jsx'


export function GigOrderList() {
    let previewList = []
    const orders = useSelector(storeState => storeState.orderModule.userOrders)
   // const wishlist = useSelector(storeState => storeState.userModule.user.wishlist)
  

    // async function getOrders() {
    //     try {
    //         previewList = await loadOrders()
           
    //     }
    //     catch (err) {
    //         showErrorMsg('Cannot load orders')
    //         throw err
    //     }
    // }

    // async function getWishlist() {
    //     try {
    //         previewList = await getWishlist()
             
    //     }
    //     catch (err) {
    //         showErrorMsg('Cannot load wishlist')
    //         throw err
    //     }
    // }


    useEffect(() => {
        loadOrders()
    }, [])


    return (
        //todo: loading
        <div> {!orders && <div className="loading-spinner flex"> <Loading/> </div> || 
            <div className="main-order-list-container main-container">
                <div className="order-list-container">
                    <section className="my-orders-header">
                        <div className="order-title-section fs32">My orders</div>
                        <div className="order-subtitle-section fs16">
                            Track your purchases and manage your orders with ease</div>
                    </section>
                    <section className="my-orders-container">
                        <div className="my-orders">
                            <ul className="gig-orders-list gig-list ">
                                {orders.map((order, idx) => (
                                 
                                    <GigPreview 
                                    orderPagePreview={true} 
                                        id={idx}
                                        gig={order.gig}
                                        status={order.status}

                                    />
                                ))}
                            </ul>
                        </div>
                    </section>
                </div>
            </div>}</div>

    )
}







// import { PopupMenu } from "../cmps/popup-menu";
{/* <PopupMenu top={<h2>Popup in ABout</h2>}>
                <span>Lorem ipsum dolor sit amet.</span>
                <span>Lorem ipsum dolor sit amet.</span>
                <span>Lorem ipsum dolor sit amet.</span>
            </PopupMenu> */}


            // .popup-menu {
//     width: 300px;
//     height: 400px;
//     position: fixed;
//     inset: 0;
//     margin: auto;
//     background-color: white;
//     border: red 2px solid;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
// }