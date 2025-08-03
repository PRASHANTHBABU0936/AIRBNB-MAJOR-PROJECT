// // const multer = require("multer");
// // const { storage } = require("../cloudConfig.js");

// // const upload = multer({ storage });
// // const express = require("express");
// // const router = express.Router();
// // const wrapAsync = require("../utils/wrapAsync.js");
// // const ExpressError = require("../utils/ExpressError.js");
// // const { listingSchema } = require("../schema.js");
// // const Listing = require("../models/listing.js");
// // const { isLoggedIn, isOwner } = require("../middleware.js");
// // const validateListing = (req, res, next) => {
// //   let { error } = listingSchema.validate(req.body);
// //   // const { isLoggedIn, isOwner } = require("../middleware.js");

// //   //   console.log(result);
// //   if (error) {
// //     let errMsg = error.details.map((el) => el.message).join(",");
// //     throw new ExpressError(400, errMsg);
// //   } else {
// //     next();
// //   }
// // };
// // router.get("/search", wrapAsync(async (req, res) => {
// //   const { q } = req.query;
// //   const listings = await Listing.find({
// //     $or: [
// //       { title: new RegExp(q, 'i') },
// //       { location: new RegExp(q, 'i') }
// //     ]
// //   });

// //   // res.render("listings/index", { listings });
// //   res.render("listings/index", { allListings: listings });

// // }));

// // const listingController = require("../controllers/listing.js");

// // router
// //   .route("/")
// //   .get(wrapAsync(listingController.index))
// //   .post(
// //     isLoggedIn,
// //     upload.single("listing[image]"),
// //     wrapAsync(listingController.createListing)
// //   );

// // //NEWROUTE
// // router.get("/new", isLoggedIn, listingController.renderNewForm);



// // // routes/listings.js
// // // ✅ FIXED show route with bookings populated
// // // router.get('/:id', async (req, res) => {
// // //   try {
// // //     const listing = await Listing.findById(req.params.id)
// // //       .populate("owner")
// // //       .populate({
// // //         path: "bookings",
// // //         match: { user: req.user?._id },
// // //       });

// // //     let bookedDate = null;
// // //     if (listing.bookings.length > 0) {
// // //       bookedDate = listing.bookings[0].date.toDateString();
// // //     }

// // //     res.render("listings/show", { listing, currUser: req.user, bookedDate });
// // //   } catch (err) {
// // //     console.error(err);
// // //     res.status(500).send("Something went wrong");
// // //   }
// // });



// // router
// //   .route("/:id")
// //   .get(wrapAsync(listingController.showListing))
// //   .put(
// //     isLoggedIn,
// //     isOwner,
// //         upload.single("listing[image]"),
// //     validateListing,
// //     wrapAsync(listingController.updateListing)
// //   )
// //   .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// // //index routekk
// // // router.get("/",wrapAsync(listingController.index));
// // //show route

// // // router.get("/:id",wrapAsync(async(req,res) => {
// // //     let {id}=req.params;
// // //     const listing = await Listing.findById(id).populate("reviews").populate("owner");
// // //     if(!listing){
// // //       req.flash("error","Listing you requested does not exist !");
// // //       res.redirect("/listings");
// // //     }
// // //     console.log(listing);
// // //     res.render("listings/show.ejs",{listing});
// // // }));

// // // router.get("/:id", wrapAsync(listingController.showListing));

// // // CREATE ROUTE
// // // router.post("/", isLoggedIn,validateListing,wrapAsync(listingController.createListing));

// // //EDIT ROUTE
// // router.get(
// //   "/:id/edit",
// //   isLoggedIn,
// //   isOwner,
// //   wrapAsync(listingController.renderEditForm)
// // );
// // //UPdate route
// // // Update route
// // // router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing));

// // //delete route
// // // router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));
// // // 🔍 SEARCH ROUTE — Add this at the end

// // // routes/listings.js or wherever you render show.ejs
// //   const listing = await Listing.findById(req.params.id)
// //     .populate('owner')
// //     .populate('reviews');

