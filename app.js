const yargs = require('yargs')
const geocode = require('./geocode/geocode.js')
const keys = require('./keys/keys_dev')
const fetchForecast = require('./darksky/darksky.js')

// coinmarketcap url: https://api.coinmarketcap.com/v1/ticker/
// https://api.darksky.net/forecast/APIKEY/LAT,LNG

const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather',
			string: true
		}
	})
	.help()
	// sets an alias for the help function
	.alias('help', 'h')
	.argv;

geocode.geocodeAddress(argv.a, (errorMessage, results) => {
	if (errorMessage) {
		console.log(errorMessage)
	} else {
		console.log(results.address);
		fetchForecast.fetchForecast(results.latitude, results.longitude, (errorMessage, forecastResults) => {
			if (errorMessage) {
				console.log(errorMessage)
			} else {
				// console.log(JSON.stringify(forecastResults, undefined, 2));
				console.log(`It is currently ${forecastResults.temperature} degrees ferenheit`)
				console.log(`It feels like ${forecastResults.apparentTemperature} degrees ferenheit`)
			}
		});
	}
});

