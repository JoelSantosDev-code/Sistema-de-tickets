const mongoose = require('mongoose');
require('dotenv').config();
DB_USER = process.env.DB_USER || 'root';
DB_HOST = process.env.DB_HOST || 'localhost';

const ticketSchema = new mongoose.Schema({
    Asunto: { type: String, required: true },
    Prioridad: { type: Enumerator['Baja', 'Media', 'Alta', 'Crítica'], required: true },
    Estado: { type: Enumerator['Abierto', 'En Proceso', 'Resuelto', 'Cerrado'], required: true },
    Usuario: { type: String, required: true },
    Comentarios: { type: String, fecha: Date, required: true },
    folio: { type: String, required: true, unique: true }
});

const Ticket = mongoose.model('Ticket', ticketSchema);