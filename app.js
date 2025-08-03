if(process.env.NODE_ENV != "production"){
require('dotenv').config();

}
 //key value pairs
// console.log(process.env.SECRET);
const expressLayouts = require("express-ejs-layouts");

const express = require("express");//basic  req setup
const app = express();//basic  req setup
const mongoose = require("mongoose");//basic  req setup
// const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
// const Listing = require("./models/listing.js");
const path=require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
// const wrapAsync = require("./utils/wrapAsync.js");
// const wrapAsync = require("./utils/wrapAsync.js"); 
const ExpressError=require("./utils/ExpressError.js");
// const {listingSchema,reviewSchema} = require("./schema.js");
// const Review=require("./models/review.js");
const session=require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport=require("passport");
const LocalStrategy = require("passport-local");
const User=require("./models/user.js");

const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");


// const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLASDB_URL;
// console.log("MONGO_URI =>", dbUrl);

main().then(() => {
    console.log("Connected to DB");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(dbUrl);
}





// const dbUrl = process.env.MONGO_URI;
// console.log("MONGO_URI =>", dbUrl);
// main().then(() => {
//     console.log("Connected to DB");
// })
// .catch((err) => {
//     console.log(err);
// });

// async function main() {
//     await mongoose.connect(dbUrl);
// }

// app.set("view engine","ejs");
// app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate); 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname,"/public")));
const store = MongoStore.create({
    mongoUrl: dbUrl, 
    crypto:{
        secret:process.env.SECRET,
    },
touchAfter:24*3600
});

store.on("error",()=>{
    console.log("Error in MONGO SESSION STORE",err);
})
const sessionOptions = {
  // secret: process.env.SECRET,
   store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};



// app.get('/', (req, res) => {
//   res.send('Hello World!')
// }); //basic  req setup


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.locals.currUser = req.user; // or wherever you're storing the user after login
    next();
});

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.use((req, res, next) => {
//     res.locals.currUser = req.user;  // assuming you're using Passport and req.user is available
//     next();
// });


// app.use((req,res,next) => {
//     res.locals.success = req.flash("success");
//     res.locals.error=req.flash("error");
//     res.locals.currUser=req.user;
//     // console.log(res.locals.success);
//     next();
// })


app.use((req, res, next) => {
    res.locals.currUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});


// app.get("/demouser",async (req,res) => {
//     let fakeUser=new User({
//         email:"student@gmail.com",
//         username:"delta-student"

//     });
//    let registeredUser=await User.register(fakeUser,"helloworld");
// res.send(registeredUser);
// })



app.use("/listings/:id/reviews", reviewRouter);
app.use("/listings", listingRouter); // put this AFTER reviews

app.use("/",userRouter);

// app.get("/testListing",async(req,res) => {
//     let sampleListing = new Listing({
// title:"My NEW Villa",
// image:"https://images.unsplash.com/photo-1536257104079-aa99c6460a5a?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFuZHNjYXBlc3xlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
// description:"By the beach",
// price:1200,
// location:"Calangute,Goa",
// country:"India",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });

// app.all("*",(req,res,next) => {
// next(new ExpressError(404,"Page Not Found"));
// });


// app.use((err,req,res,next)=>{
//     let{statusCode,message} = err;
//     res.status(statusCode).send(message);
// });

app.all("*",(req,res,next) => {
  
    next(new ExpressError(404,"Page Not Found!"));
});

app.use((err, req, res, next) => {
    // const { statusCode = 500, message = "Something went wrong" } = err;
    // console.error(err); // Add this to help debug
  let{statusCode=500,message="Something went wrong!"} = err;
  res.status(statusCode).render("error.ejs",{message});
    // res.status(statusCode).send(message);
});


// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//     console.log(`✅ Server running at http://localhost:${port}`);
// });
// const bookingRoutes = require('./routes/bookings');
// app.use("/bookings", bookingRoutes);

// const bookingRoutes = require("./routes/bookings");

// // Add after other routes
// app.use("/listings", bookingRoutes);

// make sure you have this
// app.js or main file
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.bookedDate = req.flash('bookedDate');
  res.locals.currUser = req.user; // if you're using passport
  next();
});

const bookingsRoutes = require("./routes/bookings"); // adjust path as needed
app.use(bookingsRoutes);


const PORT = 8000; 

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});

// const PORT = 0; 
// const server = app.listen(PORT, () => {
//     const actualPort = server.address().port;
//     console.log(`Server is listening on port ${actualPort}`);
// });

console.log(dbUrl);
