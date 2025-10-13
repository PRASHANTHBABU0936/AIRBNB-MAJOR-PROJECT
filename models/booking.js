// ORIGNAL =BEFORE ADDING PROPER DUPLICATE BOOKING

// // models/booking.js
// const mongoose = require("mongoose");

// const bookingSchema = new mongoose.Schema({
//   listing: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Listing",
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
//   date: {
//     type: String,
//     required: true,
//   },
// });

// module.exports = mongoose.model("Booking", bookingSchema);


const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
    required: true,  // ✅ must always belong to a listing
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,  // ✅ must always belong to a user
  },
  date: {
    type: String,     // You can keep String (like "2025-10-07")
    required: true,
  },
});

// ✅ Optional: prevent duplicate bookings for the same listing & date
bookingSchema.index({ listing: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Booking", bookingSchema);
