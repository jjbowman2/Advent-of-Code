import * as fs from "fs";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";

let input = fs
	.readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
	.split("\n$ ")
	.map((line) => {
		const [command, ...output] = line.split("\n");
		return [command, output];
	});

const fileSystem = {};
let currentDir: object = fileSystem;

const processCommand = ([command, output]: [string, string[]]) => {
	if (command.startsWith("cd")) {
		processCd(command);
	} else {
		processLs(output);
	}
};

// helper function to recurse the tree from the top until parent node is found
// uhhhh a graph would have been so much easier
const findParent = (node: object, child: object): object | null => {
	const children = Object.values(node).filter((v) => typeof v === "object");
	if (children.length == 0) return null;
	const indexOfChild = children.indexOf(child);
	if (indexOfChild == -1) {
		return children
			.map((v) => findParent(v, child))
			.reduce((acc, curr) => acc || curr, null);
	} else {
		return node;
	}
};

const processCd = (command: string) => {
	let directoryName = command.replace("cd ", "");
	if (directoryName == "..") {
		currentDir = findParent(fileSystem, currentDir);
	} else {
		let childDirectory = currentDir[directoryName] ?? {};
		currentDir = childDirectory;
	}
};

const processLs = (output: string[]) => {
	output.forEach((line) => {
		if (line.startsWith("dir")) {
			const directoryName = line.split(" ")[1];
			currentDir[directoryName] = currentDir[directoryName] ?? {};
		} else {
			const [size, fileName] = line.split(" ");
			currentDir[fileName] = Number(size);
		}
	});
};

input.forEach(processCommand);

// store directory sizes as you go
const directorySizes = new Map<string, number>();

const findSizeOfDirectory = (node: object): number => {
	let names = Object.keys(node);
	let files = names
		.filter((name) => typeof node[name] === "number")
		.map((name) => node[name] as number);
	// we need to add a unique hash in case there are duplicate dir names 😅
	let nodeHash = uuidv4();
	let directoryNames = names.filter((name) => typeof node[name] === "object");
	directoryNames.forEach((name) => {
		directorySizes.set(
			`${name}_${nodeHash}`,
			findSizeOfDirectory(node[name])
		);
	});
	return [
		...files,
		...directoryNames.map((name) =>
			directorySizes.get(`${name}_${nodeHash}`)
		),
	].reduce((a, b) => a + b, 0);
};

export const part1 = () => {
	directorySizes.set("/", findSizeOfDirectory(fileSystem));
	console.log(
		[...directorySizes.values()]
			.filter((value) => value <= 100000)
			.reduce((a, b) => a + b, 0)
	);
};

export const part2 = () => {
	const spaceNeeded = 30_000_000 - (70_000_000 - directorySizes.get("/"));
	console.log(
		[...directorySizes.values()]
			.sort((a, b) => a - b)
			.find((x) => x >= spaceNeeded)
	);
};
