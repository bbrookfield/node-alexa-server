# alexa-server
A node based server for your Amazon Echo

####Getting Started
1. clone the app `git clone https://github.com/bbrookfield/node-alexa-server`
2. Setup an [alexa skill](https://developer.amazon.com/edw/home.html#/skills)
3. ######TODO: finish adding steps to setup alexa app

####How this application works
The alexa-server application is an [express](http://expressjs.com/) webserver that routes Amazon requests to various app modules located in your **app_modules** directory. Each of these modules creates a global function that is called by the express router based on the URL path.

For example a request to https://[your server URL]/thermostat would route the request to **global.thermostat**

####Using Heroku
######TODO: Add heroku info

####Thanks
[alexa-app](https://github.com/matt-kruse/alexa-app) - by [Matt Kruse](https://github.com/matt-kruse)
