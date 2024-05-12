const express = require("express");
const router = express.Router();
const Product = require("../../models/Products");

router.get('/products', async (req, res) => {
  try {
      const products = await Product.find();
      res.json(products);
  } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching products');
  }
});

router.get("/cart/details", async (req, res) => {
  try {
    let cart = req.session.cart || [];

    // If session cart is empty, check the cookie
    if (cart.length === 0 && req.cookies.cart) {
      cart = req.cookies.cart;
    }

    if (cart.length === 0) {
      console.log("Cart is empty");
      return res.render("Checkout/cartDetails", { cartItems: [], totalAmount: 0 });
    }

    const products = await Product.find({ _id: { $in: cart } });
    const totalAmount = products.reduce((total, product) => total + Number(product.price), 0);

    res.render("Checkout/cartDetails", { cartItems: products, totalAmount });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching cart details");
  }
});


module.exports = router;
