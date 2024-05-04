// adminAuthentication.js
const express = require('express');
const router = express.Router();
const AdminAuthentication = require('../../models/AdminAuthentication');

// Site route for admin login page
router.get('/admin/login', (req, res) => {
    res.render('AdminLogin/loginPage', { message: '' });
});

// Site route to handle admin login form submission
router.post('/admin/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await AdminAuthentication.findOne({ username });

        if (!admin || admin.password !== password) {
            return res.render('AdminLogin/loginPage', { message: 'Invalid username or password.' });
        }

        // Authentication successful, redirect to admin dashboard
        return res.redirect('/admin/login/products');
    } catch (error) {
        console.error('Error authenticating admin:', error);
        return res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
