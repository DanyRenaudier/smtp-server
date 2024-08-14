
const { readFileSync } = require('node:fs');
const SMTPConnection = require("nodemailer/lib/smtp-connection");


class Transporter {
    constructor(ip) {
        this.connection = new SMTPConnection(this.options(ip))
        this.credentials={
            cert: readFileSync('./credentials/transporter/ryans-cert.pem'),
            key: readFileSync('./credentials/transporter/ryans-key.pem')
        }

        //Methods call
        this.openConnection()
    }

    options(ip) {
        try {
            let host = ip || "127.0.0.1";
            console.log(ip)
            return {
                port: process.env.PORT,
                secure: true,
                host,
                rejectUnauthorized: true,
                greetingTimeout :5000,
                socketTimeout :60000,
            }
        } catch (error) {
            console.log(error)
        }
    }

    // send() {

    // }

    openConnection() {
        try {
            this.connection.connect(() => {
                console.log('Connection succeed!')
                this.connection.login(this.credentials,()=>{
                    console.log('Connection Authenticated');
                })
            })
        } catch (error) {
            throw new Error(error);
        }
    }

    // closeConenection() {

    // }
}

transporterInstance = async (ip=false) => {
    let transporter = new Transporter(ip ? host = await ip() : false)
    return transporter
}

module.exports = {
    transporterInstance
}