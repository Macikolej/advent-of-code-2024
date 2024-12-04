const { runWithInput } = require("../shared/functions.js");

// definition of possible "MAS" lines defined as offsets from "A" letter position
const mOffsets = [
    { x: 1, y: 1 },
    { x: 1, y: -1 },
    { x: -1, y: -1 },
    { x: -1, y: 1 }
]

const checkForX = ({ letterMap, startingX, startingY }) => {
    if (
        startingY + 1 > (letterMap.length - 1) || startingY - 1 < 0 ||
        startingX + 1 > (letterMap[startingY].length - 1) || startingX - 1 < 0
    ) {
        return false;
    }

    if (letterMap[startingY][startingX] === "A") {
        let sAndMCount = 0;

        for (let i = 0; i < mOffsets.length; ++i) {
            const mOffset = mOffsets[i];

            // "S" should be on diagonal from "M"
            const sOffset = {
                x: mOffset.x * -1,
                y: mOffset.y * -1
            }

            if (
                letterMap[startingY + mOffset.y][startingX + mOffset.x] === "M" &&
                letterMap[startingY + sOffset.y][startingX + sOffset.x] === "S"
            ) {
                sAndMCount += 1;
            }
        }



        if (sAndMCount === 2) {
            return true;
        }
    }
    return false;
}

const second = (input) => {
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
            const res = checkForX({ letterMap, startingX: j, startingY: i });
            if (res) {
                countSum++;
            }
        }
    }

    return countSum;
};

runWithInput("4.txt", second);

