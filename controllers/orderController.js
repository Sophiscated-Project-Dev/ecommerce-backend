const {BadRequestError} = require("../errors")
const {StatusCodes} = require('http-status-codes')
const Order = require('../models/Order')
const OrderItem = require('../models/OrderItem')

const newOrder = async (req, res) => {
    const user = req.user
    const order = await Order.create(req.body)
    // const order = new Order()
    // const items = req.body.items
    // if (!user) {
    //     throw new BadRequestError('customer not specified')
    // }
    res.status(StatusCodes.CREATED).json(req.body)
}

const allOrders = async (req, res) => {
    const orders =  await Order.find()
    res.status(StatusCodes.CREATED).json({orders})
}

module.exports = {
    newOrder,
    allOrders,
}