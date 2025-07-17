const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  sessionId: String,
  page: String,
  type: String,
  timestamp: Number,
  duration: Number, 
  lastVisitedTime: Number,
  element: String, 
  userAgent: String,
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
