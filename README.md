# Express Middleware Application

This repository contains an Express.js middleware application for managing an e-commerce platform. It includes various functionalities for handling authentication, product management, customer registration, and more.

## Folder Structure

- `models/`
  - `AdminAuthentication.js`: Model for admin authentication.
  - `Products.js`: Model for managing products.
  - `Reviews.js`: Model for managing reviews.
  - `Customers.js`: Model for managing customer information.

- `public/`
  - `css/`
    - `contact-us.css`: CSS file for the contact us page.
    - `custLogin.css`: CSS file for the customer login page.
    - `adminLoginPage.css`: CSS file for the admin login page.
    - `reviews.css`: CSS file for styling reviews.
    - `landingPage.css`: CSS file for styling the landing page.
    - `adminLoginForm.css`: CSS file for styling the admin login form.
  - `images/`: Folder for storing images used in the application.
  - `scripts/`: Folder for storing client-side JavaScript files.

- `routes/api/`
  - `products.js`: API routes for managing products.

- `routes/site/`
  - `adminAuthentication.js`: Routes for admin authentication.
  - `cartDetails.js`: Routes for managing cart details.
  - `customerRegistration.js`: Routes for customer registration.
  - `products.js`: Routes for managing products.

- `views/`
  - `AdminLogin/`
    - `loginPage.ejs`: EJS template for the admin login page.
    - `products/`
      - `addProduct.ejs`: EJS template for adding a product.
      - `listProducts.ejs`: EJS template for listing products.
      - `editProduct.ejs`: EJS template for editing a product.
  - `Checkout/`
    - `cartDetails.ejs`: EJS template for displaying cart details.
  - `ContactUs/`
    - `contact-us.ejs`: EJS template for the contact us page.
  - `CustomerRegistration/`
    - `customerRegistration.ejs`: EJS template for customer registration.
  - `landingPage/`
    - `landingPage.ejs`: EJS template for the landing page.
  - `partials/`
    - `footer.ejs`: EJS partial for the footer.
    - `header.ejs`: EJS partial for the header.
  - `Reviews/`
    - `review.ejs`: EJS template for displaying reviews.
  - `adminLoginPage.ejs`: EJS template for the admin login page.

- `server.js`: Main server file for the Express application.

## Functionality

- **Authentication**: The application provides authentication for both admin and customers.
- **Product Management**: Admins can add, edit, and list products.
- **Customer Registration**: Customers can register on the platform.
- **Cart Details**: Customers can view their cart details.
- **Reviews**: Customers can write reviews for products.
- **Contact Us**: Users can contact the platform through the contact us page.
- **Landing Page**: The landing page of the application.

Feel free to explore the code and contribute to this project!
