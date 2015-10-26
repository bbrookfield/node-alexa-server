# alexa-server
A modular [NodeJS](https://nodejs.org/en/) based server for your Amazon Echo

##Table of Contents
* [Getting Started](#getting-started)
* [How it Works](#how-this-application-works)
* [Compatible Modules](#compatible-modules-if-you-create-one-let-me-know-and-i-will-add-it-to-the-list)
* [Deploying with Heroku](#using-heroku)
* [Credits](#thanks)

##Getting Started
1. clone the app `git clone https://github.com/bbrookfield/node-alexa-server`
2. Setup an [alexa skill](https://developer.amazon.com/edw/home.html#/skills)
3. TODO: finish adding steps to setup alexa app

##How this application works
The alexa-server application is an [express](http://expressjs.com/) webserver that routes Amazon requests to various app modules located in your **app_modules** directory. Each of these modules creates a global function that is called by the express router based on the URL path.

For example a request to `https://[your server URL]/thermostat` would route the request to **global.thermostat**

##Adding modules
1. To add modules to your server, you need to create an `app_modules` directory in the root directory
2. Then clone the module into your `app_modules` directory
  * *example:* `git clone https://github.com/bbrookfield/alexa-radiothermostat`

##Compatible modules (If you create one, let me know and I will add it to the list)
1. [alexa-directTV](https://github.com/bbrookfield/alexa-directTV) - For changing channels on your DirectTV
2. [alexa-radiothermostat](https://github.com/bbrookfield/alexa-radiothermostat) - For getting the current temperature and changing the temperature on your [Radio Thermostat](http://www.radiothermostat.com/)

##Using Heroku
I have included a procfile if you choose to deploy to [heroku](https://heroku.com)

##Thanks
[alexa-app](https://github.com/matt-kruse/alexa-app) - by [Matt Kruse](https://github.com/matt-kruse)
