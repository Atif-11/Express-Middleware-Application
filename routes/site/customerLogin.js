// customerRegistration.js
const express = require('express');
const router = express.Router();
const Customer = require('../../models/Customers');

// Site route for customer registration page
router.get('/customer/login', (req, res) => {
    res.render('CustomerLogin/customerLogin', { message: '' });
});

// Site route to handle customer registration form submission
router.post('/customer/login', async (req, res) => {
    const { username, password, email, fullName, phoneNumber, address } = req.body;

    try {
        // Check if the username or email already exists
        const existingCustomer = await Customer.findOne({ $or: [{ username }, { email }] });
        if (existingCustomer) {
            return res.render('CustomerLogin/customerLogin', { message: 'Username or email already exists.' });
        }

        // Create a new customer
        const newCustomer = new Customer({ username, password, email, fullName, phoneNumber, address });
        await newCustomer.save();

        // Registration successful, redirect to login page
        return res.redirect('/customer/login');
    } catch (error) {
        console.error('Error registering customer:', error);
        return res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
