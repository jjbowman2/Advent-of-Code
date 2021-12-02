const fs = require("fs");
const path = require("path");

let commands = fs
    .readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
    .split(/\n/);

let convertCommand = (command) => {
    let [direction, quantity] = command.split(/\s/);
    quantity = Number(quantity);
    switch (direction) {
        case "forward":
            return { displacement: quantity, direction: 0 };
        case "backward":
            return { displacement: -1 * quantity, direction: 0 };
        case "up":
            return { displacement: 0, direction: -1 * quantity };
        case "down":
            return { displacement: 0, direction: quantity };
    }
};

let horizontalPosition = 0;
let depth = 0;
let aim = 0;
commands.map(convertCommand).forEach(({ displacement, direction }) => {
    aim += direction;
    horizontalPosition += displacement;
    depth += aim * displacement;
});

console.log({ horizontalPosition, depth, aim });
console.log(`Answer: ${horizontalPosition * depth}`);
