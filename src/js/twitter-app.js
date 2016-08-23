var express = require('express');
var app = express();
var server = app.listen(8000);
var tweets = [];
var bodyParser = require('body-parser');
var urlencodedbodyparser = bodyParser.urlencoded({ extended: false });

app.get('/', function (req, res) {
    "use strict";
    res.send("welcome to the Node Twitter simulator.");
});

app.post('/send', urlencodedbodyparser, function (rq, rs) {
    "use strict";
    if (rq.body && rq.body.tweet) {
        tweets.push(rq.body.tweet);
        rs.send({status: 'ok', message: "Tweet received."});
    }
    else {
        rs.send({status: "nok", message: "No Tweet received."});
    }
});

app.get('/tweets', function (rq, rs) {
    "use strict";
    rs.send(tweets);
});

console.log('server listening on :8000');

module.exports = server;