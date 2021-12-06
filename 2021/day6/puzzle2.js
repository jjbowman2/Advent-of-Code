const fs = require("fs");
const path = require("path");

let initialState = fs
    .readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
    .trim()
    .split(",")
    .map(Number);

let timers = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
};
initialState.forEach((timer) => {
    timers[timer] += 1;
});

for (let i = 0; i < 256; i++) {
    timers = {
        0: timers[1],
        1: timers[2],
        2: timers[3],
        3: timers[4],
        4: timers[5],
        5: timers[6],
        6: timers[0] + timers[7],
        7: timers[8],
        8: timers[0],
    };
}

let totalCount = Object.values(timers).reduce((sum, curr) => sum + curr, 0);
console.log({ totalCount });
