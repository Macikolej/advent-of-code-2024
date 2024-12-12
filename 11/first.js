const { runWithInput } = require("../shared/functions.js");

const AMOUNT_OF_BLINKS = 25;

const first = (input) => {
    let stones = [];

    input.split(" ").forEach((stone) => {
        stones.push(stone);
    })

    for (let i = 0; i < AMOUNT_OF_BLINKS; ++i) {
        const newStones = [];
        for (let j = 0; j < stones.length; ++j) {
            const stone = stones[j];
            if (stone === "0") {
                newStones.push("1");
            } else if (stone.length % 2 === 0) {
                // parse int and to string to get rid of leading zeroes
                const newStone1 = parseInt(stone.slice(0, stone.length / 2)).toString()
                const newStone2 = parseInt(stone.slice(stone.length / 2)).toString()

                newStones.push(newStone1);
                newStones.push(newStone2);
            } else {
                newStones.push((parseInt(stones[j]) * 2024).toString())
            }
        }
        stones = newStones;
    }

    return stones.length;
};

runWithInput("11.txt", first);

