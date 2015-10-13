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
        res.say("Please wait, I am getting the temperature.");
//        getTemp (function (data){
//            console.log(data);
//            res.say("the current temperature for your thermostat is " + data.temp + " degrees, and the target temperature is " + data.target + " degrees."); });
 });


function getTemp(cb) {
    request(process.env.THERMOSTAT_URL + '/tstat', function (error, response, body) {
        body = JSON.parse(body);
        cb ({temp: body.temp, target: body.t_cool});
});}


// Manually hook the handler function into express
app.post('/thermostat',function(req, res) {
    alexaApp.request
    (req.body)        // connect express to alexa-app
        .then(function(response) { // alexa-app returns a promise with the response
            res.json(response);      // stream it to express' output
        });
});

app.listen(process.env.PORT);