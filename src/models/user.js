const mongoose = require('mongoose')

const Schema = mongoose.Schema

const User = new Schema({
    name: { type: String, required: true},
    pass: { type: String, required: true},
    profile: { type: Number, default: 1}
})

module.exports = mongoose.model('users', User)