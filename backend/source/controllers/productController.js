import Product from '../models/productModel.js'
import { validationResult } from 'express-validator';

// @desc Fetch single product
// @route GET /api/product/:id
// @access Public
// test rồi
const getProductById = async (req, res, next) => {
    try {
        var id = req.params.id
        var product = await Product.findById({ _id: id })
        res.status(200).json(product)

    } catch (error) {
        res.status(404).json("NOT FOUND")
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
            res.status(200).json({ someProduct, pageNumber, totalPage: Math.ceil(count / PAGE_SIZE) })

        } else {
            res.status(404).json("NOT FOUND")
        }
    } catch (error) {
        res.status(404).json("NOT FOUND")
    }

}

// @desc Delete product by id
// @route DELETE /api/product/:id
// @access Private admin
// test rồi
const deleteProductById = async (req, res, next) => {
    try {
        var idProduct = req.params.id
        var product = await Product.findById(idProduct)
        if (product) {
            await Product.deleteOne({ _id: idProduct })
            res.status(200).json("Success deleted")
        } else {
            res.status(404).json("Not found product to delete")
        }

    } catch (error) {
        res.status(500).json("NOT DELETE")
    }
}

// @desc create a product 
// @route POST /api/product
// @access Private admin
// test rồi (có trong postsman)
// upload ảnh chưa có
const createProduct = async (req, res, next) => {
    try {
        var user = req.user._id
        var { name, image, description, brand, category, price, countInStock } = req.body

        var productExist = await Product.find({ name: name })
        if (productExist) {
            res.status(400).json("Product exist")
        }

        if (name && image && description && brand && category && price && countInStock) {
            var newProduct = await Product.create({ user, name, image, description, brand, category, price, countInStock });
            if (newProduct) {
                res.status(200).json(newProduct)
            } else {
                res.status(500).json("NOT CREATE")
            }
        } else {
            res.status(400).json("Missing attribute")
        }

    } catch (error) {
        res.status(500).json("NOT CREATE")
    }
}

// @desc update a product 
// @route PUT /api/product/:id
// @access Private admin
// test rồi (có trong postman)
const updateProduct = async (req, res, next) => {
    try {
        var idProduct = req.params.id

        var product = await Product.findById(idProduct)

        var { name, image, description, brand, category, price, countInStock } = req.body
        var productAfterUpdate = await Product.findOneAndUpdate(
            {
                _id: idProduct
            },
            {
                name: name,
                image: image,
                description: description,
                brand: brand,
                category: category,
                price: price,
                countInStock: countInStock
            },
            {
                new: true
            })

        res.status(200).json({
            _id: idProduct,
            name: productAfterUpdate.name,
            image: productAfterUpdate.image,
            description: productAfterUpdate.description,
            brand: productAfterUpdate.brand,
            category: productAfterUpdate.category,
            price: productAfterUpdate.price,
            countInStock: productAfterUpdate.countInStock
        })

    } catch (error) {

        res.status(404).json("NOT UPDATE")
    }
}

// @desc review a product 
// @route POST /api/product/review/:id
// @access Private
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
                res.status(400).json("already review")
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
               
                res.status(200).json("review added")
            }

        } else {
            res.status(400).json("not found product")
        }
    } catch (error) {
        res.status(400).json("NOT REVIEW")
    }
}

export { getProduct, getProductById, deleteProductById, createProduct, updateProduct, reviewProduct }