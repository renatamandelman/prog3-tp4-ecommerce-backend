import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  qty: { type: Number, required: true, min: 1 },
});

const UserSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true },
  dni: { type: Number, required: true },
  telefono: { type: Number, required: true },
});

const OrderSchema = new mongoose.Schema(
  {
    user: { type: UserSchema, required: true },
    products: { type: [ProductSchema], required: true },
    total: {type: Number, required: true}
  },
  { timestamps: true }
);


export default mongoose.model("Order", OrderSchema, "Orders");