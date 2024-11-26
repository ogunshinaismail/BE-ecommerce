const mongoose = require('mongoose');

const ViewsSchema = new mongoose.Schema({
  unit_id: String,
  visits: { type: Number, default: 0 },
  visited_IPs: { type: [String], default: [] },
});

const Views = mongoose.model('Views', ViewsSchema);

module.exports = Views;
