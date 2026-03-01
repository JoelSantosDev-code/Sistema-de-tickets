const Ticket = require('../models/ticketSchema');

exports.createTicket = async (req, res) => {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.json(ticket);
}

exports.getTickets = async (req, res) => {
    const tickets = await Ticket.find();
    res.json(tickets);
};