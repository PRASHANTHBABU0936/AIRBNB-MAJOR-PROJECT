// const mongoose = require("mongoose");
// const { faker } = require('@faker-js/faker');
// const User = require("../models/user"); // adjust path as needed

// // Connect to local MongoDB
// mongoose.connect("mongodb://127.0.0.1:27017/airbnb")
//   .then(() => console.log("Connected to MongoDB"))
//   .catch(err => console.log(err));


require('dotenv').config(); // Load .env
const mongoose = require("mongoose");
const { faker } = require('@faker-js/faker');
const User = require("../models/user"); // adjust path if needed

// ✅ Connect to MongoDB Atlas 'test' database
mongoose.connect(process.env.ATLASDB_URL)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.log(err)); 
async function seedUsers() {
  // await User.deleteMany({}); // clear existing users

  for (let i = 0; i < 1000; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName });
    const username = faker.internet.username({ firstName, lastName });
    const password = "password123";

    const user = new User({ username, email });
    await User.register(user, password);
  }

  console.log("✅ 1000 users added!");
  mongoose.connection.close();
}

// Run the seed function
seedUsers();
