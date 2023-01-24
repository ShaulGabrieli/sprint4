import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { loadUser } from '../store/user.actions'
import { store } from '../store/store'
import { showSuccessMsg } from '../services/event-bus.service'
import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from '../services/socket.service'

export function UserDetails() {
    const params = useParams()
    const user = useSelector((storeState) => storeState.userModule.user)

    // useEffect(() => {
    //     loadUser(params.id)

    //     socketService.emit(SOCKET_EMIT_USER_WATCH, params.id)
    //     socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

    //     return () => {
    //         socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
    //     }
    // }, [])

    function onUserUpdate(user) {
        showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
        store.dispatch({ type: 'SET_WATCHED_USER', user })
    }
console.log('userrr', user);
    return (
        <section className='user-details main-container full'>
            <div className='user-main-details'>
                <div className='profile-img-container'>
                    <img className='profile-img' src={user.imgUrl} />
                </div>
                <h1>{user.fullname}</h1>
                <hr />
                <section className='user-details-bottom'>
                    <div className='location-profile'>
                        {/* <!-- License: PD. Made by Steve Schoger: https://www.zondicons.com/ --> */}
                        <span>
                            <svg width='20px' height='20px' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                                <path d='M10 20S3 10.87 3 7a7 7 0 1 1 14 0c0 3.87-7 13-7 13zm0-11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' />
                            </svg>
                            From
                        </span>
                        {/* <span>{user.country}</span> */}
                    </div>
                    <div className='date-created'>
                        <span>Member since</span>
                        {/* <span>{user.createdAt}</span> */}
                    </div>
                </section>
            </div>
            <div className='user-create-gig'>
                <h1>Seller options:</h1>

            </div>
            <div className='user-more-details'>
                <h1>Buyer orders:</h1>
            </div>
        </section>
    )
}
