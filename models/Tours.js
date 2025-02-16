const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  date: { type: Date, required: true },
  popularity: { type: Number, default: 0 },
  bookings: { type: Number, default: 0 },
});

module.exports = mongoose.model("Tour", tourSchema);
