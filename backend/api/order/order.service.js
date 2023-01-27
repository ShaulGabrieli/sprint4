const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId


async function query(filterBy = {}) {
    console.log('filterBy', filterBy)
    try {
        // const criteria = {
        //     vendor: { $regex: filterBy.txt, $options: 'i' }
        // }
        const collection = await dbService.getCollection('orders')
        var orders = await collection.find(filterBy).toArray()
        return orders
    } catch (err) {
        logger.error('cannot find orders', err)
        throw err
    }
}

async function getById(orderId) {
    try {
        const collection = await dbService.getCollection('orders')
        const order = collection.findOne({ _id: ObjectId(orderId) })
        return order
    } catch (err) {
        logger.error(`Cannot get order ${orderId}`, err)
        throw err
    }
}

async function remove(orderId) {
    try {
        const collection = await dbService.getCollection('orders')
        await collection.deleteOne({ _id: ObjectId(orderId) })
        return orderId
    } catch (err) {
        logger.error(`Cannot remove order ${orderId}`, err)
        throw err
    }
}

async function add(order) {
    try {

        const collection = await dbService.getCollection('orders')
        await collection.insertOne(order)
        return order
    } catch (err) {
        logger.error('Cannot insert order', err)
        throw err
    }
}

async function update(order, orderId) {
    try {
        let orderToSave = order
        const collection = await dbService.getCollection('orders')
        order = await collection.findOneAndUpdate({ _id: ObjectId(orderId) }, { $set: order }, { returnNewDocument: true })
        return order
    } catch (err) {
        logger.error(`Cannot update order ${orderId}`, err)
        throw err
    }
}

// async function addOrderMsg(orderId, msg) {
//     try {
//         msg.id = utilService.makeId()
//         const collection = await dbService.getCollection('orders')
//         await collection.updateOne({ _id: ObjectId(orderId) }, { $push: { msgs: msg } })
//         return msg
//     } catch (err) {
//         logger.error(`Cannot add order msg ${orderId}`, err)
//         throw err
//     }
// }

// async function removeOrderMsg(orderId, msgId) {
//     try {
//         const collection = await dbService.getCollection('orders')
//         await collection.updateOne({ _id: ObjectId(orderId) }, { $pull: { msgs: { id: msgId } } })
//         return msgId
//     } catch (err) {
//         logger.error(`cannot add order msg ${orderId}`, err)
//         throw err
//     }
// }

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    // addOrderMsg,
    // removeOrderMsg
}
