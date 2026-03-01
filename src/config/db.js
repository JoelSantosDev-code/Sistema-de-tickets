const mongoose = require('mongoose');
require('dotenv').config();
const DB_HOST = process.env.DB_HOST || 'localhost';
mongoose.connect(process.env.MONGO_URI).then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

module.exports = mongoose;