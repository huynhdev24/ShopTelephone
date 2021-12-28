import { body, validationResult } from 'express-validator';
const validate = (method) => {

    switch (method) {
          
        case 'reviewProduct': {
            return [
                body('rating', 'Rating must be a number between 0 and 5').notEmpty().isInt({ min: 0, max: 5 }),
                body('comment', 'comment does not empty').not().isEmpty(),
            ]
        }
    }
}
export { validate }