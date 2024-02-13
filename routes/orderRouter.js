import { Router } from "express";
import { addOrder, getOrder } from "../controllers/order.js";
import authorization from "../middlewares/authorization.js";

const orderRouter = Router()

orderRouter.post("/add-order", authorization, addOrder)
orderRouter.get("/get-order", authorization, getOrder)

export default orderRouter
