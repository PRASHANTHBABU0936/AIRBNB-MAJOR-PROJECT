// const mongoose = require("mongoose");
// const Listing = require("../models/listing");

// async function main() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/staylog");

//   const userId = "64e7f63f6874b2733da78a28"; // replace with actual user ID

//   const listings = await Listing.find({
//     owner: { $exists: false }  // Only update listings without owners
//   });

//   for (let listing of listings) {
//     listing.owner = userId;
//     await listing.save();
//     console.log(`✅ Assigned owner to: ${listing.title}`);
//   }

//   console.log(`🎉 Done. ${listings.length} listings updated.`);
//   mongoose.connection.close();
// }

// main().catch(err => console.log(err));



const mongoose = require("mongoose");
const Listing = require("../models/listing");
const User = require("../models/user");

main().then(() => {
  console.log("🌐 Connected to MongoDB");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

async function assignRandomOwner() {
  const users = await User.find({});
  if (users.length === 0) {
    console.log("❌ No users found in the database.");
    return;
  }

  const listings = await Listing.find({ owner: { $exists: false } });

  for (let listing of listings) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    listing.owner = randomUser._id;
    await listing.save();
  }

  console.log(`✅ Assigned random owners to ${listings.length} listings.`);
}

assignRandomOwner();
