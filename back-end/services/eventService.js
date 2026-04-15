const Event = require('../models/Event');

class EventService {
  async create(data) {
    const event = new Event(data);
    return await event.save();
  }

  async getAll() {
    return await Event.find().sort({ startTime: 1 });
  }
}

module.exports = new EventService();