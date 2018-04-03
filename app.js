
const app = require('express')();
const bodyparser = require('body-parser')
const port = process.env.PORT || 3000;
const { DialogflowApp } = require('actions-on-google');
const OVERVIEW_INTENT = 'input.overview';
const PERFORMANCE_INTENT = 'input.performance';
const OPTION_INTENT = 'actions.intent.OPTION';

console.log(port);

app.use(bodyparser.json())

app.post('/', (req, res) => {
    const app = new DialogflowApp({ request: req, response: res });
    const actionMap = new Map();
    console.log(app.getIntent())
    actionMap.set(OVERVIEW_INTENT, overviewIntent);
    actionMap.set(OPTION_INTENT, optionIntent);
    actionMap.set(PERFORMANCE_INTENT, performanceIntent)
    actionMap.set(null, () => {
        app.ask('Try again');
    })
    app.handleRequest(actionMap);

})

function performanceIntent(app) {
    app.ask(app.buildRichResponse()
        // Create a basic card and add it to the rich response
        .addSimpleResponse('Math and prime numbers it is!')
        .addBasicCard(app.buildBasicCard('42 is an even composite number. It' +
            'is composed of three distinct prime numbers multiplied together. It' +
            'has a total of eight divisors. 42 is an abundant number, because the' +
            'sum of its proper divisors 54 is greater than itself. To count from' +
            '1 to 42 would take you about twenty-one…')
            .setTitle('Math & prime numbers')
            .addButton('Read more', 'https://example.google.com/mathandprimes')
            .setImage('https://example.google.com/42.png', 'Image alternate text')
            .setImageDisplay('CROPPED')
        )
    );
}

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
    console.log('helo', app.getSelectedOption())
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

app.listen(port, () => {
    console.log('listening')
})