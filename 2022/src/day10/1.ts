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
let signalStrengths: number[] = [];

for (let i = 0; i < currentCycle; i++) {
	if ((i - 20) % 40 == 0) {
		signalStrengths.push(i * registerX);
	}
	registerX += cycleMap.get(i) ?? 0;
}

export const part1 = () => {
	console.log(signalStrengths.reduce((a, b) => a + b, 0));
};
