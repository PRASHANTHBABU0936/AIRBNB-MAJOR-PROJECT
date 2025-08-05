// const Listing=require("../models/listing");
// const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
// const mapToken = process.env.MAP_TOKEN;
// const geocodingClient = mbxGeocoding({accessToken:mapToken});
// module.exports.renderNewForm = (req, res) => {
//   res.render("listings/new.ejs");
// };

// // module.exports.index=async(req,res)=>
// // {const allListings=await Listing.find({});
// // res.render("listings/index", { allListings });
// // };
// // In controllers/listing.js
// module.exports.showListing = async (req, res) => {
//   const { id } = req.params;
//   const { bookedDate } = req.query;

//   const listing = await Listing.findById(id)
//     .populate("owner")
//     .populate({
//       path: "bookings",
//       populate: { path: "user" }
//     });

//   if (!listing) {
//     req.flash("error", "Listing not found");
//     return res.redirect("/listings");
//   }

//   // ✅ Get paymentInfo from session if present
//   const paymentInfo = req.session.paymentInfo && req.session.paymentInfo.listingId === id
//     ? req.session.paymentInfo
//     : null;

//   // ✅ Pass paymentInfo to the EJS template
//   res.render("listings/show", {
//     listing,
//     bookedDate,
//     currUser: req.user,
//     paymentInfo
//   });
// };
// module.exports.index = async (req, res) => {
//   const allListings = await Listing.find({});
//   res.render("listings/index", { allListings });
// };



// // module.exports.showListing=async (req, res) => {
// //   const { id } = req.params;
// //   const listing = await Listing.findById(id)
// //     .populate({
// //       path: "reviews",
// //       populate: { path: "author" }  
// //     })
// //     .populate("owner");

// //   if (!listing) {
// //     req.flash("error", "Listing not found");
// //     return res.redirect("/listings");
// //   }

// //   res.render("listings/show.ejs", { listing });
// // };








// const Listing = require("../models/listing");
// const Payment = require("../models/payment"); // ✅ Make sure this model is created
// const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
// const mapToken = process.env.MAP_TOKEN;
// const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// module.exports.renderNewForm = (req, res) => {
//   res.render("listings/new.ejs");
// };

// module.exports.index = async (req, res) => {
//   const allListings = await Listing.find({});
//   res.render("listings/index", { allListings });
// };

// module.exports.showListing = async (req, res) => {
//   const { id } = req.params;
//   const { bookedDate } = req.query;

//   const listing = await Listing.findById(id)
//     .populate("owner")
//     .populate({
//       path: "bookings",
//       populate: { path: "user" }
//     });

//   if (!listing) {
//     req.flash("error", "Listing not found");
//     return res.redirect("/listings");
//   }

//   // ✅ Handle one-time payment success popup
//   let paymentInfo = null;
//   if (req.session.paymentInfo && req.session.paymentInfo.listingId === id) {
//     paymentInfo = req.session.paymentInfo;
//     delete req.session.paymentInfo; // Clear after using
//   }

//   res.render("listings/show", {
//     listing,
//     bookedDate,
//     currUser: req.user,
//     paymentInfo
//   });
// };

// module.exports.createListing = async (req, res, next) => {
//   let response = await geocodingClient.forwardGeocode({
//     query: req.body.listing.location,
//     limit: 1,
//   }).send();

//   let url = req.file.path;
//   let filename = req.file.filename;

//   const newListing = new Listing(req.body.listing);
//   newListing.owner = req.user._id;
//   newListing.image = { url, filename };
//   newListing.geometry = response.body.features[0].geometry;

//   let savedListing = await newListing.save();
//   console.log(savedListing);

//   req.flash("success", "New Listing Created!");
//   res.redirect("/listings");
// };

// module.exports.renderEditForm = async (req, res) => {
//   let { id } = req.params;
//   const listing = await Listing.findById(id);
//   if (!listing) {
//     req.flash("error", "Listing you requested does not exist!");
//     return res.redirect("/listings");
//   }
//   let originalImageUrl = listing.image.url.replace("/upload", "/upload/w_250");
//   res.render("listings/edit.ejs", { listing, originalImageUrl });
// };

