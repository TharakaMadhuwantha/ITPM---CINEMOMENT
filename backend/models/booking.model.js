const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  groomname: { type: String, required: true },
  bridename: { type: String, required: true },
  contactno: { type: Number, required: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  package: { type: String, required: true },
}, {
  timestamps: true,
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;