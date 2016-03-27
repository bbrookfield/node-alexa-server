# alexa-server
A modular [NodeJS](https://nodejs.org/en/) based server for your Amazon Echo skills using the Alexa Skills Kit.

##Table of Contents
* [Getting Started](#getting-started)
  * [Creating an Account](#creating-an-account)
  * [Create Your First Skill](#create-your-first-skill)
  * [Getting Started With The Alexa Server](#getting-started-with-server)
* [How it Works](#how-this-application-works)
* [Compatible Modules](#compatible-modules-if-you-create-one-let-me-know-and-i-will-add-it-to-the-list)
* [Create Your Own Module](create-your-own-module)
* [Deploying with Heroku](#using-heroku)
* [Credits](#thanks)

##Getting Started
In this section we will walk you through everything you need to get started with creating skills for your Amazon Echo.

####Creating an Account
To become an Alexa developer you must sign up [HERE](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit)

####Create Your First Skill

**Step 1**

Once you have a developer account setup and have logged in, Click on *Get Started* under *Alexa Skills Kit*

![alt text](http://gdurl.com/Y5Mf)

**Step 2**

Click *Add A New Skill*

![alt text](http://gdurl.com/vCuK)

**Step 3**

Fill out the *Create A New Skill* form

![alt text](http://gdurl.com/FP00)

**Step 4**

Add an *Intent Schema* and *Utterance*

![alt text](http://gdurl.com/gEDZ)

**Step 5**

Test your new skill.

NOTE: You will have to complete **Getting Started with Server** before you can test your new skill.

![alt text](http://gdurl.com/H8zl)


####Getting Started with Server
1. Clone the app `git clone https://github.com/bbrookfield/node-alexa-server`
2. Install modules `npm install`
3. Run the application `PORT=9000 node app.js`
4. If no errors occur then you can begin [adding modules](#adding-modules) or [create your own module](#create-your-own-module)

##How this application works
The alexa-server application is an [express](http://expressjs.com/) webserver that routes Amazon requests to various app modules located in your **app_modules** directory. Each of these modules creates a global function that is called by the express router based on the URL path.

For example a request to `https://[your server URL]/thermostat` would route the request to **global.thermostat**

##Adding modules
1. To add modules to your server, you need to create an `app_modules` directory in the root directory
2. Then clone the module into your `app_modules` directory
  * *example:* `git clone https://github.com/bbrookfield/alexa-radiothermostat`

##Compatible modules (If you create one, let me know and I will add it to the list)
1. [alexa-sampleskill](https://github.com/bbrookfield/alexa-sampleskill) - This is a sort of "Hello World" module to help get you started
2. [alexa-directTV](https://github.com/bbrookfield/alexa-directTV) - For changing channels on your DirectTV
3. [alexa-radiothermostat](https://github.com/bbrookfield/alexa-radiothermostat) - For getting the current temperature and changing the temperature on your [Radio Thermostat](http://www.radiothermostat.com/)

##Create Your Own Module
TODO: Add instructions for creating your own module

##Using Heroku
I have included a procfile if you choose to deploy to [heroku](https://heroku.com)

##Thanks
[alexa-app](https://github.com/matt-kruse/alexa-app) - by [Matt Kruse](https://github.com/matt-kruse)
