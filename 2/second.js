const { runWithInput } = require("../shared/functions.js");

const MIN_SAFE_DISTANCE_OF_LEVELS = 1;
const MAX_SAFE_DISTANCE_OF_LEVELS = 3;

const getTrend = ({ previousLevel, level }) => {
    return (level - previousLevel) > 0 ? 1 : -1
}

const determineSafetyOfLevel = ({ level, previousLevel, trend }) => {
    const levelDistance = Math.abs(level - previousLevel);
    return levelDistance >= MIN_SAFE_DISTANCE_OF_LEVELS && levelDistance <= MAX_SAFE_DISTANCE_OF_LEVELS && getTrend({ previousLevel, level }) == trend
}

const determineSafety = ({ levels, initialLevelsLength }) => {
    let previousLevel;
    let trend;

    for (let i = 0; i < levels.length; ++i) {
        const level = levels[i];

        if (previousLevel) {
            if (!trend) {
                // will give us 1 or -1 depending on trend
                trend = getTrend({ previousLevel, level })
            }
            if (!determineSafetyOfLevel({ level, previousLevel, trend })) {
                if (levels.length != initialLevelsLength) {
                    return false;
                } else {
                    // max possible range in which deletion could help is 2 elems back
                    for (let j = i; j >= Math.max(0, i - 2); --j) {
                        const alternativeVariantSafety = determineSafety({ levels: (levels.slice(0, j).concat(levels.slice(j + 1, levels.length))), initialLevelsLength })
                        if (alternativeVariantSafety) {
                            return true;
                        }
                    }
                    return false;
                }
            }
        }
        previousLevel = level;
    }

    return true;
}

const second = (input) => {
    const safeReports = [];

    input.split("\n").forEach((report) => {
        const levels = report.split(" ").map((el) => parseInt(el));
        if (determineSafety({ levels, initialLevelsLength: levels.length })) {
            safeReports.push(report);
        }
    });

    return safeReports.length;
};

runWithInput("2.txt", second);
