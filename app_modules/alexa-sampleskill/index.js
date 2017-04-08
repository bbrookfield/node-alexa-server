'use strict';
var request = require('request');
var alexa = require('alexa-app');

var sampleApp = new alexa.app('sample');

// process the single slot supported by this skill
sampleApp.intent('setNumber', function(req, res) {
    res.card("Sample alexa-server Skill","You said " + req.slot('number') + ", your skill is working");
    res.say("You said " + req.slot('number') + ", your skill is working");
});


// process launch request when no utterances detected
sampleApp.launch(function(req, res) {
    console.log('REQUEST', JSON.stringify(req));
    res.say("Please say any number");
});

module.exports = function(cb) {
    global.sample = sampleApp;
    cb();
};