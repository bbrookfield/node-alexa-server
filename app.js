var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var request = require('request');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Manually hook the handler function into express

var alexa = require('alexa-app');

var alexaApp = new alexa.app('thermostat');
alexaApp.launch(function(req, res) {
    console.log('REQUEST', JSON.stringify(req));
    res.say("You can say, Alexa ask thermostat what is the temperature, or Alexa tell thermostat set the temperature to 75!");
});

alexaApp.intent('setTemp',
    function(req, res) {
        console.log(JSON.stringify(req));
        request.post(process.env.THERMOSTAT_URL + '/tstat', {json: {t_cool: parseFloat(req.slot('temperature'))}});
        res.say("I have set the thermostat temperature to " + parseInt(req.slot('temperature')));
    }
);

alexaApp.intent('getTemp',
    function(req, res) {
        console.log(JSON.stringify(req));
        request(process.env.THERMOSTAT_URL + '/tstat', function (error, response, body) {
            body = JSON.parse(body);
            res.say("The current temperature for your thermostat is " + body.temp + " degrees, and the target temperature is " + body.t_cool + " degrees.");
            res.send();
        });
        return false;
    }
);



// Manually hook the handler function into express
app.post('/thermostat',function(req, res) {
    alexaApp.request(req.body)        // connect express to alexa-app
        .then(function(response) { // alexa-app returns a promise with the response
            res.json(response);      // stream it to express' output
        });
});

app.listen(process.env.PORT);