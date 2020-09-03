const User = require('../models/user');
const {jwtsecret} = require('../config')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt-nodejs");


const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

module.exports = app => {
    const create = async (req, res) => {
        const {username, password} = req.body
  
        if(!username ||  !password){
            return res.status(400).json({
                success: false,
                error: 'password or username not provide',
            })
        }

        try {
            userFromDb = await User.find({username: username})

            if(userFromDb.length){
                throw 'User is already registered'
            }
                

            const user = new User({username, password:encryptPassword(password) });

            await user.save()

            

            let payload = {
                id: user._id,
                username: user.username,
                profile: require('../config/userProfile')(user.profileId)
            }

            return res.status(201).json({
                success: true,
                ...payload,
                token: jwt.sign(payload, jwtsecret),
                message: 'User logged!',
            })
            
        } catch (error) {
            return res.status(500).json({
                error,
                message: 'User not created!',
            })
        }

    }

    const signin = async  (req, res) =>{
        const {username, password} = req.body
  
        if(!username ||  !password){
            return res.status(400).json({
                success: false,
                error: 'password or username not provide',
            })
        }

        try {
            const user = await User.findOne({username: username})
            
            if( !user ) throw 'User not registered'
            
            
            const isMatch = bcrypt.compareSync(password, user.password);
            if (!isMatch)  throw 'Password incorret!'

            let payload = {
                id: user._id,
                username: user.username,
                profile: require('../config/userProfile')(user.profileId)
            }

            return res.status(201).json({
                success: true,
                ...payload,
                token: jwt.sign(payload, jwtsecret),
                message: 'User logged!',
            })
            
        } catch (error) {
            return res.status(500).json({
                error,
                message: 'User not logged!',
            })
        }
    }

    return {create, signin}
}