import orderModel from "../models/orderModel.js"

export const addOrder = async (req, res) => {
    const { userId, phoneNumber, total } = req.body
    try {
        const order = new orderModel({
            userId,
            phoneNumber,
            total,
        })
        await order.save()
        return res.status(201).json({ status: true, response: 'Order added successfully.' });
    } catch (err) {
        return res.status(500).json({ status: false, response: 'Somthing went wrong', msg: err.message });
    }
}

export const getOrder = async (req, res) => {
    try {
        // const orders = await orderModel.find({ userId: req.body.userId })
        const orders = await orderModel.aggregate([
            {
                $match: {
                    userId: req.body.userId,  // Filter by userId
                }
            },
            {
                $group: {
                    _id: req.body.userId,  // Group by userId
                    sub_total: { $sum: "$total" },  // Calculate total amount for each userId
                    orders: { $push: "$$ROOT" },  // Include details of individual orders
                }
            }
        ]);
        return res.status(200).json({ status: true, orders });
    } catch (err) {
        return res.status(500).json({ status: false, response: 'Order not found', msg: err.message });
    }
}