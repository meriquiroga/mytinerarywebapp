const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
    img: {type: String},
    authorName: {type: String},
    authorImg: {type: String},
    cost: {type: Number},
    duration: {type: String},
    likes: [{type: String}],
    userLiked: [{type: String}],
    hashtags: {type: Array},
    comments: [{comment: {type: String}, userId: {type: mongoose.Types.ObjectId, ref: 'user'}}],
    cityId: {type: mongoose.Types.ObjectId, ref: 'city'}
})

const Itinerary = mongoose.model('itinerary', itinerarySchema)

module.exports = Itinerary