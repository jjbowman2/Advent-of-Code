import * as fs from "fs";
import * as path from "path";

type Valve = {
	name: string;
	open: boolean;
	flowRate: number;
	tunnels: string[];
};

let tunnelMap = new Map<string, Valve[]>();

let valves = fs
	.readFileSync(path.join(__dirname, "example.txt"), { encoding: "utf-8" })
	.split("\n")
	.map((line) => {
		// parse each line as a valve
		line = line.replace("Valve ", "");
		let [name, rest] = line.split(" has flow rate=");
		let [flowRate, tunnels] = rest.split(/; tunnels? leads? to valves? /);
		return {
			name,
			open: false,
			flowRate: parseInt(flowRate),
			tunnels: tunnels.split(", "),
		};
	});

valves.forEach((valve) => {
	// add each valve to the tunnel map
	tunnelMap.set(
		valve.name,
		valve.tunnels.map((tunnel) => valves.find((v) => v.name === tunnel))
	);
});

const getShortestPath = (start: Valve, target: Valve) => {
	// get the shortest path from the start valve to the target valve
	// this is done by using a breadth first search
	let queue = [start];
	let visited = new Set<Valve>();
	let paths = new Map<Valve, Valve[]>();
	paths.set(start, []);
	while (queue.length > 0) {
		let current = queue.shift();
		if (current === target) {
			return paths.get(current);
		}
		if (visited.has(current)) {
			continue;
		}
		visited.add(current);
		queue.push(...tunnelMap.get(current.name));
		tunnelMap.get(current.name).forEach((valve) => {
			paths.set(valve, [...paths.get(current), valve]);
		});
	}
	return [];
};

let currentValve = valves[0];
let currentFlowRate = 0;
let releasedPressure = 0;

const getBestTarget = () => {
	// get the best target valve
	// the best target valve is the valve with the highest flow rate that is not already open
	// factoring in the distance to the target valve
	return valves
		.filter((valve) => !valve.open)
		.map((valve) => {
			let DISTANCE_FACTOR = 6;
			let score =
				valve.flowRate -
				DISTANCE_FACTOR * getShortestPath(currentValve, valve).length;
			return [score, valve] as [number, Valve];
		})
		.sort((a, b) => b[0] - a[0])[0]?.[1];
};

let bestTarget, pathToBestTarget;
for (let minutes = 0; minutes < 30; minutes++) {
	releasedPressure += currentFlowRate;
	console.log(
		`Minute ${minutes} - Released Pressure: ${releasedPressure}, Current Flow Rate: ${currentFlowRate}, Current Valve: ${currentValve.name}`
	);
	if (!bestTarget) {
		bestTarget = getBestTarget();
		pathToBestTarget = getShortestPath(currentValve, bestTarget);
		console.log(
			`Best Target: ${bestTarget?.name}, Path: ${pathToBestTarget
				?.map((valve) => valve.name)
				?.join(" -> ")}`
		);
		if (!bestTarget) {
			continue;
		}
	}
	if (pathToBestTarget.length > 0) {
		// move to the next valve in the path
		currentValve = pathToBestTarget.shift();
	} else {
		// open the best target valve
		bestTarget.open = true;
		currentFlowRate += bestTarget.flowRate;
		bestTarget = undefined;
	}
}

export const part1 = () => {
	console.log(releasedPressure);
};
