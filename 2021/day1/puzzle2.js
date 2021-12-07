const fs = require("fs");
const path = require("path");

let depths = fs
    .readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
    .split(/\n/)
    .map(Number);

console.time("Calculation time");
let getWindow = (index, array) => {
    if (index + 2 > array.length) {
        return undefined;
    }
    return array[index] + array[index + 1] + array[index + 2];
};

let windows = depths
    .map((_v, index, array) => getWindow(index, array))
    .filter((val) => val !== undefined);
let prev;
let increaseCount = 0;

windows.forEach((window) => {
    if (window > prev) {
        increaseCount += 1;
    }
    prev = window;
});

console.timeEnd("Calculation time");
console.log(increaseCount);
