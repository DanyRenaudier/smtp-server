require('dotenv').config()
const { ip } = require('./helpers/mailer')
const {transporterInstance} = require('./Models/Transporter');

(async()=>{
    const transporter = await transporterInstance()
})()

