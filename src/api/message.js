const Message = require('../models/message')

module.exports = async app => {

  app.io.on('connection', async  client => {
    console.log('New Connection: ', client.id);

    messages = await Message.find()

    client.emit('previousMessages', messages);

    client.on('sendMessage', async data => {
      const message = new Message(data)

      await message.save()
      console.log(message)
      client.broadcast.emit('receivedMessage', message);
    })
  });

}