# alexa-radiothermostat

This is a module for [node-alexa-server](https://github.com/bbrookfield/node-alexa-server) to integrate with [Radio Thermostats](http://www.radiothermostat.com/) 

####Getting started
1. Make sure you have downloaded and setup your [node-alexa-server](https://github.com/bbrookfield/node-alexa-server)
2. If you do not already have an `app_modules` directory in your server project, you need to create one
3. Clone this project into that directory
4. Setup your Alexa skill
5. Configure your intents
  
  ```
  {
    "intents": [
      {
      "intent": "getTemp",
        "slots": [{
          "name": "getTemperature",
          "type": "AMAZON.LITERAL"
        }]
      },
      {
      "intent": "setTemp",
        "slots": [{
          "name": "setTemperature",
          "type": "AMAZON.NUMBER"
        }]
      }
    ]
  }
  ```
6. Configure your utterances

  ```
  setTemp set to {setTemperature}
  setTemp set the temp to {setTemperature}
  setTemp set the temperature to {setTemperature}
  setTemp set temperature to {setTemperature}
  setTemp adjust temperature to {setTemperature}
  setTemp adjust the temperature to {setTemperature}
  getTemp what is the temperature
  getTemp what is temperature
  getTemp what's the temperature
  getTemp say the temperature
  getTemp tell me the temperature
  getTemp tell me temperature
  ```
