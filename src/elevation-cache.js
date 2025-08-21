// Elevation cache management logic
// Created: 2025-08-21 15:11:44 UTC
// Author: HaikuZen

class ElevationCache {
    constructor() {
        this.cache = {};
    }

    get(elevationKey) {
        return this.cache[elevationKey];
    }

    set(elevationKey, elevationValue) {
        this.cache[elevationKey] = elevationValue;
    }

    clear() {
        this.cache = {};
    }

    has(elevationKey) {
        return elevationKey in this.cache;
    }
}

module.exports = ElevationCache;