// module.exports.updateListing = async (req, res) => {
//   let { id } = req.params;
//   let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

//   if (typeof req.file != "undefined") {
//     let url = req.file.path;
//     let filename = req.file.filename;
//     listing.image = { url, filename };
//     await listing.save();
//   }

//   req.flash("success", "Listing updated!");
//   res.redirect(`/listings/${id}`);
// };

// module.exports.destroyListing = async (req, res) => {
//   let { id } = req.params;
//   let deletedListing = await Listing.findByIdAndDelete(id);
//   console.log(deletedListing);
//   req.flash("success", "Listing deleted");
//   res.redirect("/listings");
// };


// // module.exports.createListing=async (req, res, next) => {
// //  let response=await geocodingClient.forwardGeocode({
// //   query: req.body.listing.location,
// //   limit: 1,
// // })
// //   .send()
// // //  console.log(response.body.features[0].geometry);
// // //  res.send("done!");
// //   let url=req.file.path;
// //  let filename=req.file.filename;
// // //  console.log(url,"..",filename);
// //   const newListing = new Listing(req.body.listing);
// //   newListing.owner = req.user._id;
// //   // console.log(req.user);
// //   newListing.image={url,filename};
// //   newListing.geometry=response.body.features[0].geometry;
// //    let savedListing = await newListing.save();
// // console.log(savedListing)
// //    // const newListing = new Listing(req.body.listing);


// //     req.flash("success","New Listing Created!");
// //     res.redirect("/listings");
// // };

// // module.exports.renderEditForm=async (req,res)=>{
// //     let {id}=req.params;
// //     const listing = await Listing.findById(id);
// //         if(!listing){
// //       req.flash("error","Listing you requested does not exist !");
// //       res.redirect("/listings");
// //     }
// //     let originalImageUrl=listing.image.url;
// //     originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250");
// //     res.render("listings/edit.ejs",{listing,originalImageUrl});
// //   };
// //   module.exports.updateListing = async (req, res) => {

// //     let { id } = req.params;
// //   //  let listing = await Listing.findById();
// //   //  if(!listing.owner._id.equals(res.locals.curruser._id)){
// //   //   req.flash("error","You dont have permission to edit");
// //   //     return   res.redirect(`/listings/${id}`);
// //   //  }
// //     let listing =  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
// //     //added
// //     if(typeof req.file != "undefined"){
// //     let url=req.file.path;
// //     let filename=req.file.filename;
// //     listing.image={url,filename};
// //     await listing.save();}
// //         req.flash("success", "Listing updated !");
// //        //added
// //         res.redirect(`/listings/${id}`);
// // };

// // module.exports.destroyListing=async(req,res) => {
// //     let {id} = req.params;
// //    let deletedListing  =  await Listing.findByIdAndDelete(id);
// // console.log(deletedListing);
// // req.flash("success","Listing deleted");
// // res.redirect("/listings");
// // };

const Listing = require("../models/listing");
const Payment = require("../models/payment");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { allListings });
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const { bookedDate } = req.query;

  const listing = await Listing.findById(id)
    .populate("owner")
    .populate({
      path: "bookings",
      populate: { path: "user" }
    });

  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

let paymentRecord = null;

if (req.isAuthenticated()) {
  paymentRecord = await Payment.findOne({
    user: req.user._id,
    listing: id
  });
}

res.render("listings/show", {
  listing,
  bookedDate,
  currUser: req.user,
  paymentRecord // 👈 new variable
});

};

module.exports.createListing = async (req, res, next) => {
  let response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1,
  }).send();

  let url = req.file.path;
  let filename = req.file.filename;

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = response.body.features[0].geometry;

  await newListing.save();

  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested does not exist!");
    return res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted");
  res.redirect("/listings");
};
