const Ticket = require('../models/ticketSchema');

exports.createTicket = async (req, res) => {
    try {
        const ticket = new Ticket(req.body);
        await ticket.save();
        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el ticket' });
    }
}

exports.getTickets = async (req, res) => {
    const tickets = await Ticket.find();
    res.json(tickets);
};

exports.addComentario = async (req, res) => {
    try {
        const { comentario } = req.body;
        if (!comentario) {
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
            mensaje: comentario,
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
        ticket.estado = estado;
        await ticket.save();
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}