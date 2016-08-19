var net = require("net");

var chatServer = net.createServer(),
    clientList = [];

chatServer.on('connection', function (client) {
    "use strict";
    client.write('Hi!\n');
    client.name = client.remoteAddress + ':' + client.remotePort;
    client.write("this client is named: " + client.name + "\n");
    clientList.push(client);
    client.on('data', function (data) {
        broadcast(data, client);
    });
    client.on('end', function () {
        clientList.splice(clientList.indexOf(client), 1);
    });
    client.on('error', function (e) {
        console.log(e); 
    });
});

// sends messages to listening clients,
function broadcast(message, client) {
    "use strict";
    console.log("broadcasting between " + clientList.length + " active clients...");
    var i = 0;
    var nowrites = [];
    for (i = 0; i < clientList.length; i += 1) {
        if (client !== clientList[i]) {

            // the book says to check for client.writable,
            // but that was not reliable, so I'm checking
            // for the functionality not the writable status.
            // This is an edge case anyway since most killed
            // connections are going to fire and 'end' event
            // which cleans this up in the first place.
            if (clientList[i].write) {
                clientList[i].write(client.name + " says: " + message);
            }
            else {
                console.log(clientList[i].name + " is not writable, destryoing...");
                nowrites.push(clientList[i]);
                clientList[i].destroy();
            }
        }
    }
    for (i = 0; i < nowrites.length; i += 1) {
        clientList.splice(clientList.indexOf(nowrites[i]), 1);
    }
}

chatServer.listen(9000);
console.log("chat server started...");