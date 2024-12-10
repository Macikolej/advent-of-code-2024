const { runWithInput } = require("../shared/functions.js");

const first = (input) => {
    // representing string as array, cause blocks can contain multidigit numbers
    let decompressedStringArray = [];

    let = true;
    let idNumber = 0;
    let doesIndexRepresentFile = true;

    // O(n * m), where m is ubdex of given place, maximum of n, average of n/2
    for (let i = 0; i < input.length; ++i) {
        const count = input[i];

        for (let j = 0; j < count; ++j) {
            decompressedStringArray.push(doesIndexRepresentFile ? idNumber : ".")
        }

        if (doesIndexRepresentFile) {
            idNumber += 1;
        }
        doesIndexRepresentFile = !doesIndexRepresentFile;
    }

    let parsedStringArray = [];
    let currentIndex = 0;
    let endIndex = decompressedStringArray.length - 1;
    let checksum = 0;

    // O(n)
    while (currentIndex <= endIndex) {
        const currentElement = decompressedStringArray[currentIndex];
        if (currentElement === ".") {
            while (decompressedStringArray[endIndex] === ".") {
                endIndex--;
            }
            parsedStringArray.push(decompressedStringArray[endIndex]);

            checksum += parseInt(decompressedStringArray[endIndex]) * (parsedStringArray.length - 1)
            endIndex--;
        } else {
            parsedStringArray.push(currentElement);
            checksum += parseInt(currentElement) * (parsedStringArray.length - 1)
        }
        currentIndex++;
    }

    return checksum;
};

runWithInput("9.txt", first);

