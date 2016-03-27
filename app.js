// Requires for this skill
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var async = require('async');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/*
 * function to initialize all modules that are located in the app_modules directory
 */

function init(cb) {
  var modulePath = path.resolve(path.join(__dirname, './app_modules'));
  fs.readdir(modulePath, function(err, services) {
    var moduleArray = [];
    services.forEach(function(module) {
      moduleArray.push(require('./app_modules/' + module));
    });
    async.series(moduleArray, function(err, results) {
      if (err) {
        console.error(err);
      } else {
        cb();
      }
    });
  });
}


init(function() {
  // Manually hook the handler function into express
  app.post('/:service', function(req, res) {
    //console.log(req.body);
      // console.log(req.params);
    global[req.params.service].request(req.body)
      .then(function(response) {
        console.log(response);
        res.json(response);
      });
  });

  app.listen(process.env.PORT);
});