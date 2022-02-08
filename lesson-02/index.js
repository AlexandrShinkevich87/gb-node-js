const EventEmitter = require('events');
const emitter = new EventEmitter();
const dayjs = require("dayjs");
const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

const getDateTimeForTimer = () => {
    let arrayDateTime = process.argv[2].split("-");
    let second = 0; //Number(arrayDateTime[0]);
    let minute = 0;//Number(arrayDateTime[1]);
    let hour = Number(arrayDateTime[0]);
    let day = Number(arrayDateTime[1]);
    let month = Number(arrayDateTime[2] - 1);
    let year = Number(arrayDateTime[3]);
    return new Date(year, month, day, hour, minute, second, 0);
};

const showLeftTime = (targetTime) => {
    const currentDate = new Date();
    const x = dayjs(targetTime);
    const y = dayjs(currentDate);
    const timeDuration = dayjs.duration(x.diff(y)) //из Результирующей даты вычитаем Текущую дату

    let second = Number(timeDuration.format('ss'));
    let minute = Number(timeDuration.format('mm'));
    let hour = Number(timeDuration.format('HH'));
    let day = Number(timeDuration.format('DD'));
    let month = Number(timeDuration.format('MM'));
    let year = Number(timeDuration.format('YYYY'));
    let msg = 'Left time is: years: ' + year + ', months: ' + month + ', days: ' + day + ', hours: ' + hour + ', minutes: ' + minute + ', seconds: ' + second;
    if (currentDate < targetTime) {
        return msg;
    } else {
        msg = 'Time is over!';
        return msg;
    }
};

class Handlers {
    //обрабатываем событие teak
    static teakTimer(timerDateTime) {
        console.clear();
        console.log(showLeftTime(timerDateTime));
    }
}

const run = () => {
    const timerDateTime = getDateTimeForTimer();
    //отправляем события каждую секунду
    setInterval(() => {
            emitter.emit('teak', timerDateTime);
        }, 1000
    );
    emitter.on('teak', Handlers.teakTimer);
};

run();