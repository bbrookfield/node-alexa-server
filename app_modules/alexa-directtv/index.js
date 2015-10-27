'use strict';
var request = require('request');
var alexa = require('alexa-app');
var directTVApp = new alexa.app('directTV');

// process set temperature request
directTVApp.intent('setChannel', function(req, res) {
  request.get(process.env.DVR_URL + '/tv/tune?major=' + parseInt(req.slot('Channel')));
  res.card("Direct TV Skill","TV set to channel " + parseInt(req.slot('Channel')));
  res.say("I have set the TV to channel " + parseInt(req.slot('Channel')) + " as requested");
});

directTVApp.launch(function(req, res) {
  console.log('REQUEST', JSON.stringify(req));
  res.say("You can say, set to channel 44, or any number that is a valid channel");
});


module.exports = function(cb) {
  global.tv = directTVApp;
  cb();
};