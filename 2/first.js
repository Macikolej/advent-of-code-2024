const { runWithInput } = require("../shared/functions.js");

const MIN_SAFE_DISTANCE_OF_LEVELS = 1;
const MAX_SAFE_DISTANCE_OF_LEVELS = 3;

const getTrend = ({ previousLevel, level }) => {
    return (level - previousLevel) > 0 ? 1 : -1
}

const determineSafety = ({ report }) => {
    const levels = report.split(" ");

    let previousLevel;
    let trend;

    for (let i = 0; i < levels.length; ++i) {
        const level = levels[i];

        if (previousLevel) {
            if (!trend) {
                // will give us 1 or -1 depending on trend
                trend = getTrend({ previousLevel, level })
            }
            const levelDistance = Math.abs(level - previousLevel);
            if (levelDistance < MIN_SAFE_DISTANCE_OF_LEVELS || levelDistance > MAX_SAFE_DISTANCE_OF_LEVELS || getTrend({ previousLevel, level }) !== trend) {
                return false;
            }
        }
        previousLevel = level;
    }

    return true;
}

const first = (input) => {
    const safeReports = [];

    input.split("\n").forEach((report) => {
        if (determineSafety({ report })) {
            safeReports.push(report);
        }
    });

    return safeReports.length;
};

runWithInput("2.txt", first);

