var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Manually hook the handler function into express

var alexa = require('alexa-app');


var alexaApp = new alexa.app('sample');

alexaApp.launch(function(req, res) {
    console.log('REQUEST', JSON.stringify(req));
    res.say('I am amazing');
});

alexaApp.intent('sayNumber',
    {
        "slots":{"number":"NUMBER"}
        ,"utterances":[ "say the number {number}" ]
    },
    function(request, response) {
        var number = request.slot('number');
        response.say("You asked for the number "+number);
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