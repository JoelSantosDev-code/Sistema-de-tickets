const express = require('express');
const router = express.Router();

const ticketController = require('../controllers/controller.js');

router.post('/api/tickets', ticketController.createTicket);
router.get('/api/tickets', ticketController.getTickets);
router.put('/api/tickets/:id/comentario', async (req, res) => {
    const { comentario } = req.body;
    const ticketActualizado = await Ticket.findByIdAndUpdate(
        req.paramis.id,
        { $push: { comentarios: comentario } },
        { new: true }

    );
    res.json(ticketActualizado);
})
router.patch('/api/tickets/:id/estado', async (req, res) => {
    const { estado } = req.body;
    const ticketActualizado = await Ticket.findByIdAndUpdate(
        req.params.id,
        { Estado: estado },
        { new: true }
    );
    res.json(ticketActualizado);
}
);

module.exports = router;