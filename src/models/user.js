const mongoose = require('mongoose')

const Schema = mongoose.Schema

const User = new Schema({
    username: { type: String, required: true},
    password: { type: String, required: true},
    profileId: { type: Number, default: 1}
})

module.exports = mongoose.model('users', User)