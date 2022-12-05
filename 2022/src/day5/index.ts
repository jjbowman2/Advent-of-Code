import * as fs from "fs";
import * as path from "path";

let instructions = fs
	.readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
	.split(/\n\n/)[1]
	.split("\n")
	.map((instruction) => {
		let line = instruction.replace("move ", "");
		let [quantity, rest] = line.split(" from ");
		let [from, to] = rest.split(" to ");
		return [quantity, from, to].map(Number);
	});

// hard-coding this, cause thinking of a good way to parse the columns was gonna take too much time
let stacks1 = [
	["P", "F", "M", "Q", "W", "G", "R", "T"],
	["H", "F", "R"],
	["P", "Z", "R", "V", "G", "H", "S", "D"],
	["Q", "H", "P", "B", "F", "W", "G"],
	["P", "S", "M", "J", "H"],
	["M", "Z", "T", "H", "S", "R", "P", "L"],
	["P", "T", "H", "N", "M", "L"],
	["F", "D", "Q", "R"],
	["D", "S", "C", "N", "L", "P", "H"],
];

// make a deep copy so part 1 doesn't affect part 2
let stacks2 = JSON.parse(JSON.stringify(stacks1));

const processInstructionPart1 = ([quantity, from, to]: number[]) => {
	for (let i = 0; i < quantity; i++) {
		stacks1[to - 1].push(stacks1[from - 1].pop());
	}
};

const processInstructionPart2 = ([quantity, from, to]: number[]) => {
	const [fromStack, toStack] = [stacks2[from - 1], stacks2[to - 1]];
	fromStack
		.splice(fromStack.length - quantity, quantity)
		.forEach((x) => toStack.push(x));
};
export const part1 = () => {
	instructions.forEach(processInstructionPart1);
	console.log(stacks1.reduce((acc, curr) => acc + curr[curr.length - 1], ""));
};

export const part2 = () => {
	instructions.forEach(processInstructionPart2);
	console.log(stacks2.reduce((acc, curr) => acc + curr[curr.length - 1], ""));
};
