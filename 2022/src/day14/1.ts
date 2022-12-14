import * as fs from "fs";
import * as path from "path";

let lineGroups = fs
	.readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
	.split("\n")
	.map((line) =>
		line.split(" -> ").map((pair) => pair.split(",").map(Number))
	);

const sandOrigin = [0, 500];
const highestY = Math.max(...lineGroups.flat().map(([, y]) => y));

// render the cave
const cave = [];
lineGroups.forEach((lineGroup) => {
	for (let i = 0; i < lineGroup.length - 1; i++) {
		const [x1, y1] = lineGroup[i];
		const [x2, y2] = lineGroup[i + 1];
		// make sure there are enough rows to add the proper lines
		while (cave.length <= y1 || cave.length <= y2)
			cave.push(Array(1000).fill("."));
		// add #'s connecting the two points
		for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
			for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
				cave[y][x] = "#";
			}
		}
	}
});

const fillCaveWithOneSand = (): number => {
	let sandCanMove = true;
	let [sandRow, sandColumn] = [...sandOrigin];
	while (sandCanMove) {
		if (sandRow + 1 == cave.length) {
			return sandRow + 1;
		}
		if (cave[sandRow + 1][sandColumn] === ".") {
			sandRow++;
		} else if (cave[sandRow + 1][sandColumn - 1] === ".") {
			sandColumn--;
			sandRow++;
		} else if (cave[sandRow + 1][sandColumn + 1] === ".") {
			sandColumn++;
			sandRow++;
		} else {
			sandCanMove = false;
		}
	}
	cave[sandRow][sandColumn] = "O";
	return sandRow;
};

let i = 0;
while (fillCaveWithOneSand() <= highestY) {
	i++;
}

export const part1 = () => {
	console.log(i);
};
