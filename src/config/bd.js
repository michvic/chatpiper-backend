const mongoose = require('mongoose')


const uri = "mongodb+srv://michvic:chatpipe@cluster0.ybd4c.mongodb.net/chatpipe?retryWrites=true&w=majority";

mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, })
    .catch(e => {
        console.error('Connection error', e.message)
    })


const db = mongoose.connection


module.exports = db