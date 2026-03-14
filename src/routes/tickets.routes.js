const express = require('express');
const router = express.Router();

const ticketController = require('../controllers/controller.js');
const validarCambioEstado = require('../middlewares/validarEstado.js');

router.post('/', ticketController.createTicket);
router.get('/', ticketController.getTickets);
router.put('/:id/comentar', ticketController.addComentario);
router.patch('/:id/estado', validarCambioEstado, ticketController.cambioEstado);

module.exports = router;