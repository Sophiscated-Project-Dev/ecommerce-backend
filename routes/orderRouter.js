const express = require('express')

const {
    newOrder,
    allOrders
} = require('../controllers/orderController')

const router = express.Router()

router.route("/")
.post(newOrder)
.get(allOrders)

module.exports = router