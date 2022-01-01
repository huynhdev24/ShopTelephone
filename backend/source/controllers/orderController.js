import Order from '../models/orderModel.js'
import { validationResult } from 'express-validator';
// @desc Order product
// @route POST /api/order
// @access private
// chua test
const orderProduct = async (req, res, next) => {
    try {
        var user = req.user._id
        var { paymentMethod, taxPrice, totalPrice, orderItems, shippingAddress, shippingPrice } = req.body
        // console.log(user, paymentMethod, taxPrice, totalPrice, orderItems, shippingAddress, shippingPrice)
        var orderProduct = await Order.create({ 
                                                user, 
                                                paymentMethod, 
                                                taxPrice, 
                                                shippingPrice, 
                                                totalPrice, 
                                                orderItems, 
                                                shippingAddress })
        console.log(orderProduct)
        if (orderProduct) {
            res.status(200).json("success")
        }
    } catch (error) {
            res.status(500).json("Create faild")
    }
}

// @desc Get order by id
// @route GET /api/order/:id
// @access private
// chua test
const getOrderById = async (req, res, next) => {
    try {
        var id = req.params.id
        var order = await Order.findById({ _id: id }).populate('user', 'name email')
        if (order) {
            res.status(200).json(order)
        } else {
            res.status(404).json("ORDER NOT FOUND")
        }
        
    } catch (error) {
        res.status(404).json("ORDER NOT FOUND")
    }
}

// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access private
// chua test
const getMyOrder =  async (req, res, next) => {
    try {
        console.log(req.user._id)
        var orders = await Order.find({ user: req.user._id })
        res.json(orders)
        
    } catch (error) {
        res.status(400).json("ORDER NOT FOUND")
    }
}

// @desc Get all orders by admin
// @route GET /api/orders
// @access private admin
// chua test
const getOrder =  async (req, res, next) => {
    try {
        var allOrders = await Order.find()
        if (allOrders) {
            res.status(200).json(allOrders)
        } else {
            res.status(404).json("Not found")
        }        
    } catch (error) {
        res.status(404).json("ORDER NOT FOUND")
    }
}

// @desc Update order to delivered
// @route PUT /api/order/:id/deliver
// @access private admin
// chua test
const updateOrder = async (req, res, next) => {
    try {
        var idOrder = req.params.id
        var order = await Order.findById(idOrder)
        if (order) {
            var orderAfterUpdate = await Order.findOneAndUpdate({_id: idOrder},{isDelivered: true, deliveredAt: Date.now()}, {new: true})
            if (orderAfterUpdate) {
                res.status(200).json(orderAfterUpdate)
            } else {
                res.status(500).json("NOT UPDATE")
            }
        } else {
            res.status(404).json("NOT FOUND TO UPDATE")
        }
      
        
    } catch (error) {
        res.status(400).json("ORDER NOT FOUND")
    }
}

export { orderProduct,  getOrderById, getMyOrder, getOrder, updateOrder }
