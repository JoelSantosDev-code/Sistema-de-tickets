const express = require('express');
const router = express.Router();

const ticketController = require('../controllers/controller.js');
const validarCambioEstado = require('../middlewares/validarEstado.js');

router.post('/api/tickets', ticketController.createTicket);
router.get('/api/tickets', ticketController.getTickets);
router.put('/api/tickets/:id/comentario', ticketController.addComentario);
router.patch('/api/tickets/:id/estado', validarCambioEstado, ticketController.cambioEstado);

module.exports = router;