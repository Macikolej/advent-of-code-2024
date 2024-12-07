const { runWithInput } = require("../shared/functions.js");

const first = (input) => {
    const parts = input.split("\n\n");

    const pairNumbersAppearances = {};
    const pairNumbersRelations = {};

    parts[0].split("\n").forEach((pairing, i) => {
        const pairs = pairing.split("|");
        pairNumbersAppearances[pairs[0]] = true;
        pairNumbersAppearances[pairs[1]] = true;

        if (!pairNumbersRelations[pairs[0]]) {
            pairNumbersRelations[pairs[0]] = [];
        }
        pairNumbersRelations[pairs[0]].push(pairs[1]);
    })

    const updates = parts[1].split("\n");

    let middleSum = 0;

    for (let i = 0; i < updates.length; ++i) {
        let isThisUpdateInRightOrder = true;

        const updateNumbers = updates[i].split(",");

        const alreadyVisitedNumbers = [];

        for (let i = 0; i < updateNumbers.length; ++i) {
            const relations = pairNumbersRelations[updateNumbers[i]];
            for (let j = 0; j < relations.length; ++j) {
                if (alreadyVisitedNumbers.includes(relations[j])) {
                    isThisUpdateInRightOrder = false;
                    break;
                }
            }
            if (!isThisUpdateInRightOrder) {
                break;
            }
            alreadyVisitedNumbers.push(updateNumbers[i]);
        }

        if (isThisUpdateInRightOrder) {
            middleSum += parseInt(updateNumbers[Math.floor(updateNumbers.length / 2)])
        }
    }

    return middleSum;
};

runWithInput("5.txt", first);

