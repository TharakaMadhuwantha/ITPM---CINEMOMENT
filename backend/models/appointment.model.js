const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  couplename: { type: String, required: true },
  contactno: { type: Number, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  reason: { type: String, required: true },
  note: { type: String, required: true },
}, {
  timestamps: true,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;