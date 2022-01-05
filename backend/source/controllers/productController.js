import { validationResult } from 'express-validator';
import path from 'path'
import fs from 'fs'
import { uploadToCloudinary  } from '../utils/uploadToCloudinary.js'
import Product from '../models/productModel.js'

// @desc Fetch single product
// @route GET /api/product/:id
// @access Public
// test rồi
const getProductById = async (req, res, next) => {
    try {
        var id = req.params.id
        var product = await Product.findById({ _id: id })
        if (product) {
            return res.status(200).json(product)
        } else {
            return res.status(400).json("not found product")
        }


    } catch (error) {
        return res.status(400).json("not found product")
    }
}

// @desc Fetch all product
// @route GET /api/product?name=name&pageNumber=1
// @access Public
// test rồi
const getProduct = async (req, res, next) => {
    try {
        var nameProduct = req.query.name
            ? {
                'name': {
                    $regex: req.query.name,
                    $options: 'i',
                }

            }
            : {}

        var pageNumber = parseInt(req.query.pageNumber) || 1
        const PAGE_SIZE = 2
        if (pageNumber < 1) {
            pageNumber = 1
        }

        var count = await Product.count({ ...nameProduct })
        var someProduct = await Product.find({ ...nameProduct })
            .limit(PAGE_SIZE)
            .skip((pageNumber - 1) * PAGE_SIZE)

        if (someProduct) {
            return res.status(200).json({ someProduct, pageNumber, totalPage: Math.ceil(count / PAGE_SIZE) })

        } else {
            return res.status(400).json("NOT FOUND")
        }
    } catch (error) {
        return res.status(400).json("NOT FOUND")
    }

}

// @desc Delete product by id
// @route DELETE /api/product/:id
// @access Private admin
// test roi
const deleteProductById = async (req, res, next) => {
    try {
        var idProduct = req.params.id
        var product = await Product.findById(idProduct)

        if (product) {
            await Product.deleteOne({ _id: idProduct })
            res.status(200).json("Success deleted")
        } else {
            res.status(400).json("Not found product to delete")
        }

    } catch (error) {
        res.status(400).json("NOT DELETE")
    }
}

// @desc create a product 
// @route POST /api/product
// @access Private admin
// phats trien thuat toan kiem tra 2 product co giong nhau hay ko
// thieu validation
// test roi 
const createProduct = async (req, res, next) => {
    try {
              
        var user = req.user._id
        
        var { name,
            price,
            brand,
            countInStock,
            priceDiscount,
            description,
            chipset,
            rom,
            ram,
            color,
            operating,
            cameraTruoc,
            cameraSau,
            manHinh,
            pin,
            otherInfo
        } = req.body
        // them validation day ne hihi
        if (brand) {
            brand = brand.toLowerCase()
        }

        //var imagePath = path.join(process.env.URL_PORT, req.file.filename)
        var locaFilePath = req.file.path 

        var productExist = await Product.find({ name: name })
        if (productExist.length > 0) {
            fs.unlinkSync(locaFilePath)
            return res.status(400).json("Product exist, try again")
        }
        
        var result = await uploadToCloudinary(locaFilePath)
        
        var newProduct = await Product.create({
            user,
            name,
            price,
            brand,
            image: result.url,
            countInStock,
            priceDiscount,
            description,
            chipset,
            rom,
            ram,
            color,
            operating,
            cameraTruoc,
            cameraSau,
            manHinh,
            pin,
            otherInfo
        });

        if (newProduct) {
            return res.status(200).json(newProduct)
        } else {
            return res.status(400).json("Not create product, try again")
        }

    } catch (error) {
        return res.status(400).json("Not create product..............., try again")
    }
}

// @desc update a product 
// @route PUT /api/product/:id
// @access Private admin
// thieu validation
// test roi
const updateProduct = async (req, res, next) => {
    try {
        var idProduct = req.params.id

        var product = await Product.findById(idProduct)

        if (product) {
            var { name,
                price,
                brand,
                image,
                countInStock,
                description,
                chipset,
                rom,
                ram,
            } = req.body

            var priceDiscount = req.body.priceDiscount || req.body.price
            var color = req.body.color || ""
            var operating = req.body.operating || ""
            var cameraTruoc = req.body.cameraTruoc || ""
            var cameraSau = req.body.cameraSau || ""
            var manHinh = req.body.manHinh || ""
            var pin = req.body.pin || ""
            var otherInfo = req.body.otherInfo || []
            
            // them validation day ne hihi

            var productAfterUpdate = await Product.findOneAndUpdate(
                {
                    _id: idProduct
                },
                {
                    name,
                    price,
                    brand,
                    image,
                    countInStock,
                    priceDiscount,
                    description,
                    chipset,
                    rom,
                    ram,
                    color,
                    operating,
                    cameraTruoc,
                    cameraSau,
                    manHinh,
                    pin,
                    otherInfo
                },
                {
                    new: true
                })

            return res.status(200).json(productAfterUpdate)
        } else {
            return res.status(400).json("Not update product")
        }

    } catch (error) {
        res.status(400).json("Not update product")
    }
}

// @desc review a product 
// @route POST /api/product/review/:id
// @access Private
// check ddown hang da dc giao tuc da mua san pham thi moi dc nhan xet (chua lam)
// test roi
const reviewProduct = async (req, res, next) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        var idProduct = req.params.id
        var { comment, rating } = req.body
        var product = await Product.findById(idProduct)
       
        if (product) {
            var check = false
            product.reviews.forEach(element => {
                if (element.userId.toString() === req.user._id.toString()) {
                    check = true
                }
            });

            if (check) {
                return res.status(400).json("already review")
            } else {
                const newReview = {
                    userId: req.user._id,
                    name: req.user.name,
                    rating: Number(rating),
                    comment
                }

                product.reviews.push(newReview)
                product.numReviews = product.reviews.length

                let sumRating = 0;

                for (let i = 0; i < product.reviews.length; i++) {
                    sumRating += product.reviews[i].rating;
                }
                product.rating = sumRating / product.numReviews

                await product.save()

                return res.status(200).json("review added")
            }

        } else {
            return res.status(400).json("not found product")
        }
    } catch (error) {
        return res.status(400).json("NOT REVIEW")
    }
}


// @desc filter a product by brand, ram, rom, price 
// @route get /api/product/filter?brand=apple&ram=4...
// @access Public
// test rồi
const filterProduct = async (req, res, next) => {
    try {

        var { brand, ram, rom } = req.query
        var filterProduct = {}
        if (brand) {
            if (brand.trim) {
                brand = brand.trim().split(",")
                for (let i = 0; i < brand.length; i++) {
                    brand[i] = brand[i].toLowerCase()
                }
                filterProduct["brand"] = {
                    $in: brand
                };
            }

        }

        if (ram) {
            if (ram.trim()) {
                ram = ram.trim().split(",")
                for (let i = 0; i < ram.length; i++) {
                    ram[i] = Number(ram[i])
                }
                filterProduct["ram"] = {
                    $in: ram
                };
            }

        }

        if (rom) {
            if (rom.trim()) {
                rom = rom.trim().split(",")
                for (let i = 0; i < rom.length; i++) {
                    rom[i] = Number(rom[i])
                }
                filterProduct["rom"] = {
                    $in: rom
                };
            }

        }

        var someProduct = await Product.find({ ...filterProduct })
        return res.status(200).json(someProduct)

    } catch (error) {
        return res.status(400).json("Not found product")
    }
}
export { getProduct, getProductById, deleteProductById, createProduct, updateProduct, reviewProduct, filterProduct }