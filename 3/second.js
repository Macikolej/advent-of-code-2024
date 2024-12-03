const { runWithInput } = require("../shared/functions.js");

const regex = /^(?<!\s)\((\d+),(\d+)\)/;

const second = (input) => {
    let finalProduct = 0;

    // filtering the input (cutting away section of text between "don't()" and "do()" instances)
    const splitInput = input.split("don't()");

    // everything before first "don't()" is enabled
    let filteredString = splitInput[0];

    for (let i = 0; i < splitInput.length; ++i) {
        const reenabledIndex = splitInput[i].indexOf("do()")

        if (reenabledIndex !== -1) {
            filteredString += splitInput[i].slice(reenabledIndex);
        }
    }

    filteredString.split("mul").forEach((el) => {
        const matchResult = el.match(regex);

        if (matchResult) {
            const num1 = parseInt(matchResult[1]);
            const num2 = parseInt(matchResult[2]);
            finalProduct += num1 * num2
        }
    })

    return finalProduct
};

runWithInput("3.txt", second);

