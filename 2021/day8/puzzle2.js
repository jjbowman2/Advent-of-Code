const fs = require("fs");
const path = require("path");

let intersection = (set1, set2) =>
	new Set([...set1].filter((value) => set2.has(value)));

let setEq = (set1, set2) =>
	set1.size === set2.size && [...set1].every((value) => set2.has(value));

let inputs = fs
	.readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
	.trim()
	.split(/\n/);

console.time("Calculation time");
let result = inputs
	.map((input) => {
		let solution = {};
		let uncertainLength5 = [],
			uncertainLength6 = [];
		let [inputValues, outputValues] = input
			.split(" | ")
			.map((arr) => arr.split(/\s/));
		inputValues.forEach((inputValue) => {
			// 1, 4, 7, 8 have unique # of sides and can be stored directly
			// 2, 3, 5 and 0, 6, 9 have five and six sides respectively
			//      so they have to be solved for
			let inputChars = inputValue.split("");
			switch (inputChars.length) {
				case 2:
					solution[1] = new Set(inputChars);
					break;
				case 3:
					solution[7] = new Set(inputChars);
					break;
				case 4:
					solution[4] = new Set(inputChars);
					break;
				case 7:
					solution[8] = new Set(inputChars);
					break;
				case 5:
					uncertainLength5.push(new Set(inputChars));
					break;
				case 6:
					uncertainLength6.push(new Set(inputChars));
					break;
			}
		});

		// solving for length 5
		let x = intersection(uncertainLength5[0], uncertainLength5[1]);
		let y = intersection(uncertainLength5[0], uncertainLength5[2]);
		// if 3 common sides are shared, it is 2 and 5, therefore the other is 3
		if (x.size === 3) {
			solution[3] = uncertainLength5.splice(2, 1)[0];
		} else if (y.size === 3) {
			solution[3] = uncertainLength5.splice(1, 1)[0];
		} else {
			solution[3] = uncertainLength5.splice(0, 1)[0];
		}

		// comparing common sides to 4, 2 will have two common sides and 5 will have three
		if (intersection(uncertainLength5[0], solution[4]).size == 2) {
			solution[2] = uncertainLength5[0];
			solution[5] = uncertainLength5[1];
		} else {
			solution[2] = uncertainLength5[1];
			solution[5] = uncertainLength5[0];
		}

		// solving for length 6
		// 9 is the only possibility that shares four common sides with 4
		solution[9] = uncertainLength6.splice(
			uncertainLength6.findIndex(
				(set) => intersection(set, solution[4]).size === 4
			),
			1
		)[0];
		// comparing 0 and 6 to 1; 0 and 1 share two common sides, while 6 and 1 only share one
		if (intersection(uncertainLength6[0], solution[1]).size == 2) {
			solution[0] = uncertainLength6[0];
			solution[6] = uncertainLength6[1];
		} else {
			solution[0] = uncertainLength6[1];
			solution[6] = uncertainLength6[0];
		}
		return outputValues
			.map((outputValue) => {
				return Object.keys(solution).find((key) =>
					setEq(new Set(outputValue), solution[key])
				);
			})
			.join("");
	})
	.map(Number)
	.reduce((sum, curr) => sum + curr, 0);

console.timeEnd("Calculation time");
console.log(`Answer: ${result}`);
