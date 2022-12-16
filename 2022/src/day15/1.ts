import * as fs from "fs";
import * as path from "path";

let input = fs
	.readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
	.split("\n")
	.map((line) => {
		let [sensorInfo, beaconInfo] = line.split(": closest beacon is at x=");
		sensorInfo = sensorInfo.replace("Sensor at x=", "");
		sensorInfo = sensorInfo.replace(", y=", ",");
		let sensor = sensorInfo.split(",").map(Number);
		beaconInfo = beaconInfo.replace(", y=", ",");
		let beacon = beaconInfo.split(",").map(Number);
		return { sensor, beacon };
	});

let targetRow = 2000000;

let getManhattanDistance = ([x1, y1]: number[], [x2, y2]: number[]) => {
	return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

let minX = Math.min(
	...input.map(({ sensor, beacon }) => Math.min(sensor[0], beacon[0]))
);
let maxX = Math.max(
	...input.map(({ sensor, beacon }) => Math.max(sensor[0], beacon[0]))
);

let maxManhattanDistance = Math.max(
	...input.map(({ sensor, beacon }) => getManhattanDistance(sensor, beacon))
);
let rowSize = maxX - minX + 1 + 2 * maxManhattanDistance;

let startX = minX - maxManhattanDistance;
let endX = maxX + maxManhattanDistance;

let reachablePositions = Array(rowSize).fill(".");
// if there are any beacons at the target row, mark them as 'B'
input.forEach(({ beacon: [x, y] }) => {
	if (y === targetRow) {
		reachablePositions[x - startX] = "B";
	}
});

// for each input line, check if the sensor can reach the beacon
input.forEach(({ sensor, beacon }) => {
	let sensorReach = getManhattanDistance(sensor, beacon);
	// for each x in row targetRow, check if the sensor can reach it
	for (let x = startX; x < endX; x++) {
		let distance = getManhattanDistance(sensor, [x, targetRow]);
		if (distance <= sensorReach && reachablePositions[x - startX] === ".") {
			reachablePositions[x - startX] = "#";
		}
	}
});

export const part1 = () => {
	console.log(reachablePositions.filter((x) => x === "#").length);
};
