
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const Booking = require("../models/booking.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const listingController = require("../controllers/listing.js");

// ✅ Validation middleware
const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }
  next();
};

// ✅ SEARCH route
router.get("/search", wrapAsync(async (req, res) => {
  const { q } = req.query;
  const listings = await Listing.find({
    $or: [
      { title: new RegExp(q, "i") },
      { location: new RegExp(q, "i") }
    ]
  });
  res.render("listings/index", { allListings: listings });
}));

// ✅ INDEX + CREATE
router.route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

// ✅ NEW form
router.get("/new", isLoggedIn, listingController.renderNewForm);

// ✅ BOOKING route
router.post('/:listingId/book', isLoggedIn, async (req, res) => {
  const { listingId } = req.params;
  const { date } = req.body;
  const userId = req.user._id;

  if (!date) {
    return res.redirect(`/listings/${listingId}?booked=fail`);
  }

  const existingBooking = await Booking.findOne({ listing: listingId, user: userId, date });

  if (existingBooking) {
    return res.redirect(`/listings/${listingId}?booked=exists&date=${date}`);
  }

  const newBooking = new Booking({ listing: listingId, user: userId, date });
  await newBooking.save();

  res.redirect(`/listings/${listingId}?booked=success&date=${date}`);
});

// ✅ SHOW route


const Payment = require('../models/payment');

router.get("/:id", wrapAsync(async (req, res) => {
  const { id } = req.params;
  const { booked, date } = req.query;

  const listing = await Listing.findById(id)
    .populate("owner")
    .populate({
      path: "reviews",
      populate: { path: "author" }
    });

  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  const bookedDate = booked === "success" && date ? date : null;

  // Grab payment info from session
  let paymentInfo = null;
  if (req.session.paymentInfo && req.session.paymentInfo.listingId == id) {
    paymentInfo = req.session.paymentInfo;
    delete req.session.paymentInfo; // optional: clear after showing
  }

  res.render("listings/show", {
    listing,
    currUser: req.user,
    booked,
    bookedDate,
    paymentInfo
  });
}));


// ✅ EDIT form
router.get("/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

// ✅ UPDATE + DELETE
router.route("/:id")
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing)
  );

module.exports = router;
