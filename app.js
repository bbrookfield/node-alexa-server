var express = require('express')();
var alexa = require('alexa-app');
var app = new alexa.app('sample');

app.intent('picknumber',
    {
        "slots":{"number":"NUMBER"}
        ,"utterances":[ "say the number {number}" ]
    },
    function(request,response) {
        var number = request.slot('number');
        response.say("You asked for the number "+ number);
    }
);

// Manually hook the handler function into express
express.post('/sample',function(req, res) {
    app.request(req.body)        // connect express to alexa-app
        .then(function(response) { // alexa-app returns a promise with the response
            res.json(response);      // stream it to express' output
        });
    console.log(req.body);
});

express.listen(process.env.PORT);