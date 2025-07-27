// #Validating API inputs – Ensures data coming from client (body, query, params) is correct.
// Reduces boilerplate code – Instead of writing many if checks, Joi provides a simple schema-based way.
// Prevents invalid data – Avoids wrong data from being processed or saved in a database.

const Joi=require('joi');
module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        location:Joi.string().required(),
        country:Joi.string().required(),
        price:Joi.number().required().min(0),
        image:Joi.string().allow("",null)
 } ).required()
});

module.exports.reviewSchema  = Joi.object({
    review:Joi.object({
rating: Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),
    }).required()
})