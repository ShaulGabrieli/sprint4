import { orderService } from "../services/order.service.local.js";
import { userService } from "../services/user.service.js";
import { store } from './store.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
// import {  } from "./user.reducer.js";
import { SET_USER_ORDERS, ADD_ORDER, SET_CURRENT_ORDER, UPDATE_ORDER, SET_SELLER_ORDERS } from "./order.reducer.js";
import { utilService } from "../services/util.service.js";

export async function loadOrders() {
    //todo: add seller orders
    try {
        const filterBy = { buyerId : userService.getLoggedinUser()?._id, sellerId : userService.getLoggedinUser()?._id }
        const orders = await orderService.query(filterBy)
        console.log('Orders from DB:', orders)
        store.dispatch({
            type: SET_USER_ORDERS,
            orders: orders.buyerOrders
        })
        store.dispatch({
            type: SET_SELLER_ORDERS,
            orders: orders.sellerOrders
        })
        return orders
    } catch (err) {
        console.log('Cannot load orders', err)
        throw err
    }
}

export async function addOrder(order, plan) {
    try {
        order.plan = plan
        order.paymentStatus = 'unpayed'
        // order._id= utilService.makeId()
        const savedOrder = await orderService.save(order)
        console.log('Added Order', savedOrder)
        store.dispatch({
            type: ADD_ORDER,
            order
        })
        return savedOrder
    } catch (err) {
        console.log('Cannot add order', err)
        throw err
    }
}

export async function payedOrder(order) {
    order.paymentStatus = 'payed'
    const payedOrder = await orderService.save(order)
    console.log('payed order', payedOrder)
}

export async function loadOrder(orderId) {
    try {
        const order = await orderService.getById(orderId)
        console.log('Loaded Order', order)
        store.dispatch({
            type: SET_CURRENT_ORDER,
            order
        })
        return order
    } catch (err) {
        console.log('Cannot load order', err)
        throw err
    }
}

export async function updateOrder(order) {
    try {
        const savedOrder = await orderService.save(order)
        store.dispatch({type:UPDATE_ORDER, order: savedOrder})
        return savedOrder
    } catch (err) {
        console.log('Cannot update order', err)
        throw err
    }
}