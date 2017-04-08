'use strict';
var request = require('request');
var alexa = require('alexa-app');

var yamahaApp = new alexa.app('yamaha');

yamahaApp.intent('setInput', function (req, res) {
    request(process.env.YAMAHA_URL + '/command.html/?' + req.slot('Input'), function (err, response, body) {
       res.card("Yamaha Receiver Skill", "Yamaha Receiver set to input " + req.slot('Input'));
       res.say("Yamaha Receiver is now set to input " + req.slot('Input'));
       res.send();
    });
    return false;
});

yamahaApp.intent('setVolume', function (req, res) {
    request(process.env.YAMAHA_URL + '/command.html/?' + req.slot('Volume'), function (err, response, body) {
        res.card("Yamaha Receiver Skill", "Yamaha volume " + req.slot('Volume'));
        res.say("Volume " + req.slot('Volume'));
        res.send();
    });
    return false;
});

// process launch request when no utterances detected
yamahaApp.launch(function (req, res) {
    console.log('REQUEST', JSON.stringify(req));
    res.say("You can say, Set input to TV or music or set volume up or down!");
});

module.exports = function (cb) {
    global.yamaha = yamahaApp;
    cb();
};