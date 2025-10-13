// const Listing = require('../models/listing');
// const Payment = require('../models/payment'); // You’ll create this
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// module.exports.createCheckoutSession = async (req, res) => {
//     const listingId = req.params.listingId;
//     const listing = await Listing.findById(listingId);
//     if (!listing) {
//         return res.status(404).send("Listing not found");
//     }

//     const session = await stripe.checkout.sessions.create({
//         payment_method_types: ['card'],
//         line_items: [{
//             price_data: {
//                 currency: 'inr',
//                 product_data: {
//                     name: listing.title,
//                 },
//                 unit_amount: listing.price * 100,
//             },
//             quantity: 1,
//         }],
//         mode: 'payment',
//         success_url: `${req.protocol}://${req.get('host')}/payment/success?listingId=${listingId}`,
//         cancel_url: `${req.protocol}://${req.get('host')}/listings/${listingId}`,
//     });

//     res.redirect(303, session.url);
// };

// module.exports.successPage = async (req, res) => {
//     const listingId = req.query.listingId;
//     const listing = await Listing.findById(listingId);
//     if (!listing) return res.send("Invalid listing.");

//     const payment = new Payment({
//         user: req.user._id,
//         listing: listingId,
//         amount: listing.price,
//         date: new Date()
//     });

//     await payment.save();

//     res.redirect(`/listings/${listingId}`);
// };







// const Listing = require('../models/listing');
// const Payment = require('../models/payment');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// module.exports.createCheckoutSession = async (req, res, next) => {
//     try {
//         const listingId = req.params.listingId;
//         const listing = await Listing.findById(listingId);

//         if (!listing) {
//             return res.status(404).send("Listing not found");
//         }

//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             line_items: [{
//                 price_data: {
//                     currency: 'inr',
//                     product_data: {
//                         name: listing.title,
//                     },
//                     unit_amount: listing.price * 100,
//                 },
//                 quantity: 1,
//             }],
//             mode: 'payment',
//             // ✅ Pass listingId and amount to success route via query string
//             success_url: `${req.protocol}://${req.get('host')}/payment/success?listingId=${listingId}&amount=${listing.price}`,
//             cancel_url: `${req.protocol}://${req.get('host')}/listings/${listingId}`,
//         });

//         res.redirect(303, session.url);
//     } catch (err) {
//         next(err);
//     }
// };
// module.exports.successPage = async (req, res) => {
//     try {
//         const listingId = req.query.listingId;
//         const amount = req.query.amount;

//         const listing = await Listing.findById(listingId);
//         if (!listing) {
//             req.flash("error", "Listing not found");
//             return res.redirect("/listings");
//         }

//         // ✅ Save payment in DB
//         const payment = new Payment({
//             user: req.user._id,
//             listing: listingId,
//             amount: amount,
//             date: new Date()
//         });

//         await payment.save();

//         // ✅ Set session for popup
//         req.session.paymentInfo = {
//             listingId,
//             success: true,
//             amount,
//             date: new Date()
//         };

//         // ✅ Redirect to listing page (where popup logic runs)
//         res.redirect(`/listings/${listingId}`);
//     } catch (err) {
//         console.error("❌ Error saving payment:", err);
//         req.flash("error", "Something went wrong while saving payment.");
//         res.redirect("/listings");
//     }
// };


const Listing = require('../models/listing');
const Payment = require('../models/payment');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// ✅ Create Stripe Checkout Session
module.exports.createCheckoutSession = async (req, res, next) => {
    try {
        const listingId = req.params.listingId;
        const listing = await Listing.findById(listingId);

        if (!listing) {
            return res.status(404).send("Listing not found");
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: listing.title,
                    },
                    unit_amount: listing.price * 100,
                },
                quantity: 1,
            }],
            mode: 'payment',
            // Pass listingId and amount to success route via query string
            success_url: `${req.protocol}://${req.get('host')}/payment/success?listingId=${listingId}&amount=${listing.price}`,
            cancel_url: `${req.protocol}://${req.get('host')}/listings/${listingId}`,
        });

        res.redirect(303, session.url);
    } catch (err) {
        next(err);
    }
};

// ✅ Payment Success Page
module.exports.successPage = async (req, res) => {
    try {
        const listingId = req.query.listingId;
        const amount = req.query.amount;

        const listing = await Listing.findById(listingId);
        if (!listing) {
            req.flash("error", "Listing not found");
            return res.redirect("/listings");
        }

        // ✅ Check if payment already exists to avoid duplicates
        const existingPayment = await Payment.findOne({
            user: req.user._id,
            listing: listing._id
        });

        if (!existingPayment) {
            // ✅ Save payment in DB
            const payment = new Payment({
                user: req.user._id,      // matches schema
                listing: listing._id,    // matches schema
                amount: amount,
                date: new Date()
            });
            await payment.save();
            // console.log("✅ Payment saved:", payment);

        }

        // ✅ Set session info for front-end popup
        req.session.paymentInfo = {
            listingId,
            success: true,
            amount,
            date: new Date()
        };

        // ✅ Redirect to listing page (where popup logic runs)
        res.redirect(`/listings/${listing._id}`);
    } catch (err) {
        console.error("❌ Error saving payment:", err);
        req.flash("error", "Something went wrong while saving payment.");
        res.redirect("/listings");
    }
};
