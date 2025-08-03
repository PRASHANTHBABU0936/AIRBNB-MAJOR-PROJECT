// //SCHEMA DEFINITION
// //IF A LISTING IS DELETED THEN ALL ITS REVIEWS MUST ALSO GET DELETED


// const mongoose = require("mongoose");
// const Schema = mongoose.Schema //connect 
// const Review=require("./review.js");
// const { required } = require("joi");
// const listingSchema = new Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: String,
//   image: {
//     url: String,
//     filename: String,
//   },
//   price: Number,
//   location: String,
//   country: String,
//   reviews: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "Review"
//     }
//   ],
//   bookings: [  // ✅ Add this field
//     {
//       type: Schema.Types.ObjectId,
//       ref: "Booking"
//     }
//   ],
//   owner: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//   },
//   geometry: {
//     type: {
//       type: String,
//       enum: ["Point"],
//       required: true,
//     },
//     coordinates: {
//       type: [Number],
//       required: true,
//     },
//   }
// });


//     // category:{
//     //     type:String,
//     //     enum:["mountains",'arctic','farms','deserts']
//     // }
// );

// //if any listing ius get deleteed then all its reviews should be get deleted

// // models/listing.js
// listingSchema.virtual("bookings", {
//   ref: "Booking",
//   foreignField: "listing",
//   localField: "_id",
// });
// listingSchema.set("toObject", { virtuals: true });
// listingSchema.set("toJSON", { virtuals: true });


// listingSchema.post("findOneAndDelete",async (listing) =>{
//     if(listing){
// await Review.deleteMany({_id:{$in:listing.reviews}});}
// })
// const Listing = mongoose.model("Listing",listingSchema);
// module.exports = Listing;



























// models/listing.js
// SCHEMA DEFINITION
// IF A LISTING IS DELETED THEN ALL ITS REVIEWS MUST ALSO GET DELETED

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

// Define the Listing Schema
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review"
    }
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  }
});

// ✅ Virtual to link Booking model (optional: only if you plan to `populate("bookings")`)
listingSchema.virtual("bookings", {
  ref: "Booking",
  foreignField: "listing",
  localField: "_id",
});

listingSchema.set("toObject", { virtuals: true });
listingSchema.set("toJSON", { virtuals: true });

// 🧹 Middleware: Delete reviews when a listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

// Export the model
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
