'use strict';
var request = require('request');
var alexa = require('alexa-app');

var sampleApp = new alexa.app('sample');

// process the single slot supported by this skill
sampleApp.intent('setName', function(req, res) {
  res.card("Sample alexa-server Skill","Congratulations " + req.slot('name') + ", your skill is working");
  res.say("Congratulations  " + req.slot('name') + ", your skill is working");
});


// process launch request when no utterances detected
sampleApp.launch(function(req, res) {
  console.log('REQUEST', JSON.stringify(req));
  res.say("You can say, my name is Bill or my name is Joe or my name is TOP SECRET, if you work for the CIA");
});

module.exports = function(cb) {
  global.sample = sampleApp;
  cb();
};