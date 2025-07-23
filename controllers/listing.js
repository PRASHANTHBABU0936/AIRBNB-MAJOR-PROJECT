const Listing=require("../models/listing");

// module.exports.index=async(req,res)=>
// {const allListings=await Listing.find({});
// res.render("listings/index", { allListings });
// };
// In controllers/listing.js
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { allListings });
};


module.exports.renderNewForm=(req,res)=>{
res.render("listings/new.ejs");
}
module.exports.showListing=async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" }  
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};
module.exports.createListing=async (req, res, next) => {
 let url=req.file.path;
 let filename=req.file.filename;
//  console.log(url,"..",filename);
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  // console.log(req.user);
  newListing.image={url,filename};
    await newListing.save();
// const newListing = new Listing(req.body.listing);


    req.flash("success","New Listing Created!");
    res.redirect("/listings");
};

module.exports.renderEditForm=async (req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id);
        if(!listing){
      req.flash("error","Listing you requested does not exist !");
      res.redirect("/listings");
    }
    let originalImageUrl=listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs",{listing,originalImageUrl});
  };
  module.exports.updateListing = async (req, res) => {

    let { id } = req.params;
  //  let listing = await Listing.findById();
  //  if(!listing.owner._id.equals(res.locals.curruser._id)){
  //   req.flash("error","You dont have permission to edit");
  //     return   res.redirect(`/listings/${id}`);
  //  }
    let listing =  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    //added
    if(typeof req.file != "undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();}
        req.flash("success", "Listing updated !");
       //added
        res.redirect(`/listings/${id}`);
};

module.exports.destroyListing=async(req,res) => {
    let {id} = req.params;
   let deletedListing  =  await Listing.findByIdAndDelete(id);
console.log(deletedListing);
req.flash("success","Listing deleted");
res.redirect("/listings");
};