const { ip } = require('../helpers/mailer')
const SMTPConnection = require("nodemailer/lib/smtp-connection");

class Transporter{
    constructor(){
        this.options = options()
        this.connection = new SMTPConnection(this.options)
    }

    async options(){
        try {
            let host = await ip() || "127.0.0.1";
            if(!host) Throw
            return{
                port: process.env.PORT,
                secure: true,
                host: String(host),
                rejectUnauthorized: true,
                tls:{
                    cert: fs.readFileSync(),
                    key: fs.readFileSync()
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    send(){

    }

    openConnection(){

    }

    closeConenection(){

    }
}