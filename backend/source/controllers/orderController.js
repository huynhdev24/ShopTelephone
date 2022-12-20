import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'
import { validationResult } from 'express-validator';
// @desc Order product
// @route POST /api/order
// @access private
//  test rồi
// chú ý tới cái ảnh

// neu co thoi gian thi nen cai thien lai doan code nay cho truong hop neu mot san pham khong duoc tao don hang
// thi tat ca san pham cung khong duoc tao don hang

// dang co van de voi phi van chuyen (chua co cach tinh phi van chuyen phu hop)
const orderProduct = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
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
            const { orderProd, numOfProd } = productList[i]
            const product = await Product.findById(orderProd.id)
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
        if (response)
            return res.status(200).json(" create successfully order")
        else {
            return res.status(400).json(" do not create order")
        };
    } catch (error) {
        res.status(400).json("Not order product")
    }
}

// @desc Get order by id
// @route GET /api/order/:id
// @access private
// test rồi
// neu co thoi gian thi khong cho mot nhieu co the xem don hang cua nguoi khac
const getOrderById = async (req, res, next) => {
    try {
        var id = req.params.id
        var order = await Order.findById({ _id: id }).select('-user')
        if (order) {
            return res.status(200).json(order)
        } else {
            return res.status(400).json("ORDER NOT FOUND")
        }

    } catch (error) {
        return res.status(400).json("ORDER NOT FOUND")
    }
}

// @desc Get logged in user orders
// @route GET /api/orders/myorders?name=name&pageNumber=1&limit=10&type=statusOrder
// @access private
// test rồi
// cần lấy thêm về theo thể loại nữa
const getMyOrder = async (req, res, next) => {
    try {

        var filterOrder = {}

        filterOrder["user"] = req.user._id

        var type = parseInt(req.query.type) || -1
        if (parseInt(req.query.type) === 0) {
            type = 0
        }

        if (type > -1) {
            filterOrder["orderStatus"] = type
        }

        if (req.query.name) {
            filterOrder['orderProd.name'] = {
                $regex: req.query.name,
                $options: 'i',
            }
        }

        let pageNumber = parseInt(req.query.pageNumber) || 1
        let pageSize = parseInt(req.query.limit) || 10

        if (pageNumber < 1) {
            pageNumber = 1
        }

        var count = await Order.count({ ...filterOrder })
        var someOrder = await Order.find({ ...filterOrder })
            .limit(pageSize)
            .skip((pageNumber - 1) * pageSize)

        if (someOrder) {
            return res.status(200).json({ someOrder, pageNumber, totalPage: Math.ceil(count / pageSize), totalRow: count })
        } else {
            return res.status(400).json("Not found list orders")
        }

    } catch (error) {
        res.status(400).json("ORDER NOT FOUND")
    }
}

// const getMyOrder = async (req, res, next) => {
//     try {

//         var orders = await Order.find({ user: req.user._id })
//         if (orders.length > 0) {
//             return res.status(200).json(orders)
//         } else {
//             return res.status(400).json("You do not have order")
//         }
//     } catch (error) {
//         res.status(400).json("ORDER NOT FOUND")
//     }
// }
// @desc Get all orders by admin
// @route GET /api/orders?name=name&pageNumber=1&limit=10&type=statusOrder
// @access private admin
// test rồi 
//cân them cái lấy về theo thể loại nữa (da bo sung)
const getOrder = async (req, res, next) => {

    try {

        var filterOrder = {}

        var type = parseInt(req.query.type) || -1
        if (parseInt(req.query.type) === 0) {
            type = 0
        }

        if (type > -1) {
            filterOrder["orderStatus"] = type
        }

        if (req.query.name) {
            filterOrder['orderProd.name'] = {
                $regex: req.query.name,
                $options: 'i',
            }
        }

        let pageNumber = parseInt(req.query.pageNumber) || 1
        let pageSize = parseInt(req.query.limit) || 10

        if (pageNumber < 1) {
            pageNumber = 1
        }

        var count = await Order.count({ ...filterOrder })
        var someOrder = await Order.find({ ...filterOrder })
            .limit(pageSize)
            .skip((pageNumber - 1) * pageSize)

        if (someOrder) {
            return res.status(200).json({ someOrder, pageNumber, totalPage: Math.ceil(count / pageSize), totalRow: count })
        } else {
            return res.status(400).json("Not found list orders")
        }

    } catch (error) {
        res.status(400).json("Not found list order")
    }
}

