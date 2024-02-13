import { mongoose } from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id, phone_number: this.phoneNumber }, process.env.JWTKEY)
}

export const userRegisterModel = mongoose.model("user", userSchema)