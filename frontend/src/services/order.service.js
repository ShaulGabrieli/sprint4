import { httpService } from './http.service'

import { userService } from './user.service'
// import { userService } from './user.service.local'

const ORDER_KEY = 'order'

export const orderService = {
    query,
    save,
    getById,
    remove
}

async function query(filterBy) {
    // console.log('filterByfilterBy', filterBy)
    try {
       
        if (!filterBy) return httpService.get(ORDER_KEY)
        const { buyerId } = filterBy
        let queryParam = ''
        // console.log('buyerId', buyerId)
        if (buyerId) {
            queryParam += `?buyerId=${buyerId}`
        }
        const { sellerId } = filterBy
        if (sellerId) {
            queryParam += queryParam? `&sellerId=${sellerId}`: `?sellerId=${sellerId}`
        }
        return httpService.get(ORDER_KEY + queryParam)
    } catch (err) {
        console.log('Cannot load orders', err)
        throw err
    }
}

async function getById(orderId) {
    try {
        const order = await httpService.get(ORDER_KEY, orderId)
        return order
    } catch (err) {
        console.log('Cannot get order', err)
        throw err
    }
}


async function remove(orderId) {
    try {
        await await httpService.delete(ORDER_KEY, orderId)
    } catch (err) {
        console.log('Cannot remove order', err)
        throw err
    }
}

async function save(order) {
    try {
        if (order._id) {
            return  httpService.put(`${ORDER_KEY}/${order._id}` , order)
        } else {
            if (!userService.getLoggedinUser()) {
                throw "Please login , no user found!"
            }
            
            return  httpService.post(ORDER_KEY, order)
        }
    } catch (err) {
        console.log('Cannot save order', err)
        throw err
    }
}

