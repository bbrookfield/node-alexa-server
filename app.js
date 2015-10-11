// Start up the server
var express = require('express');
var alexa = require('alexa-app');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var alexaApp = new alexa.app('test');
alexaApp.launch(function(request,response) {
    response.say("You launched the app!");
});
alexaApp.dictionary = {"names":["matt","joe","bob","bill","mary","jane","dawn"]};
alexaApp.intent("nameIntent",
    {
        "slots":{"NAME":"LITERAL"}
        ,"utterances": [
        "my {name is|name's} {names|NAME}"
        ,"set my name to {names|NAME}"
    ]
    },
    function(request,response) {
        response.say("Success!");
    }
);
alexaApp.express(app, "/echo/");

// Launch /echo/test in your browser with a GET request!

app.listen(PORT);
console.log("Listening on port "+PORT);

//amzn1.echo-sdk-ams.app.cfc1e212-1f38-4cd4-a68e-bcd3121ee5fe