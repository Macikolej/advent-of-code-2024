const { runWithInput } = require("../shared/functions.js");

class Node {
    x;
    y;
    symbol;
    plotCount = 0;
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

    incrementPlotCount() {
        this.plotCount += 1;
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

const first = (input) => {

    const mapOfNodes = [];

    input.split("\n").forEach((line, i) => {
        mapOfNodes.push([]);

        for (let j = 0; j < line.length; ++j) {
            const node = new Node(j, i, line[j]);
            mapOfNodes[i].push(node);
        }
    })

    const nodesList = [];

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
                        node.incrementPlotCount();
                        node.addOtherSymbolNeighbour(neighbour)
                    }
                } else {
                    node.incrementPlotCount();
                }
            }

            nodesList.push(node);
        }
    }

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

        let area = region.length;
        let perimeter = 0;

        for (let j = 0; j < region.length; ++j) {
            const node = region[j];
            perimeter += node.plotCount;
        }

        totalPrice += area * perimeter;
    }

    return totalPrice;
};


runWithInput("12.txt", first);

