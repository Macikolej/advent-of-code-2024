const { runWithInput } = require("../shared/functions.js");

const isOutOfBounds = ({ map, x, y }) => {
    return (y >= map.length || y < 0 || x >= map[y].length || x < 0)
}

const calculateTrailScore = ({ map, x, y, previousValue, resultMap }) => {
    if (isOutOfBounds({ map, x, y }) || (map[y][x] - previousValue) !== 1) {
        return 0;
    } else if (map[y][x] === 9) {
        resultMap[`${x}, ${y}`] = true;
    }

    const positions = [
        { x: x - 1, y, },
        { x: x + 1, y, },
        { x, y: y - 1 },
        { x, y: y + 1 }
    ]

    for (let i = 0; i < positions.length; ++i) {
        calculateTrailScore({ map, x: positions[i].x, y: positions[i].y, previousValue: map[y][x], resultMap });
    }
}

const first = (input) => {
    const map = [];

    input.split("\n").forEach((line, i) => {
        map.push([]);
        for (let j = 0; j < line.length; ++j) {
            map[i].push(parseInt(line[j]));
        }
    })

    let finalScore = 0;

    for (let y = 0; y < map.length; ++y) {
        for (let x = 0; x < map[y].length; ++x) {
            if (map[y][x] === 0) {
                const resultMap = {};
                calculateTrailScore({ map, x, y, previousValue: -1, resultMap });

                finalScore += Object.keys(resultMap).length;
            }
        }
    }

    return finalScore;
};

runWithInput("10.txt", first);