// @desc Update orderStatus
// @route PUT /api/order/:id/status
// @access private admin
// test rồi
// trạng thái đơn hàng
// 0 - Đặt hàng thành công, 1 - đã tiếp nhận đơn hàng, 2 - Chuẩn bị hàng
// 3 - Bàn giao vận chuyển, 4 - Đang vận chuyển, 5 - Giao hàng thành công 6 - Hủy đơn hàng

const updateOrder = async (req, res, next) => {
    try {
        var idOrder = req.params.id
        var order = await Order.findById(idOrder)
        if (order) {
            var { orderStatus } = req.body
            var orderAfterUpdate = await Order.findOneAndUpdate({ _id: idOrder }, { orderStatus: orderStatus }, { new: true })
            if (orderAfterUpdate) {
                return res.status(200).json(orderAfterUpdate)
            } else {
                return res.status(400).json("Not update orderStatus")
            }
        } else {
            return res.status(400).json("NOT FOUND ORDER TO UPDATE")
        }

    } catch (error) {
        return res.status(400).json("Not update orderStatus")
    }
}

// 0 don hang cho xac nhan
// 1 don hang cho lay hang
// 2 don hang cho ban giao cho ben van chuyen
// 3 don hang cho van chuyen
// @desc destroy order
// @route PUT /api/order/:id/destroy
// @access private (user)
// test rồi
// trạng thái đơn hàng
// 0 - Đặt hàng thành công, 1 - đã tiếp nhận đơn hàng, 2 - Chuẩn bị hàng
// 3 - Bàn giao vận chuyển, 4 - Đang vận chuyển, 5 - Giao hàng thành công 6 - Hủy đơn hàng
const destroyOrder = async (req, res, next) => {
    try {
        var idOrder = req.params.id
        var order = await Order.findById(idOrder)
        if (order) {
            let { orderProd } = order
            let idProdOrder = orderProd.id
            let { numOfProd } = order
            var orderAfterDestroy = await Order.findOneAndUpdate({ _id: idOrder }, { orderStatus: 6 }, { new: true })
            if (orderAfterDestroy) {
                var productOrder = await Product.findById(idProdOrder)
                productOrder.countInStock += numOfProd
                await productOrder.save()
                return res.status(200).json(orderAfterDestroy)
            } else {
                return res.status(400).json("Not destroy order")
            }
        } else {
            return res.status(400).json("NOT FOUND ORDER TO DESTROY")
        }

    } catch (error) {
        return res.status(400).json("Not destroy order")
    }
}

// @desc Confirm received order
// @route PUT /api/order/:id/confirmReceived
// @access private user
// 
// trạng thái đơn hàng
// 0 - Đặt hàng thành công, 1 - đã tiếp nhận đơn hàng, 2 - Chuẩn bị hàng
// 3 - Bàn giao vận chuyển, 4 - Đang vận chuyển, 5 - Giao hàng thành công 6 - Hủy đơn hàng

const confirmReceivedOrder = async (req, res, next) => {
    try {
        var idOrder = req.params.id
        var order = await Order.findById(idOrder)
        if (order) {
            var orderAfterConfirm = await Order.findOneAndUpdate({ _id: idOrder }, { orderStatus: 5 }, { new: true })
            if (orderAfterConfirm) {
                return res.status(200).json(orderAfterConfirm)
            } else {
                return res.status(400).json("Not confirm received order")
            }
        } else {
            return res.status(400).json("Not found order to confirm")
        }

    } catch (error) {
        return res.status(400).json("Not confirm order")
    }
}


export { orderProduct, getOrderById, getMyOrder, getOrder, updateOrder, destroyOrder, confirmReceivedOrder }
