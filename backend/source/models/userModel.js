import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, trim: true },
        password: { type: String, required: true, trim: true },
        isAdmin: { type: Boolean, required: true, default: false },
        address: { type: String, trim: true },
        phoneNumber: { type: String, trim: true },
        gender: { type: Boolean },

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

export default User