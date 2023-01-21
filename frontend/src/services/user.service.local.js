import { store } from '../store/store'
import { storageService } from './async-storage.service'
import { utilService } from './util.service.js'
import { REMOVE_USER, SET_USER, SET_USERS, SET_WATCHED_USER } from "../store/user.reducer.js";

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

_createUsers()
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
    changeScore
}

window.userService = userService


function getUsers() {
    return storageService.query('user')

}

function _createUsers(){
    let users = utilService.loadFromStorage('user')
    if (!users || !users.length) {
        users= require('../data/users.json')
        console.log('users', users)
        users = users.map(user => {
            user.createdAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24 * 7 * 52)
            // user._id = utilService.makeId()
            return user
        })
        utilService.saveToStorage('user', users)
    }
    return users
}

async function getById(userId) {
    const user = await storageService.get('user', userId)

    return user
}

function remove(userId) {
    return storageService.remove('user', userId)
}

async function update({_id, score}) {
    const user = await storageService.get('user', _id)
    user.score = score
    await storageService.put('user', user)

    // const user = await httpService.put(`user/${_id}`, {_id, score})
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    const users = await storageService.query('user')
    const user = users.find(user => user.username === userCred.username)
    // const user = await httpService.post('auth/login', userCred)
    if (user) {
        // socketService.login(user._id)
        return saveLocalUser(user)
    }
}
async function signup(userCred) {
    userCred.score = 10000
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await storageService.post('user', userCred)
    // const user = await httpService.post('auth/signup', userCred)
    // socketService.login(user._id)
    return saveLocalUser(user)
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // socketService.logout()
    // return await httpService.post('auth/logout')
}

async function changeScore(by) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.score = user.score + by || by
    await update(user)
    return user.score
}


function saveLocalUser(user) {
    user = {_id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, score: user.score}
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}


;(async ()=>{
    const users = await userService.getUsers()
    const irene = users.find(user => user.username === 'irene')
    let user
    if (!irene) {
        user = await userService.signup({fullname: 'Irene', username: 'irene', password:'123', isAdmin: false})
    }
    else
    {
         user = await userService.login({username : 'irene', password: '123'})
        
    }
    store.dispatch({
        type: SET_USER,
        user
    })
    // await userService.signup({fullname: 'Shaul', username: 'Shaul', password:'123', isAdmin: false})
    // await userService.signup({fullname: 'Lior', username: 'Lior', password:'123', isAdmin: false})
    // await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
    // await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
})()



