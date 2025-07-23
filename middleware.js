const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, msg);
  }
  next();
};

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be logged in to create listing");
    return res.redirect("/login");
  }
  next();
};

const saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

// const isOwner = async (req, res, next) => {
//   let { id } = req.params;
//   let listing = await Listing.findById(id);

//  if (!listing.owner.equals(req.user._id)){
//     req.flash("error", "You don’t have permission to edit");
//     return res.redirect(`/listings/${id}`);
//   }
//   next();
// };
const isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in");
    return res.redirect("/login");
  }

  if (!listing.owner.equals(req.user._id)) {
    req.flash("error", "You don’t have permission to edit/delete this listing");
    return res.redirect(`/listings/${id}`);
  }

  next();
};


const isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);

  if (!review.author.equals(res.locals.curruser._id)) {
    req.flash("error", "You are not the author of this review");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports = {
  validateReview,
  isLoggedIn,
  saveRedirectUrl,
  isOwner,
  isReviewAuthor
};



















// const Listing=require("./models/listing");
// module.exports.isLoggedIn=(req,res,next)=>{
//    // console.log(req.path,"..",req.originalUrl);
//      if(!req.isAuthenticated()){
//       //redirecurl
//       req.session.redirectUrl = req.originalUrl;
//     req.flash("error","you must be logged in to create listing");
//  return res.redirect("/login"); }
//  next();
// };

// module.exports.saveRedirectUrl=>(req,res,next) => {
//    if(req.session.redirectUrl)
//    {
//       res.locals.redirectUrl = req.session.redirectUrl;
//    } next();
// }
// module.exports.isOwner = async(req,res,next) ={
//      let {id} = req.params;
//    let listing = await Listing.findById();

//    if(!listing.owner._id.equals(res.locals.curruser._id)){
//     req.flash("error","You dont have permission to edit");
//       return   res.redirect(`/listings/${id}`);
//    }
// }














// const Listing = require("./models/listing");
// const Review=require("./models/review");
// const ExpressError = require("./utils/ExpressError.js");
// const {listingSchema,reviewschema}=require("./schema.js")
// module.exports.isLoggedIn = (req, res, next) => {
//   if (!req.isAuthenticated()) {
//     req.session.redirectUrl = req.originalUrl;
//     req.flash("error", "you must be logged in to create listing");
//     return res.redirect("/login");
//   }
//   next();
// };

// module.exports.saveRedirectUrl = (req, res, next) => {
//   if (req.session.redirectUrl) {
//     res.locals.redirectUrl = req.session.redirectUrl;
//   }
//   next();
// };

// module.exports.isOwner = async (req, res, next) => {
//   let { id } = req.params;
//   let listing = await Listing.findById(id);

//   if (!listing.owner._id.equals(res.locals.curruser._id)) {
//     req.flash("error", "You dont have permission to edit");
//     return res.redirect(`/listings/${id}`);
//   }
//   next(); // You forgot this part, always call next() when permission is granted
// };

// module.exports.isReviewAuthor = async (req, res, next) => {
//   let { id,reviewId } = req.params;
//   let review = await Review.findById(reviewId);

//   if (!review.author.owner.equals(res.locals.curruser._id)) {
//     req.flash("error", "You RE NOT THE AUTHOR OF THIS REVIEW");
//     return res.redirect(`/listings/${id}`);
//   }
//   next(); // You forgot this part, always call next() when permission is granted
// };

