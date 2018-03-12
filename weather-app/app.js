//const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch the weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

console.log(argv);

geocode.geocodeAddress(argv.address, (errorMsg, results) => {
    if (errorMsg) {
        console.log(errorMsg);
    } else {
        //console.log(JSON.stringify(results, undefined, 2));
        weather.getWeather(results.latitude, results.longitude, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`It is currently ${res.temperature} but it feels like ${res.apparentTemperature}`);
                // console.log(JSON.stringify(res, undefined, 2));
            }
        })
    }
});