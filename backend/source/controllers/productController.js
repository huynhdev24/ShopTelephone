import Product from '../models/productModel.js'

// @desc Fetch single product
// @route GET /api/product/:id
// @access Public
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
// @route GET /api/product
// @access Public
const getProduct = async (req, res, next) => {
    try {
        var allProduct = await Product.find({})
        res.status(200).json(allProduct)
    } catch (error) {
        res.status(404).json("NOT FOUND")
    }

}

// @desc Delete product by id
// @route DELETE /api/product/:id
// @access Private admin
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

export { getProduct, getProductById, deleteProductById, createProduct, updateProduct }