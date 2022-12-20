import User from '../models/userModel.js'
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'

// @desc statistic revenue of store by year (with number year is in query)
// @route GET /api/statistic/revenue?numYear=5
// @access admin
// test roi cho dang phan van cho oder status == 6 
const getRevenue = async (req, res, next) => {
    try {
        var numYear = req.query.numYear || 5
        var d = new Date();
        var year = d.getFullYear();
        var revenueYear = {}

        for (let i = year - (numYear - 1); i <= year; i++) {
            revenueYear[i] = 0
        }

        var allOrders = await Order.find()
        if (allOrders) {
            for (let index = 0; index < allOrders.length; index++) {
                let yearIndex = allOrders[index].createdAt.getFullYear()
                if ((yearIndex in revenueYear) && (allOrders[index].orderStatus == 5)) {
                    
                    revenueYear[yearIndex] += (allOrders[index].numOfProd * allOrders[index].orderProd.priceDiscount + allOrders[index].transportFee)
                }
            }
            return res.status(200).json(revenueYear)
        } else {
            return res.status(400).json("Do not have order")
        }

    } catch (error) {
        return res.status(400).json("not statistic revenue")
    }
}

// @desc statistic number product of store by brand and number product in stock by brand
// @route GET /api/statistic/productBrand
// @access admin
// test roi
const getProductByBrand = async (req, res, next) => {
    try {

        var productBrand = {}
        var numProdInStockBrand = {}
        var allProducts = await Product.find()
        if (allProducts) {
            for (let index = 0; index < allProducts.length; index++) {
                let brand = allProducts[index].brand
                if (brand in productBrand) {
                    productBrand[brand] += 1
                } else {
                    productBrand[brand] = 1
                }

                if (brand in numProdInStockBrand) {
                    numProdInStockBrand[brand] += allProducts[index].countInStock
                } else {
                    numProdInStockBrand[brand] = allProducts[index].countInStock
                }

            }
            return res.status(200).json({ "productBrand": productBrand, "numProdInStockBrand": numProdInStockBrand })
        } else {
            return res.status(400).json("Do not have product in stock")
        }

    } catch (error) {
        return res.status(400).json("not statistic revenue")
    }
}

// @desc statistic revenue, number product is bought by brand 
// @route GET /api/statistic/productBoughtBrand
// @access admin
// test roi nhung co the toi uu duoc code hon bang cach cho find product by id bao trong phan check order status == 6 
// boi vi neu order status ma khong bang 6 thi ta loai luon ko can phai find lam gi cho met
// van de thu 2 la co nhung san pham da xoa di nen don hang trung voi nhung san pham ay ko dc tinh
// test ok voi truong hop tren
const getProductBoughtByBrand = async (req, res, next) => {
    try {

        var productBoughtBrand = {}
        var revenueBrand = {}
        var allOrders = await Order.find()

        if (allOrders) {
            for (let index = 0; index < allOrders.length; index++) {
                var idProduct = allOrders[index].orderProd.id
                var product = await Product.findById({ _id: idProduct })
                
                if (product) {

                    let brand = product.brand

                    if (allOrders[index].orderStatus == 5) {
                        if (brand in productBoughtBrand) {
                            productBoughtBrand[brand] += allOrders[index].numOfProd

                        } else {
                            productBoughtBrand[brand] = allOrders[index].numOfProd

                        }

                        if (brand in revenueBrand) {
                            revenueBrand[brand] += (allOrders[index].numOfProd * allOrders[index].orderProd.priceDiscount + allOrders[index].transportFee)
                        } else {
                            revenueBrand[brand] = (allOrders[index].numOfProd * allOrders[index].orderProd.priceDiscount + allOrders[index].transportFee)
                        }
                    }
                }

            }
            return res.status(200).json({ "productBoughtBrand": productBoughtBrand, "revenueBrand": revenueBrand })
        } else {
            return res.status(400).json("Do not have any orders")
        }

    } catch (error) {
        return res.status(400).json("not statistic revenue by brand and product bought by brand")
    }
}

// @desc thong ke so luong san pham thanh cong theo thang dua vao day de biet thang nao co nhieu don hang nhat 
// @route GET /api/statistic/orderSuccessMonth?year=2021
// @access admin
// test roi
// gap van de voi api phia tren la nhung truong hop san pham bi xoa roi nhung van tinh vao day con tren thi khong
const getNumOrderSuccesMonth = async (req, res, next) => {  
    try {

        var d = new Date()
        var currentYear = d.getFullYear()
        var year = req.query.year || currentYear
        var orderSuccMonth = {}

        for (let i = 1; i <= 12; i++) {
            orderSuccMonth[i] = 0
        }

        var allOrders = await Order.find({
            createdAt: {
                $gte: new Date(`${year}-01-01`),
                $lte: new Date(`${year}-12-31`),
            },
            orderStatus: 5,
        })

        if (allOrders) {
            for (let index = 0; index < allOrders.length; index++) {
                let monthIndex = allOrders[index].createdAt.getMonth()
                console.log(allOrders[index].createdAt, allOrders[index].createdAt.getMonth())
                orderSuccMonth[monthIndex + 1] += allOrders[index].numOfProd
            }
            return res.status(200).json(orderSuccMonth)
        } else {
            return res.status(400).json("Do not have any order")
        }

    } catch (error) {
        return res.status(400).json("not statistic revenue by brand and product bought by brand")
    }
}
// @desc thong ke doanh thu theo thang 
// @route GET /api/statistic/revenueMonth?year=2021
// @access admin
const getRevenueMonth = async (req, res, next) => {
    try {

        var d = new Date()
        var currentYear = d.getFullYear()
        var year = req.query.year || currentYear
        var revenueMonth = {}

        for (let i = 1; i <= 12; i++) {
            revenueMonth[i] = 0
        }

        var allOrders = await Order.find({
            createdAt: {
                $gte: new Date(`${year}-01-01`),
                $lte: new Date(`${year}-12-31`),
            },
            orderStatus: 5,
        })

        if (allOrders) {
            for (let index = 0; index < allOrders.length; index++) {
                let monthIndex = allOrders[index].createdAt.getMonth()
                revenueMonth[monthIndex + 1] += (allOrders[index].numOfProd * allOrders[index].orderProd.priceDiscount + allOrders[index].transportFee)               
            }
            return res.status(200).json(revenueMonth)
        } else {
            return res.status(400).json("Do not have any order")
        }

    } catch (error) {
        return res.status(400).json("not statistic revenue by brand and product bought by brand")
    }
}

// @desc thong ke so luong user dang ki tai khoan theo thang 
// @route GET /api/statistic/registerUser?year=2021
// @access admin
// test roi 
const getNumRegisUser = async (req, res, next) => {
    try {

        var d = new Date()
        var currentYear = d.getFullYear()
        var year = req.query.year || currentYear
        var regisUserMonth = {}

        for (let i = 1; i <= 12; i++) {
            regisUserMonth[i] = 0
        }

        var allUsers = await User.find({
            createdAt: {
                $gte: new Date(`${year}-01-01`),
                $lte: new Date(`${year}-12-31`),
            },
        })
        
        if (allUsers) {
            for (let index = 0; index < allUsers.length; index++) {
                let monthIndex = allUsers[index].createdAt.getMonth()
                regisUserMonth[monthIndex + 1] += 1               
            }
            return res.status(200).json(regisUserMonth)
        } 

    } catch (error) {
        return res.status(400).json("not statistic revenue by brand and product bought by brand")
    }
}

export { getRevenue, getProductByBrand, getProductBoughtByBrand, getNumOrderSuccesMonth, getRevenueMonth, getNumRegisUser }