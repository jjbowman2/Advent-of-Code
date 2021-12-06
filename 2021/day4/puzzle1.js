const fs = require("fs");
const path = require("path");
const { exit } = require("process");

let input = fs
    .readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
    .split(/\n/);

let extractRow = (input) => {
    return input
        .shift()
        .trim()
        .split(/\s+/)
        .map((number) => ({ number: Number(number), marked: false }));
};

let checkColumn = (board, column) => {
    for (let i = 0; i < board.length; i++) {
        if (!board[i][column].marked) {
            return false;
        }
    }
    return true;
};

let checkRow = (board, row) => {
    for (let i = 0; i < board[0].length; i++) {
        if (!board[row][i].marked) {
            return false;
        }
    }
    return true;
};

let calculateBoardScore = (board, finalNumber) => {
    return (
        // calculate sum of all unmarked numbers * final score
        board.reduce((score, row) => {
            return (
                score +
                row
                    .map(({ number, marked }) => (marked ? 0 : number))
                    .reduce((sum, x) => sum + x, 0)
            );
        }, 0) * finalNumber
    );
};

let calledNumbers = input.shift().split(",").map(Number);
let boards = [];
while (input.length > 0) {
    let board = [];
    input.shift();
    board.push(extractRow(input));
    board.push(extractRow(input));
    board.push(extractRow(input));
    board.push(extractRow(input));
    board.push(extractRow(input));
    boards.push(board);
}

let numberLocations = {};
boards.forEach((board, boardNumber) => {
    // index each board
    board.forEach((row, rowNumber) => {
        row.forEach(({ number }, columnNumber) => {
            if (numberLocations[number] === undefined) {
                numberLocations[number] = [];
            }
            numberLocations[number].push([
                boardNumber,
                rowNumber,
                columnNumber,
            ]);
        });
    });
});

calledNumbers.forEach((currentNumber) => {
    let currentNumberLocations = numberLocations[currentNumber];
    currentNumberLocations.forEach(([board, row, column]) => {
        boards[board][row][column].marked = true;
        if (
            checkColumn(boards[board], column) ||
            checkRow(boards[board], row)
        ) {
            console.log(`Board ${board + 1} won on ${currentNumber}.`);
            console.log(
                `Board score: ${calculateBoardScore(
                    boards[board],
                    currentNumber
                )}`
            );
            exit();
        }
    });
});
