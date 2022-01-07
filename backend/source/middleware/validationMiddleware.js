import { body, validationResult } from 'express-validator';
const validate = (method) => {

    switch (method) {

        case 'reviewProduct': {
            return [
                body('rating', 'Rating must be a number between 0 and 5').notEmpty().isInt({ min: 0, max: 5 }),
                body('comment', 'comment does not empty').not().isEmpty(),
            ]
        }

        case 'informationProduct': {
            return [
                body('name', 'name does not empty').not().isEmpty(),
                body('price', 'price does not empty').not().isEmpty(),
                body('brand', 'brand does not empty').not().isEmpty(),

                body('countInStock', 'countInStock does not empty').not().isEmpty(),
                body('description', 'description does not empty').not().isEmpty(),
                body('chipset', 'chipset does not empty').not().isEmpty(),
                body('rom', 'rom does not empty').not().isEmpty(),
                body('ram', 'ram does not empty').not().isEmpty(),
            ]
        }

        case 'loginUser': {
            return [
                body('email', 'Invalid email').exists().isEmail(),
                body('password', 'password more than 6 degits').exists().isLength({ min: 6 }),
            ]
        }

        case 'informationUser': {
            return [
                body('name', 'name does not empty').not().isEmpty(),
                body('email', 'email is not empty').exists(),
                body('email', 'Invalid email').isEmail(),
                body('password', 'password more than 6 degits').exists().isLength({ min: 6 }),
            ]
        }

        case 'informationDeliveryAddress': {
            return [
                body('name', 'name does not empty').not().isEmpty(),
                body('phone', 'phone does not empty').not().isEmpty(),
                body('address', 'address does not empty').not().isEmpty(),
            ]
        }

        case 'informationOrderProduct': {
                       
            return [
                body('productList', 'productList does not empty').not().isEmpty(),

                body('deliveryAdd', 'deliveryAdd does not empty').not().isEmpty(),

                body('transportMethod', 'transportMethod does not empty').not().isEmpty(),
                body('transportMethod', 'transportMethod is number').isNumeric(),

                body('orderStatus', 'orderStatus does not empty').not().isEmpty(),
                body('orderStatus', 'orderStatus is number').isNumeric(),

                body('transportFee', 'transportFee does not empty').not().isEmpty(),

                body('paymentMethod', 'paymentMethod does not empty').not().isEmpty(),
                body('paymentMethod', 'paymentMethod is number').isNumeric(),
            ]
        }
    }
}
export { validate }