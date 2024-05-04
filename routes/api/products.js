const express = require("express");
const router = express.Router();
const Product = require("../../models/Products");

router.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    return res.send(products);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error fetching products");
  }
});

router.get("/api/products/:id", async (req, res) => {
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

router.post("/api/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    return res.send(product);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error adding product");
  }
});

router.put("/api/products/:id", async (req, res) => {
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

router.delete("/api/products/:id", async (req, res) => {
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
