const { runWithInput } = require("../shared/functions.js");

const second = (input) => {
    const leftColumnAppearances = {};
    const rightColumnAppearances = {};
    let similarityScore = 0;

    input.split("\n").forEach((row) => {
        const numbers = row.split("  ");

        const leftNumber = parseInt(numbers[0]);
        const rightNumber = parseInt(numbers[1])

        leftColumnAppearances[leftNumber] = 1;
        if (!rightColumnAppearances[rightNumber]) {
            rightColumnAppearances[rightNumber] = 1;
        } else {
            rightColumnAppearances[rightNumber] += 1;
        }
    });

    leftColumnKeys = Object.keys(leftColumnAppearances)
    for (let i = 0; i < leftColumnKeys.length; ++i) {
        const leftNumber = leftColumnKeys[i];
        similarityScore += leftNumber * (rightColumnAppearances[leftNumber] || 0)
    }

    return similarityScore
};

runWithInput("1.txt", second);

