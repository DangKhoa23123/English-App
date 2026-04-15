const eventService = require('../services/eventService');

exports.createEvent = async (req, res) => {
  const event = await eventService.create(req.body);
  res.json(event);
};

exports.getEvents = async (req, res) => {
  const events = await eventService.getAll();
  res.json(events);
};