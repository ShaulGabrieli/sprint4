import { storageService } from './async-storage.service'
import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'



export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    // changeScore,
    addToWishlist,
    getWishlist,
    removeFromWishlist,
}

window.userService = userService


function getUsers() {
    // return storageService.query('user')
    return httpService.get(`user`)
}


async function getById(userId) {
    // const user = await storageService.get('user', userId)
    const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    // return storageService.remove('user', userId)
    return httpService.delete(`user/${userId}`)
}

async function update({ _id,fullname ,score, wishlist }) {
    // const user = await storageService.get('user', _id)
    // user.score = score
    // user.wishlist = wishlist
    // await storageService.put('user', user)
    const user = await httpService.put(`user/${_id}`, { _id,fullname, score, wishlist })
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    // const users = await storageService.query('user')
    // const user = users.find(user => user.username === userCred.username)
    const user = await httpService.post('auth/login', userCred)
    if (user) {
        // socketService.login(user._id)
        return saveLocalUser(user)
    }
}
async function signup(userCred) {
    userCred.score = 10000
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    userCred.wishlist = []
    // const user = await storageService.post('user', userCred)
    const user = await httpService.post('auth/signup', userCred)
    // socketService.login(user._id)
    return saveLocalUser(user)
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // socketService.logout()
    return await httpService.post('auth/logout')
}

// async function changeScore(by) {
//     const user = getLoggedinUser()
//     if (!user) throw new Error('Not loggedin')
//     user.score = user.score + by || by
//     await update(user)
//     return user.score
// }


function saveLocalUser(user) {
    user = {
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        imgUrl: user.imgUrl,
        country: user.country,
    }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

async function addToWishlist(gig, userId) {

    try {
        const user = await getById(userId)
        user.wishlist = [...user.wishlist, gig]
        await update(user)
        return user.wishlist
    }
    catch (err) {
        console.log('cant add to wishlist', err)
        throw err
    }

}
async function getWishlist(userId) {
    try {
        const user = await getById(userId)
        return user.wishlist
    }
    catch (err) {
        console.log('cant get wishlist', err)
        throw err
    }
}

async function removeFromWishlist(gigId, userId) {
    try {
        const user = await getById(userId)
        const idx = user.wishlist.findIndex(gig => gig._id === gigId)
        user.wishlist.splice(idx, 1)
        await update(user)
        return user.wishlist
    }
    catch (err) {
        console.log('cant remove from wishlist', err)
        throw err
    }
}

// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()



