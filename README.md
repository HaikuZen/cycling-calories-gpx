# Cycling Calories GPX Calculator

Calculate calories burned during cycling activities using GPX track data. This tool takes into account elevation changes, rider weight, and bike weight to provide accurate calorie estimates for your cycling activities.

## Features

- 🚴‍♂️ Accurate calorie calculations based on physics models
- 📈 Elevation data processing and caching
- 🗺️ GPX file parsing and validation
- 📊 Detailed activity logging
- 🔧 Command-line interface
- ⚡ High performance with cached elevation data

## Installation

```bash
npm install cycling-calories-gpx
```

## Usage

### Command Line Interface

```bash
node index.js <gpx-file> [rider-weight] [bike-weight]
```

Example:
```bash
node index.js ride.gpx 75 10
```

### Programmatic Usage

```javascript
const CyclingCaloriesGPX = require('cycling-calories-gpx');

const calculator = new CyclingCaloriesGPX({
    logLevel: 'info' // optional
});

async function calculateRideCalories() {
    try {
        const results = await calculator.processGPXFile('ride.gpx', {
            riderWeight: 75, // kg
            bikeWeight: 10   // kg
        });
        console.log('Calories burned:', results.calories);
    } catch (error) {
        console.error('Error processing file:', error);
    }
}
```

## Configuration

### Constructor Options

- `logLevel`: Logging level ('debug', 'info', 'warn', 'error')

### processGPXFile Options

- `riderWeight`: Weight of the rider in kilograms (default: 75)
- `bikeWeight`: Weight of the bicycle in kilograms (default: 10)

## Technical Details

The calorie calculation takes into account:
- Rolling resistance
- Air resistance
- Elevation changes
- Rider and bike weight
- Speed variations

## Development

### Requirements

- Node.js >= 14.0.0
- npm >= 6.0.0

### Setup

```bash
git clone https://github.com/HaikuZen/cycling-calories-gpx.git
cd cycling-calories-gpx
npm install
```

### Testing

```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Created by HaikuZen - [GitHub Profile](https://github.com/HaikuZen)

## Last Updated

2025-08-21 15:24:44 UTC
