const mongoose = require('mongoose');
const Counter = require('./counter');
require('dotenv').config();
DB_USER = process.env.DB_USER || 'root';
DB_HOST = process.env.DB_HOST || 'localhost';
const Estados = ['Abierto', 'En Proceso', 'Resuelto', 'Cerrado'];
const Prioridades = ['Baja', 'Media', 'Alta', 'Crítica'];

const ticketSchema = new mongoose.Schema({
    asunto: { type: String, required: true },
    prioridad: { type: String, enum: Prioridades, required: true },
    estado: { type: String, enum: Estados, default: 'Abierto', required: true },
    usuario: { type: String, required: true },
    comentarios: [{ mensaje: { type: String, required: true }, fecha: { type: Date, default: Date.now } }],
    folio: { type: String, unique: true }
}, { timestamps: true });

//PRE-SAVE HOOK PARA GENERAR FOLIO ÚNICO
ticketSchema.pre("save", async function (next) {
    //Solo generar el folio si el documento es nuevo
    if (!this.isNew) {
        return next();
    }
    try {
        const currentYear = new Date().getFullYear();

        const counterDoc = await Counter.findOneAndUpdate(
            { name: `ticket-${currentYear}` },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        const paddedSeq = String(counterDoc.seq).padStart(4, '0');
        this.folio = `TCK-${currentYear}-${paddedSeq}`;
        next();
    } catch (err) {
        next(err);
    }
});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;
