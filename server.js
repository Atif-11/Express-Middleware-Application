const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/Products"); 
const cookieParser = require('cookie-parser'); 
const session = require("express-session");   


let server = express();
server.use(cookieParser());
server.use(session({
  secret: 'condem_9th_may',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 300000 }
}));

server.use(express.json());
server.use(express.urlencoded());
server.set("view engine", "ejs");
server.use(express.static("public"));
// var expressLayouts = require("express-ejs-layouts");
// server.use(expressLayouts);

// server.get('/', (req, res) => {
//   res.render('AdminLogin/loginPage', { message: '' }); // Pass an empty message initially
// });
server.use("/", require("./routes/site/adminAuthentication"));
server.use("/", require("./routes/site/products"));
server.use("/", require("./routes/site/cartDetails"));

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

server.get('/contact-us', (req, res) => {
  res.render('ContactUs/contact-us'); // Render the contact us form created in assignment 2
});

server.get('/reviews', (req, res) => {
  res.render('Reviews/review'); // Render the reviews form created in Lab Task 2
});

// Server listening
server.listen(4000, () => {
  console.log("Server started at http://localhost:4000");
});
