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
const WELCOME_INTENT = 'input.welcome';
const OPTION_INTENT = 'option.select';
console.log(port);

app.use(bodyparser.json())

app.post('/', (req, res) => {
    const app = new DialogflowApp({ request: req, response: res });
    const actionMap = new Map();
    console.log(app.getIntent())
    actionMap.set(WELCOME_INTENT, welcomeIntent);
    actionMap.set(OPTION_INTENT, optionIntent);
    app.handleRequest(actionMap);

})

function welcomeIntent(app) {
    app.askWithList('Which of these looks good?',
        app.buildList('List title')
            .addItems([
                app.buildOptionItem('one',
                    ['synonym of KEY_ONE 1', 'synonym of KEY_ONE 2'])
                    .setTitle('Title of First List Item'),
                app.buildOptionItem('two',
                    ['synonym of KEY_TWO 1', 'synonym of KEY_TWO 2'])
                    .setTitle('Title of Second List Item'),
            ]));
}

function optionIntent(app) {
    if (app.getSelectedOption() === 'one') {
        app.tell('Number one is a great choice!');
    } else {
        app.tell('Number two is a great choice!');
    }
}

app.listen(port, () => {
    console.log('listening')
})