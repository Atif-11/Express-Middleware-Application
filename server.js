const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/Products");  
const Admin = require("./models/AdminAuthentication");
const Review = require("./models/Reviews");    

let server = express();
server.use(express.json());
server.use(express.urlencoded());
server.set("view engine", "ejs");
server.use(express.static("public"));
// var expressLayouts = require("express-ejs-layouts");
// server.use(expressLayouts);

// Assuming you have a route handler for rendering the login page
// server.get('/', (req, res) => {
//   res.render('AdminLogin/loginPage', { message: '' }); // Pass an empty message initially
// });

let adminApiRouter = require("./routes/api/adminAuthentication");
server.use("/", adminApiRouter);
server.use("/", require("./routes/site/adminAuthentication"));

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

server.get('/login', (req, res) => {
  res.render('user_login'); // Render the HTML page for user login
});


server.get('/contact-us', (req, res) => {
  res.render('ContactUs/contact-us'); // Render the contact us form created in assignment 2
});

// Server listening
server.listen(4000, () => {
  console.log("Server started at http://localhost:4000");
});
