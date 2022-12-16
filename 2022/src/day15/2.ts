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

let getManhattanDistance = ([x1, y1]: number[], [x2, y2]: number[]) => {
	return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

let isInSearchArea = ([x, y]: number[]) => {
	return x >= 0 && y >= 0 && x < 4_000_000 && y < 4_000_000;
};

const beacons = new Set<string>();
input.forEach(({ beacon }) => {
	beacons.add(`${beacon[0]},${beacon[1]}`);
});

let isDistressBeacon = ([x, y]: number[]) => {
	if (beacons.has(`${x},${y}`)) return false;
	return input.every(({ sensor, beacon }) => {
		return (
			getManhattanDistance(sensor, [x, y]) >
			getManhattanDistance(sensor, beacon)
		);
	});
};

const getDistressSignal = (
	[sensorX, sensorY]: number[],
	[beaconX, beaconY]: number[]
): number[] => {
	let sensorReach = getManhattanDistance(
		[sensorX, sensorY],
		[beaconX, beaconY]
	);
	let [currentX, currentY] = [sensorX + sensorReach + 1, sensorY];
	for (let i = 0; i < sensorReach; i++) {
		if (
			isInSearchArea([currentX, currentY]) &&
			isDistressBeacon([currentX, currentY])
		) {
			return [currentX, currentY];
		}
		currentX--;
		currentY--;
	}
	for (let i = 0; i < sensorReach; i++) {
		if (
			isInSearchArea([currentX, currentY]) &&
			isDistressBeacon([currentX, currentY])
		) {
			return [currentX, currentY];
		}
		currentX--;
		currentY++;
	}
	for (let i = 0; i < sensorReach; i++) {
		if (
			isInSearchArea([currentX, currentY]) &&
			isDistressBeacon([currentX, currentY])
		) {
			return [currentX, currentY];
		}
		currentX++;
		currentY++;
	}
	for (let i = 0; i < sensorReach; i++) {
		if (
			isInSearchArea([currentX, currentY]) &&
			isDistressBeacon([currentX, currentY])
		) {
			return [currentX, currentY];
		}
		currentX++;
		currentY--;
	}
	return undefined;
};

export const part2 = () => {
	console.time("part2");
	let distressBeacon = input
		.map(({ sensor, beacon }) => {
			return getDistressSignal(sensor, beacon);
		})
		.filter(Boolean)[0];
	console.timeEnd("part2");
	console.log(distressBeacon[0] * 4_000_000 + distressBeacon[1]);
};
