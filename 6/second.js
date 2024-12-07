const { runWithInput } = require("../shared/functions.js");

const getNewDirection = ({ currentDirection }) => {
    switch (currentDirection) {
        case "N":
            return "E";
        case "E":
            return "S";
        case "S":
            return "W";
        case "W":
            return "N";
    }
}

const simulateGuardWalking = ({ map, guardPosition, visitedNodes, shouldSaveDirection = false }) => {
    let guardInBounds = true;
    let guardDirection = "N";

    while (guardInBounds) {
        const xChange = guardDirection === "E" ? 1 : guardDirection === "W" ? -1 : 0;
        const yChange = guardDirection === "S" ? 1 : guardDirection === "N" ? -1 : 0;
        let potentionalPosition = {
            x: guardPosition.x + xChange,
            y: guardPosition.y + yChange
        }

        if (visitedNodes[`${potentionalPosition.x}, ${potentionalPosition.y} ${guardDirection}`]) {
            return true;
        }

        if (potentionalPosition.x >= map[0].length || potentionalPosition.y >= map.length || potentionalPosition.x < 0 || potentionalPosition.y < 0) {
            return false;
        }

        if (map[potentionalPosition.y][potentionalPosition.x] === "#") {
            const newDirection = getNewDirection({ currentDirection: guardDirection });
            guardDirection = newDirection;
            continue;
        }

        guardPosition = potentionalPosition;
        if (shouldSaveDirection) {
            visitedNodes[`${potentionalPosition.x}, ${potentionalPosition.y} ${guardDirection}`] = true;
        } else {
            visitedNodes[`${potentionalPosition.x}, ${potentionalPosition.y}`] = true;
        }

    }
}

const second = (input) => {
    const map = [];
    let guardPosition = {};
    const visitedNodes = {};

    input.split("\n").forEach((line, i) => {
        map.push([]);
        for (let j = 0; j < line.length; ++j) {
            map[i].push(line[j]);
            if (line[j] === "^") {
                guardPosition.x = j;
                guardPosition.y = i;
            }
        }
    })

    const startingGuardPosition = { x: guardPosition.x, y: guardPosition.y };

    simulateGuardWalking({ map, guardPosition, visitedNodes });

    let loopResultsCounter = 0;

    // obstacle can't appear on starting guard position
    delete visitedNodes[`${startingGuardPosition.x}, ${startingGuardPosition.y}`];

    const keysOfVisitedNodes = Object.keys(visitedNodes)
    for (let i = 0; i < keysOfVisitedNodes.length; ++i) {
        const coordinates = keysOfVisitedNodes[i].split(", ");
        const x = coordinates[0];
        const y = coordinates[1];
        const visitedNodes = {};
        guardPosition = startingGuardPosition;

        map[y][x] = "#";
        const result = simulateGuardWalking({ map, guardPosition, visitedNodes, shouldSaveDirection: true })
        if (result) {
            loopResultsCounter += 1;
        }

        map[y][x] = ".";
    }

    return loopResultsCounter;
};

runWithInput("6.txt", second);

