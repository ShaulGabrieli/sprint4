import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { loadUser } from '../store/user.actions'
import { store } from '../store/store'
import { showSuccessMsg } from '../services/event-bus.service'
import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from '../services/socket.service'
import { orderService } from '../services/local/order.service.local'
import { updateOrder } from '../store/order.actions'
import { loadOrders } from '../store/order.actions.js'

export function UserDetails() {
    const params = useParams()
    const user = useSelector((storeState) => storeState.userModule.user)
    const userOrders = useSelector((storeState) => storeState.orderModule.userOrders)
    const sellerOrders = useSelector((storeState) => storeState.orderModule.sellerOrders)
    console.log('sellerOrders', sellerOrders)

    // useEffect(() => {
    //     loadUser(params.id)

    //     socketService.emit(SOCKET_EMIT_USER_WATCH, params.id)
    //     socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

    //     return () => {
    //         socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
    //     }
    // }, [])

    useEffect(() => {
        loadOrders()
        window.scrollTo(0, 0)
    }, [])

    async function onChangeStatus(order, updatedStatus) {
        try {
            const updatedOrder = { ...order, status: updatedStatus }
            await updateOrder(updatedOrder)
        } catch (err) {
            console.log('cannot change status', err)
        }
    }

    function onUserUpdate(user) {
        showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
        store.dispatch({ type: 'SET_WATCHED_USER', user })
    }

    function changeStatusColor(currStatus) {
        console.log('currStatusssssssssssss', currStatus);
        switch (currStatus) {
            case 'pending':
                return 'status-blue'
            case 'approved':
                return 'status-green'

            case 'in progress':
                return 'status-yellow'

            case 'done':
                return 'status-orange'

            case 'rejected':
                return 'status-red'
            default:
                return ''
        }
    }

    if (!userOrders) return <div>Loading ...</div>
    return (
        <section className='user-details main-container full'>
            <section className='user-details-section flex'>
                <div className='user-main-details'>
                    <div className='profile-img-container'>
                        <img className='profile-img' src={user.imgUrl} />
                    </div>
                    <h1>{user.fullname}</h1>

                    <hr />
                    <section className='user-details-bottom'>
                        <div className='location-profile flex space-between'>
                            {/* <!-- License: PD. Made by Steve Schoger: https://www.zondicons.com/ --> */}
                            <span>
                                <svg className='from-icon' width='12px' height='12px' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                                    <path d='M10 20S3 10.87 3 7a7 7 0 1 1 14 0c0 3.87-7 13-7 13zm0-11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' />
                                </svg>
                                From
                            </span>
                            <span>Israel</span>
                            {/* <span>{user.country}</span> */}
                        </div>
                        <div className='date-created flex space-between'>
                            <span>Member since</span>
                            <span>20.1.2023</span>
                            {/* <span>{user.createdAt}</span> */}
                        </div>
                    </section>
                </div>
                <section className='user-orders-manage-section flex column'>
                    <div className='seller-options'>
                        <h1>Seller options:</h1>
                        <table className='seller-list'>
                            <thead>
                                <tr>
                                    <th>Buyer</th>
                                    <th>Gig Id</th>
                                    <th>Gig title</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='seller-orders'>
                                {sellerOrders.map((order) => {
                                    return (
                                        <tr>
                                            <td>{order.buyer.fullname}</td>
                                            <td> {order.gig._id}</td>
                                            <td>{order.gig.title}</td>
                                            <td>{order.status}</td>
                                            <td>
                                                <button onClick={() => onChangeStatus(order, 'approved')}>Approved</button>{' '}
                                                <button onClick={() => onChangeStatus(order, 'in progress')}>In progress</button> <button onClick={() => onChangeStatus(order, 'done')}>Done</button>{' '}
                                                <button onClick={() => onChangeStatus(order, 'rejected')}>Rejected</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        {/* <ol className='orders-list clean-list'>
                            {sellerOrders.map((order) => {
                                return (
                                    <li>
                                        Buyer name: {order.buyer.fullname} ,Gig title: {order.gig.title} , Status: {order.status}, Change status:{' '}
                                        <button onClick={() => onChangeStatus(order, 'approved')}>Approved</button> <button onClick={() => onChangeStatus(order, 'in progress')}>In progress</button>{' '}
                                        <button onClick={() => onChangeStatus(order, 'done')}>Done</button> <button onClick={() => onChangeStatus(order, 'rejected')}>Rejected</button>
                                    </li>
                                )
                            })}
                        </ol> */}
                    </div>
                    <div className='buyer-orders'>
                        <h1>Your orders:</h1>
                        <ul className='orders-list clean-list'>
                            {userOrders.map((order) => {
                                return (
                                    <li>
                                        <Link to={`/gig/${order.gig._id}`}>
                                            Gig title: {order.gig.title} ,  Status: <span className={changeStatusColor(order.status)}>{order.status}</span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                        {/* <iframe 
            style={{
                background: "#FFFFFF",
                border: "none",
                borderRadius: "2px",
                boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)"
            }} 
            width="640" 
            height="480" 
            src={`https://charts.mongodb.com/charts-sprint4-txzkw/embed/charts?id=63d2e8cb-7df1-415a-8cc0-8dfade37b3a9&filter={"seller.fullname":"${user.fullname}"}&maxDataAge=3600&theme=light&autoRefresh=true`}
        /> */}
                    </div>
                </section>
            </section>
        </section>
    )
}
