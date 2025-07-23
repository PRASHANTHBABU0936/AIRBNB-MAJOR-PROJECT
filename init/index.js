const mongoose = require("mongoose");//now again last updated index.js
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js"); 

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Error:", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});

  // ✅ Find the actual user you created earlier
  const user = await User.findOne({ username: "demoUser" });

  if (!user) {
    console.log(" User not found. Please create one first.");
    return;
  }

  //  Attach this user as the owner to each listing
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: user._id,
  }));

  await Listing.insertMany(initData.data);
  console.log(" Listings initialized with correct owner.");
};

initDB();