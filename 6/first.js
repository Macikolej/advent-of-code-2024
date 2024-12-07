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

const first = (input) => {
    const map = [];
    let guardPosition = {};
    const visitedNodes = {};

    let guardDirection = "N"

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

    let guardInBounds = true;

    while (guardInBounds) {
        const xChange = guardDirection === "E" ? 1 : guardDirection === "W" ? -1 : 0;
        const yChange = guardDirection === "S" ? 1 : guardDirection === "N" ? -1 : 0;
        let potentionalPosition = {
            x: guardPosition.x + xChange,
            y: guardPosition.y + yChange
        }

        if (potentionalPosition.x >= map[0].length || potentionalPosition.y >= map.length || potentionalPosition.x < 0 || potentionalPosition.y < 0) {
            break;
        }

        if (map[potentionalPosition.y][potentionalPosition.x] === "#") {
            const newDirection = getNewDirection({ currentDirection: guardDirection });
            guardDirection = newDirection;
            continue;
        }

        guardPosition = potentionalPosition;
        visitedNodes[`${potentionalPosition.x}, ${potentionalPosition.y}`] = true;
    }

    return (Object.keys(visitedNodes).length);
};

runWithInput("6.txt", first);

