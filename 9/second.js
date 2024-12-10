const { runWithInput } = require("../shared/functions.js");

class File {
    fileID;
    blockCount;
    globalIndex;

    constructor(fileID, blockCount, globalIndex) {
        this.fileID = fileID;
        this.blockCount = blockCount;
        this.globalIndex = globalIndex;
    }
}

class FreeSpace {
    globalIndex;
    blockCount;
    occupied = false;

    constructor(globalIndex, blockCount) {
        this.globalIndex = globalIndex;
        this.blockCount = blockCount;
    }

    occupy() {
        this.occupied = true;
    }
}

const second = (input) => {
    let idNumber = 0;
    let globalIndex = 0;
    let doesIndexRepresentFile = true;

    const filesArray = [];
    const freeSpacesArray = [];

    // O(n)
    for (let i = 0; i < input.length; ++i) {
        const count = parseInt(input[i])
        if (doesIndexRepresentFile) {
            const file = new File(idNumber, count, globalIndex);
            filesArray.push(file);
            idNumber++;
        } else {
            const freeSpace = new FreeSpace(globalIndex, count);
            freeSpacesArray.push(freeSpace);
        }
        globalIndex += count;
        doesIndexRepresentFile = !doesIndexRepresentFile;
    }

    let checksum = 0;

    // O(k + j) where k is files length and j is free spaces length which sums to O(n)
    for (let i = filesArray.length - 1; i >= 0; --i) {
        const file = filesArray[i];
        for (let j = 0; j < freeSpacesArray.length; ++j) {
            const freeSpace = freeSpacesArray[j];

            if (file.blockCount <= freeSpace.blockCount && !freeSpace.occupied && freeSpace.globalIndex < file.globalIndex) {
                freeSpace.occupy();
                file.globalIndex = freeSpace.globalIndex;

                const blockDiff = freeSpace.blockCount - file.blockCount;
                if (blockDiff) {
                    const newFreeSpace = new FreeSpace(freeSpace.globalIndex + file.blockCount, blockDiff)
                    freeSpacesArray[j] = newFreeSpace
                }

                break;
            }
        }

        // arithmetic sum
        const a1 = file.globalIndex * file.fileID;
        const an = (file.globalIndex + file.blockCount - 1) * file.fileID
        checksum += (a1 + an) / 2 * file.blockCount
    }

    return checksum;
};

runWithInput("9.txt", second);

