const orderService = require('./order.service.js')

const logger = require('../../services/logger.service')

async function getGigs(req, res) {
  try {
    logger.debug('Getting Orders')
    const filterBy = {
      // txt: req.query.txt || ''
    }
    const orders = await orderService.query(filterBy)
    res.json(orders)
  } catch (err) {
    logger.error('Failed to get orders', err)
    res.status(500).send({ err: 'Failed to get orders' })
  }
}

async function getGigById(req, res) {
  try {
    const orderId = req.params.id
    const order = await orderService.getById(orderId)
    res.json(order)
  } catch (err) {
    logger.error('Failed to get order', err)
    res.status(500).send({ err: 'Failed to get order' })
  }
}

async function addGig(req, res) {
  const { loggedinUser } = req
  try {
    const order = req.body
    order.owner = loggedinUser
    const addedGig = await orderService.add(order)
    res.json(addedGig)
  } catch (err) {
    logger.error('Failed to add order', err)
    res.status(500).send({ err: 'Failed to add order' })
  }
}


async function updateGig(req, res) {
  try {
    const order = req.body
    const updatedGig = await orderService.update(order)
    res.json(updatedGig)
  } catch (err) {
    logger.error('Failed to update order', err)
    res.status(500).send({ err: 'Failed to update order' })

  }
}

async function removeGig(req, res) {
  try {
    const orderId = req.params.id
    const removedId = await orderService.remove(orderId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove order', err)
    res.status(500).send({ err: 'Failed to remove order' })
  }
}

async function addGigMsg(req, res) {
  const { loggedinUser } = req
  try {
    const orderId = req.params.id
    const msg = {
      txt: req.body.txt,
      by: loggedinUser
    }
    const savedMsg = await orderService.addGigMsg(orderId, msg)
    res.json(savedMsg)
  } catch (err) {
    logger.error('Failed to update order', err)
    res.status(500).send({ err: 'Failed to update order' })

  }
}

async function removeGigMsg(req, res) {
  const { loggedinUser } = req
  try {
    const orderId = req.params.id
    const { msgId } = req.params

    const removedId = await orderService.removeGigMsg(orderId, msgId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove order msg', err)
    res.status(500).send({ err: 'Failed to remove order msg' })

  }
}

module.exports = {
  getGigs,
  getGigById,
  addGig,
  updateGig,
  removeGig,
  addGigMsg,
  removeGigMsg
}
