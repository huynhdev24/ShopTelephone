import User from '../models/userModel.js'
import { generateToken } from '../utils/generateToken.js'
import bcrypt from 'bcryptjs'

// @desc    Auth user & get token
// @route   POST /api/user/login
// @access  Public
const loginUser = async (req, res, next) => {
    try {
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
                    token: generateToken(user._id),
                })
            }
            else {
                res.status(404).json("Invalid name or password")
            }

        } else {
            res.json("You have to fill complete information")
        }

    } catch (error) {
        res.status(500).json("Login failed")
    }
}


// @desc    resgis new user
// @route   POST /api/user/resgister
// @access  public
const resgisterUser = async (req, res, next) => {
    try {
        var { name, password, email } = req.body

        var user = await User.findOne({ email: email })

        if (user) {
            res.status(400).json("Acount exist")
        }

        var newUser = await User.create({
            name: name,
            password: bcrypt.hashSync(password, 10),
            email: email
        })

        if (newUser) {
            res.status(200).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                token: generateToken(newUser._id),
            })
        } else {
            res.status(400).json("Invalid user data")

        }

    } catch (error) {
        res.status(500).json("Failed resgister")
    }
}

// @desc    get profile user
// @route   GET /api/user/profile
// @access  private
const profileUser = (req, res, next) => {

    if (req.user) {
        res.status(200).json(req.user)
    } else {
        res.status(404).json("NOT FOUND")
    }
}

// @desc    update profile user
// @route   PUT /api/user/profile
// @access  private
const updateProfileUser = async (req, res, next) => {
    try {
        var { name, email, password } = req.body
        var idUserUpdate = req.user._id

        var userAfterUpdate = await User.findOneAndUpdate({ _id: idUserUpdate }, { name: name, email: email, password: bcrypt.hashSync(password, 10) }, { new: true })

        res.status(200).json({
            _id: userAfterUpdate._id,
            name: userAfterUpdate.name,
            email: userAfterUpdate.email,
            isAdmin: userAfterUpdate.isAdmin,
            token: generateToken(userAfterUpdate._id),
        })

    } catch (error) {
        res.status(400).json("Not update")
    }
}


// @desc    get all users
// @route   GET /api/user
// @access  private admin
const getAllUsers = async (req, res, next) => {
    try {
        var getAllUsers = await User.find({})
        if (getAllUsers) {
            res.status(200).json(getAllUsers)
        } else {
            res.status(404).json("NOT FOUND")
        }
    } catch (error) {
        res.status(404).json("NOT FOUND")
    }
}

// @desc    get user by id
// @route   GET /api/user/:id
// @access  private admin
const getUserById = async (req, res, next) => {
    try {
        var id = req.params.id
        var user = await User.findById({ _id: id }).select('-password')
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(500).json("NOT FOUND")
        }
    } catch (error) {
        res.status(500).json("NOT FOUND")
    }
}

// @desc    update user by id
// @route   PUT /api/user/:id
// @access  private admin
const acceptAdmin = async (req, res, next) => {
    try {
        var id = req.params.id
        
        var user = await User.findById(id)

        if (user) {
            var userAfterUpdate = await User.findOneAndUpdate({ _id: id }, { isAdmin: true }, { new: true })
            res.status(200).json({
                _id: userAfterUpdate._id,
                name: userAfterUpdate.name,
                email: userAfterUpdate.email,
                isAdmin: userAfterUpdate.isAdmin,
            })
        } else {
            res.status(404).json("Not update")
        }

    } catch (error) {
        res.status(404).json("Not update")
    }
}

// get all order of user

// search uer by name

export { loginUser, profileUser, resgisterUser, updateProfileUser, getAllUsers, getUserById, acceptAdmin }
