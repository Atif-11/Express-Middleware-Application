const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Product = require("../../models/Products");

const JWT_SECRET_KEY = "condem_9th_may";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

router.get("/api/admin/login/products", verifyToken, async (req, res) => {
  try {
    const products = await Product.find();
    return res.send(products);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error fetching products");
  }
});

router.get("/api/admin/login/products/:id", verifyToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    return res.send(product);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error fetching product");
  }
});

router.post("/api/admin/login/products/new", verifyToken, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    return res.send(product);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error adding product");
  }
});

router.put("/api/admin/login/products/:id", verifyToken, async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.imageUrl = req.body.imageUrl;
    await product.save();
    return res.send(product);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error updating product");
  }
});

router.delete("/api/admin/login/products/:id", verifyToken, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    return res.send(product);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error deleting product");
  }
});

module.exports = router;
