const mongoose = require("mongoose");
const Schema = mongoose.Schema //connect 
const Review=require("./review.js");
const listingSchema = new Schema({ //connect 
    title:{
        type:String,
        required:true,
    },
    description:String,
image:{
    url:String,
    filename:String,
},
 price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
    // category:{
    //     type:String,
    //     enum:["mountains",'arctic','farms','deserts']
    // }
});

//if any listing ius get deleteed then all its reviews should be get deleted

listingSchema.post("findOneAndDelete",async (listing) =>{
    if(listing){
await Review.deleteMany({_id:{$in:listing.reviews}});}
})
const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;