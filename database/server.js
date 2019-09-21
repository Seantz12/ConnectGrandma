const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');
// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server
});

// I'm maintaining all active connections in this object
const clients = {};
const users = {};

const sendMessage = (json) => {
  // We are sending the current data to all connected clients
  Object.keys(clients).map((client) => {
    clients[client].sendUTF(json);
  });
}

// This code generates unique userid for everyuser.
const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};

wsServer.on('request', function(request) {
  var userID = getUniqueID();
  console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  connection.on('message', function(message) {
    if(message.type === 'utf8') {
        const data = JSON.parse(message.utf8Data);
        const json = { type: dataFromClient.type };
        if (data.type === "userevent") {
            users[userID] = data;    
            json.data = { users };
        } else {
            console.log('huh');
        }
        sendMessage(JSON.stringify(json));
    }
  });
  connection.on('close', function(connection) {
    console.log('close');
    const json = { type: "userevent" };
    json.data = { users }
    delete clients[userID];
    delete users[userID];
    sendMessage(JSON.stringify(json));
  });
  console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients))
});