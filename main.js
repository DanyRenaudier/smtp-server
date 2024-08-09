require('dotenv').config()
const SMTPServer = require('./Models/SMTPServer')

let server = new SMTPServer()

server.listen()