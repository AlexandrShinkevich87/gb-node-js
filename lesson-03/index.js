const fs = require('fs');
const readline = require('readline');
// const ACCESS_LOG = './access.log';
const ACCESS_LOG = './access-small.log';
const IP = ['34.48.240.111', '89.123.1.41'];

const readStream = fs.createReadStream(
    ACCESS_LOG,
    {
        flags: 'r',
        encoding: 'utf-8',
    });

const rl = readline.createInterface({
    input: readStream
});

readStream.on('open', () => {
    console.log(new Date()+ '  File opened!');
});
readStream.on('end', () => {
    console.log(new Date()+'  Finished!');
});
readStream.on('error', (err) => {
    console.log(err);
});

IP.forEach(ip => {
    rl.on('line', (logLine) => {
        if (logLine.includes(ip)) {
            const writeStream = fs.createWriteStream(`${ip}_requests.log`, {
                flags: 'a',
            });
            writeStream.write(`${logLine}\n`);
        }
    })
})