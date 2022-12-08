import * as fs from "fs";
import * as path from "path";

let input = fs
	.readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
	.split("\n")
	.map(line => line.split('').map(Number));

const visible = new Set<string>();

const checkFromEast = () => {
	for (let i = 0; i < input.length; i++) {
		let tallestTree = -1;
		for (let j = 0; j < input[i].length; j++) {
			if (input[i][j] > tallestTree) {
				visible.add(`${i}_${j}`);
				tallestTree = input[i][j];
			}
		}
	}
}

const checkFromWest = () => {
	for (let i = 0; i < input.length; i++) {
		let tallestTree = -1;
		for (let j = input[i].length - 1; j >= 0; j--) {
			if (input[i][j] > tallestTree) {
				visible.add(`${i}_${j}`);
				tallestTree = input[i][j];
			}
		}
	}
}

const checkFromNorth = () => {
	for (let i = 0; i < input[0].length; i++) {
		let tallestTree = -1;
		for (let j = 0; j < input.length; j++) {
			if (input[j][i] > tallestTree) {
				visible.add(`${j}_${i}`);
				tallestTree = input[j][i];
			}
		}
	}
}

const checkFromSouth = () => {
	for (let i = 0; i < input[0].length; i++) {
		let tallestTree = -1;
		for (let j = input.length - 1; j >= 0; j--) {
			if (input[j][i] > tallestTree) {
				visible.add(`${j}_${i}`);
				tallestTree = input[j][i];
			}
		}
	}
}

export const part1 = () => {
	checkFromEast();
	checkFromNorth();
	checkFromSouth();
	checkFromWest();
	console.log(visible.size);
};

const calculateScenicScore = (row: number, column: number) => {
	let [left, right, up, down] = [1, 1, 1, 1];
	for (let i = column - 1; i > 0 && input[row][i] < input[row][column]; i--) {
		left += 1;
	}
	for (let i = column + 1; i < input.length - 1 && input[row][i] < input[row][column]; i++) {
		right += 1;
	}
	for (let i = row + 1; i < input[0].length - 1 && input[i][column] < input[row][column]; i++) {
		down += 1;
	}
	for (let i = row - 1; i > 0 && input[i][column] < input[row][column]; i--) {
		up += 1;
	}
	return left * right * up * down;
}

const bruteForce = (): number => {
	let bestScore = -1;
	// only calculate inner trees
	for (let i = 1; i < input.length - 1; i++) {
		for (let j = 1; j < input[i].length - 1; j++) {
			bestScore = Math.max(bestScore, calculateScenicScore(i, j));
		}
	}
	return bestScore;
}

export const part2 = () => {
	console.log(bruteForce())
};
