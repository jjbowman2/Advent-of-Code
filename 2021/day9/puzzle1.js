const fs = require("fs");
const path = require("path");

let rows = fs
    .readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
    .split(/\n/)
    .map((row) => row.split("").map(Number));

let getEdges = (x, y) => {
    let left = rows[x - 1] && rows[x - 1][y],
        right = rows[x + 1] && rows[x + 1][y],
        up = rows[x][y - 1],
        down = rows[x][y + 1];
    return [left, right, up, down];
};

let isLowPoint = (x, y) => {
    let value = rows[x][y];
    let edges = getEdges(x, y);
    return edges.reduce(
        (result, edge) =>
            !result ? result : edge == undefined || value < edge,
        true
    );
};

console.time("Calculation time");
let lowPoints = [];
rows.forEach((row, i) =>
    row.forEach((value, j) => isLowPoint(i, j) && lowPoints.push(value))
);

let sum = lowPoints.reduce((sum, current) => sum + current + 1, 0);

console.timeEnd("Calculation time");
console.log(`Answer: ${sum}`);
