const { runWithInput } = require("../shared/functions.js");

const isOutOfBounds = ({ map, x, y }) => {
    return (y >= map.length || y < 0 || x >= map[y].length || x < 0)
}

const calculateTrailScore = ({ map, x, y, previousValue }) => {
    if (isOutOfBounds({ map, x, y }) || (map[y][x] - previousValue) !== 1) {
        return 0;
    } else if (map[y][x] === 9) {
        return 1;
    }

    const positions = [
        { x: x - 1, y, },
        { x: x + 1, y, },
        { x, y: y - 1 },
        { x, y: y + 1 }
    ]

    let scoreSum = 0;
    for (let i = 0; i < positions.length; ++i) {
        scoreSum += calculateTrailScore({ map, x: positions[i].x, y: positions[i].y, previousValue: map[y][x] });
    }

    return scoreSum;
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
                const score = calculateTrailScore({ map, x, y, previousValue: -1 });
                if (score > 0) {
                    finalScore += score;
                }
            }
        }
    }

    return finalScore;
};

runWithInput("10.txt", first);

