import User from '../models/userModel.js'
import Order from '../models/orderModel.js'
import { generateToken } from '../utils/generateToken.js'
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs'

// @desc    Auth user & get token
// @route   POST /api/user/login
// @access  Public
// test rồi
const loginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        var { email, password } = req.body

        if (email) {
            const user = await User.findOne({ email: email })
            // day phai dung await vi ket qua cua ham tra ve la
            // mot promise (do dung ham async trong ham matchPassword)
            // neu khong dung await thi temp se la mot promise dc thuc hien sau
            var checkPassword = await user.matchPassword(password)
            // console.log("ket qua check", checkPassword)
            if (user && checkPassword) {
                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    address: user.address,
                    phoneNumber: user.phoneNumber,
                    gender: user.gender,
                    token: generateToken(user._id),
                })
            }
            else {
                return res.status(400).json("Invalid name or password")
            }

        } else {
            return res.status(400).json("You have to fill complete information")
        }

    } catch (error) {
        return res.status(400).json("Login failed")
    }
}


// @desc    resgis new user
// @route   POST /api/user/resgister
// @access  public
// test rồi
const resgisterUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        var { name, password, email, phoneNumber, address, gender } = req.body

        var user = await User.findOne({ email: email })

        if (user) {
            return res.status(400).json("Acount exist")
        }

        var newUser = await User.create({
            name: name,
            email: email,
            phoneNumber,
            address,
            gender,
            password: bcrypt.hashSync(password, 10),

        })

        if (newUser) {
            return res.status(200).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                phoneNumber: newUser.phoneNumber,
                address: newUser.address,
                gender: newUser.gender,
                isAdmin: newUser.isAdmin,
                token: generateToken(newUser._id),
            })
        } else {
            return res.status(400).json("Invalid user data")

        }

    } catch (error) {
        return res.status(400).json("Failed resgister")
    }
}

// @desc    get profile user
// @route   GET /api/user/profile
// @access  private
// test rồi
const profileUser = (req, res, next) => {


    if (req.user) {
        res.status(200).json(req.user)
    } else {
        res.status(400).json("Not found profile user")
    }
}

// @desc    update profile user
// @route   PUT /api/user/profile
// @access  private

const updateProfileUser = async (req, res, next) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        var { userId, name } = req.body
        var address = req.body.address || ""
        var phoneNumber = req.body.phoneNumber || ""
        var gender = req.body.gender || false

        var user = await User.findOne({ _id: userId })

        if (!user) {
            return res.status(400).json("Account not exist")
        }

        var idUserUpdate = userId

        var userAfterUpdate = await User.findOneAndUpdate(
            {
                _id: idUserUpdate
            },
            {
                name,
                address,
                phoneNumber,
                gender
            },
            {
                new: true
            }
        )

        return res.status(200).json({
            _id: userAfterUpdate._id,
            name: userAfterUpdate.name,
            email: userAfterUpdate.email,
            address: userAfterUpdate.address,
            phoneNumber: userAfterUpdate.phoneNumber,
            gender: userAfterUpdate.gender,
            isAdmin: userAfterUpdate.isAdmin,
            token: generateToken(userAfterUpdate._id),
        })

    } catch (error) {
        return res.status(400).json("Not update")
    }
}


// @desc    get all users
// @route   GET /api/user?name=name&pageNumber=1
// @access  private admin
// test rồi
const getAllUsers = async (req, res, next) => {
    try {
        // thieu validation
        var nameUser = req.query.name
            ? {
                'name': {
                    $regex: req.query.name,
                    // i khong phân biệt chứ hoa chữ thường
                    $options: 'i',
                }

            }
            : {}


        var pageNumber = parseInt(req.query.pageNumber) || 1
        const PAGE_SIZE = 100
        if (pageNumber < 1) {
            pageNumber = 1
        }

        var count = await User.count({ ...nameUser })
        var getUsers = await User.find({ ...nameUser })
            .limit(PAGE_SIZE)
            .skip((pageNumber - 1) * PAGE_SIZE)

        if (getUsers) {
            return res.status(200).json({ getUsers, pageNumber, totalPage: Math.ceil(count / PAGE_SIZE) })

        } else {
            return res.status(400).json("NOT FOUND")
        }
    } catch (error) {
        return res.status(400).json("NOT FOUND")
    }
}

// @desc    get user by id
// @route   GET /api/user/:id
// @access  private admin
// test rồi
const getUserById = async (req, res, next) => {
    try {
        var id = req.params.id
        var user = await User.findById({ _id: id }).select('-password')
        if (user) {
            return res.status(200).json(user)
        } else {
            return res.status(400).json("NOT FOUND")
        }
    } catch (error) {
        return res.status(400).json("NOT FOUND")
    }
}

// @desc    accept user to admin
// @route   PUT /api/user/:id
// @access  private admin
// test rồi
const acceptAdmin = async (req, res, next) => {
    try {
        var id = req.params.id

        var user = await User.findById(id)

        if (user) {
            var userAfterUpdate = await User.findOneAndUpdate({ _id: id }, { isAdmin: true }, { new: true })
            return res.status(200).json({
                _id: userAfterUpdate._id,
                name: userAfterUpdate.name,
                email: userAfterUpdate.email,
                isAdmin: userAfterUpdate.isAdmin,
            })
        } else {
            return res.status(400).json("accept admin fail")
        }

    } catch (error) {
        return res.status(400).json("accept admin fail")
    }
}

// 
// @desc    get all order of one user by admin
// @route   GET /api/user/order/:id
// @access  private admin
// test rồi
const getAllOrderOfUser = async (req, res, next) => {
    try {
        var id = req.params.id
        var orderOfUser = await Order.find({ user: id })
        if (orderOfUser.length > 0) {
            return res.status(200).json(orderOfUser)
        } else {
            return res.status(400).json("Not found order")
        }

    } catch (error) {
        return res.status(400).json("Not found order")
    }
}


export { loginUser, profileUser, resgisterUser, updateProfileUser, getAllUsers, getUserById, acceptAdmin, getAllOrderOfUser }
