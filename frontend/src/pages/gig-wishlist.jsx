import { useEffect, useState } from 'react'
import { loadOrders } from '../store/order.actions.js'
import { getWishlist } from '../store/user.actions.js'
import { useSelector } from 'react-redux'
import { GigPreview } from '../cmps/gig-preview.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'


export function GigWishlist() {
   const wishlist = useSelector(storeState => storeState.userModule.user.wishlist)
  
    useEffect(() => {
        getWishlist()
    }, [])

    return (
        //todo: loading
        <div> {!wishlist && <div> loading </div> || 
            <div className="main-order-list-container main-container">
                <div className="order-list-container">
                    <section className="my-orders-header">
                        <div className="order-title-section fs32">My lists</div>
                        <div className="order-subtitle-section fs16">
                      <p> Organize your go-to freelancers and favorite services into custom lists you can
                         easily access and share with your team.</p> </div>
                    </section>
                    <section className="my-orders-container">
                        <div className="my-orders">
                            <ul className="gig-orders-list gig-list ">
                                {wishlist.map((wish, idx) => (
                                    <GigPreview 
                                    orderPagePreview={false} 
                                        id={idx}
                                        gig={wish.gig}
                                        // status={order.status}

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