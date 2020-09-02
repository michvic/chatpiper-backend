const Message = require('../models/message')

module.exports = app => {

  let messages =[]

  app.io.on('connection', client => {
    console.log('New Connection: ', client.id);

    client.emit('previousMessages', messages);

    client.on('sendMessage', async data => {
      const message = new Message(data)

      await message.save()
      

      messages.push(data)
      console.log(message)

      client.broadcast.emit('receivedMessage', data);
    })
  });

}