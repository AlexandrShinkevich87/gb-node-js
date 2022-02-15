const fs = require('fs');
const readline = require('readline');
// const ACCESS_LOG = './access.log';
const ACCESS_LOG = './access-small.log';
const IP = ['34.48.240.111', '89.123.1.41'];

const ws = IP.map(ip => fs.createWriteStream(`${ip}_requests.log`, {flags: 'a', encoding: 'utf8'}));
// console.log(ws);

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
    console.log(new Date() + '  File opened!');
});
readStream.on('end', () => {
    ws.forEach(item => item.end());
    clearInterval(message);
    console.log('Обработка файла закончена!');
});

let i = 1;
const message = setInterval(() => {
    console.log('Выполняется обработка файла' + '.'.repeat(i++));
    i > 20 ? i = 1 : i;
}, 1000);

readStream.on('error', (err) => {
    console.log(err);
});

rl.on('line', (logline) => {
    let logLine = logline;
    ws.forEach((wsItem, index) => {
        if (logLine.includes(IP[index])) {
            wsItem.write(`${logLine}\n`);
        }
    });
});
