const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Message = new Schema({
    userId: String,
    text: String,
    username: String
})

module.exports = mongoose.model('messages', Message)