export const gameConfig = {
    targetScore: 10,
    minHeartsPerWave: 3,
    maxHeartsPerWave: 5,
    minFallDuration: 5, // seconds (slower)
    maxFallDuration: 8, // seconds (slower)
    spawnInterval: 1200, // ms
    timeLimit: null, // seconds, or null for endless
    speedIncreasePerScore: 0 // removed difficulty scaling so it stays easy
};
