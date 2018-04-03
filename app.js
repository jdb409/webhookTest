
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
        .addSimpleResponse('Performance of $10,000')
        .addBasicCard(app.buildBasicCard(`If $10,000 was 
        invested in QQQ, 10 years prior to December 31st, 2017 it would have grown to $33,368 versus $26,028 
        for the NASDAQ Composite Index or $22,822 for the Russell 3000 Index`)
            .addButton('Read more', 'https://google.com')
            .setImage('https://ei.marketwatch.com/Multimedia/2016/10/28/Photos/NS/MW-EY988_AMZN_B_20161028113003_NS.png?uuid=657f8b00-9d23-11e6-911d-00137241c023', 'Image alternate text')
            .setImageDisplay('CROPPED')
        )
    );
}

function overviewIntent(app) {
    app.askWithList('You can say:',
        app.buildList('Options:')
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
        app.tell(`webhook`);
    }
}

app.listen(port, () => {
    console.log('listening')
})