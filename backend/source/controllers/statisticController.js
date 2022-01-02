import User from '../models/userModel.js'
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'

// @desc statistic revenue of store by year (with number year is in query)
// @route GET /api/statistic/revenue?numYear=5
// @access admin

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
                if ((yearIndex in revenueYear) && (allOrders[index].orderStatus == 6)) {
                    console.log(typeof (revenueYear[yearIndex]))
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


// @desc statistic product of store by brand and number product in stock
// @route GET /api/statistic/productBrand
// @access admin

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

// @desc statistic product is bought by brand 
// @route GET /api/statistic/productBoughtBrand
// @access admin

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

                    if (allOrders[index].orderStatus == 6) {
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


export { getRevenue, getProductByBrand, getProductBoughtByBrand }