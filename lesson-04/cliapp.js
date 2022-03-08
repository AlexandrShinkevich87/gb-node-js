// #!/usr/bin/env node

const fs = require('fs/promises');
const {lstatSync} = require('fs');
const inquirer = require('inquirer');
const yargs = require('yargs');
const path = require('path');

let currentDirectory = process.cwd();

const options = yargs
    .positional('p', {
        describe: 'String to find',
        default: '',
    }).argv;

class ListFile {
    constructor(path, fileName) {
        this.path = path;
        this.fileName = fileName;
    }

    get isDir() {
        return lstatSync(this.path).isDirectory();
    }
}

const run = async () => {
    const list = await fs.readdir(currentDirectory);
    const items = list.map(fileName =>
        new ListFile(path.resolve(currentDirectory, fileName), fileName));

    //ДЛЯ перемещения Вверх по каталогу добавим путь - ../ :
    items.unshift(new ListFile('../', '.. < UP DIR >'));

    const item = await inquirer
        .prompt([
            {
                name: 'listItem',
                type: 'list',
                message: `Choose: ` + path.resolve(currentDirectory),
                choices: items.map(item => ({name: item.fileName, value: item})),
            }
        ])
        .then(answer => answer.listItem);

    if (item.isDir) {
        currentDirectory = item.path;
        return await run();
    } else {
        const data = await fs.readFile(item.path, 'utf-8');

        if (options.p === '') console.log(data);
        else {
            const regExp = new RegExp(options.p, 'igm');
            const dataFound = data.match(regExp);
            if (dataFound === null) console.log('String not found!');
            else console.log('Matches were found: ' + dataFound.length);
        }
    }
}

run();