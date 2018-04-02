
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
    actionMap.set('input.carousel', carousel);
    console.log('outter', app.getSelectedOption());
    app.handleRequest(actionMap);

})

function carousel (app) {
  const response = app.buildRichResponse()
    // Introduce the carousel
    .addSimpleResponse('Alright! Here are a few web pages you might want to check out.')
    .addBrowseCarousel(
      app.buildBrowseCarousel()
      // Add the items to the carousel
        .addItems([
          app.buildBrowseItem("Title of item 1", "https://github.com")
            .setDescription("Description of item 1")
            .setFooter("Item 1 footer")
            .setImage('https://www.gstatic.com/mobilesdk/170329_assistant/assistant_color_96dp.png', 'Google Assistant Bubbles'),
          app.buildBrowseItem("Title of item 2", "https://google.com")
            .setDescription("Description of item 2")
            .setFooter("Item 2 footer")
            .setImage('https://www.gstatic.com/mobilesdk/170329_assistant/assistant_color_96dp.png', 'Google Assistant Bubbles')
        ])
    );
}

function welcomeIntent(app) {
    app.askWithList('Which of these looks good?',
        app.buildList('List title')
            .addItems([
                app.buildOptionItem('one')
                    .setTitle('one'),
                app.buildOptionItem('two')
                    .setTitle('two'),
            ]));
    console.log('inner', app.getSelectedOption());
    optionIntent(app);
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