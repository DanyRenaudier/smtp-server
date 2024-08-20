const { readFileSync } = require('node:fs');
const SMTPConnection = require("nodemailer/lib/smtp-connection");


class Transporter {
    constructor(ip) {
        this.connection = new SMTPConnection(this.options(ip))
        this.credentials = {
            key: readFileSync("./credentials/client/client.key"),
            cert: readFileSync('./credentials/client/client.crt'),
            // ca: readFileSync('./credentials/client/client.csr'),
            user:'admin',
            pass:'admin'
        }
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

    send(envelope, message) {
        try {
            this.connection.send(envelope, message, (info) => {
                console.log(info)
            })
        }
        catch (error) {
            console.log(error)
            throw new Error(`Check the logs, message couldn't be sent :(`)
        }
    }

    async openConnection() {
        return new Promise((resolve, reject) => {
            try {
                this.connection.connect((err) => {
                    if (err) return reject(err)
                    console.log('Connection succeed!')
                    this.connection.login(this.credentials, (err) => {
                        if (err) return reject(err)
                        console.log('Connection Authenticated');
                        resolve();
                    })

                });
            } catch (error) {
                throw new Error(error);
            }
        })
    }

    // closeConenection() {

    // }
}

transporterInstance = async (ip = false) => {
    let transporter = new Transporter(ip ? host = await ip() : false)
    await transporter.openConnection();
    return transporter
}

module.exports = {
    transporterInstance
}