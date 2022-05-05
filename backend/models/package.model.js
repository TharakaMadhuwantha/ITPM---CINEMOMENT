const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const packageSchema = new Schema({
  packagename: { type: String, required: true },
  packagetype: { type: String, required: true },
  cameras: {type: String, required: true},
  drons: {type: String, required: true},
  amount: { type: Number, required: true },
  description: { type: String, required: true },
}, {
  timestamps: true,
});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;