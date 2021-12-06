const fs = require("fs");
const path = require("path");

let input = fs
    .readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
    .split(/\n/);

let straightLines = input
    .map((line) =>
        line.split(" -> ").map((point) => point.split(",").map(Number))
    )
    .filter(([p1, p2]) => p1[0] == p2[0] || p1[1] == p2[1]);

let getPointsInLine = (point1, point2) => {
    let points = [];
    if (point1[0] == point2[0]) {
        let start = Math.min(point1[1], point2[1]);
        let end = Math.max(point1[1], point2[1]);
        for (let i = start; i <= end; i++) {
            points.push([point1[0], i]);
        }
    } else {
        let start = Math.min(point1[0], point2[0]);
        let end = Math.max(point1[0], point2[0]);
        for (let i = start; i <= end; i++) {
            points.push([i, point1[1]]);
        }
    }
    return points;
};

let pointCount = {};
straightLines
    .map(([p1, p2]) => getPointsInLine(p1, p2))
    .forEach((points) => {
        points.forEach((point) => {
            if (pointCount[point] === undefined) {
                pointCount[point] = 0;
            }
            pointCount[point] += 1;
        });
    });

let dangerousPointsCount = Object.values(pointCount).reduce(
    (sum, count) => (count > 1 ? sum + 1 : sum),
    0
);
console.log(`Answer: ${dangerousPointsCount}`);
