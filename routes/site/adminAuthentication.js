// adminAuthentication.js
const express = require('express');
const router = express.Router();
const AdminAuthentication = require('../../models/AdminAuthentication');
const bcrypt = require('bcryptjs');
isAdminAuthenticated = require('../../middlewares/isAuthenticated.js');

router.get('/login', (req, res) => {
    res.render('user_login'); // Render the HTML page for user login
});

router.post('/login', (req, res) => {
    isAdminAuthenticated = false;
    res.render('AdminLogin/loginPage', { message: '' }); // Render the HTML page for user login
});

// Site route for admin login page
router.get('/admin/login', (req, res) => {
    res.render('AdminLogin/loginPage', { message: '' });
});

// Site route to handle admin login form submission
router.post('/admin/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await AdminAuthentication.findOne({ username });

        if (!admin) {
            return res.render('AdminLogin/loginPage', { message: 'Invalid username or password.' });
        }

        const isPasswordValid = bcrypt.compareSync(password, admin.password);

        if (!isPasswordValid) {
            return res.render('AdminLogin/loginPage', { message: 'Invalid username or password.' });
        }
        // Authentication successful, redirect to admin dashboard
        isAdminAuthenticated = true;
        return res.redirect('/admin/login/products');
    } catch (error) {
        console.error('Error authenticating admin:', error);
        return res.status(500).send('Internal Server Error');
    }
});

// Site route for admin registration page
router.get('/admin/register', (req, res) => {
    res.render('AdminLogin/adminRegistration', { message: '' });
});

// Site route to handle admin registration form submission
router.post('/admin/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingAdmin = await AdminAuthentication.findOne({ username });

        if (existingAdmin) {
            return res.render('AdminLogin/adminRegistration', { message: 'Username already exists.' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newAdmin = new AdminAuthentication({ username, password: hashedPassword });
        await newAdmin.save();

        // Registration successful, redirect to admin registration with success message
        return res.render('AdminLogin/adminRegistration', { message: 'Registration Successful.' });
    } catch (error) {
        console.error('Error registering admin:', error);
        return res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
