const { runWithInput } = require("../shared/functions.js");

class Node {
    x;
    y;
    symbol;
    fences = [];
    sameSymbolNeighbours = [];
    otherSymbolNeighbours = [];

    constructor(x, y, symbol) {
        this.x = x;
        this.y = y;
        this.symbol = symbol;
    }

    addSameSymbolNeighbour(neighbour) {
        this.sameSymbolNeighbours.push(neighbour);
    }

    addOtherSymbolNeighbour(neighbour) {
        this.otherSymbolNeighbours.push(neighbour)
    }
}

createAndInsertToArray = (obj, key, index, toPush) => {
    if (!obj[key]) {
        obj[key] = [];
    }
    obj[key][index] = toPush
}

addFence = ({ fencesCoordinatesMap, nodeX, nodeY, nodeSymbol, neighbourX, neighbourY }) => {

    if (neighbourX > nodeX) {
        createAndInsertToArray(fencesCoordinatesMap, `E, x: ${nodeX}`, nodeY, nodeSymbol);
    } else if (neighbourX < nodeX) {
        createAndInsertToArray(fencesCoordinatesMap, `W, x: ${nodeX}`, nodeY, nodeSymbol);
    } else if (neighbourY > nodeY) {
        createAndInsertToArray(fencesCoordinatesMap, `S, y: ${nodeY}`, nodeX, nodeSymbol);
    } else if (neighbourY < nodeY) {
        createAndInsertToArray(fencesCoordinatesMap, `N, y: ${nodeY}`, nodeX, nodeSymbol)
    } else {
        throw new Error("something's wrong with this fence!")
    }
}

const isOutOfBounds = ({ map, x, y }) => {
    return (y >= map.length || y < 0 || x >= map[y].length || x < 0)
}

const addToRegion = (nodes, node, region, visitedNodes) => {
    if (visitedNodes[`${node.x}, ${node.y}`]) {
        return;
    } else {
        region.push(node);
        visitedNodes[`${node.x}, ${node.y}`] = true;
    }

    for (let j = 0; j < node.sameSymbolNeighbours.length; ++j) {
        const neighbour = node.sameSymbolNeighbours[j];
        addToRegion(nodes, neighbour, region, visitedNodes);
    }
}

const second = (input) => {

    const mapOfNodes = [];

    input.split("\n").forEach((line, i) => {
        mapOfNodes.push([]);

        for (let j = 0; j < line.length; ++j) {
            const node = new Node(j, i, line[j]);
            mapOfNodes[i].push(node);
        }
    })

    const nodesList = [];

    const fencesCoordinatesMap = {};

    for (let y = 0; y < mapOfNodes.length; ++y) {
        for (let x = 0; x < mapOfNodes[y].length; ++x) {
            const node = mapOfNodes[y][x];

            const neighboursPositions = [
                { x: x + 1, y },
                { x: x - 1, y },
                { x, y: y + 1 },
                { x, y: y - 1 }
            ]

            for (let i = 0; i < neighboursPositions.length; ++i) {
                const position = neighboursPositions[i];

                if (!isOutOfBounds({ map: mapOfNodes, x: position.x, y: position.y })) {
                    const neighbour = mapOfNodes[position.y][position.x];
                    if (neighbour.symbol === node.symbol) {
                        node.addSameSymbolNeighbour(neighbour)
                    } else {
                        addFence({ fencesCoordinatesMap, nodeX: node.x, nodeY: node.y, nodeSymbol: node.symbol, neighbourX: position.x, neighbourY: position.y })
                        node.addOtherSymbolNeighbour(neighbour)
                    }
                } else {
                    addFence({ fencesCoordinatesMap, nodeX: node.x, nodeY: node.y, nodeSymbol: node.symbol, neighbourX: position.x, neighbourY: position.y })
                }
            }

            nodesList.push(node);
        }
    }

    console.log(fencesCoordinatesMap);

    // problem jest taki: jak powiazac te koordynaty z konkretnym regionem? tzn mamy spoko plot ziomeczkow na nwm W, x:0 z symbolem E ale to moze byc dowolny plot regionu z symbolem E.

    const regions = [];
    const visitedNodes = {};

    for (let i = 0; i < nodesList.length; ++i) {
        const node = nodesList[i];
        const region = [];

        addToRegion(nodesList, node, region, visitedNodes);

        if (region.length) {
            regions.push(region);
        }
    }

    let totalPrice = 0;

    for (let i = 0; i < regions.length; ++i) {
        const region = regions[i];

        for (let j = 0; j < region.length; ++j) {
            const node = region[j];
        }

        const area = region.length;

        // totalPrice += area * fenceCount;
    }

    return totalPrice;
};


runWithInput("12.txt", second);

