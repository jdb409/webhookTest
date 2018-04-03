
const app = require('express')();
const bodyparser = require('body-parser')
const port = process.env.PORT || 3000;
const { DialogflowApp } = require('actions-on-google');
const OVERVIEW_INTENT = 'input.overview';
const OPTION_INTENT = 'actions.intent.OPTION';
console.log(port);

app.use(bodyparser.json())

app.post('/', (req, res) => {
    const app = new DialogflowApp({ request: req, response: res });
    const actionMap = new Map();
    console.log(app.getIntent())
    actionMap.set(OVERVIEW_INTENT, overviewIntent);
    actionMap.set(OPTION_INTENT, optionIntent);
    // actionMap.set('input.carousel', carousel);
    // console.log('outter', app.StandardIntents.OPTION);
    actionMap.set(null, () => {
        app.ask('Try again');
    })
    app.handleRequest(actionMap);

})

function overviewIntent(app) {
    app.askWithList('You can say:',
        app.buildList('List title')
            .addItems([
                app.buildOptionItem('Fund Description')
                    .setTitle('Fund Description'),
                app.buildOptionItem('Fund Data')
                    .setTitle('Fund Data')
            ]));
    console.log('inner', app.getSelectedOption());
}


function optionIntent(app) {
    if (app.getSelectedOption() === 'Fund Data') {
        app.tell(`The fund trade symbol is QQQ. With an  intraday NAV (IIV) is QXV.
        The QQQ CUSIP is 73935A104 and it is listed on the NASDAQ exchange.
        As of December, 31st 2017 there are 106 securities in the ETF, with a 30-Day SEC Yield of .86%, 
        a 30-Day SEC Unsubsidized Yield and a Total Expense Ratio of .20%`);
    } else if (app.getSelectedOption() === 'Fund Description') {
        app.tell(`PowerShares QQQ is an exchange-traded fund, or ETF, based on the Nasdaq 100 Index.  The Fund will, under most circumstances, consist of all the stocks in the Index.  The Index includes 100 of the largest domestic and international nonfinancial companies listed on the Nasdaq stock market based on market capitalization.  
        The Fund and the Index are rebalanced quarterly and reconstituted annually`);
    }
}

// function carousel (app) {
//     app.askWithCarousel('Alright! Here are a few things you can learn. Which sounds interesting?',
//       // Build a carousel
//       app.buildCarousel()
//       // Add the first item to the carousel
//       .addItems(app.buildOptionItem('MATH_AND_PRIME',
//         ['math', 'math and prime', 'prime numbers', 'prime'])
//         .setTitle('Math & prime numbers')
//         .setDescription('42 is an abundant number because the sum of its ' +
//           'proper divisors 54 is greater…')
//         .setImage('http://example.com/math_and_prime.jpg', 'Math & prime numbers'))
//       // Add the second item to the carousel
//       .addItems(app.buildOptionItem('EGYPT',
//         ['religion', 'egpyt', 'ancient egyptian'])
//         .setTitle('Ancient Egyptian religion')
//         .setDescription('42 gods who ruled on the fate of the dead in the ' +
//           'afterworld. Throughout the under…')
//         .setImage('http://example.com/egypt', 'Egypt')
//       )
//       // Add third item to the carousel
//       .addItems(app.buildOptionItem('RECIPES',
//         ['recipes', 'recipe', '42 recipes'])
//         .setTitle('42 recipes with 42 ingredients')
//         .setDescription('Here\'s a beautifully simple recipe that\'s full ' +
//           'of flavor! All you need is some ginger and…')
//         .setImage('http://example.com/recipe', 'Recipe')
//       )
//     );
//   }

app.listen(port, () => {
    console.log('listening')
})