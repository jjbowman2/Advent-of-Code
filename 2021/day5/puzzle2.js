const fs = require("fs");
const path = require("path");

let input = fs
    .readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
    .split(/\n/);

let lines = input.map((line) =>
    line.split(" -> ").map((point) => point.split(",").map(Number))
);

let isDiagonalIncreasing = (point1, point2) => {
    if (point1[0] < point2[0]) {
        return point1[1] < point2[1];
    } else {
        return point2[1] < point1[1];
    }
};

let getPointsInLine = (point1, point2) => {
    let points = [];
    // horizontal line
    if (point1[0] == point2[0]) {
        let start = Math.min(point1[1], point2[1]);
        let end = Math.max(point1[1], point2[1]);
        for (let i = start; i <= end; i++) {
            points.push([point1[0], i]);
        }
        // vertical line
    } else if (point1[1] == point2[1]) {
        let start = Math.min(point1[0], point2[0]);
        let end = Math.max(point1[0], point2[0]);
        for (let i = start; i <= end; i++) {
            points.push([i, point1[1]]);
        }
        // diagonal line
    } else {
        // determining start and endpoint with x coordinate
        let startPoint = point1[0] < point2[0] ? point1 : point2;
        let endPoint = point1[0] >= point2[0] ? point1 : point2;
        /*\
         ** \ Diagonal increasing
         **  \
         */
        if (isDiagonalIncreasing(point1, point2)) {
            for (
                let i = startPoint[0], j = startPoint[1];
                i <= endPoint[0];
                i++, j++
            ) {
                points.push([i, j]);
            }
            /*  /
             ** / Diagonal decreasing
             **/
        } else {
            for (
                let i = startPoint[0], j = startPoint[1];
                i <= endPoint[0];
                i++, j--
            ) {
                points.push([i, j]);
            }
        }
    }
    return points;
};

let pointCount = {};
lines
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
