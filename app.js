// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';
// const http = require('http');
const app = require('express')();
const bodyparser = require('body-parser')
const port = process.env.PORT || 3000;
const { DialogflowApp } = require('actions-on-google');
// const host = 'api.worldweatheronline.com';
// const wwoApiKey = '25417004f3694bd58a130149180103';
console.log(port);

app.use(bodyparser.json())

function welcomeIntent(app) {
    app.ask('Welcome to number echo! Say a number.');
}

app.post('/', (req, res) => {
    const app = new DialogflowApp({ request: req, response: res });
    console.log(app);
    const WELCOME_INTENT = 'input.welcome';  // the action name from the Dialogflow intent
    // const NUMBER_INTENT = 'input.number';  // the action name from the Dialogflow intent
    // const NUMBER_ARGUMENT = 'input.mynum'; // the action name from the Dialogflow intent

    let actionMap = new Map();
    actionMap.set(WELCOME_INTENT, welcomeIntent);
    // actionMap.set(NUMBER_INTENT, numberIntent);
    app.handleRequest(actionMap)
    //   // Get the city and date from the request
    //   let city = req.body.result.parameters['geo-city']; // city is a required param
    //   // Get the date for the weather forecast (if present)
    //   let date = '';
    //   if (req.body.result.parameters['date']) {
    //     date = req.body.result.parameters['date'];
    //     console.log('Date: ' + date);
    //   }
    // Call the weather API
    //   callWeatherApi(city, date).then((output) => {
    //     // Return the results of the weather API to Dialogflow
    //     res.setHeader('Content-Type', 'application/json');
    //     res.send(JSON.stringify({ 'speech': output, 'displayText': output }));
    //   }).catch((error) => {
    //     // If there is an error let the user know
    //     res.setHeader('Content-Type', 'application/json');
    //     res.send(JSON.stringify({ 'speech': error, 'displayText': error }));
    //   });
})

app.listen(port, () => {
    console.log('listening')
})