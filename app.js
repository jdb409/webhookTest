
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
    console.log('outter', app.StandardIntents);
    app.handleRequest(actionMap);

})

function carousel (app) {
    app.askWithCarousel('Alright! Here are a few things you can learn. Which sounds interesting?',
      // Build a carousel
      app.buildCarousel()
      // Add the first item to the carousel
      .addItems(app.buildOptionItem('MATH_AND_PRIME',
        ['math', 'math and prime', 'prime numbers', 'prime'])
        .setTitle('Math & prime numbers')
        .setDescription('42 is an abundant number because the sum of its ' +
          'proper divisors 54 is greater…')
        .setImage('http://example.com/math_and_prime.jpg', 'Math & prime numbers'))
      // Add the second item to the carousel
      .addItems(app.buildOptionItem('EGYPT',
        ['religion', 'egpyt', 'ancient egyptian'])
        .setTitle('Ancient Egyptian religion')
        .setDescription('42 gods who ruled on the fate of the dead in the ' +
          'afterworld. Throughout the under…')
        .setImage('http://example.com/egypt', 'Egypt')
      )
      // Add third item to the carousel
      .addItems(app.buildOptionItem('RECIPES',
        ['recipes', 'recipe', '42 recipes'])
        .setTitle('42 recipes with 42 ingredients')
        .setDescription('Here\'s a beautifully simple recipe that\'s full ' +
          'of flavor! All you need is some ginger and…')
        .setImage('http://example.com/recipe', 'Recipe')
      )
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