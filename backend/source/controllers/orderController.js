import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'
import { validationResult } from 'express-validator';
// @desc Order product
// @route POST /api/order
// @access private
// chua test
// chú ý tới cái ảnh
const orderProduct = async (req, res, next) => {
    try {
        var user = req.user._id
        var { productList,
            deliveryAdd,
            transportMethod,
            orderStatus,
            transportFee,
            note,
            paymentMethod
        } = req.body

        let response = {};
        for (let i = 0; i < productList.length; ++i) {
            const { orderProd, numOfProd } = productList[i];
            const product = await Product.findById(orderProd.id);
            if (product) {
                if (product.countInStock < numOfProd) {
                    return res.status(400).json("Number product in stock is not enough")
                } else {
                    await Product.updateOne({ _id: orderProd.id }, { countInStock: product.countInStock - parseInt(numOfProd) })

                    response = await Order.create({
                        user,
                        deliveryAdd,
                        paymentMethod,
                        orderStatus,
                        transportMethod,
                        transportFee,
                        orderProd,
                        numOfProd,
                        note,                     
                    });
                }
            } else {
                return res.status(400).json("Product stop selling");
            }
        }
        if (response) return res.status(400).json("do not create order");
    } catch (error) {
        res.status(400).json("Not order product")
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
const getMyOrder = async (req, res, next) => {
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
const getOrder = async (req, res, next) => {
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
            var orderAfterUpdate = await Order.findOneAndUpdate({ _id: idOrder }, { isDelivered: true, deliveredAt: Date.now() }, { new: true })
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

export { orderProduct, getOrderById, getMyOrder, getOrder, updateOrder }
