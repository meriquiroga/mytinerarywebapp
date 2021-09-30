const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
    img: {type: String},
    itineraryId: {type: mongoose.Types.ObjectId, ref: 'itinerary'}
})

const Activity = mongoose.model('activity', activitySchema)

module.exports = Activity