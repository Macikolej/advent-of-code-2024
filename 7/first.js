const { runWithInput } = require("../shared/functions.js");

const checkOperation = (ingredients, currentResult, expectedResult) => {
    if (ingredients.length === 0 && currentResult === expectedResult) {
        return true;
    }

    if (ingredients.length === 0 || currentResult > expectedResult) {
        return false;
    }

    const multiplicationResult = currentResult * ingredients[0];

    const wasMultiplicationCorrect = checkOperation(ingredients.slice(1), multiplicationResult, expectedResult);

    if (wasMultiplicationCorrect) {
        return true;
    }

    const additionResult = currentResult + ingredients[0];
    const wasAdditionCorrect = checkOperation(ingredients.slice(1), additionResult, expectedResult);

    return wasAdditionCorrect;
}


const first = (input) => {
    let calibrationResult = 0;

    input.split("\n").forEach((line) => {
        const split = line.split(": ");
        const expectedResult = parseInt(split[0]);
        const ingredients = split[1].split(" ").map((el) => parseInt(el));

        const canBeMadeTrue = checkOperation(ingredients.slice(1), ingredients[0], expectedResult);

        if (canBeMadeTrue) {
            calibrationResult += expectedResult;
        }
    })

    return calibrationResult;
};

runWithInput("7.txt", first);

