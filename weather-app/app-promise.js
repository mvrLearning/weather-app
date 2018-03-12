//const request = require('request');
const yargs = require('yargs');
const axios = require('axios');
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
var encodedAddress = encodeURIComponent(argv.address);

var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBz9FqOMhKAfLyljnOLSGpGhtNbX4q27os`;

axios.get(geocodeUrl)
    .then((response) => {
        if (response.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find the address');
        }
        var lat = response.data.results[0].geometry.location.lat;
        var long = response.data.results[0].geometry.location.lng;
        var weatherurl = `https://api.darksky.net/forecast/c85dfa3d6cdf46fb05af787c876982bb/${lat},${long}`;
        console.log(response.data.results[0].formatted_address);
        return axios.get(weatherurl);
    }).then((response) => {
        var temperature = response.data.currently.temperature;
        var apparentTemperature = response.data.currently.apparentTemperature;
        console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);
    })
    .catch((e) => {
        if (e.code === 'ENOTFOUND') {
            console.log('Unable to connect to API servers');
        } else {
            console.log(e.message);
        }
    })