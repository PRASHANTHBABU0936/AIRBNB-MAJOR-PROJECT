const multer = require("multer");
const { storage } = require("../cloudConfig.js");

const upload = multer({ storage });
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  // const { isLoggedIn, isOwner } = require("../middleware.js");

  //   console.log(result);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
const listingController = require("../controllers/listing.js");

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    wrapAsync(listingController.createListing)
  );

//NEWROUTE
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
        upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//index routekk
// router.get("/",wrapAsync(listingController.index));
//show route

// router.get("/:id",wrapAsync(async(req,res) => {
//     let {id}=req.params;
//     const listing = await Listing.findById(id).populate("reviews").populate("owner");
//     if(!listing){
//       req.flash("error","Listing you requested does not exist !");
//       res.redirect("/listings");
//     }
//     console.log(listing);
//     res.render("listings/show.ejs",{listing});
// }));

// router.get("/:id", wrapAsync(listingController.showListing));

// CREATE ROUTE
// router.post("/", isLoggedIn,validateListing,wrapAsync(listingController.createListing));

//EDIT ROUTE
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);
//UPdate route
// Update route
// router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing));

//delete route
// router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;
