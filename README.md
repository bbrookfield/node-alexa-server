# alexa-thermostat

####Getting Started
`git clone https://github.com/bbrookfield/node-alexa-server`

####How this application works
The alexa-server application is an [express](http://expressjs.com/) webserver that routes Amazon requests to various app modules located in your **app_modules** directory. Each of these modules creates a global function that is called by the express router based on the URL path.

For example a request to https://[your server URL]/thermostat would route the request to **global.thermostat**

####Thanks
[alexa-app](https://github.com/matt-kruse/alexa-app) - by [Matt Kruse](https://github.com/matt-kruse)
