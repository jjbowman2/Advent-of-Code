import * as fs from "fs";
import * as path from "path";

let input = fs
	.readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
	.split("");

const findIndexOfUniqueSequenceOfSize = (size: number) => {
	const seen = new Map<string, number>();
	input.slice(0, size).forEach((value) => {
		let currentCount = seen.get(value) ?? 0;
		seen.set(value, currentCount + 1);
	});

	let i = size;
	while ([...seen.keys()].length < size) {
		let [start, end] = [input[i - size], input[i++]];
		let countForStart = seen.get(start);
		if (--countForStart == 0) {
			seen.delete(start);
		} else {
			seen.set(start, countForStart);
		}
		let countForEnd = seen.get(end) ?? 0;
		seen.set(end, countForEnd + 1);
	}
	return i;
};

export const part1 = () => {
	console.log(findIndexOfUniqueSequenceOfSize(4));
};

export const part2 = () => {
	console.log(findIndexOfUniqueSequenceOfSize(14));
};
