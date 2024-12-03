const { runWithInput } = require("../shared/functions.js");

const regex = /^(?<!\s)\((\d+),(\d+)\)/;

const first = (input) => {
    let finalProduct = 0;

    input.split("mul").forEach((el) => {
        const matchResult = el.match(regex);

        if (matchResult) {
            const num1 = parseInt(matchResult[1]);
            const num2 = parseInt(matchResult[2]);
            finalProduct += num1 * num2
        }
    })

    return finalProduct
};

runWithInput("3.txt", first);

