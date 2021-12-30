import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const userSchema = mongoose.Schema(
    {
    name        : { type: String, required: true },
    email       : { type: String, required: true, unique: true, },
    password    : { type: String, required: true },
    province    : { type: String, trim: true },
    district    : { type: String, trim: true },
    village     : { type: String, trim: true },
    detailAdd   : { type: String, trim: true },
    phoneNumber : { type: String, trim: true },
    gender      : { type: Boolean },
    isAdmin     : { type: Boolean, required: true, default: false },
    },
    {
        timestamps: true,
    }
)

userSchema.methods.matchPassword = async function (inputPassword) {
    // var check = await bcrypt.compare(inputPassword, this.password)
    // return check
    return await bcrypt.compare(inputPassword, this.password)
}

userSchema.methods.encodePassword = function (newPassword) {  
    return bcrypt.hashSync(newPassword, 10)
}

const User = mongoose.model('User', userSchema)

export default  User