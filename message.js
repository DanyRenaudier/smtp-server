require('dotenv').config()
const  {Message} = require('./helpers/readMessage')
const { ip } = require('./helpers/mailer')
const { transporterInstance } = require('./Models/Transporter');

(async () => {
    try {
        const transporter = await transporterInstance()
        let message = await Message()
        let envelope={
            from:`${process.env.from}`,
            to:`${process.env.to}`,
            
        }
        // transporter.send(envelope,message);
    } catch (error) {
        console.error(`Error: ${error}`)
    }
    
})();