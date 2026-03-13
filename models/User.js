const mongoose = require('../config/db');
//Comment by User
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String },
    role: { type: String, enum: ['admin', 'staff'], default: 'admin' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User-book', userSchema);
