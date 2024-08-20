const { readFileSync } = require('node:fs');

const Message = async () => new Promise((resolve, reject) => {
    let message = readFileSync('./Message.txt', 'utf-8')
    message ? resolve(message) : reject('No message defined to be sent')
});

module.exports= {
    Message
}