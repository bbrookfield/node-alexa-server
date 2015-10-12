var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var request = require('request');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Manually hook the handler function into express

var alexa = require('alexa-app');

var temperature = 60;
var targetTemperature = 60;
var alexaApp = new alexa.app('thermostat');
alexaApp.launch(function(req, res) {
    console.log('REQUEST', JSON.stringify(req));
    res.say('Bill, stop waiting to finish the command and speak normally. For god\'s sake man!');
});

alexaApp.intent('setTemp',
    {
        "slots": {
            "temperature": "NUMBER"
        }
        ,"utterances":[ "set the temp to {temperature}" ]
    },
    function(req, res) {
        console.log(JSON.stringify(req));
        request.post(process.env.THERMOSTAT_URL + '/tstat', {json: {t_cool: parseFloat(req.slot('temperature'))}});
        res.say("I have set the thermostat temperature to " + parseInt(req.slot('temperature')));
    }
);

alexaApp.intent('getTemp',
    {
        "slots": {
            "temperature": "NUMBER"
        }
        ,"utterances":["what is the current status"]
    },
    function(req, res) {
        console.log(JSON.stringify(req));
        res.say("the current temperature for your thermostat is " + temperature + " degrees, and the target temperature is " + targetTemperature + " degrees.");
    }
);


setInterval(function() {
    request(process.env.THERMOSTAT_URL + '/tstat', function (error, response, body) {
        temperature = JSON.parse(body).temp;
        targetTemperature = JSON.parse(body).t_cool;
    });
}, 60000);


// Manually hook the handler function into express
app.post('/thermostat',function(req, res) {
    alexaApp.request(req.body)        // connect express to alexa-app
        .then(function(response) { // alexa-app returns a promise with the response
            res.json(response);      // stream it to express' output
        });
});

app.listen(process.env.PORT);