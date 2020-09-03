const {decode} = require('../middlewares/auth')

module.exports = app => {
    
    app.get('/', (req, res) => {
        res.send('helo word')
    })

    app.post('/users', app.api.user.create)
    app.post('/singin', app.api.user.signin)

    app.get('/messages', decode,  app.api.message.find)
    app.post('/messages', decode,  app.api.message.create)

}