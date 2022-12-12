import * as fs from "fs";
import * as path from "path";

let input = fs
	.readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
	.split("\n")
	.map((line) => line.split(""));
let start: [number, number], end: [number, number];
let chart: number[][] = [];
input.forEach((row, i) => {
	let chartRow = [];
	row.forEach((val, j) => {
		chartRow.push(undefined);
		if (val == "S") start = [i, j];
		else if (val == "E") end = [i, j];
	});
	chart.push(chartRow);
});

let exploring = [{ position: end, steps: 0 }];
chart[end[0]][end[1]] = 0;

const getHeight = ([i, j]: [number, number]) => {
	let height = input[i][j];
	if (height == "S") height = "a";
	if (height == "E") height = "z";
	return height.charCodeAt(0);
};

const getValidNeighbors = ([i, j]: [number, number]) => {
	let currentHeight = getHeight([i, j]);
	return [
		[i + 1, j],
		[i - 1, j],
		[i, j + 1],
		[i, j - 1],
	]
		.filter(([x, y]) => {
			if (x < 0) return false;
			if (y < 0) return false;
			if (x >= input.length) return false;
			if (y >= input[0].length) return false;
			return true;
		})
		.filter(([x, y]) => {
			if (chart[x][y] != undefined) {
				return false;
			}
			let neighborHeight = getHeight([x, y]);
			if (neighborHeight < currentHeight - 1) {
				return false;
			}
			return true;
		});
};

export const part2 = () => {
	while (exploring.length > 0) {
		let next = exploring.shift();
		if (getHeight(next.position) == 97) {
			console.log("Found at", next.steps);
			break;
		}
		getValidNeighbors(next.position).forEach(([i, j]) => {
			chart[i][j] = next.steps + 1;
			exploring.push({ position: [i, j], steps: next.steps + 1 });
		});
	}
};
