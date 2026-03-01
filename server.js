const express = require('express');
const app = express();
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI);
app.use(express.json());

const PORT = process.env.PORT || 3000;

const ticketsRouter = require('./src/routes/routes.js');


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});