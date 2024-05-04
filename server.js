const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/Products");  
const Review = require("./models/Reviews");    

let server = express();
server.use(express.json());
server.use(express.urlencoded());
server.set("view engine", "ejs");
server.use(express.static("public"));
// var expressLayouts = require("express-ejs-layouts");
// server.use(expressLayouts);

// server.get("/", (req, res) => {
//   res.render("landingPage/addProduct");
// });

let productApiRouter = require("./routes/api/products");
server.use("/", productApiRouter);
server.use("/", require("./routes/site/products"));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/", { 
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("DB Connected");
}).catch(err => {
  console.error("Could not connect to MongoDB", err);
});

// Home route
server.get("/", async (req, res) => {
  try {
    const products = await Product.find({});  // Fetch all products
    res.render("landingPage/index", { products: products });
  } catch (error) {
    console.error("Failed to fetch products", error);
    res.status(500).send("Error occurred while fetching products");
  }
});
// Server listening
server.listen(4000, () => {
  console.log("Server started at http://localhost:4000");
});
