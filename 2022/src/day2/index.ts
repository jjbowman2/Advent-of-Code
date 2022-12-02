import * as fs from "fs";
import * as path from "path";

type column1 = "A" | "B" | "C";
type column2 = "X" | "Y" | "Z";

let input = fs
	.readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
	.split(/\n/)
	.map((round) => round.split(" ") as [column1, column2]);

const shapePointsPart1 = {
	X: 1,
	Y: 2,
	Z: 3,
};

const outcomesPart1 = {
	A: {
		X: 3,
		Y: 6,
		Z: 0,
	},
	B: {
		X: 0,
		Y: 3,
		Z: 6,
	},
	C: {
		X: 6,
		Y: 0,
		Z: 3,
	},
};

const getRoundScorePart1 = (opponentChoice: column1, yourChoice: column2) => {
	return (
		outcomesPart1[opponentChoice][yourChoice] + shapePointsPart1[yourChoice]
	);
};

export const part1 = () => {
	console.log(
		input
			.map((round) => getRoundScorePart1(round[0], round[1]))
			.reduce((a, b) => a + b, 0)
	);
};

const shapePointsPart2 = {
	ROCK: 1,
	PAPER: 2,
	SCISSORS: 3,
};

const outcomePoints = {
	X: 0,
	Y: 3,
	Z: 6,
};

const decisions = {
	A: {
		X: "SCISSORS",
		Y: "ROCK",
		Z: "PAPER",
	},
	B: {
		X: "ROCK",
		Y: "PAPER",
		Z: "SCISSORS",
	},
	C: {
		X: "PAPER",
		Y: "SCISSORS",
		Z: "ROCK",
	},
};

const getRoundScorePart2 = (
	opponentChoice: column1,
	expectedResult: column2
) => {
	return (
		shapePointsPart2[decisions[opponentChoice][expectedResult]] +
		outcomePoints[expectedResult]
	);
};

export const part2 = () => {
	console.log(
		input
			.map((round) => getRoundScorePart2(round[0], round[1]))
			.reduce((a, b) => a + b, 0)
	);
};
