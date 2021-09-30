const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({
    name: {type: String},
    country: {type: String},
    src: {type: String},
})

const City = mongoose.model('city', citySchema)

module.exports = City