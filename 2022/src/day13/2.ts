import * as fs from "fs";
import * as path from "path";

let input = fs
	.readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
	.replaceAll("\n\n", "\n")
	.split("\n")
	.map((packet) => JSON.parse(packet));

const comparePackets = (packet1: any[], packet2: any[]): number => {
	for (let i = 0; i < packet2.length; i++) {
		if (i >= packet1.length) {
			return -1;
		}
		if (typeof packet1[i] === "number" && typeof packet2[i] === "number") {
			if (packet1[i] < packet2[i]) {
				return -1;
			}
			if (packet1[i] > packet2[i]) {
				return 1;
			}
		} else {
			let updatedPacket1 = packet1[i],
				updatedPacket2 = packet2[i];
			if (typeof updatedPacket1 === "number") {
				updatedPacket1 = [updatedPacket1];
			}
			if (typeof updatedPacket2 === "number") {
				updatedPacket2 = [updatedPacket2];
			}
			const result = comparePackets(updatedPacket1, updatedPacket2);
			if (result !== 0) {
				return result;
			}
		}
	}

	if (packet1.length > packet2.length) {
		return 1;
	}
	return 0;
};

let dividerPacket1 = [[2]];
let dividerPacket2 = [[6]];

let sortedPackets = [...input, dividerPacket1, dividerPacket2].sort(
	comparePackets
);

export const part2 = () => {
	console.log(
		(sortedPackets.indexOf(dividerPacket1) + 1) *
			(sortedPackets.indexOf(dividerPacket2) + 1)
	);
};
