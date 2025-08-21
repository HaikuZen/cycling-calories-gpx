// Cycling calorie calculator implementation
// Created: 2025-08-21 15:15:09 UTC
// Author: HaikuZen

class CalorieCalculator {
    constructor(logger, elevationCache) {
        this.logger = logger;
        this.elevationCache = elevationCache;
        
        // Default values for calculations
        this.constants = {
            gravity: 9.81,           // m/s²
            airDensity: 1.225,      // kg/m³
            rollingResistance: 0.007,
            dragCoefficient: 0.7
        };
    }

    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371e3; // Earth's radius in meters
        const φ1 = this.toRadians(lat1);
        const φ2 = this.toRadians(lat2);
        const Δφ = this.toRadians(lat2 - lat1);
        const Δλ = this.toRadians(lon2 - lon1);

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return R * c;
    }

    calculatePower(speed, grade, riderWeight, bikeWeight) {
        const totalWeight = riderWeight + bikeWeight;
        
        // Rolling resistance
        const Crr = this.constants.rollingResistance;
        const Frr = Crr * totalWeight * this.constants.gravity * Math.cos(Math.atan(grade));
        
        // Air resistance
        const p = this.constants.airDensity;
        const Cd = this.constants.dragCoefficient;
        const A = 0.5; // Frontal area (m²)
        const v = speed;
        const Fa = 0.5 * p * Cd * A * v * v;
        
        // Gravitational force
        const Fg = totalWeight * this.constants.gravity * Math.sin(Math.atan(grade));
        
        // Total force
        const Ftotal = Frr + Fa + Fg;
        
        // Power (W) = Force (N) * Velocity (m/s)
        return Ftotal * speed;
    }

    calculateCalories(trackPoints, riderWeight = 75, bikeWeight = 10) {
        let totalCalories = 0;
        let totalDistance = 0;

        for (let i = 0; i < trackPoints.length - 1; i++) {
            const point1 = trackPoints[i];
            const point2 = trackPoints[i + 1];

            // Calculate segment distance
            const distance = this.calculateDistance(
                point1.latitude, point1.longitude,
                point2.latitude, point2.longitude
            );

            // Calculate time difference and speed
            const timeDiff = (point2.time - point1.time) / 1000; // seconds
            const speed = distance / timeDiff; // m/s

            // Calculate grade
            const elevationDiff = point2.elevation - point1.elevation;
            const grade = elevationDiff / distance;

            // Calculate power output
            const power = this.calculatePower(speed, grade, riderWeight, bikeWeight);

            // Convert power to calories (1 watt for 1 second = 0.239 calories)
            const calories = (power * timeDiff * 0.239);

            totalCalories += calories;
            totalDistance += distance;

            this.logger.debug('Segment calculation', {
                distance,
                speed,
                grade,
                power,
                calories
            });
        }

        this.logger.info('Calculation complete', {
            totalDistance: totalDistance,
            totalCalories: totalCalories
        });

        return {
            distance: totalDistance,
            calories: totalCalories
        };
    }

    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
}

module.exports = CalorieCalculator;