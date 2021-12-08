const fs = require("fs");
const path = require("path");

let inputs = fs.readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" }).split(/\n/);
console.time("Calculation time");
let count = 0;
inputs.forEach(input => {
    input.split('|')[1].trim().split(/\s/).forEach(outputValue => {
        if ([2, 3, 4, 7].includes(outputValue.length)) {
            count += 1;
        }
    });
})

console.timeEnd("Calculation time");
console.log({ count })