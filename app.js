var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Manually hook the handler function into express

var alexa = require('alexa-app');


var alexaApp = new alexa.app('sample');
var temperature = 60;
alexaApp.launch(function(req, res) {
    console.log('REQUEST', JSON.stringify(req));
    res.say('I am amazing');
});

alexaApp.intent('setTemp',
    {
        "slots": {
            "temperature": "NUMBER"
        }
        ,"utterances":[ "set the temperature to {temperature}" ]
    },
    function(request, response) {
        console.log(JSON.stringify(request));
        temperature = request.slot('temperature');
        response.say("I have set the temperature to " + temperature);
    }
);

alexaApp.intent('getTemp',
    {
        "slots": {
            "temperature": "NUMBER"
        }
        ,"utterances":["what is the temperature"]
    },
    function(request, response) {
        console.log(JSON.stringify(request));
        response.say("the temperature is " + temperature);
    }
);


// Manually hook the handler function into express
app.post('/sample',function(req,res) {
    alexaApp.request(req.body)        // connect express to alexa-app
        .then(function(response) { // alexa-app returns a promise with the response
            res.json(response);      // stream it to express' output
        });
});

app.listen(process.env.PORT);