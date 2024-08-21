const { readFileSync } = require('node:fs');
const smtp_server = require("smtp-server").SMTPServer;

class SMTPServer {
    constructor() {
        this.SMTPServer = new smtp_server(this.config())
        this.port = process.env.PORT
    }

    config() {
        return {
            secure: true,
            requestCert: true,
            key: readFileSync("./credentials/server/server.key"),
            cert: readFileSync('./credentials/server/server.crt'),
            ca: readFileSync('./credentials/server/server.csr'),
            size: 500,
            authmethods:['PLAIN'],
            onAuth(auth,session,callback){
                if(auth.username !== process.env.user || auth.password !== process.env.pw && auth.method == 'PLAIN'){
                    return callback(new Error('Invalid username or password'))
                }
                callback(null, { user: auth.username });
            }
        }
    }

    listen() {
        try {
            this.SMTPServer.listen(this.port)
            console.log(`SMTPServer running on por: ${this.port}`)
        } catch (error) {
            throw new Error(error)
        }
    }

    close() {
        try {
            this.SMTPServer.close(() => {
                console.log('Server session has ended')
            })
        } catch (error) {
            console.log(error)
            throw new Error("An error has ocurred and session couldn't end");
        }
    }
}

module.exports = SMTPServer