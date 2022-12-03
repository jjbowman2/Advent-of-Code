import * as fs from "fs";
import * as path from "path";

let alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

let input = fs
	.readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
	.split(/\n/)
	.map((line) => line.split("").map((char) => alpha.indexOf(char) + 1));

const findRepeating = (line: number[]) => {
	const compartment1 = new Set(line.slice(0, line.length / 2));
	const compartment2 = line.slice(line.length / 2);
	return compartment2.filter((x) => compartment1.has(x))[0];
};

export const part1 = () => {
	console.log(input.map(findRepeating).reduce((a, b) => a + b, 0));
};

const findCommonValues = (group: Set<number>[]) => {
	let intesection = [...Array(52).keys()].map((x) => x + 1); // all values
	return group.reduce(
		(prev, current) => prev.filter((x) => current.has(x)),
		intesection
	)[0];
};

export const part2 = () => {
	let groups = [];
	for (let i = 0; i < input.length; i += 3) {
		groups.push(input.slice(i, i + 3).map((line) => new Set(line)));
	}
	console.log(groups.map(findCommonValues).reduce((a, b) => a + b, 0));
};
