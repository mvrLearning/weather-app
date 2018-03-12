const request = require('request');
var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBz9FqOMhKAfLyljnOLSGpGhtNbX4q27os`,
        json: true
    }, (error, response, body) => {
        // console.log(JSON.stringify(response, undefined, 2)); //response is statuscodes,body and also headers included
        // console.log(JSON.stringify(body, undefined, 2)); //http result is body
        if (error) {
            callback('Unable to connect to Google Servers');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find the Address')
        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            })
        }
    })
}

module.exports = {
    geocodeAddress
}