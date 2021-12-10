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

let visited = {};

let getBasinSize = (x, y) => {
    let value = rows[x] && rows[x][y];
    if (visited[`${x},${y}`] || value === undefined || value === 9) {
        return 0;
    } else {
        visited[`${x},${y}`] = true;
        return (
            1 +
            getBasinSize(x - 1, y) +
            getBasinSize(x + 1, y) +
            getBasinSize(x, y - 1) +
            getBasinSize(x, y + 1)
        );
    }
};

console.time("Calculation time");
let basins = [];
rows.forEach((row, i) =>
    row.forEach((_v, j) => {
        if (isLowPoint(i, j)) {
            basins.push(getBasinSize(i, j));
        }
    })
);
basins.sort((a, b) => b - a);
let answer = basins
    .slice(0, 3)
    .reduce((product, current) => product * current, 1);

console.timeEnd("Calculation time");
console.log(`Answer: ${answer}`);
