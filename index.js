const Promise = require('bluebird')
const _ = require('lodash')

var https = require('https');

var options = {
    host: 'ebank.ckbank.mn',
    port: 443,
    path: '/mobile.php',
    method: 'POST'
};


const pickCategory = {
    quick_replies: [{
        content_type: 'text',
        title: '🔥 Work 🔥',
        payload: 'GET_VIDEO_WORK'
    }, {
        content_type: 'text',
        title: '😌 Life Goals 🔥',
        payload: 'GET_VIDEO_LIFE'
    }, {
        content_type: 'text',
        title: '💪 Gym 🔥',
        payload: 'GET_VIDEO_GYM'
    }],
    typing: true
}

module.exports = function(bp) {
    bp.middlewares.load()

    // Implement your Actions like this
    bp.wit.actions['getUserAccounts'] = request => {
        return new Promise((resolve, reject) => {
            bp.logger.info('getUserAccounts called', request)

            // Do something here

            request.context.accounts = '250000265';

            resolve(request.context)
        })
    }


    // Implement your Actions like this
    bp.wit.actions['getCurrencyRates'] = request => {
        return new Promise((resolve, reject) => {
            bp.logger.info('getCurrencyRates called', request)
            var str = ''; // Do something here
            var req = https.request(options, function(res) {
                res.on('data', function(chunk) {
                    res.setEncoding('utf8');
                    request.context.rates = '[USD авах 2015 , зарах 2014] [ RUB авах 30 , зарах 35 ]';
                });
            });
            req.end();
            resolve(request.context)
        })
    }


    // Implement your Actions like this
    bp.wit.actions['getStarted'] = request => {
        return new Promise((resolve, reject) => {
            bp.logger.info('getStarted called', request)
            // Do something here
            resolve(request.context)
        })
    }


    bp.hear({
        type: 'postback',
        text: 'GET_STARTED'
    }, (event, next) => {
        const {
            first_name,
            last_name
        } = event.user
        bp.logger.info('New user:', first_name, last_name)

        const WELCOME_SENTENCES = [
            "Hey there buddy pal, so I've heard that you need a little kick in the butt from time to time?",
            "Don't worry mate, that's my job and I'll do that for you.",
            "But man, I don't talk much.",
            "I'm a bit dumb, to be honest. Let's just stick to using buttons, that's going to be easier for the both of us."
        ]

        const WELCOME_TEXT_QUICK_REPLY = "THAT BEING SAID, choose a category below and I'll make sure you get pumped up!"

        Promise.mapSeries(WELCOME_SENTENCES, txt => {
                bp.messenger.sendText(event.user.id, txt, {
                    typing: true
                })
                return Promise.delay(4000)
            })
            .then(() => {
                bp.messenger.sendText(event.user.id, WELCOME_TEXT_QUICK_REPLY, pickCategory)
            })

    })

// listening postback button
    bp.hear({
            type: 'postback',
            text: 'CRATE'
        },
        (event, next) => {
            bp.messenger.sendText(event.user.id, 'ханш уу ханш 39024')
        })

// listening postback button
    bp.hear({
            type: 'postback',
            text: 'TRANSACTION'
        },
        (event, next) => {
            bp.messenger.sendText(event.user.id, 'Та хэнд мөнгө шилжүүлэх вэ ?')
        })
// listening quickreply button
    bp.hear({
            type: 'quick_reply',
            text: 'Гүйлгээ'
        },
        (event, next) => {
            bp.messenger.sendText(event.user.id, 'Та ямар төлбөр төлөх вэ ?')
        })

    bp.wit.reinitializeClient()
}
