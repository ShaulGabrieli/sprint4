import Select from 'react-select'
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
import BasicTabs from '../cmps/user-details-tabs'
import { Loading } from '../cmps/loading'
import { GigPreview } from '../cmps/gig-preview'
import { sellerActions } from '../cmps/global-const/global-const'
import { loadGigs } from '../store/gig.actions'

export function UserDetails() {
    const params = useParams()
    const user = useSelector((storeState) => storeState.userModule.user)
    const userOrders = useSelector((storeState) => storeState.orderModule.userOrders)
    const sellerOrders = useSelector((storeState) => storeState.orderModule.sellerOrders)
    const gigs = useSelector((storeState) => storeState.gigModule.gigs)
    const [sellerGigs, setSellerGigs] = useState(getSellerGigs(user._id))


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

     function getSellerGigs(userId) {
        const sellerGigs = gigs.filter((gig) => gig.owner._id === userId)
        // const sellerGigs = await loadGigs()
    //    return  sellerGigs.filter((gig) => gig.owner._id === userId)
       return  sellerGigs

        
    }

    function onUserUpdate(user) {
        showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
        store.dispatch({ type: 'SET_WATCHED_USER', user })
    }

    function changeStatusColor(currStatus) {
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

    if (!userOrders)
        return (
            <div className='loading-spinner flex'>
                {' '}
                <Loading />{' '}
            </div>
        )
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
                    {/* <BasicTabs /> */}

                    <div className='seller-options'>
                        <h1>Seller options</h1>
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
                                {sellerOrders?.map((order, idx) => {
                                    return (
                                        <tr id={idx}>
                                            <td>{order.buyer.fullname}</td>
                                            <td> {order.gig._id}</td>
                                            <td>{order.gig.title}</td>
                                            <td className={changeStatusColor(order.status)}>{order.status}</td>
                                            <td>
                                               {order.status === 'pending' && <button onClick={() => onChangeStatus(order, 'approved')}>Approved</button>}
                                                {order.status === 'approved' && <button onClick={() => onChangeStatus(order, 'in progress')}>In progress</button> }
                                                {order.status === 'in progress' &&<button onClick={() => onChangeStatus(order, 'done')}>Done</button>}
                                                 <button onClick={() => onChangeStatus(order, 'rejected')}>Rejected</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className='seller gigs'>
                        <h1>Seller gigs</h1>
                        <div className='gig-seller-list'>
                            <ul className='gig-list'>
                                <Link to={'/gig/edit'}>
                                    <li className='add-gig-btn add-new-gig'> Create a new Gig </li>
                                </Link>
                                {sellerGigs?.map((gig, idx) => (
                                    <GigPreview id={idx} gig={gig} />
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            </section>
        </section>
    )
}

