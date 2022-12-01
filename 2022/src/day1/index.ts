import * as fs from "fs";
import * as path from "path";

let elves = fs
	.readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
	.split(/\n\n/)
	.map((elf) => elf.split("\n").map(Number));

export const part1 = () => {
	const calories = elves.map((elf) => elf.reduce((a, b) => a + b, 0));
	console.log(calories.sort((a, b) => b - a)[0]);
};
export const part2 = () => {
	let calories = elves.map((elf) => elf.reduce((a, b) => a + b, 0));
	calories = calories.sort((a, b) => b - a).slice(0, 3);
	console.log(calories.reduce((a, b) => a + b, 0));
};
