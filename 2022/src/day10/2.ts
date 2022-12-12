import * as fs from "fs";
import * as path from "path";

let currentCycle = 0;
let cycleMap = new Map<number, number>();

fs.readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
	.split("\n")
	.forEach((line) => {
		const [command, arg] = line.split(" ");
		if (command == "noop") currentCycle++;
		else {
			currentCycle += 2;
			cycleMap.set(currentCycle, Number(arg));
		}
	});

let registerX = 1;
let pixelArt = "";

for (let i = 0; i < currentCycle; i++) {
	if (i % 40 == 0) {
		pixelArt += "\n";
	}
	registerX += cycleMap.get(i) ?? 0;
	let currentCell = i % 40;
	if (currentCell >= registerX - 1 && currentCell <= registerX + 1) {
		pixelArt += "#";
	} else {
		pixelArt += ".";
	}
}

export const part2 = () => {
	console.log(pixelArt);
};
