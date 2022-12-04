import * as fs from "fs";
import * as path from "path";

let input = fs
	.readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
	.split(/\n/)
	.map((line) =>
		line.split(",").map((range) => range.split("-").map(Number))
	);

const rangeContainsRange = (
	[range1Start, range1End]: number[],
	[range2Start, range2End]: number[]
) => {
	return (
		(range1Start <= range2Start && range1End >= range2End) ||
		(range1Start >= range2Start && range1End <= range2End)
	);
};

const rangeOverlaps = (
	[range1Start, range1End]: number[],
	[range2Start, range2End]: number[]
) => {
	const intersectionStart = Math.max(range1Start, range2Start);
	const intersectionEnd = Math.min(range1End, range2End);
	return intersectionStart <= intersectionEnd;
};

export const part1 = () => {
	console.log(
		input.filter((assignment) =>
			rangeContainsRange(assignment[0], assignment[1])
		).length
	);
};

export const part2 = () => {
	console.log(
		input.filter((assignment) =>
			rangeOverlaps(assignment[0], assignment[1])
		).length
	);
};
