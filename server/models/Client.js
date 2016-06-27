var mongoose = require('mongoose');

var ClientSchema = new mongoose.Schema({
  app_name: String,
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Client', ClientSchema);