// Activity logging utility
// Created: 2025-08-21 15:12:16 UTC
// Author: HaikuZen

class ActivityLogger {
    constructor(logLevel = 'info') {
        this.logLevel = logLevel;
        this.levels = {
            error: 0,
            warn: 1,
            info: 2,
            debug: 3
        };
    }

    log(level, message, data = {}) {
        if (this.levels[level] <= this.levels[this.logLevel]) {
            const timestamp = new Date().toISOString();
            console.log(JSON.stringify({
                timestamp,
                level,
                message,
                ...data
            }));
        }
    }

    error(message, data = {}) {
        this.log('error', message, data);
    }

    warn(message, data = {}) {
        this.log('warn', message, data);
    }

    info(message, data = {}) {
        this.log('info', message, data);
    }

    debug(message, data = {}) {
        this.log('debug', message, data);
    }
}

module.exports = ActivityLogger;