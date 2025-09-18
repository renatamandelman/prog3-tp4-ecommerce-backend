import express from "express";
const router = express.Router();
import Product from "../models/products.js";

const findAllProducts = async (req, res) => {
  try {
    const products = await Product.find().select("_id name categories");
    return res.status(200).send({ message: "todos los productos", products });
  } catch (error) {
    return res.status(501).send({ message: "error al obtener los productos" });
  }
};

const findOneProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ _id: id });
    return res.status(200).send({ message: "producto encontrado", product });
  } catch (error) {
    return res.status(501).send({ message: "error al obtener los productos" });
  }
};
const addProduct = async (req, res) => {
  const body = req.body;
  try {
    const product = new Product(body);
    await product.save();
    return res.status(200).send({ message: "producto creado", product });
  } catch (error) {
    return res.status(501).send({ message: "error al obtener los productos" });
  }
};
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const productToUpdate = await Product.findByIdAndUpdate(id, body, { new: true });
    if (!productToUpdate) {
      return res.status(404).send({ message: "no existe el producto", id: id });
    }
    return res
      .status(200)
      .send({ message: "producto update", productToUpdate });
  } catch (error) {
    return res.status(501).send({ message: "error al updeatear los productos" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const productToDelete = await Product.findOne({ _id: id });
    if (!productToDelete) {
      return res.status(404).send({ message: "no existe el producto", id: id });
    }
    await Product.deleteOne({ _id: id });
    return res
      .status(200)
      .send({ message: "producto deleted", productToDelete });
  } catch (error) {
    return res.status(501).send({ message: "error al deletear los productos" });
  }
};

//CRUD endpoints
router.get("/", findAllProducts);
router.get("/:id", findOneProduct);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

export default router;
