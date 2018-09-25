const oneSecond = () => 1000;
const getCurrentTime = () => new Date();
const clear = () => console.clear();
const log = message => console.log(message);


//  Take a Date object and return an object w/ hours, minutes and seconds
const serializeClockTime = date => ({
    hours:date.getHours(),
    minutes:date.getMinutes(),
    seconds:date.getSeconds()
});

//  Convert military time to 12hr format
const civilianHours = clockTime => ({
    ...clockTime,
    hours: (clockTime.hours > 12) ? clockTime.hours-12 : clockTime.hours
});

//  Append AM or PM
const appendAMPM = clockTime => ({
    ...clockTime,
    ampm: (clockTime.hours >= 12) ? "PM" : "AM"
});

//  Take a target function and return a function to send the time to the target
const display = target => time => target(time);

//  Return clock time formatted based on the criteria
const formatClock = format => time => format.replace("hh", time.hours)
                                            .replace("mm", time.minutes)
                                            .replace("ss", time.seconds)
                                            .replace("tt", time.ampm);

// prepend a zero to the value of a given key if less than 10
const prependZero = key => clockTime => ({
    ...clockTime,
    [key]: (clockTime[key]< 10) ? "0" + clockTime[key]: clockTime[key]
});

//  Take the clock time as an argument and convert to civilian time
const convertToCivilianTime = clockTime => compose(
    appendAMPM,
    civilianHours
)(clockTime);

//  Make sure the hours, minutes and seconds display double digits by prepending 0's as needed
const doubleDigits = civilianTime => compose(
    prependZero("hours"),
    prependZero("minutes"),
    prependZero("seconds")
)(civilianTime)
//  Starts the clock
const startTicking = () =>
setInterval(
    compose(
        clear,
        getCurrentTime,
        serializeClockTime,
        convertToCivilianTime,
        doubleDigits,
        formatClock("hh:mm:ss tt"),
        display(log),
        oneSecond()
    )
);

startTicking();