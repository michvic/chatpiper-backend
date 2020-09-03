const Message = require('../models/message')

module.exports = app => {
    const create = async (req, res) => {
        const body = req.body

        if(!body){
            throw 'Required fields not have been filled!'
        }
        console.log(body)
        
        try {
            const msg = new Message(body)

            await msg.save()

            return res.status(200).json({
                success: true,
                ...msg,
                message: 'Message successfully registered '
            })
        } catch (error) {
            
        }
        
    }
    const find = async (req, res) => {
        const messages = await Message.find();

        return res.status(200).json({
            success: true,
            messages,
            message: 'Fetch messages!',
        })
    }

    return {create,find}
}