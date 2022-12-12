import * as fs from "fs";
import * as path from "path";

let input = fs
	.readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
	.split("\n\n")
	.map((monkeyInfo) => {
		const lines = monkeyInfo.split("\n");
		const currentItems = lines[1]
			.replace("  Starting items: ", "")
			.split(", ")
			.map(Number);
		let [leftOperand, operator, rightOperand] = lines[2]
			.replace("  Operation: new = ", "")
			.split(" ");
		let itemCallback = (old: number) => {
			let l: number, r: number;
			if (leftOperand == "old") l = old;
			else l = Number(leftOperand);

			if (rightOperand == "old") r = old;
			else r = Number(rightOperand);

			switch (operator) {
				case "+":
					return l + r;
				case "*":
					return l * r;
			}
		};
		let divisibleBy = Number(lines[3].replace("  Test: divisible by ", ""));
		let itemTest = (value: number) => {
			return value % divisibleBy == 0;
		};
		let trueMonkey = Number(
			lines[4].replace("    If true: throw to monkey ", "")
		);
		let falseMonkey = Number(
			lines[5].replace("    If false: throw to monkey ", "")
		);
		return {
			currentItems,
			itemCallback,
			itemTest,
			trueMonkey,
			falseMonkey,
		};
	});

let monkeyCounts = new Map<number, number>();
[...input.keys()].forEach((x) => monkeyCounts.set(x, 0));
for (let i = 0; i < 20; i++) {
	input.forEach((monkey, index) => {
		monkeyCounts.set(
			index,
			monkeyCounts.get(index) + monkey.currentItems.length
		);
		while (monkey.currentItems.length > 0) {
			let currentItem = monkey.currentItems.shift();
			let newItemValue = Math.floor(monkey.itemCallback(currentItem) / 3);
			if (monkey.itemTest(newItemValue)) {
				input[monkey.trueMonkey].currentItems.push(newItemValue);
			} else {
				input[monkey.falseMonkey].currentItems.push(newItemValue);
			}
		}
	});
}

let monkeyBusiness = [...monkeyCounts.values()]
	.sort((a, b) => b - a)
	.slice(0, 2)
	.reduce((a, b) => a * b, 1);

export const part1 = () => {
	console.log(monkeyBusiness);
};
