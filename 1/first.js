const { runWithInput } = require("../shared/functions.js");

const first = (input) => {
    const leftColumn = [];
    const rightColumn = [];
    let summaryDistance = 0;

    input.split("\n").forEach((row) => {
        const numbers = row.split("  ");

        leftColumn.push(parseInt(numbers[0]));
        rightColumn.push(parseInt(numbers[1]));
    });

    leftColumn.sort();
    rightColumn.sort();

    for (let i = 0; i < leftColumn.length; ++i) {
        const distance = Math.abs(leftColumn[i] - rightColumn[i]);
        summaryDistance += distance;
    }

    return summaryDistance;
};

runWithInput("1.txt", first);

