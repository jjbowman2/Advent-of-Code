const fs = require("fs");
const path = require("path");

let inputs = fs
    .readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
    .split(/\n/);

console.time("Calculation time");
let getMostCommonBit = (index, numbers) => {
    let [zeroCount, oneCount] = getBitCount(index, numbers);
    if (zeroCount > oneCount) {
        return 0;
    }
    return 1;
};

let getBitCount = (index, numbers) => {
    return numbers.reduce(
        (result, number) => {
            let [current0, current1] = result;
            if (number[index] == "0") {
                return [current0 + 1, current1];
            } else {
                return [current0, current1 + 1];
            }
        },
        [0, 0]
    );
};

let negateBinaryString = (binaryString) => {
    return binaryString
        .split("")
        .map((bit) => (bit == "0" ? "1" : "0"))
        .join("");
};

let numberLength = inputs[0].length;

let gammaRate = [...Array(numberLength - 1).keys()]
    .map((_v, index) => getMostCommonBit(index, inputs))
    .join("");
// could probably negate this number with binary operaters instead
let epsilonRate = negateBinaryString(gammaRate);
gammaRate = parseInt(gammaRate, 2);
epsilonRate = parseInt(epsilonRate, 2);

console.timeEnd("Calculation time");
console.log({ gammaRate, epsilonRate });
console.log(`Answer: ${gammaRate * epsilonRate}`);
