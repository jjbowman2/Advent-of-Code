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
            return [quantity, 0];
        case "backward":
            return [-1 * quantity, 0];
        case "up":
            return [0, -1 * quantity];
        case "down":
            return [0, quantity];
    }
};

let horizontalPosition = 0;
let depth = 0;
commands.map(convertCommand).forEach(([x, y]) => {
    horizontalPosition += x;
    depth += y;
});

console.log({ horizontalPosition, depth });
console.log(`Answer: ${horizontalPosition * depth}`);
