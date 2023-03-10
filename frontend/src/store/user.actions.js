// import { userService } from "../services/user.service.local.js";
import { userService } from "../services/user.service.js";
import { store } from '../store/store.js'

import { showErrorMsg } from '../services/event-bus.service.js'
import { LOADING_DONE, LOADING_START } from "./system.reducer.js";
import { REMOVE_USER, SET_USER, SET_USERS, SET_WATCHED_USER,SET_WISHLIST } from "./user.reducer.js";

export async function loadUsers() {
    try {
        store.dispatch({ type: LOADING_START })
        const users = await userService.getUsers()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
        throw err
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
}

export async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })
    } catch (err) {
        console.log('UserActions: err in removeUser', err)
        throw err
    }
}

export async function getWishlist() {
    try {
        console.log('userService.getLoggedinUser()', userService.getLoggedinUser())
        if (!userService.getLoggedinUser()){

            const wishlist = []
            store.dispatch({ type: SET_WISHLIST, wishlist })
            return wishlist
        }
        const userId = userService.getLoggedinUser()._id
        const wishlist = await userService.getWishlist(userId)
        store.dispatch({ type: SET_WISHLIST, wishlist })
        return wishlist
    } catch (err) {
        console.log('UserActions: err in getWishlist', err)
        throw err
    }
}

export async function addToWishlist(gig){
    try {
        const userId = userService.getLoggedinUser()?._id
        const wishlist = await userService.addToWishlist(gig,userId)
        store.dispatch({ type: SET_WISHLIST, wishlist })
        return wishlist
    } catch (err) {
        console.log('UserActions: err in addToWishlist', err)
        throw err
    }
 
}

export async function removeFromWishlist(gigId){
    try {
        const userId = userService.getLoggedinUser()?._id
        const wishlist = await userService.removeFromWishlist(gigId,userId)
        store.dispatch({ type: SET_WISHLIST, wishlist })
        return wishlist
    } catch (err) {
        console.log('UserActions: err in removeFromWishlist', err)
        throw err
    }

}


export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        return user
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        return user
    } catch (err) {
        console.log('Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({
            type: SET_USER,
            user: null
        })
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}

export async function loadUser(userId) {
    try {
        const user = await userService.getById(userId);
        store.dispatch({ type: SET_WATCHED_USER, user })
    } catch (err) {
        showErrorMsg('Cannot load user')
        console.log('Cannot load user', err)
         throw err
    }
}