// //   if (!listing) {
// //     return res.status(404).send("Listing not found");
// //   }

// //   res.render('listings/show', {
// //     listing,
// //     currentUser: req.user // ✅ pass current user to EJS
// //   });
// // });

// // module.exports = router;








// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { storage } = require("../cloudConfig.js");
// const upload = multer({ storage });

// const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const { listingSchema } = require("../schema.js");

// const Listing = require("../models/listing.js");
// const { isLoggedIn, isOwner } = require("../middleware.js");
// const listingController = require("../controllers/listing.js");

// // ✅ Listing validation middleware
// const validateListing = (req, res, next) => {
//   let { error } = listingSchema.validate(req.body);
//   if (error) {
//     let errMsg = error.details.map((el) => el.message).join(",");
//     throw new ExpressError(400, errMsg);
//   } else {
//     next();
//   }
// };

// // ✅ SEARCH ROUTE
// router.get("/search", wrapAsync(async (req, res) => {
//   const { q } = req.query;
//   const listings = await Listing.find({
//     $or: [
//       { title: new RegExp(q, 'i') },
//       { location: new RegExp(q, 'i') }
//     ]
//   });
//   res.render("listings/index", { allListings: listings });
// }));

// // ✅ INDEX + CREATE
// router.route("/")
//   .get(wrapAsync(listingController.index))
//   .post(
//     isLoggedIn,
//     upload.single("listing[image]"),
//     validateListing,
//     wrapAsync(listingController.createListing)
//   );

// // ✅ NEW FORM
// router.get("/new", isLoggedIn, listingController.renderNewForm);
// router.get("/:id", wrapAsync(async (req, res) => {
//   const { id } = req.params;
//   const listing = await Listing.findById(id)
//     .populate("owner")
//     .populate({
//       path: "reviews",
//       populate: { path: "author" },
//     });

//   if (!listing) {
//     req.flash("error", "Listing not found");
//     return res.redirect("/listings");
//   }

//   // ✅ Pull booked date from session (not DB)
// res.render("listings/show", {
//   listing,
//   currUser: req.user
// });

// }));



// router.get("/:id", async (req, res) => {
//     const { id } = req.params;
//     const listing = await Listing.findById(id)
//         .populate("owner")
//         .populate({
//             path: "reviews",
//             populate: { path: "author" },
//         });

//     const bookedDate = req.session.bookings?.[id] || null;

//     res.render("listings/show", { listing, bookedDate, currUser: req.user });
// });


// // ✅ SHOW ROUTE (with bookings, reviews, and owner populated)
// // router.get("/:id", wrapAsync(async (req, res) => {
// //   const listing = await Listing.findById(req.params.id)
// //     .populate("owner")
// //     .populate("reviews")
// //     .populate({
// //       path: "bookings",
// //       match: { user: req.user?._id }, // Only current user's bookings
// //     });

// //   if (!listing) {
// //     req.flash("error", "Listing not found");
// //     return res.redirect("/listings");
// //   }

// //   let bookedDate = null;
// //   if (listing.bookings.length > 0) {
// //     bookedDate = listing.bookings[0].date.toDateString();
// //   }

// //   res.render("listings/show", {
// //     listing,
// //     currUser: req.user,
// //     bookedDate
// //   });
// // }));


// // const bookedDate = req.query.bookedDate;
// // res.render('listings/show', { listing, currUser: req.user, bookedDate });


// // ✅ EDIT FORM
// router.get("/:id/edit",
//   isLoggedIn,
//   isOwner,
//   wrapAsync(listingController.renderEditForm)
// );

// // ✅ UPDATE + DELETE
// router.route("/:id")
//   .put(
//     isLoggedIn,
//     isOwner,
//     upload.single("listing[image]"),
//     validateListing,
//     wrapAsync(listingController.updateListing)
//   )
//   .delete(
//     isLoggedIn,
//     isOwner,
//     wrapAsync(listingController.destroyListing)
//   );

// module.exports = router;
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

  res.render("listings/show", {
    listing,
    currUser: req.user,
    booked,
    bookedDate
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
