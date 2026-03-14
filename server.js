const express = require('express');
const app = express();
const conectarMongo = require("./src/config/db.js");
const path = require('path');
const ticketsRouter = require('./src/routes/tickets.routes.js');
require('dotenv').config();
app.use(express.json());

const PORT = process.env.PORT || 3000;

//Conexion a base de datos
conectarMongo();


app.use("/api/tickets", ticketsRouter);
//Servir archivos del frontend
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

