import { httpService } from '../http.service'
import { storageService } from '../async-storage.service'
// import { userService } from './user.service'
import { userService } from './user.service.local'

const ORDER_KEY = 'order'

export const orderService = {
    query,
    save,
    getById,
    remove
}

async function query(filterBy) {
    console.log('filterByfilterBy', filterBy);
    try {
        const orders = await storageService.query(ORDER_KEY)
        let buyerOrders
        let sellerOrders

        if (!filterBy) return orders
        const { buyerId } = filterBy
        console.log('buyerId', buyerId)
        if (buyerId) {
             buyerOrders = orders.filter(order => order.buyer._id === buyerId && order.paymentStatus === 'paid')
            // return buyerOrders
        }
        const { sellerId } = filterBy
        if (sellerId) {
            sellerOrders = orders.filter(order => order.seller._id === sellerId)
            // return sellerOrders
        }
        return {buyerOrders, sellerOrders}
    } catch (err) {
        console.log('Couldnt load orders', err)
        throw err
    }
}

async function getById(orderId) {
    try {
        const order = await storageService.get(ORDER_KEY, orderId)
        return order
    } catch (err) {
        console.log('Couldnt get order', err)
        throw err
    }
}

async function remove(orderId) {
    try {
        await storageService.remove(ORDER_KEY, orderId)
    } catch (err) {
        console.log('Couldnt remove order', err)
        throw err
    }
}

async function save(order) {
    try {
        if (order._id) {
            return await storageService.put(ORDER_KEY, order)
        } else {
            if (!userService.getLoggedinUser()) {
                throw "Please login , no user found!"
            }
            order.buyer = userService.getLoggedinUser()
            return await storageService.post(ORDER_KEY, order)
        }
    } catch (err) {
        console.log('Couldnt save order', err)
        throw err
    }
}

