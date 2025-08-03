// routes/bookings.js (or wherever your route is)
const express = require('express');
const router = express.Router();
const Listing = require('../models/listing'); // or wherever your model is
const { isLoggedIn } = require('../middleware'); // if needed

router.post('/:id/book', isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { date } = req.body;

  if (!date) {
    req.flash('error', 'Please select a date.');
    return res.redirect(`/listings/${id}`);
  }

  console.log("✅ Booking received:", date);

  // You can also save the booking in DB here

  req.flash('success', `Booked on ${date}`);
  req.flash('bookedDate', date);
res.redirect(`/listings/${id}?booked=success&date=${date}`);
});

module.exports = router;
