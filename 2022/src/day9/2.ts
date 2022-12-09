import * as fs from "fs";
import * as path from "path";

let input = fs
	.readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
	.split("\n")
	.map((line) => {
		const [direction, steps] = line.split(" ");
		return [direction, Number(steps)];
	});

type Node = {
	position: [number, number];
	next: Node | null;
};

const head: Node = {
	position: [0, 0],
	next: null,
};

let curr = head;
for (let i = 0; i < 9; i++) {
	curr.next = {
		position: [0, 0],
		next: null,
	};
	curr = curr.next;
}

let visited = new Set<string>(["0_0"]);

const adjustNode = (previous: Node, current: Node) => {
	const [xDiff, yDiff] = [
		previous.position[0] - current.position[0],
		previous.position[1] - current.position[1],
	];
	if (Math.abs(xDiff) <= 1 && Math.abs(yDiff) <= 1) return;

	if (Math.abs(xDiff) >= 1 && Math.abs(yDiff) >= 1) {
		// move diagonal
		if (xDiff < 0 && yDiff < 0)
			current.position = [
				current.position[0] - 1,
				current.position[1] - 1,
			];
		else if (xDiff < 0 && yDiff > 0)
			current.position = [
				current.position[0] - 1,
				current.position[1] + 1,
			];
		else if (xDiff > 0 && yDiff < 0)
			current.position = [
				current.position[0] + 1,
				current.position[1] - 1,
			];
		else
			current.position = [
				current.position[0] + 1,
				current.position[1] + 1,
			];
	} else if (Math.abs(xDiff) > 1) {
		// move on x
		if (xDiff > 0)
			current.position = [current.position[0] + 1, current.position[1]];
		else current.position = [current.position[0] - 1, current.position[1]];
	} else {
		// move on y
		if (yDiff > 0)
			current.position = [current.position[0], current.position[1] + 1];
		else current.position = [current.position[0], current.position[1] - 1];
	}
	if (current.next == null) {
		visited.add(`${current.position[0]}_${current.position[1]}`);
	}
};

const processCommand = ([direction, steps]: [string, number]) => {
	for (let i = 0; i < steps; i++) {
		switch (direction) {
			case "U":
				head.position = [head.position[0] + 1, head.position[1]];
				break;
			case "D":
				head.position = [head.position[0] - 1, head.position[1]];
				break;
			case "R":
				head.position = [head.position[0], head.position[1] + 1];
				break;
			case "L":
				head.position = [head.position[0], head.position[1] - 1];
				break;
		}
		let current = head;
		while (current.next != null) {
			adjustNode(current, current.next);
			current = current.next;
		}
	}
};

input.forEach(processCommand);

export const part2 = () => {
	console.log(visited.size);
};
