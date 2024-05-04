const mongoose = require('mongoose');

const adminAuthenticationSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const AdminAuthentication = mongoose.model('AdminAuthentication', adminAuthenticationSchema);

module.exports = AdminAuthentication;
