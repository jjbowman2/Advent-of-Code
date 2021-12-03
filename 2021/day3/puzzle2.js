const fs = require("fs");
const path = require("path");

let inputs = fs
    .readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
    .split(/\n/);

let getMostCommonBit = (index, numbers) => {
    let [zeroCount, oneCount] = getBitCount(index, numbers);
    if (zeroCount > oneCount) {
        return 0;
    }
    return 1;
}

let getLeastCommonBit = (index, numbers) => {
    let [zeroCount, oneCount] = getBitCount(index, numbers);
    if (zeroCount <= oneCount) {
        return 0;
    }
    return 1;
}

let getBitCount = (index, numbers) => {
    return numbers.reduce((result, number) => {
        let [current0, current1] = result;
        if (number[index] == '0') {
            return [current0 + 1, current1];
        } else {
            return [current0, current1 + 1];
        }
    }, [0, 0]);
}


let numbers = [...inputs];
for (let i = 0; numbers.length > 1; i++) {
    let mostCommonBit = getMostCommonBit(i, numbers);
    numbers = numbers.filter(number => number[i] == mostCommonBit);
}
let oxygenRating = parseInt(numbers.shift(), 2);

numbers = [...inputs];
for (let i = 0; numbers.length > 1; i++) {
    let leastCommonBit = getLeastCommonBit(i, numbers);
    numbers = numbers.filter(number => number[i] == leastCommonBit);
}
let co2Rating = parseInt(numbers.shift(), 2);

console.log({oxygenRating, co2Rating});
console.log(`Answer: ${oxygenRating * co2Rating}`);