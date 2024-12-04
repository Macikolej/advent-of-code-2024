const { runWithInput } = require("../shared/functions.js");

const WORD_TO_LOOK_FOR = "XMAS";

const countWordInstances = ({ letterMap, startingX, startingY }) => {
    let count = 0;
    for (let x = -1; x <= 1; ++x) {
        for (let y = -1; y <= 1; ++y) {
            count += checkDirection({ letterMap, startingX, startingY, directionX: x, directionY: y })
        }
    }

    return count;
}

const checkDirection = ({ letterMap, startingX, startingY, directionX, directionY }) => {
    let currentX = startingX;
    let currentY = startingY;

    for (let i = 0; i < WORD_TO_LOOK_FOR.length; ++i) {
        if (letterMap[currentY][currentX] != WORD_TO_LOOK_FOR[i]) {
            return 0;
        }
        currentX += directionX;
        currentY += directionY;
        if (i == (WORD_TO_LOOK_FOR.length - 1)) {
            return 1;
        } else if (currentY > (letterMap.length - 1) || currentY < 0 || currentX > (letterMap[currentY].length - 1) || currentX < 0) {
            return 0;
        }
    }
}

const first = (input) => {
    const letterMap = [];

    let countSum = 0;

    input.split("\n").forEach((line, i) => {
        letterMap.push([]);
        line.split("").forEach((letter) => {
            letterMap[i].push(letter);
        })
    })

    for (let i = 0; i < letterMap.length; ++i) {
        const row = letterMap[i];

        for (let j = 0; j < row.length; ++j) {
            const count = countWordInstances({ letterMap, startingX: j, startingY: i });
            countSum += count
        }
    }

    return countSum;
};

runWithInput("4.txt", first);

