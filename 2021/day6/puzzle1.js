const fs = require("fs");
const path = require("path");

let state = fs
    .readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
    .trim()
    .split(",")
    .map(Number);

for (let i = 0; i < 80; i++) {
    state = state.flatMap((timer) => {
        if (timer === 0) {
            return [6, 8];
        } else {
            return [timer - 1];
        }
    });
}

console.log(state.length);
