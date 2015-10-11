var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var request = require('request');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Manually hook the handler function into express

var alexa = require('alexa-app');


var alexaApp = new alexa.app('sample');
alexaApp.launch(function(req, res) {
    console.log('REQUEST', JSON.stringify(req));
    res.say('I am amazing');
});

/*alexaApp.intent('setTemp',
    {
        "slots": {
            "temperature": "NUMBER"
        }
        ,"utterances":[ "set the temperature to {temperature}" ]
    },
    function(req, res) {
        console.log(JSON.stringify(req));
        temperature = req.slot('temperature');
        res.say("I have set the temperature to " + temperature);
    }
);*/

alexaApp.intent('getTemp',
    {
        "slots": {
            "temperature": "NUMBER"
        }
        ,"utterances":["what is the temperature"]
    },
    function(req, res) {
        console.log(JSON.stringify(req));
        request(process.env.THERMOSTAT_URL + '/tstat', function (error, response, body) {
            console.log('error: ', error);
            console.log('body: ', body);
            if (!error && response.statusCode == 200) {
                res.say("the temperature is 60");
            } else {
                res.say('There was an error getting the temperature.');
            }
        });
    }
);


// Manually hook the handler function into express
app.post('/sample',function(req, res) {
    alexaApp.request(req.body)        // connect express to alexa-app
        .then(function(response) { // alexa-app returns a promise with the response
            res.json(response);      // stream it to express' output
        });
});

app.listen(process.env.PORT);