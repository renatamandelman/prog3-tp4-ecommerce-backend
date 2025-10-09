import express from "express";
const router = express.Router();
import Order from "../models/order.js";

const addOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    return res.status(200).send({ message: "producto creado", order });
  } catch (error) {
    return res.status(501).send({ message: "error al obtener los productos" });
  }
};

router.post("/", addOrder);
export default router;
