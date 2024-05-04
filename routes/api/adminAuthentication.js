// adminAuthentication.js
const express = require('express');
const router = express.Router();
const AdminAuthentication = require('../../models/AdminAuthentication');

// API endpoint to authenticate admin
router.post('/api/admin/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await AdminAuthentication.findOne({ username });

        if (!admin || admin.password !== password) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        // Authentication successful
        return res.status(200).json({ message: 'Authentication successful.' });
    } catch (error) {
        console.error('Error authenticating admin:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
