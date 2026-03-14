const Ticket = require('../models/ticketSchema');
const validacionEstado = require('../middlewares/validarEstado');

exports.createTicket = async (req, res) => {
    try {
        const ticket = new Ticket(req.body);
        await ticket.save();
        res.status(201).json(ticket);
    } catch (error) {
        console.error("Error real:", error);
        res.status(500).json({ error: error.message });
    }
}

exports.getTickets = async (req, res) => {
    try {
        const filtrosPermitidos = ['estado', 'prioridad', 'usuario', 'folio'];
        const filter = {};

        filtrosPermitidos.forEach(filtro => {
            if (req.query[filtro]) {
                filter[filtro] = req.query[filtro];
            }
        });

        const tickets = await Ticket.find(filter);
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los tickets' });
    }

};

exports.addComentario = async (req, res) => {
    try {
        const { mensaje } = req.body;
        if (!mensaje) {
            return res.status(400).json({ error: 'El campo mensaje es obligatorio' });
        }
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket no encontrado' });
        }
        //No permitir agregar comentarios a tickets cerrados
        if (ticket.estado === 'Cerrado') {
            return res.status(400).json({ error: 'No se pueden agregar comentarios a un ticket cerrado' });
        }
        //Agregar el nuevo comentario al array de comentarios del ticket
        ticket.comentarios.push({
            mensaje: mensaje,
            fecha: new Date()
        });
        //Cambiar el estado a "En Proceso" si el ticket estaba "Abierto" y si esta "Resuelto" cambiarlo a "En Proceso"
        if (ticket.estado === 'Abierto' || ticket.estado === 'Resuelto') {
            ticket.estado = 'En Proceso';
        }
        await ticket.save();
        res.json(ticket);

    } catch (err) {
        return res.status(500).json({ error: 'Error al agregar el comentario' });
    }
};

exports.cambioEstado = async (req, res) => {
    try {
        const { estado } = req.body;
        const ticket = req.ticket; //Obtenemos el ticket validado en el middleware

        const estadoAnterior = ticket.estado;

        //cambio de estado
        ticket.estado = estado;

        //Agregar comentario automatico
        ticket.comentarios.push({
            mensaje: `Estado cambiado de "${estadoAnterior}" a "${estado}"`
        });
        await ticket.save();
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}