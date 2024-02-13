import bcrypt from "bcryptjs"
import { userRegisterModel } from "../models/userModel.js"

export const userSignup = async (req, res) => {


    const { name, phone_number, password } = req.body

    if (!name || !phone_number || !password) {
        return res.status(404).json({ status: false, response: "Please enter the value", message: err.message })
    }

    if (phone_number.length !== 10) {
        return res.status(400).json({ status: false, response: "Enter Valid phone number should be 10 Digits" })
    }

    const hashedPassword = await bcrypt.hash(password, 7)

    try {
        const userData = new userRegisterModel({ name, phoneNumber: +phone_number, password: hashedPassword })
        await userData.save()
        return res.status(201).json({ status: true, response: "User Added Successful" })
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ status: false, response: "User Already Exist", message: err.message })

        }
        return res.status(400).json({ status: false, response: "Somthing went wrong", message: err.message })
    }


}

export const userLogin = async (req, res) => {
    const { phone_number, password } = req.body;

    try {
        const user = await userRegisterModel.findOne({ phoneNumber: phone_number })
        const passwordMatched = await user.matchPassword(password)
        if (!user || !passwordMatched) {
            return res.status(400).json({ status: false, response: "Email or Password incorrect" })
        }

        const token = user.createJWT()

        console.log(token)
        res.status(200).json({ status: true, response: "Login successful", token })

    } catch (err) {
        console.log(err)
    }
}