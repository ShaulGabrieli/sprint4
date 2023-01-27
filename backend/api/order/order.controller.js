const orderService = require('./order.service.js')
const logger = require('../../services/logger.service')
const asyncLocalStorage = require('../../services/als.service')

async function getOrders(req, res) {
  try {
    logger.debug('Getting Orders')
    const { loggedinUser } = asyncLocalStorage.getStore()
    let buyerOrders
    let sellerOrders
    const { buyerId, sellerId } = req.query
    if (buyerId) {
      console.log('buyerId',buyerId )
      console.log('loggedinUser', loggedinUser)
      const filterBy = {
        "buyer._id": loggedinUser._id,
        "paymentStatus": "paid"
      }
      buyerOrders = await orderService.query(filterBy)
    } 
    if (sellerId) {
      console.log('sellerId',sellerId )

      const filterBy = {
        "seller._id": loggedinUser._id,
  
        "paymentStatus": "paid"
      }
      sellerOrders = await orderService.query(filterBy)
    }
    res.json({ buyerOrders, sellerOrders })
  }
  catch (err) {
    logger.error('Failed to get orders', err)
    res.status(500).send({ err: 'Failed to get orders' })
  }
}

async function getOrderById(req, res) {
  try {
    const orderId = req.params.id
    const order = await orderService.getById(orderId)
    res.json(order)
  } catch (err) {
    logger.error('Failed to get order', err)
    res.status(500).send({ err: 'Failed to get order' })
  }
}

async function addOrder(req, res) {
  try {
    const order = req.body
    const { loggedinUser } = asyncLocalStorage.getStore()
    order.buyer = loggedinUser
    order.createdAt = Date.now()
    order.changeStatusAt = Date.now()
    const addedOrder = await orderService.add(order)
    res.json(addedOrder)
  } catch (err) {
    logger.error('Failed to add order', err)
    res.status(500).send({ err: 'Failed to add order' })
  }
}


async function updateOrder(req, res) {
  try {
    const orderToSave = req.body
    const orderId = req.params.id
    delete orderToSave.createdAt
    delete orderToSave.buyer
    delete orderToSave._id
    orderToSave.changeStatusAt = Date.now()
    const updatedOrder = await orderService.update(orderToSave,orderId)
    res.json(updatedOrder)
  } catch (err) {
    logger.error('Failed to update order', err)
    res.status(500).send({ err: 'Failed to update order' })

  }
}

async function removeOrder(req, res) {
  try {
    const orderId = req.params.id
    const removedId = await orderService.remove(orderId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove order', err)
    res.status(500).send({ err: 'Failed to remove order' })
  }
}

// async function addOrderMsg(req, res) {
//   const { loggedinUser } = req
//   try {
//     const orderId = req.params.id
//     const msg = {
//       txt: req.body.txt,
//       by: loggedinUser
//     }
//     const savedMsg = await orderService.addOrderMsg(orderId, msg)
//     res.json(savedMsg)
//   } catch (err) {
//     logger.error('Failed to update order', err)
//     res.status(500).send({ err: 'Failed to update order' })

//   }
// }

// async function removeOrderMsg(req, res) {
//   const { loggedinUser } = req
//   try {
//     const orderId = req.params.id
//     const { msgId } = req.params

//     const removedId = await orderService.removeOrderMsg(orderId, msgId)
//     res.send(removedId)
//   } catch (err) {
//     logger.error('Failed to remove order msg', err)
//     res.status(500).send({ err: 'Failed to remove order msg' })

//   }
// }

module.exports = {
  getOrders,
  getOrderById,
  addOrder,
  updateOrder,
  removeOrder,
  // addOrderMsg,
  // removeOrderMsg
}
