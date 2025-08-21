// GPX file parser utility
// Created: 2025-08-21 15:13:05 UTC
// Author: HaikuZen

const xml2js = require('xml2js');

class GPXParser {
    constructor(logger) {
        this.logger = logger;
    }

    async parse(gpxContent) {
        try {
            const parser = new xml2js.Parser();
            const result = await parser.parseStringPromise(gpxContent);
            
            if (!result.gpx || !result.gpx.trk) {
                throw new Error('Invalid GPX format: missing track data');
            }

            this.logger.info('Parsing GPX file', { trackCount: result.gpx.trk.length });
            
            return this.extractTrackPoints(result.gpx.trk[0]);
        } catch (error) {
            this.logger.error('Failed to parse GPX file', { error: error.message });
            throw error;
        }
    }

    extractTrackPoints(track) {
        if (!track.trkseg || !track.trkseg[0].trkpt) {
            throw new Error('Invalid track format: missing track points');
        }

        return track.trkseg[0].trkpt.map(point => ({
            latitude: parseFloat(point.$.lat),
            longitude: parseFloat(point.$.lon),
            elevation: point.ele ? parseFloat(point.ele[0]) : null,
            time: point.time ? new Date(point.time[0]) : null
        }));
    }
}

module.exports = GPXParser;