import mongoose from "mongoose"

const orderModel = mongoose.model("order", mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    total: {
        type: Number
    }
}))

export default orderModel