'use strict';
var request = require('request');
var alexa = require('alexa-app');

var yamahaApp = new alexa.app('yamaha');

yamahaApp.intent('setInput', function(req, res) {
  request.post(process.env.YAMAHA_URL + '/?', {json: {t_cool: parseFloat(req.slot('Input'))}});
  res.card("Yamaha Receiver Skill","Yamaha Receiver set to input " + parseInt(req.slot('Input')));
  res.say("Yamaha Receiver set to input " + parseInt(req.slot('Input')));
});


// process launch request when no utterances detected
yamahaApp.launch(function(req, res) {
  console.log('REQUEST', JSON.stringify(req));
  res.say("You can say, Set input to TV, or set input echo!");
});

module.exports = function(cb) {
  global.yamaha = yamahaApp;
  cb();
};