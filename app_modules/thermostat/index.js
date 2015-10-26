'use strict';
var request = require('request');
var alexa = require('alexa-app');

var thermostatApp = new alexa.app('thermostat');

thermostatApp.intent('setTemp', function(req, res) {
  request.post(process.env.THERMOSTAT_URL + '/tstat', {json: {t_cool: parseFloat(req.slot('setTemperature'))}});
  res.card("Thermostat Skill","Thermostat is set to " + parseInt(req.slot('setTemperature')) + " degrees");
  res.say("Thermostat is set to " + parseInt(req.slot('setTemperature')) + " degrees");
});

// process get temperature request
// This intent uses the res.send() feature for a delayed response back to alexa due to async http request.
thermostatApp.intent('getTemp', function(req, res) {
  request(process.env.THERMOSTAT_URL + '/tstat', function (error, response, body) {
    console.log('Error: ' + error, 'RESPONSE: ' + response, 'BODY: ' + body);
    body = JSON.parse(body);
    res.say("Thermostat current temperature is " + body.temp + " degrees, the target temperature is " + body.t_cool + " degrees.");
    res.card("Thermostat Skill","Thermostat current temperature is " + body.temp + " degrees, the target temperature is " + body.t_cool + " degrees.");
    res.send();
  });
  return false;
});

// process launch request when no utterances detected
thermostatApp.launch(function(req, res) {
  console.log('REQUEST', JSON.stringify(req));
  res.say("You can say, what is the temperature, or set the temperature to 75!");
});

module.exports = function(cb) {
  global.thermostat = thermostatApp;
  cb();
};