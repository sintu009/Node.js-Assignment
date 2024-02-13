import express from "express"
import cors from "cors"
import "dotenv/config"
import authRouter from "./routes/authRouter.js"
import connectDatabase from "./configs/db.js"
import orderRouter from "./routes/orderRouter.js"


const app = express()
app.use(express.json())

app.use(cors());
app.options('*', cors());

app.use("/auth", authRouter)
app.use("/order", orderRouter)


app.listen(5001, async () => {
    try {
        console.log("Server running on 5001")
        connectDatabase;
        console.log("DB connected")
    } catch (err) {
        console.log("Failed", err)
    }
})