module.exports = app => {
    
    app.get('/', (req, res) => {
        res.send('helo word')
    })
    app.post('/users', app.api.user.createUser)
}