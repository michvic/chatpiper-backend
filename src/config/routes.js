const {decode} = require('../middlewares/auth')

module.exports = app => {
    
    app.get('/', (req, res) => {
        res.send('helo word')
    })

    app.post('/users', app.api.user.createUser)
    app.post('singin', decode, app.api.user.loginUser)
}