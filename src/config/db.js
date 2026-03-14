const mongoose = require('mongoose');
require('dotenv').config();

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Base de datos conectada");
    } catch (error) {
        console.error("Error al conectar con la BD:", error);
        process.exit(1);
    }
};

module.exports = conectarDB;