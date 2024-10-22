export const LEAGUES = {
    ESEA_ADVANCED: {
        NAME: "ESEA ADVANCED",
        COLOR: "bg-amber-400",
    },
    ESEA_MAIN: {
        NAME:"ESEA MAIN",
        COLOR:"bg-red-600"
    },
    ESEA_INTERMEDIATE: {
        NAME:"ESEA INTERMEDIATE",
        COLOR:"bg-fuchsia-600"
    },
    ESEA_OPEN10: {
        NAME:"ESEA OPEN10",
        COLOR:"bg-indigo-700"
    },
    ESEA_OPEN: {
        NAME:"ESEA OPEN",
        COLOR:"bg-blue-600"
    }
}

export const TOURNAMENT_PRIORITY: Record<string, number> = {
    "ESEA ADVANCED": 1,
    "ESEA MAIN": 2,
    "ESEA INTERMEDIATE": 3,
    "ESEA OPEN10": 4,
    "ESEA OPEN": 5,
};
