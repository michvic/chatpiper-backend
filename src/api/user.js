const User = require('../models/user');
const {jwtsecret} = require('../config')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt-nodejs");


const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

module.exports = app => {
    const createUser = async (req, res) => {
        const {username, password} = req.body
  
        if(!username ||  !password){
            return res.status(400).json({
                success: false,
                error: 'password or username not provide',
            })
        }

        try {
            const user = new User({username, password:encryptPassword(password) });

            await user.save()

            let payload = jwt.sign( {
                id: user._id,
                username: user.username,
            }, jwtsecret);

            return res.status(201).json({
                success: true,
                id: user._id,
                username: user.username,
                token: payload,
                message: 'User created!',
            })
            
        } catch (error) {
            return res.status(500).json({
                error,
                message: 'User not created!',
            })
        }

    }

    const loginUser = (req, res) =>{
        
    }

    return {createUser, loginUser}
}