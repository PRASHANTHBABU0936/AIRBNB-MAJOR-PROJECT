// const express = require("express");
// const router = express.Router();
// const { isLoggedIn } = require("../middleware");

// const Listing = require("../models/listing");
// router.get("/create-checkout-session/:listingId", isLoggedIn, paymentController.createCheckoutSession);
// router.get("/success", isLoggedIn, paymentController.successPage);
// const paymentController = require("../controllers/payment.js");

// // Payment success route
// router.get("/success", async (req, res) => {
//   const { listingId } = req.query;

//   try {
//     const listing = await Listing.findById(listingId);
//     if (!listing) {
//       req.flash("error", "Listing not found after payment");
//       return res.redirect("/listings");
//     }

//     // ✅ Store payment info in session
//     req.session.paymentInfo = {
//       listingId,
//       amount: listing.price,
//       date: new Date()
//     };

//     // Redirect to listing detail page
//     res.redirect(`/listings/${listingId}`);
//   } catch (err) {
//     console.error("Payment success route error:", err);
//     req.flash("error", "Something went wrong after payment");
//     res.redirect("/listings");
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment");
const { isLoggedIn } = require("../middleware");

// POST: Stripe checkout
router.post('/create-checkout-session/:listingId', isLoggedIn, paymentController.createCheckoutSession);

// ✅ GET: Success page route (corrected)
router.get('/success', isLoggedIn, paymentController.successPage);

module.exports = router;
