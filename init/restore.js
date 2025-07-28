const mongoose = require("mongoose");
const { data } = require("./data");
const Listing = require("../models/listing");

mongoose.connect("mongodb://localhost:27017/wanderlust") // correct DB
  .then(() => {
    console.log("🌐 Connected to DB");
    return Listing.insertMany(data);
  })
  .then(() => {
    console.log("✅ Listings restored successfully!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error(" Error restoring listings:", err);
    mongoose.connection.close();
  });
