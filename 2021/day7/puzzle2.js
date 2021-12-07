const fs = require("fs");
const path = require("path");

let points = fs
    .readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
    .trim()
    .split(",")
    .map(Number)
    .sort();

let getCost = (p1, p2) => {
    let difference = Math.abs(p1 - p2);
    return (difference * (difference + 1)) / 2;
};

// O(m*n) where m is the range of the dataset, and n is the size of the dataset
console.time("Calculation time");
let bestCost, bestPoint;
for (let i = points[0]; i <= points[points.length - 1]; i++) {
    let cost = 0;
    points.forEach((point) => {
        cost += getCost(point, i);
    });
    if (!bestCost || bestCost > cost) {
        bestCost = cost;
        bestPoint = i;
    }
}
console.timeEnd("Calculation time");
console.log({ bestCost, bestPoint });
