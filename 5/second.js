const { runWithInput } = require("../shared/functions.js");

const sortingFunction = ({ number1, number2, relations }) => {
    const number1Relations = relations[number1];
    const number2Relations = relations[number2];

    if (number2Relations && number2Relations.includes(number1)) {
        return 1;
    } else if (number1Relations && number1Relations.includes(number2)) {
        return -1;
    }

    return 0;
}

const second = (input) => {
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

        if (!isThisUpdateInRightOrder) {
            const sortedUpdate = updateNumbers.sort((a, b) => sortingFunction({ number1: a, number2: b, relations: pairNumbersRelations }))
            middleSum += parseInt(sortedUpdate[Math.floor(sortedUpdate.length / 2)])
        }
    }

    return middleSum;
};

runWithInput("5.txt", second);

