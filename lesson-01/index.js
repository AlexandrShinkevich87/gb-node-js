function simpleNumbers(from, to) {
    let simpleNumbers = [];
    var i = from,
        maxNumber = to,
        j,
        simpleNumber;

    do {
        j = 1;
        // делить на 2 это оптимизация
        while (j <= i / 2) { // проверить, делится ли число i на какое-либо из чисел до него
            if (i % j === 0 && j !== 1) {
                simpleNumber = false;
                break;
            } else {
                simpleNumber = true;
            }
            j++;
        }

        if (simpleNumber) {
            // result += i + '; ';
            simpleNumbers.push(i);
        }
    } while (++i <= maxNumber);
    return simpleNumbers;
}

const colors = require("colors/safe");

console.log(colors.red("Hello World!"));

const [from, to] = process.argv.slice(2);
let minNumber = parseInt(from, 10);
let maxNumber = parseInt(to, 10);
if ((isNaN(minNumber) === false) && (isNaN(maxNumber) === false)) {
    console.log(colors.green('Поиск простых чисел в диапазоне от'), minNumber, colors.green(' до '), maxNumber);
    let primeNumbers = simpleNumbers(minNumber, maxNumber);
    if (primeNumbers.length === 0) console.log(colors.red('В данном диапазоне нет простых чисел'));

    while (primeNumbers.length !== 0) {
        console.log(colors.green(primeNumbers.shift()));
        //если уже закончился массив простых чисел
        if (primeNumbers.length !== 0) console.log(colors.yellow(primeNumbers.shift()));
        if (primeNumbers.length !== 0) console.log(colors.red(primeNumbers.shift()));
    }
} else {
    console.log(colors.red('Ошибка: переданные параметры должны быть числами'));
}