var express = require('express');
var app = express();
app.get('/', function (req, res) {
    "use strict";
    res.send("welcome to the Node Twitter simulator."); 
});

app.listen(8000);
console.log('server listening on :8000');