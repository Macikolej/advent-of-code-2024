const { runWithInput } = require("../shared/functions.js");

const AMOUNT_OF_BLINKS = 75;

const addStone = ({ stoneMap, key, value }) => {
    if (!stoneMap[key]) {
        stoneMap[key] = value;
    } else {
        stoneMap[key] += value;
    }
}

const second = (input) => {
    let stones = [];

    input.split(" ").forEach((stone) => {
        stones.push(stone);
    })

    const stonesPerBlink = { 0: {} }

    for (let i = 0; i < stones.length; ++i) {
        const stone = stones[i];
        addStone({ stoneMap: stonesPerBlink[0], key: stone, value: 1 })
    }

    for (let i = 1; i <= AMOUNT_OF_BLINKS; ++i) {
        stonesPerBlink[i] = {};

        for (let j = 0; j < Object.keys(stonesPerBlink[i - 1]).length; ++j) {
            const stoneNumber = Object.keys(stonesPerBlink[i - 1])[j];
            const stoneCount = stonesPerBlink[i - 1][stoneNumber];

            if (stoneNumber === "0") {
                addStone({ stoneMap: stonesPerBlink[i], key: "1", value: stoneCount })
            } else if (stoneNumber.length % 2 === 0) {
                // parse int and to string to get rid of leading zeroes
                const newStone1 = parseInt(stoneNumber.slice(0, stoneNumber.length / 2)).toString()
                const newStone2 = parseInt(stoneNumber.slice(stoneNumber.length / 2)).toString()

                addStone({ stoneMap: stonesPerBlink[i], key: newStone1, value: stoneCount })
                addStone({ stoneMap: stonesPerBlink[i], key: newStone2, value: stoneCount })
            } else {
                const multipliedStone = (parseInt(stoneNumber) * 2024).toString()
                addStone({ stoneMap: stonesPerBlink[i], key: multipliedStone, value: stoneCount })
            }
        }
    }


    let result = 0;
    for (let i = 0; i < Object.values(stonesPerBlink[AMOUNT_OF_BLINKS]).length; ++i) {
        result += Object.values(stonesPerBlink[AMOUNT_OF_BLINKS])[i];
    }

    return result;
};

runWithInput("11.txt", second);

