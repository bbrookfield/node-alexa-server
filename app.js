// Requires for this skill
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var request = require('request');
var alexa = require('alexa-app');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create new app
var alexaApp = new alexa.app('thermostat');

// process launch request when no utterances detected
alexaApp.launch(function(req, res) {
    console.log('REQUEST', JSON.stringify(req));
    res.say("You can say, what is the temperature, or set the temperature to 75!");
});

// process set temperature request
alexaApp.intent('setTemp',
    function(req, res) {
        console.log(JSON.stringify(req));
        request.post(process.env.THERMOSTAT_URL + '/tstat', {json: {t_cool: parseFloat(req.slot('setTemperature'))}});
        res.card("Thermostat Skill","Thermostat is set to " + parseInt(req.slot('setTemperature')) + " degrees");
        res.say("Thermostat is set to " + parseInt(req.slot('setTemperature')) + " degrees");
});

// process get temperature request
// This intent uses the res.send() feature for a delayed response back to alexa due to async http request.
alexaApp.intent('getTemp',
    function(req, res) {
        console.log(JSON.stringify(req));
        request(process.env.THERMOSTAT_URL + '/tstat', function (error, response, body) {
            body = JSON.parse(body);
            res.say("Thermostat current temperature is " + body.temp + " degrees, the target temperature is " + body.t_cool + " degrees.");
            res.card("Thermostat Skill","Thermostat current temperature is " + body.temp + " degrees, the target temperature is " + body.t_cool + " degrees.");
            res.send();
        });
        return false;
});

// Manually hook the handler function into express
app.post('/thermostat',function(req, res) {
    alexaApp.request(req.body)        // connect express to alexa-app
        .then(function(response) {    // alexa-app returns a promise with the response
            res.json(response);       // stream it to express' output
        });
});

app.listen(process.env.PORT);