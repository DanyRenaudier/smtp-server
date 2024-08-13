const { ip } = require('../helpers/mailer')
const SMTPConnection = require("nodemailer/lib/smtp-connection");

class Transporter{
    constructor(){
        this.options = options()
        this.connection = new SMTPConnection(this.options)
        
        this.openConnection()
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
                    cert: fs.readFileSync('./credentials/transporter/ryans-cert.pem'),
                    key: fs.readFileSync('./credentials/transporter/ryans-key.pem')
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    send(){

    }

    openConnection(){
        try {
            this.connection.connect((error)=>{
                if(error){
                    console.log(error);
                }
            })
            console.log('connection stablished')
        } catch (error) {
            throw new Error(error)
        }
    }

    closeConenection(){

    }
}

module.exports = {
    Transporter
}