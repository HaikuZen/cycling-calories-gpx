// Cycling Calories GPX Calculator
// Created: 2025-08-21 15:20:05 UTC
// Author: HaikuZen

const fs = require('fs').promises;
const ActivityLogger = require('./src/activity-logger');
const ElevationCache = require('./src/elevation-cache');
const GPXParser = require('./src/gpx-parser');
const CalorieCalculator = require('./src/calorie-calculator');

class CyclingCaloriesGPX {
    constructor(options = {}) {
        this.logger = new ActivityLogger(options.logLevel || 'info');
        this.elevationCache = new ElevationCache();
        this.parser = new GPXParser(this.logger);
        this.calculator = new CalorieCalculator(this.logger, this.elevationCache);
    }

    async processGPXFile(filePath, options = {}) {
        try {
            this.logger.info('Processing GPX file', { filePath });
            
            const gpxContent = await fs.readFile(filePath, 'utf8');
            const trackPoints = await this.parser.parse(gpxContent);
            
            const results = this.calculator.calculateCalories(
                trackPoints,
                options.riderWeight,
                options.bikeWeight
            );

            this.logger.info('Processing complete', results);
            return results;
        } catch (error) {
            this.logger.error('Failed to process GPX file', { 
                error: error.message,
                filePath 
            });
            throw error;
        }
    }
}

module.exports = CyclingCaloriesGPX;

// Command-line interface
if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.length < 1) {
        console.error('Usage: node index.js <gpx-file> [rider-weight] [bike-weight]');
        process.exit(1);
    }

    const [gpxFile, riderWeight = 75, bikeWeight = 10] = args;
    const calculator = new CyclingCaloriesGPX();

    calculator.processGPXFile(gpxFile, {
        riderWeight: parseFloat(riderWeight),
        bikeWeight: parseFloat(bikeWeight)
    })
    .then(results => {
        console.log('Results:', results);
    })
    .catch(error => {
        console.error('Error:', error.message);
        process.exit(1);
    });
}