const fs = require("fs");
const path = require("path");

let depths = fs
    .readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
    .split(/\n/)
    .map(Number);

let prev;
let increaseCount = 0;
depths.forEach((depth) => {
    if (depth > prev) {
        increaseCount += 1;
    }
    prev = depth;
});

console.log(increaseCount);
