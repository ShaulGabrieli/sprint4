const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getOrders, getOrderById, addOrder, updateOrder, removeOrder } = require('./order.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, requireAuth, getOrders)
router.get('/:id', log, requireAuth, getOrderById)
router.post('/', log, requireAuth, addOrder)
router.put('/:id', log, requireAuth, updateOrder)
router.delete('/:id', log, requireAuth, removeOrder)
// router.delete('/:id', requireAuth, requireAdmin, removeGig)

// router.post('/:id/msg', requireAuth, addGigMsg)
// router.delete('/:id/msg/:msgId', requireAuth, removeGigMsg)

module.exports = router