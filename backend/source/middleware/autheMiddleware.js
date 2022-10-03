import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
const checkLogin = async (req, res, next) => {
    try {
        let token
        if (req.headers.authorization && req.headers.authorization.startsWith('Bear')) {
            token = req.headers.authorization.split(' ')[1]
            var tokenVerify = jwt.verify(token, process.env.JSONWEBTOKEN);
            var user = await User.findById({ _id: tokenVerify.id }).select('-password')
            
            if (user) {
                req.user = user
                next()
            } else {
                res.status(401).json("Token failed, not authorized1")
            }
        }
        if (!token) {
            res.status(401).json("Token failed, not authorized2")
        }

    } catch (error) {
        res.status(401).json("Token failed, not authorized3")
    }
}

const checkAdmin = (req, res, next) => {
    
    if (req.user._id && req.user.isAdmin) {

        next()
    } else {
        res.status(401).json("NOT AUTHENTICATION")
    }

}

export { checkLogin, checkAdmin }