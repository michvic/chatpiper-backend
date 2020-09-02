const User = require('../models/user');

module.exports = app => {
    const createUser = (req, res) => {
        const body = req.body
  
        if(!body){
            return res.status(400).json({
                success: false,
                error: 'password or name not provide',
            })
        }

        const user = new User(body);

        user
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                message: 'User created!',
            })
        })
        .catch(error => {
            return res.status(500).json({
                error,
                message: 'User not created!',
            })
        })

    }

    return {createUser}
}