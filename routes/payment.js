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



// const express = require("express");
// const router = express.Router();
// const paymentController = require("../controllers/payment");
// const { isLoggedIn } = require("../middleware");

// // ✅ POST: Create Stripe checkout session for a listing
// router.post(
//   "/create-checkout-session/:listingId",
//   isLoggedIn,
//   paymentController.createCheckoutSession
// );

// // ✅ GET: Success page after payment
// // Stores payment info in database and redirects to listing detail page
// router.get("/success", isLoggedIn, async (req, res) => {
//   const { listingId, session_id } = req.query;
//   const Payment = require("../models/payment"); // import Payment model
//   const Listing = require("../models/listing"); // import Listing model

//   try {
//     const listing = await Listing.findById(listingId);
//     if (!listing) {
//       req.flash("error", "Listing not found after payment");
//       return res.redirect("/listings");
//     }

//     // ✅ Check if payment already exists to avoid duplicates
//     let existingPayment = await Payment.findOne({
//       user: req.user._id,       // ✅ changed from userId --> user
//       listing: listing._id      // ✅ changed from listingId --> listing
//     });

//     if (!existingPayment) {
//       // ✅ Store payment in database with correct field names
//       const newPayment = new Payment({
//         user: req.user._id,      // ✅ matches your schema
//         listing: listing._id,    // ✅ matches your schema
//         amount: listing.price,
//         date: new Date()
//       });
//       await newPayment.save();
//     }

//     // ✅ Redirect to listing detail page
//     res.redirect(`/listings/${listing._id}`);
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

// ✅ POST: Create Stripe checkout session for a listing
router.post(
  "/create-checkout-session/:listingId",
  isLoggedIn,
  paymentController.createCheckoutSession
);

// ✅ GET: Success page after payment
// Stores payment info in database and redirects to listing detail page
router.get("/success", isLoggedIn, paymentController.successPage);

module.exports = router;
