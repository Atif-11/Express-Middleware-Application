const express = require("express");
const router = express.Router();
const Product = require("../../models/Products");

router.get("/admin/login/products/new", async (req, res) => {
  res.render("AdminLogin/products/addProduct");
});

router.post("/admin/login/products/new", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    return res.redirect("/admin/login/products");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error adding product");
  }
});

router.get("/admin/login/products/:id/delete", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    return res.redirect("/admin/login/products");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error deleting product");
  }
});

router.get("/admin/login/products/:id/edit", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    return res.render("AdminLogin/products/editProduct", { product });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error fetching product for editing");
  }
});

router.post("/admin/login/products/:id/edit", async (req, res) => {
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
    return res.redirect("/admin/login/products");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error editing product");
  }
});

router.get("/admin/login/products/:page?", async (req, res) => {
  try {
    let page = Number(req.params.page) ? Number(req.params.page) : 1;
    let pageSize = 3;
    let products = await Product.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    let totalProducts = await Product.countDocuments();
    let totalPages = Math.ceil(totalProducts / pageSize);
    return res.render("AdminLogin/products/listProducts", {
      pageTitle: "Available Products",
      products,
      totalProducts,
      page,
      pageSize,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error fetching products");
  }
});

module.exports = router;
