// ORIGNAL =BEFORE ADDING PROPER DUPLICATE BOOKING
// // routes/bookings.js (or wherever your route is)
// const express = require('express');
// const router = express.Router();
// const Listing = require('../models/listing'); // or wherever your model is
// const { isLoggedIn } = require('../middleware'); // if needed  

// router.post('/:id/book', isLoggedIn, async (req, res) => {
//   const { id } = req.params;
//   const { date } = req.body;

//   if (!date) {
//     req.flash('error', 'Please select a date.');
//     return res.redirect(`/listings/${id}`);
//   }

//   console.log("✅ Booking received:", date);

//   // You can also save the booking in DB here

//   req.flash('success', `Booked on ${date}`);
//   req.flash('bookedDate', date);
// res.redirect(`/listings/${id}?booked=success&date=${date}`);
// });

// module.exports = router;



// routes/bookings.js
const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const Booking = require("../models/booking");
const { isLoggedIn } = require("../middleware"); // your auth middleware

// POST /bookings/:id/book  (or keep original route structure)
router.post("/:id/book", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { date } = req.body; // expects 'YYYY-MM-DD' from <input type="date">

  if (!date) {
    req.flash("error", "Please select a date.");
    return res.redirect(`/listings/${id}`);
  }

  try {
    // Check for existing booking for same listing and date
    const existing = await Booking.findOne({ listing: id, date });
    if (existing) {
      req.flash("error", `Sorry — ${date} is already booked.`);
      return res.redirect(`/listings/${id}`);
    }

    // Save booking
    const booking = new Booking({
      listing: id,
      user: req.user._id,
      date: date,
    });
    await booking.save();

    req.flash("success", `Booked on ${date}`);
    return res.redirect(`/listings/${id}`);
  } catch (err) {
    console.error("Error creating booking:", err);
    req.flash("error", "Something went wrong while booking.");
    return res.redirect(`/listings/${id}`);
  }
});

module.exports = router;
