import * as fs from "fs";
import * as path from "path";

let input = fs
	.readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
	.split("\n")
	.map((line) => {
		const [direction, steps] = line.split(" ");
		return [direction, Number(steps)];
	});

let headPosition = [0, 0];
let tailPosition = [0, 0];
let visited = new Set<string>(["0_0"]);

const adjustTail = () => {
	const [xDiff, yDiff] = [
		headPosition[0] - tailPosition[0],
		headPosition[1] - tailPosition[1],
	];
	if (Math.abs(xDiff) <= 1 && Math.abs(yDiff) <= 1) return;

	if (Math.abs(xDiff) >= 1 && Math.abs(yDiff) >= 1) {
		// move diagonal
		if (xDiff < 0 && yDiff < 0)
			tailPosition = [tailPosition[0] - 1, tailPosition[1] - 1];
		else if (xDiff < 0 && yDiff > 0)
			tailPosition = [tailPosition[0] - 1, tailPosition[1] + 1];
		else if (xDiff > 0 && yDiff < 0)
			tailPosition = [tailPosition[0] + 1, tailPosition[1] - 1];
		else tailPosition = [tailPosition[0] + 1, tailPosition[1] + 1];
	} else if (Math.abs(xDiff) > 1) {
		// move on x
		if (xDiff > 0) tailPosition = [tailPosition[0] + 1, tailPosition[1]];
		else tailPosition = [tailPosition[0] - 1, tailPosition[1]];
	} else {
		// move on y
		if (yDiff > 0) tailPosition = [tailPosition[0], tailPosition[1] + 1];
		else tailPosition = [tailPosition[0], tailPosition[1] - 1];
	}
	visited.add(`${tailPosition[0]}_${tailPosition[1]}`);
};

const processCommand = ([direction, steps]: [string, number]) => {
	for (let i = 0; i < steps; i++) {
		switch (direction) {
			case "U":
				headPosition = [headPosition[0] + 1, headPosition[1]];
				break;
			case "D":
				headPosition = [headPosition[0] - 1, headPosition[1]];
				break;
			case "R":
				headPosition = [headPosition[0], headPosition[1] + 1];
				break;
			case "L":
				headPosition = [headPosition[0], headPosition[1] - 1];
				break;
		}
		adjustTail();
	}
};

input.forEach(processCommand);

export const part1 = () => {
	console.log(visited.size);
};
