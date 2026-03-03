const Ticket = require('../models/ticketSchema');

module.exports = async function validarCambioEstado(req, res, next) {
    try {
        const { estado } = req.body;

        const estadosValidos = ['Abierto', 'En Proceso', 'Resuelto', 'Cerrado'];
        if (!estadosValidos.includes(estado)) {
            return res.status(400).json({
                message: 'Estado no válido. Los estados permitidos son: Abierto, En Proceso, Resuelto, Cerrado'
            });
        }
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket no encontrado' });
        }
        const estadoActual = ticket.estado;
        //Validar que no se pueda cambiar a "Cerrado" si el estado actual no es "Resuelto"
        if (estado === 'Cerrado' && estadoActual !== 'Resuelto') {
            return res.status(400).json({ message: 'Solo se puede cambiar a Cerrado si el estado actual es Resuelto' });
        }
        //No resolver un ticket si esta cerrado
        if (estado === 'Resuelto' && estadoActual === 'Cerrado') {
            return res.status(400).json({ message: 'No se puede resolver un ticket cerrado' });
        }
        //Guardamos el ticket
        req.ticket = ticket;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}