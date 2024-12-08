const { runWithInput } = require("../shared/functions.js");

const checkIfInBounds = ({ height, width, x, y }) => {
    return (x < width && y < height && x >= 0 && y >= 0)
}

const first = (input) => {
    const antinodeLocations = {};
    const symbolsLocations = {};

    let width;
    let height = 0;

    input.split("\n").forEach((line, y) => {
        const symbols = line.split("");

        height += 1;
        width = symbols.length;

        symbols.forEach((symbol, x) => {
            if (symbol === ".") {
                return;
            }

            if (!symbolsLocations[symbol]) {
                symbolsLocations[symbol] = [];
            }

            symbolsLocations[symbol].push({ x, y })
        })
    })

    const locations = Object.values(symbolsLocations)

    // triple for looks bad but its complexity is as follows: locations.length (which is basically how many characters appear in map, maximum of 50-some) * symbolLocations.length * symbolLocations.length - 1. so its basically n^2 but not on the whole map but only on appearances of the symbol
    for (let i = 0; i < locations.length; ++i) {
        const symbolLocations = locations[i];

        for (let j = 0; j < symbolLocations.length; ++j) {
            for (let k = j + 1; k < symbolLocations.length; ++k) {
                const firstAntinodeX = (symbolLocations[j].x - symbolLocations[k].x) + symbolLocations[j].x;
                const firstAntinodeY = (symbolLocations[j].y - symbolLocations[k].y) + symbolLocations[j].y;

                if (checkIfInBounds({ height, width, x: firstAntinodeX, y: firstAntinodeY })) {
                    antinodeLocations[`${firstAntinodeX},${firstAntinodeY}`] = true;
                }

                const secondAntinodeX = (symbolLocations[k].x - symbolLocations[j].x) + symbolLocations[k].x;
                const secondAntinodeY = (symbolLocations[k].y - symbolLocations[j].y) + symbolLocations[k].y;

                if (checkIfInBounds({ height, width, x: secondAntinodeX, y: secondAntinodeY })) {
                    antinodeLocations[`${secondAntinodeX},${secondAntinodeY}`] = true;
                }
            }
        }
    }

    return Object.keys(antinodeLocations).length;
};

runWithInput("8.txt", first);

