
const { readFileSync } = require('node:fs');
const SMTPConnection = require("nodemailer/lib/smtp-connection");


class Transporter {
    constructor(ip) {
        this.connection = new SMTPConnection(this.options(ip))
        this.credentials = {
            key: readFileSync("./credentials/client/client.key"),
            cert: readFileSync('./credentials/client/client.crt'),
            // ca: readFileSync('./credentials/client/client.csr'),
        }

        //Methods call
        this.openConnection()
    }

    options(ip) {
        try {
            let host = ip || "127.0.0.1";
            return {
                port: process.env.PORT,
                host,
                secure: true,
                tls: {
                    rejectUnauthorized: false,
                },
                greetingTimeout: 5000,
                socketTimeout: 60000,
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
                this.connection.login(this.credentials, () => {
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

transporterInstance = async (ip = false) => {
    let transporter = new Transporter(ip ? host = await ip() : false)
    return transporter
}

module.exports = {
    transporterInstance
}