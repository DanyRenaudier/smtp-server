const { exec } = require('node:child_process');

ipRequest = () => new Promise((resolve, reject) => exec('curl ifconfig.me/ip', 'utf-8', (error, stdout) => {
    if (error) {
        throw new Error(error)
    }
    resolve(stdout);
}))

ip = async () => {
    let ip = await ipRequest();
    return ip
}

module.exports= {
    ip
}
