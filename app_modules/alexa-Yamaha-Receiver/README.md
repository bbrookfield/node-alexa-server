# alexa-Ymaha Receiver control

This is a module for [node-alexa-server](https://github.com/bbrookfield/node-alexa-server) to integrate with most Yamaha receivers that have network capability.
This skill sends a HTTP url that is evaluated by my  [EventGhost](https:www.eventghost.org) service running on my home PC.

####Getting started
1. Make sure you have downloaded and setup your [node-alexa-server](https://github.com/bbrookfield/node-alexa-server)
2. If you do not already have an `app_modules` directory in your server project, you need to create one
3. Clone this project into that directory
4. Setup your Alexa skill
5. Configure your intents
6. Install EventGhost on your home PC
7. Enable WebServer Plugin
7. Add Yamaha Plugin for EventGhost.
8.  <<< need steps for Yamaha Trigger setups here >>>



  
  ```
  {
    "intents": [{
      "intent": "setInput",
        "slots": [{
          "name": "Input",
          "type": "AMAZON.LITERAL"
        }]
     }]
  }
  ```
6. Configure your utterances (example for setting input to TV)

  ```
setInput set input {TV|Input}
setInput set to input {TV|Input}
setInput set input to {TV|Input}
setInput set input as {TV|Input}
  ```
