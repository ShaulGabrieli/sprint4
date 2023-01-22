import { useEffect, useState } from 'react'
import { loadOrders } from '../store/order.actions.js'

import { useSelector } from 'react-redux'
import { GigPreview } from '../cmps/gig-preview.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'


export function GigOrderList() {
    const orders = useSelector(storeState => storeState.orderModule.userOrders)

    useEffect(() => {

        loadOrders()


    }, [])




    console.log('orders', orders)


    return (
        //todo: loading
        <div> {!orders && <div> loading </div> || <div className="main-order-list-container">
            <div className="main-order-list-container">
                <div className="order-list-container">
                    <section className="my-orders-header">
                        <div className="order-title-section fs24">My orders</div>
                        <div className="order-subtitle-section fs16">
                            Track your purchases and manage your orders with ease</div>
                    </section>
                    <section className="my-orders-container">
                        <div className="my-orders">
                            <ul className="gig-orders-list gig-list ">
                                {orders.map((order, idx) => (
                                    <GigPreview 
                                        id={idx}
                                        gig={order.gig}

                                    />
                                ))}
                            </ul>


                        </div>

                    </section>
                </div>

            </div></div>}</div>

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